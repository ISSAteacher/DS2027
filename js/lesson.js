// Страница урока: цели, активити (интерактивно), автосохранение ответов
import { state } from "./app.js";
import { ref, getDoc, setDoc, serverTimestamp } from "./fb.js";
import { findLesson, UNITS } from "./data.js";
import { CONTENT } from "./content/index.js";
import { $, $$, esc, toast } from "./ui.js";

const TYPE_LABEL = {
  read: "📖 Читаем", case: "📰 Кейс для чтения", research: "🔎 Мини-исследование", mcq: "✅ Квиз", match: "🔗 Соотнеси", sort: "🗂️ Распредели",
  table: "📋 Таблица", text: "✍️ Ответь", rate: "⚖️ Оцени", write: "⏱️ Письменный ответ", exit: "🚪 Exit ticket",
};

// детерминированное перемешивание (одинаковое при каждом открытии)
function shuffle(arr, seed) {
  let h = 0; for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  const a = arr.map((x, i) => [x, i]);
  for (let i = a.length - 1; i > 0; i--) { h = (h * 1103515245 + 12345) >>> 0; const j = h % (i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export function lessonActs(c) {
  const acts = [...(c.acts || [])];
  if (c.exit?.length) acts.push({ t: "exit", id: "exit", title: "Exit ticket", qs: c.exit });
  return acts;
}
const interactive = (a) => a.t !== "read" && a.t !== "case";

export function isFilled(a, v) {
  if (!v) return false;
  if (a.t === "mcq" || a.t === "match" || a.t === "sort") return v.ans && Object.keys(v.ans).length > 0;
  if (a.t === "write") return (v.text || "").trim().length > 20;
  if (a.t === "research") return Object.values(v.s || {}).some((r) => (r.find || "").trim() || (r.url || "").trim()) || (v.syn || "").trim().length > 0;
  if (a.t === "rate") return Object.values(v).some((x) => (typeof x === "object" ? x?.s || x?.r : x));
  return Object.values(v).some((x) => String(x || "").trim());
}

// ---------- отрисовка одного активити ----------
function actHtml(a, v = {}, ro) {
  const dis = ro ? "disabled" : "";
  let body = "";
  if (a.ins) body += `<p class="ins">${a.ins}</p>`;
  switch (a.t) {
    case "read":
      body += `<div class="reading">${a.body}</div>`; break;
    case "case":
      body += `<div class="case-tag ${a.place === "kz" ? "kz" : "gl"}">${a.place === "kz" ? "📍 Kazakhstan" : a.place === "both" ? "📍🌍 Kazakhstan & global" : "🌍 Global"}</div>
        <div class="reading">${a.body}</div>
        ${a.think?.length ? `<div class="think"><b>🤔 Think while you read</b><ol>${a.think.map((x) => `<li>${x}</li>`).join("")}</ol></div>` : ""}
        ${a.links?.length ? `<div class="readmore"><b>📚 Read more:</b> ${a.links.map(([t, u]) => `<a href="${u}" target="_blank" rel="noopener">${t} ↗</a>`).join(" · ")}</div>` : ""}`; break;
    case "research": {
      const n = a.n || 2, s = v.s || {};
      body += `<div class="rq">🎯 <b>Research question:</b> ${a.rq}</div>
        <div class="grid2 rinfo">
          <div><b>Find out:</b><ul>${a.find.map((x) => `<li>${x}</li>`).join("")}</ul></div>
          <div><b>Search terms to try:</b><div class="sterms">${a.search.map((x) => `<a class="sterm" href="https://www.google.com/search?q=${encodeURIComponent(x)}" target="_blank" rel="noopener">🔍 ${esc(x)}</a>`).join("")}</div>
            ${a.src?.length ? `<b>Good places to start:</b><div class="sterms">${a.src.map(([t, u]) => `<a class="sterm src" href="${u}" target="_blank" rel="noopener">${t} ↗</a>`).join("")}</div>` : ""}</div>
        </div>
        ${[...Array(n)].map((_, i) => { const r = s[i] || {}; return `<div class="rsrc" data-i="${i}"><b>Source ${i + 1}</b>
          <div class="rgrid">
            <input data-f="title" placeholder="Title of article / report" value="${esc(r.title || "")}" ${dis}>
            <input data-f="url" placeholder="Link https://…" value="${esc(r.url || "")}" ${dis}>
            <input data-f="org" placeholder="Author / organisation" value="${esc(r.org || "")}" ${dis}>
            <input data-f="date" placeholder="Date (year, month)" value="${esc(r.date || "")}" ${dis}>
          </div>
          <textarea data-f="find" rows="2" placeholder="Key finding / fact / figure in your own words" ${dis}>${esc(r.find || "")}</textarea>
          <div class="rrel"><span>Reliability:</span><select data-f="rel" ${dis}><option value="">—</option>${["High", "Medium", "Low"].map((x) => `<option ${r.rel === x ? "selected" : ""}>${x}</option>`).join("")}</select>
            <input data-f="why" placeholder="Why? (who wrote it, purpose, evidence, date)" value="${esc(r.why || "")}" ${dis}></div>
          ${ro && r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener" class="small">открыть источник ↗</a>` : ""}
        </div>`; }).join("")}
        <label class="tq"><span>✍️ Answer the research question (3–5 sentences, cite your sources)</span><textarea data-k="syn" rows="4" ${dis}>${esc(v.syn || "")}</textarea></label>
        <label class="chk"><input type="checkbox" data-p="1" ${v.posted ? "checked" : ""} ${dis}> I posted my best source in the <b>News</b> tab with the 3C template</label>`; break;
    }
    case "mcq":
      body += a.qs.map((q, qi) => `<div class="q" data-qi="${qi}"><p><b>${qi + 1}.</b> ${q.q}</p>
        ${q.o.map((o, oi) => `<label class="opt"><input type="radio" name="${a.id}_${qi}" value="${oi}" ${v.ans?.[qi] == oi ? "checked" : ""} ${dis}> ${o}</label>`).join("")}
        <div class="fbq"></div></div>`).join("");
      body += `<button class="btn sm check" ${dis}>Проверить</button><span class="score"></span>`; break;
    case "match": {
      const opts = shuffle(a.pairs.map((p) => p[1]), a.id);
      body += `<div class="match">${a.pairs.map((p, i) => `<div class="mrow" data-i="${i}"><b>${p[0]}</b>
        <select ${dis}><option value="">— выберите —</option>${opts.map(([d, oi]) => `<option value="${oi}" ${v.ans?.[i] == oi ? "selected" : ""}>${esc(d)}</option>`).join("")}</select><span class="mk"></span></div>`).join("")}</div>
        <button class="btn sm check" ${dis}>Проверить</button><span class="score"></span>`; break;
    }
    case "sort":
      body += `<div class="match">${shuffle(a.items, a.id).map(([[txt], i]) => `<div class="mrow" data-i="${i}"><span>${txt}</span>
        <select ${dis}><option value="">—</option>${a.cats.map((c, ci) => `<option value="${ci}" ${v.ans?.[i] == ci ? "selected" : ""}>${esc(c)}</option>`).join("")}</select><span class="mk"></span></div>`).join("")}</div>
        <button class="btn sm check" ${dis}>Проверить</button><span class="score"></span>`; break;
    case "table":
      body += `<div class="scroll-x"><table class="atbl"><thead><tr><th></th>${a.cols.map((c) => `<th>${c}</th>`).join("")}</tr></thead>
        <tbody>${a.rows.map((r, ri) => `<tr><th>${r}</th>${a.cols.map((_, ci) => `<td><textarea data-k="${ri}_${ci}" rows="2" ${dis}>${esc(v[`${ri}_${ci}`] || "")}</textarea></td>`).join("")}</tr>`).join("")}</tbody></table></div>`; break;
    case "text": case "exit":
      body += a.qs.map((q, i) => `<label class="tq"><span>${q}</span><textarea data-k="${i}" rows="${a.rows || 3}" ${dis}>${esc(v[i] || "")}</textarea></label>`).join(""); break;
    case "rate":
      body += `<div class="rate">${a.crit.map((c, i) => `<div class="rrow"><b>${c}</b>
        <div class="stars" data-i="${i}">${[1, 2, 3, 4, 5].map((n) => `<button type="button" class="${(v[i]?.s || 0) >= n ? "on" : ""}" data-n="${n}" ${dis}>${n}</button>`).join("")}</div>
        <textarea data-r="${i}" rows="2" placeholder="Почему? Доказательство / пример" ${dis}>${esc(v[i]?.r || "")}</textarea></div>`).join("")}</div>
        <label class="tq"><span><b>Overall judgement</b></span><textarea data-k="judge" rows="3" ${dis}>${esc(v.judge || "")}</textarea></label>`; break;
    case "write":
      body += `<div class="wq"><span class="pill">[${a.marks} marks]</span> ${a.q}</div>
        <div class="wbar"><button type="button" class="btn sm timer" ${dis}>⏱ Старт ${a.min}:00</button><span class="wc muted small"></span></div>
        <textarea class="wtext" rows="12" placeholder="Plan → claim → evidence → counterclaim → judgement" ${dis}>${esc(v.text || "")}</textarea>
        <div class="selfcheck"><b>Самопроверка по markband:</b>${a.check.map((c, i) => `<label class="chk"><input type="checkbox" data-c="${i}" ${v.checks?.[i] ? "checked" : ""} ${dis}> ${c}</label>`).join("")}</div>`; break;
  }
  return body;
}

function check(a, el) {
  let ok = 0, n = 0;
  if (a.t === "mcq") a.qs.forEach((q, qi) => {
    n++; const box = $(`.q[data-qi="${qi}"]`, el); const sel = $(`input:checked`, box);
    const right = sel && +sel.value === q.a; if (right) ok++;
    $(".fbq", box).innerHTML = sel ? `<span class="${right ? "good" : "bad"}">${right ? "✔ Верно." : "✘ Неверно. Правильно: " + q.o[q.a] + "."}</span> ${q.e || ""}` : `<span class="bad">Нет ответа</span>`;
  });
  else $$(".mrow", el).forEach((r) => {
    n++; const i = +r.dataset.i, val = $("select", r).value;
    const want = a.t === "match" ? i : a.items[i][1];
    const right = val !== "" && +val === want; if (right) ok++;
    $(".mk", r).textContent = val === "" ? "" : right ? "✔" : "✘";
    $(".mk", r).className = "mk " + (right ? "good" : "bad");
  });
  $(".score", el).textContent = ` ${ok}/${n}`;
  return { ok, n };
}

function readValue(a, el, prev = {}) {
  switch (a.t) {
    case "mcq": { const ans = {}; a.qs.forEach((_, qi) => { const s = $(`input[name="${a.id}_${qi}"]:checked`, el); if (s) ans[qi] = +s.value; }); return { ...prev, ans }; }
    case "match": case "sort": { const ans = {}; $$(".mrow", el).forEach((r) => { const v = $("select", r).value; if (v !== "") ans[r.dataset.i] = +v; }); return { ...prev, ans }; }
    case "rate": { const o = {}; a.crit.forEach((_, i) => { o[i] = { s: $$(`.stars[data-i="${i}"] .on`, el).length, r: $(`[data-r="${i}"]`, el).value }; }); o.judge = $('[data-k="judge"]', el).value; return o; }
    case "research": { const s = {}; $$(".rsrc", el).forEach((b) => { const o = {}; $$("[data-f]", b).forEach((f) => (o[f.dataset.f] = f.value)); s[b.dataset.i] = o; }); return { s, syn: $('[data-k="syn"]', el).value, posted: $("[data-p]", el).checked }; }
    case "write": { const checks = {}; $$("[data-c]", el).forEach((c) => (checks[c.dataset.c] = c.checked)); return { text: $(".wtext", el).value, checks }; }
    default: { const o = {}; $$("[data-k]", el).forEach((t) => (o[t.dataset.k] = t.value)); return o; }
  }
}

// ---------- общий рендер активити (для ученика и для просмотра учителем) ----------
export function renderActs(container, content, data = {}, { readOnly = false, onChange } = {}) {
  const acts = lessonActs(content);
  container.innerHTML = acts.map((a, i) => `
    <section class="act card t-${a.t}" data-id="${a.id || "r" + i}">
      <div class="act-head"><span class="act-n">${i + 1}</span><span class="act-type">${TYPE_LABEL[a.t]}</span><h3>${a.title}</h3>${a.min && a.t !== "write" ? `<span class="pill">~${a.min} мин</span>` : ""}<span class="act-st"></span></div>
      ${actHtml(a, data[a.id], readOnly)}
    </section>`).join("");

  acts.forEach((a, i) => {
    const el = $(`.act[data-id="${a.id || "r" + i}"]`, container);
    const st = $(".act-st", el);
    const mark = () => { if (interactive(a)) st.textContent = isFilled(a, data[a.id]) ? "✔" : ""; };
    mark();
    if (["mcq", "match", "sort"].includes(a.t) && data[a.id]?.checked) check(a, el);
    if (readOnly || !interactive(a)) return;
    const changed = () => { data[a.id] = readValue(a, el, data[a.id]); mark(); onChange && onChange(a.id, data[a.id]); };
    el.addEventListener("input", (e) => { if (e.target.matches("textarea") || (a.t === "research" && e.target.matches("input[type=text], input:not([type])"))) changed(); });
    el.addEventListener("change", (e) => { if (e.target.matches("input,select")) changed(); });
    const cb = $(".check", el);
    if (cb) cb.onclick = () => { const r = check(a, el); data[a.id] = { ...readValue(a, el, data[a.id]), checked: true, score: `${r.ok}/${r.n}` }; mark(); onChange && onChange(a.id, data[a.id]); };
    if (a.t === "rate") $$(".stars button", el).forEach((b) => (b.onclick = () => {
      const box = b.parentElement, n = +b.dataset.n;
      $$("button", box).forEach((x) => x.classList.toggle("on", +x.dataset.n <= n)); changed();
    }));
    if (a.t === "write") {
      const ta = $(".wtext", el), wc = $(".wc", el);
      const count = () => (wc.textContent = `${ta.value.trim().split(/\s+/).filter(Boolean).length} слов`);
      ta.addEventListener("input", count); count();
      let timer = null, left = a.min * 60;
      $(".timer", el).onclick = (e) => {
        const btn = e.currentTarget;
        if (timer) { clearInterval(timer); timer = null; btn.textContent = "⏱ Продолжить"; return; }
        timer = setInterval(() => {
          left--; const m = Math.floor(left / 60), s = String(left % 60).padStart(2, "0");
          btn.textContent = `⏸ ${m}:${s}`; btn.classList.toggle("late", left <= 60);
          if (left <= 0) { clearInterval(timer); timer = null; btn.textContent = "⏰ Время вышло"; toast("Время вышло — допишите вывод"); }
        }, 1000);
        btn.textContent = `⏸ ${a.min}:00`;
      };
    }
  });
  return acts;
}

// ---------- страница урока ----------
export async function renderLessonPage(view, key) {
  const found = findLesson(key);
  if (!found) { view.innerHTML = `<div class="card">Урок не найден. <a href="#lessons">Назад</a></div>`; return; }
  const { unit, lesson } = found;
  const T = state.role === "teacher";
  if (!T && !unit.levels.includes(state.student.level)) { location.hash = "lessons"; return; }
  const c = CONTENT[key];
  const idx = unit.lessons.findIndex((l) => l.key === key);
  const prev = unit.lessons[idx - 1], next = unit.lessons[idx + 1];
  const nav = `<div class="lnav">
      ${prev ? `<a class="btn sm" href="#lesson/${prev.key}">← ${esc(prev.code)}</a>` : "<span></span>"}
      <a class="btn sm ghost" href="${T ? "#t-progress" : "#lessons"}">${T ? "К прогрессу" : "Все уроки"}</a>
      ${next ? `<a class="btn sm" href="#lesson/${next.key}">${esc(next.code)} →</a>` : "<span></span>"}</div>`;

  view.innerHTML = `
    ${nav}
    <header class="lhero ${unit.id}">
      <small>${esc(unit.title)} · Week ${lesson.week}${lesson.date ? " · " + lesson.date : ""}</small>
      <h2><span class="ln">${esc(lesson.code)}</span> ${esc(lesson.topic)}</h2>
      ${c?.q ? `<p class="bigq">❓ ${c.q}</p>` : ""}
      ${T ? `<p class="pill">Режим просмотра учителя — ответы не сохраняются</p>` : `<div class="lprog"><span class="bar"><i></i></span><span class="lp-t"></span><span class="savest muted small"></span></div>`}
    </header>
    ${c ? `
      <div class="grid2 lmeta">
        <div class="card"><h4>🎯 Learning objectives</h4><ul>${c.obj.map((o) => `<li>${o}</li>`).join("")}</ul></div>
        <div class="card"><h4>🧩 3C focus & key terms</h4>
          ${c.c3 ? `<p class="small">${c.c3}</p>` : ""}
          ${c.terms ? `<dl class="terms-dl">${c.terms.map(([t, d]) => `<dt>${t}</dt><dd>${d}</dd>`).join("")}</dl>` : ""}</div>
      </div>
      <div id="acts"></div>
      ${c.hw ? `<div class="card hw"><h4>🏠 Homework / next step</h4><p>${c.hw}</p></div>` : ""}` : `<div class="card muted">Контент урока ещё не добавлен.</div>`}
    ${nav}`;
  if (!c) return;

  let data = {};
  const aref = T ? null : ref("answers", `${state.student.id}_${key}`);
  if (aref) { try { const s = await getDoc(aref); if (s.exists()) data = s.data().data || {}; } catch (e) { console.warn(e); } }

  const acts = lessonActs(c).filter(interactive);
  const prog = () => {
    if (T) return 0;
    const n = acts.filter((a) => isFilled(a, data[a.id])).length;
    $(".lprog i").style.width = (acts.length ? (n / acts.length) * 100 : 0) + "%";
    $(".lp-t").textContent = `Выполнено ${n}/${acts.length} активити`;
    return n;
  };
  let t = null, pending = {};
  const save = async () => {
    const filled = prog();
    const payload = { studentId: state.student.id, lessonKey: key, data: pending, filled, total: acts.length, updatedAt: serverTimestamp() };
    pending = {};
    try { await setDoc(aref, payload, { merge: true }); $(".savest").textContent = "✓ сохранено"; }
    catch (e) { console.error(e); $(".savest").textContent = "⚠ не сохранено"; toast("Ответ не сохранился — проверьте интернет", "err"); }
  };
  renderActs($("#acts"), c, data, {
    readOnly: false,
    onChange: T ? null : (id, val) => { pending[id] = val; prog(); $(".savest").textContent = "…"; clearTimeout(t); t = setTimeout(save, 1000); },
  });
  prog();
  window.scrollTo(0, 0);
}

// Учитель: просмотр ответов ученика в модальном окне
export async function showStudentAnswers(modalEl, studentId, key) {
  const c = CONTENT[key];
  if (!c) { modalEl.innerHTML += `<p class="muted">Для урока нет активити.</p>`; return; }
  let data = {};
  try { const s = await getDoc(ref("answers", `${studentId}_${key}`)); if (s.exists()) data = s.data().data || {}; } catch (e) { console.warn(e); }
  const box = document.createElement("div"); box.className = "ans-view";
  modalEl.appendChild(box);
  renderActs(box, c, data, { readOnly: true });
}

export { UNITS };
