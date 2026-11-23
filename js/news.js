// Новостная лента: шаблон (картинка, ссылка, APA, 3C, кратко) + ИИ-категоризация по темам
import { state, addUnsub } from "./app.js";
import { app, AI_BASE, col, ref, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, serverTimestamp, uploadFile, removeFile } from "./fb.js";
import { USE_STORAGE, AI_ENABLED, AI_MODEL } from "./config.js";
import { CONCEPTS, CONTENT, CONTEXTS, HL_CHALLENGES, NEWS_THEMES } from "./data.js";
import { askConfirm } from "./ui.js";
import { $, $$, esc, toast, modal, fmtDate, safeUrl, linkify } from "./ui.js";

const isT = () => state.role === "teacher";
const themeOf = (id) => NEWS_THEMES.find((t) => t.id === id) || NEWS_THEMES.at(-1);
const lbl = (arr, code) => (arr.find((x) => x[0] === code) || [code, code])[1];

// ---------- ИИ-категоризация ----------
let aiModel = null;
async function getModel() {
  if (aiModel) return aiModel;
  const m = await import(`${AI_BASE}/firebase-ai.js`);
  const ai = m.getAI(app, { backend: new m.GoogleAIBackend() });
  aiModel = m.getGenerativeModel(ai, { model: AI_MODEL, generationConfig: { responseMimeType: "application/json", temperature: 0.1 } });
  return aiModel;
}

function keywordClassify(p) {
  const text = ` ${p.title} ${p.summary} ${p.c3?.explain?.content || ""} ${p.link || ""} `.toLowerCase();
  let best = "other", score = 0;
  for (const t of NEWS_THEMES) {
    const s = t.kw.reduce((n, k) => n + (text.includes(k) ? 1 : 0), 0);
    if (s > score) { score = s; best = t.id; }
  }
  // если ничего не найдено — по выбранной content area
  if (!score) {
    const c = p.c3?.content?.[0];
    best = { "3.6": "ai", "3.5": "media", "3.7": "robots", "3.1": "privacy", "3.4": "security" }[c] || "other";
  }
  return { category: best, hlChallenge: "", tags: [], categorySource: "keywords" };
}

export async function classify(p) {
  if (!AI_ENABLED) return keywordClassify(p);
  try {
    const model = await getModel();
    const prompt = `You categorise student news posts for an IB Diploma Digital Society class.
Return ONLY JSON: {"category": "<theme id>", "hlChallenge": "<code or empty>", "tags": ["2-4 short lowercase keywords"]}.
Theme ids: ${NEWS_THEMES.map((t) => `${t.id} = ${t.label}`).join("; ")}.
HL challenge codes (only if clearly relevant, else ""): ${HL_CHALLENGES.map((h) => `${h[0]} ${h[1]}`).join("; ")}.
Post title: ${p.title}
Summary: ${p.summary}
3Cs chosen by student: content ${p.c3.content.join(", ")}; concepts ${p.c3.concept.join(", ")}; contexts ${p.c3.context.join(", ")}.
Source URL: ${p.link}`;
    const r = await model.generateContent(prompt);
    const j = JSON.parse(r.response.text().replace(/^```json|```$/g, "").trim());
    const category = NEWS_THEMES.some((t) => t.id === j.category) ? j.category : "other";
    const hlChallenge = HL_CHALLENGES.some((h) => h[0] === j.hlChallenge) ? j.hlChallenge : "";
    const tags = Array.isArray(j.tags) ? j.tags.slice(0, 4).map((t) => String(t).toLowerCase().slice(0, 24)) : [];
    return { category, hlChallenge, tags, categorySource: "ai" };
  } catch (e) {
    console.warn("AI недоступен, классификация по ключевым словам", e);
    return keywordClassify(p);
  }
}

// ---------- Лента ----------
export function renderNews(view) {
  let posts = [];
  const f = { theme: "all", content: "", concept: "", context: "", level: "", q: "", mine: false };
  view.innerHTML = `
    <div class="page-head">
      <div><h2>Digital Society News</h2><p class="muted">Реальные примеры для 3C. Темы расставляет ИИ 🤖 автоматически.</p></div>
      ${isT() ? "" : `<button class="btn primary" id="newPost">＋ Опубликовать новость</button>`}
    </div>
    <div class="theme-bar" id="themes"></div>
    <div class="card controls">
      <input id="nq" placeholder="🔎 Поиск по заголовку, тексту, тегам">
      <select id="fContent"><option value="">Content: все</option>${CONTENT.map((c) => `<option value="${c[0]}">${c[0]} ${c[1]}</option>`).join("")}</select>
      <select id="fConcept"><option value="">Concept: все</option>${CONCEPTS.map((c) => `<option value="${c[0]}">${c[0]} ${c[1]}</option>`).join("")}</select>
      <select id="fContext"><option value="">Context: все</option>${CONTEXTS.map((c) => `<option value="${c[0]}">${c[0]} ${c[1]}</option>`).join("")}</select>
      <select id="fLevel"><option value="">SL + HL</option><option>SL</option><option>HL</option></select>
      ${isT() ? "" : `<label class="chk"><input type="checkbox" id="fMine"> мои</label>`}
    </div>
    <div class="news-grid" id="feed"><div class="loading">Загрузка…</div></div>`;
  if (!isT()) $("#newPost").onclick = () => editPost();

  const bind = (id, key, ev = "change") => ($(id).addEventListener(ev, (e) => { f[key] = e.target.type === "checkbox" ? e.target.checked : e.target.value.trim().toLowerCase(); draw(); }));
  bind("#nq", "q", "input");
  if (!isT()) bind("#fMine", "mine");
  ["#fContent", "#fConcept", "#fContext"].forEach((s) => $(s).addEventListener("change", (e) => { f[s === "#fContent" ? "content" : s === "#fConcept" ? "concept" : "context"] = e.target.value; draw(); }));
  $("#fLevel").addEventListener("change", (e) => { f.level = e.target.value; draw(); });

  const match = (p) =>
    (f.theme === "all" || p.category === f.theme || (f.theme === "pending" && !p.category)) &&
    (!f.content || p.c3?.content?.includes(f.content)) &&
    (!f.concept || p.c3?.concept?.includes(f.concept)) &&
    (!f.context || p.c3?.context?.includes(f.context)) &&
    (!f.level || p.level === f.level) &&
    (!f.mine || p.authorId === state.student?.id) &&
    (!f.q || `${p.title} ${p.summary} ${(p.tags || []).join(" ")} ${p.authorName}`.toLowerCase().includes(f.q));

  const draw = () => {
    const counts = {};
    posts.forEach((p) => (counts[p.category || "pending"] = (counts[p.category || "pending"] || 0) + 1));
    $("#themes").innerHTML = `<button class="chip ${f.theme === "all" ? "on" : ""}" data-t="all">Все <b>${posts.length}</b></button>` +
      NEWS_THEMES.filter((t) => counts[t.id]).map((t) => `<button class="chip th-${t.id} ${f.theme === t.id ? "on" : ""}" data-t="${t.id}">${esc(t.label)} <b>${counts[t.id]}</b></button>`).join("") +
      (counts.pending ? `<button class="chip ${f.theme === "pending" ? "on" : ""}" data-t="pending">⏳ без темы <b>${counts.pending}</b></button>` : "");
    $$("#themes .chip").forEach((c) => (c.onclick = () => { f.theme = c.dataset.t; draw(); }));
    const list = posts.filter(match);
    $("#feed").innerHTML = list.map(card).join("") || `<div class="card muted">Новостей не найдено.</div>`;
    $$("#feed .news").forEach((el) => {
      const p = posts.find((x) => x.id === el.dataset.id);
      el.onclick = async (e) => {
        const a = e.target.closest("[data-a]")?.dataset.a;
        if (!a) return;
        e.preventDefault();
        if (a === "copy") { try { await navigator.clipboard.writeText(p.apa); toast("APA скопирована"); } catch { toast("Скопируйте текст вручную", "err"); } }
        if (a === "del" && (await askConfirm("Удалить новость?", "Удалить"))) { if (p.imagePath) await removeFile(p.imagePath); await deleteDoc(ref("news", p.id)); toast("Удалено"); }
        if (a === "edit") editPost(p);
        if (a === "ai") { toast("🤖 Категоризация…"); await updateDoc(ref("news", p.id), await classify(p)); toast("Тема обновлена"); }
      };
      const sel = $(".set-theme", el);
      if (sel) sel.onchange = async (e) => { await updateDoc(ref("news", p.id), { category: e.target.value, categorySource: "teacher" }); toast("Тема изменена"); };
    });
  };

  addUnsub(onSnapshot(query(col("news"), orderBy("createdAt", "desc")), (snap) => {
    posts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    draw();
  }, (e) => { console.error(e); $("#feed").innerHTML = `<div class="card err-card">Нет доступа к новостям</div>`; }));
}

function card(p) {
  const th = themeOf(p.category);
  const img = safeUrl(p.imageUrl), link = safeUrl(p.link);
  const mine = p.authorId === state.student?.id;
  const chips = (arr, list, cls) => (arr || []).map((c) => `<span class="c3 ${cls}" title="${esc(lbl(list, c))}">${esc(c)} ${esc(lbl(list, c))}</span>`).join("");
  return `<article class="card news" data-id="${p.id}">
    ${img ? `<a href="${link || img}" target="_blank" rel="noopener" class="news-img"><img src="${img}" alt="" loading="lazy" onerror="this.parentElement.remove()"></a>` : ""}
    <div class="news-body">
      <div class="news-top">
        ${p.category ? `<span class="theme th-${th.id}">${p.categorySource === "ai" ? "🤖 " : ""}${esc(th.label)}</span>` : `<span class="theme">⏳ определяется…</span>`}
        ${p.hlChallenge ? `<span class="pill hl" title="${esc(lbl(HL_CHALLENGES, p.hlChallenge))}">HL ${esc(p.hlChallenge)}</span>` : ""}
      </div>
      <h3>${link ? `<a href="${link}" target="_blank" rel="noopener">${esc(p.title)}</a>` : esc(p.title)}</h3>
      <p>${linkify(p.summary)}</p>
      <details class="c3box"><summary>3C: как связано</summary>
        <div class="c3row"><b>Content</b> ${chips(p.c3?.content, CONTENT, "ct")}<p>${esc(p.c3?.explain?.content || "")}</p></div>
        <div class="c3row"><b>Concept</b> ${chips(p.c3?.concept, CONCEPTS, "cp")}<p>${esc(p.c3?.explain?.concept || "")}</p></div>
        <div class="c3row"><b>Context</b> ${chips(p.c3?.context, CONTEXTS, "cx")}<p>${esc(p.c3?.explain?.context || "")}</p></div>
      </details>
      <div class="c3-mini">${chips(p.c3?.content, CONTENT, "ct")}${chips(p.c3?.concept, CONCEPTS, "cp")}${chips(p.c3?.context, CONTEXTS, "cx")}</div>
      ${(p.tags || []).length ? `<div class="tags">${p.tags.map((t) => `#${esc(t)}`).join(" ")}</div>` : ""}
      <div class="apa"><small>APA 7</small><p>${esc(p.apa)}</p><button class="btn ghost xs" data-a="copy">📋</button></div>
      <div class="news-foot">
        <span class="muted small">${esc(p.authorName)} · ${esc(p.level)} · ${fmtDate(p.createdAt)}</span>
        <span class="row">
          ${isT() ? `<select class="set-theme xs">${NEWS_THEMES.map((t) => `<option value="${t.id}" ${p.category === t.id ? "selected" : ""}>${esc(t.label)}</option>`).join("")}</select>` : ""}
          ${isT() || mine ? `<button class="btn ghost xs" data-a="ai" title="Перекатегоризировать ИИ">🤖</button>` : ""}
          ${mine ? `<button class="btn ghost xs" data-a="edit">✏️</button>` : ""}
          ${isT() || mine ? `<button class="btn ghost xs" data-a="del">🗑</button>` : ""}
        </span>
      </div>
    </div>
  </article>`;
}

// ---------- Форма-шаблон ----------
function multiChips(name, list, sel = []) {
  return `<div class="chips-pick" data-name="${name}">${list.map(([c, l]) => `<label class="pick"><input type="checkbox" value="${c}" ${sel.includes(c) ? "checked" : ""}><span>${c} ${esc(l)}</span></label>`).join("")}</div>`;
}

function buildApa(a) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let date = "n.d.";
  if (a.date) { const d = new Date(a.date); if (!isNaN(d)) date = `${d.getFullYear()}, ${months[d.getMonth()]} ${d.getDate()}`; }
  const author = a.author || a.site || "";
  const site = a.site && a.site !== author ? ` ${a.site}.` : "";
  return `${author ? author + (author.endsWith(".") ? "" : ".") + " " : ""}(${date}). ${a.title ? `${a.title}.` : ""}${site} ${a.url || ""}`.replace(/\s+/g, " ").trim();
}

function editPost(existing) {
  const p = existing || { title: "", summary: "", link: "", imageUrl: "", apa: "", apaParts: {}, c3: { content: [], concept: [], context: [], explain: {} } };
  const ap = p.apaParts || {};
  const m = modal(`
    <h3>${existing ? "Редактировать новость" : "Новая новость"}</h3>
    <div class="form-steps">
      <section><h4>1. Новость</h4>
        <label class="lbl">Заголовок *<input id="nTitle" maxlength="140" value="${esc(p.title)}" placeholder="напр. Kazakhstan launches AI assistant in eGov"></label>
        <label class="lbl">Ссылка на новость *<input id="nLink" value="${esc(p.link)}" placeholder="https://…"></label>
        <label class="lbl">Картинка — ссылка на изображение${USE_STORAGE ? " или загрузите файл" : ""}
          <div class="row"><input id="nImg" value="${esc(p.imageUrl)}" placeholder="https://…/image.jpg">${USE_STORAGE ? `<label class="btn sm">⬆ Файл<input type="file" id="nImgFile" accept="image/*" hidden></label>` : ""}</div></label>
        <div id="imgPrev" class="img-prev">${safeUrl(p.imageUrl) ? `<img src="${esc(p.imageUrl)}">` : ""}</div>
      </section>
      <section><h4>2. APA 7 reference</h4>
        <div class="grid2">
          <label class="lbl">Автор / организация<input class="ap" data-k="author" value="${esc(ap.author || "")}" placeholder="Smith, J. или Reuters"></label>
          <label class="lbl">Дата публикации<input class="ap" data-k="date" type="date" value="${esc(ap.date || "")}"></label>
          <label class="lbl">Название статьи<input class="ap" data-k="title" value="${esc(ap.title || "")}" placeholder="будет взято из заголовка"></label>
          <label class="lbl">Сайт / издание<input class="ap" data-k="site" value="${esc(ap.site || "")}" placeholder="BBC News"></label>
        </div>
        <label class="lbl">Готовая ссылка APA (можно поправить)<textarea id="nApa" rows="2">${esc(p.apa)}</textarea></label>
        <p class="muted small">Формат: Author. (Year, Month Day). <i>Title</i>. Site. URL</p>
      </section>
      <section><h4>3. Связь с 3C</h4>
        <label class="lbl">Content (3.1–3.7)</label>${multiChips("content", CONTENT, p.c3.content)}
        <textarea id="eContent" rows="2" placeholder="Какая технология и как она работает?">${esc(p.c3.explain?.content || "")}</textarea>
        <label class="lbl">Concept (2.1–2.7)</label>${multiChips("concept", CONCEPTS, p.c3.concept)}
        <textarea id="eConcept" rows="2" placeholder="Через какой концепт это объясняется? (напр. Power: кто контролирует данные)">${esc(p.c3.explain?.concept || "")}</textarea>
        <label class="lbl">Context (4.1–4.7)</label>${multiChips("context", CONTEXTS, p.c3.context)}
        <textarea id="eContext" rows="2" placeholder="В какой сфере жизни и на кого влияет?">${esc(p.c3.explain?.context || "")}</textarea>
      </section>
      <section><h4>4. Кратко о чём новость</h4>
        <textarea id="nSum" rows="4" maxlength="700" placeholder="2–4 предложения своими словами: что произошло, кто стейкхолдеры, какие impacts/implications">${esc(p.summary)}</textarea>
        <small class="muted" id="sumCnt"></small>
      </section>
    </div>
    <div class="row end"><button class="btn primary" id="nPub">${existing ? "Сохранить" : "🚀 Опубликовать"}</button></div>`, { wide: true });

  let imgFile = null;
  const apa = () => { $("#nApa", m.el).value = buildApa({ ...Object.fromEntries($$(".ap", m.el).map((i) => [i.dataset.k, i.value.trim()])), title: $('.ap[data-k="title"]', m.el).value.trim() || $("#nTitle", m.el).value.trim(), url: $("#nLink", m.el).value.trim() }); };
  $$(".ap", m.el).forEach((i) => i.addEventListener("input", apa));
  $("#nTitle", m.el).addEventListener("input", () => { if (!existing) apa(); });
  $("#nLink", m.el).addEventListener("input", () => {
    apa();
    try { const h = new URL($("#nLink", m.el).value).hostname.replace(/^www\./, ""); const s = $('.ap[data-k="site"]', m.el); if (!s.value) s.placeholder = h; } catch {}
  });
  $("#nImg", m.el).addEventListener("input", (e) => { imgFile = null; const u = safeUrl(e.target.value); $("#imgPrev", m.el).innerHTML = u ? `<img src="${esc(u)}">` : ""; });
  if (USE_STORAGE) $("#nImgFile", m.el).onchange = (e) => {
    const f = e.target.files[0]; if (!f) return;
    if (f.size > 5 * 1024 * 1024) return toast("Картинка больше 5 МБ", "err");
    imgFile = f; $("#nImg", m.el).value = f.name; $("#imgPrev", m.el).innerHTML = `<img src="${URL.createObjectURL(f)}">`;
  };
  const sc = () => ($("#sumCnt", m.el).textContent = `${$("#nSum", m.el).value.trim().split(/\s+/).filter(Boolean).length} слов`);
  $("#nSum", m.el).addEventListener("input", sc); sc();

  $("#nPub", m.el).onclick = async () => {
    const pick = (n) => $$(`.chips-pick[data-name="${n}"] input:checked`, m.el).map((i) => i.value);
    const data = {
      title: $("#nTitle", m.el).value.trim(),
      link: safeUrl($("#nLink", m.el).value),
      summary: $("#nSum", m.el).value.trim(),
      apa: $("#nApa", m.el).value.trim(),
      apaParts: Object.fromEntries($$(".ap", m.el).map((i) => [i.dataset.k, i.value.trim()])),
      c3: { content: pick("content"), concept: pick("concept"), context: pick("context"),
        explain: { content: $("#eContent", m.el).value.trim(), concept: $("#eConcept", m.el).value.trim(), context: $("#eContext", m.el).value.trim() } },
    };
    const miss = [];
    if (!data.title) miss.push("заголовок");
    if (!data.link) miss.push("ссылка (https://…)");
    if (!data.apa) miss.push("APA");
    if (!data.c3.content.length || !data.c3.concept.length || !data.c3.context.length) miss.push("по одному Content, Concept и Context");
    if (data.summary.length < 40) miss.push("краткое описание (минимум пару предложений)");
    if (miss.length) return toast("Заполните: " + miss.join(", "), "err");
    const btn = $("#nPub", m.el); btn.disabled = true; btn.textContent = "Публикация…";
    try {
      const s = state.student;
      if (imgFile) {
        const path = `news/${s.id}/${Date.now()}_${imgFile.name.replace(/[^\w.\-]+/g, "_")}`;
        const up = await uploadFile(path, imgFile);
        data.imageUrl = up.url; data.imagePath = path;
      } else data.imageUrl = safeUrl($("#nImg", m.el).value);
      let id;
      if (existing) { await updateDoc(ref("news", existing.id), data); id = existing.id; }
      else {
        const r = await addDoc(col("news"), { ...data, authorId: s.id, authorName: s.name, level: s.level, category: "", createdAt: serverTimestamp() });
        id = r.id;
      }
      m.close();
      toast("Опубликовано! 🤖 ИИ определяет тему…");
      const cat = await classify(data);
      await updateDoc(ref("news", id), cat);
    } catch (e) { console.error(e); toast("Ошибка публикации", "err"); btn.disabled = false; btn.textContent = "🚀 Опубликовать"; }
  };
}
