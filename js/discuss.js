// Групповые обсуждения: учитель назначает, ученики чатятся и отправляют файлы
import { state, addUnsub } from "./app.js";
import { col, ref, query, where, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, getDoc, serverTimestamp, uploadFile, removeFile, limit } from "./fb.js";
import { USE_STORAGE } from "./config.js";
import { UNITS, findLesson } from "./data.js";
import { askConfirm, askText } from "./ui.js";
import { $, $$, esc, toast, modal, fmtDate, linkify, safeUrl, fileIcon, fmtSize, initials } from "./ui.js";

const MAX_FILE = 20 * 1024 * 1024;
const isT = () => state.role === "teacher";

// ---------- Список ----------
export function renderList(view) {
  view.innerHTML = `
    <div class="page-head">
      <div><h2>Групповые обсуждения</h2><p class="muted">${isT() ? "Создайте обсуждение и назначьте участников." : "Обсуждения, в которые вас добавил учитель."}</p></div>
      ${isT() ? `<button class="btn primary" id="newD">＋ Новое обсуждение</button>` : ""}
    </div>
    <div id="dList" class="d-grid"><div class="loading">Загрузка…</div></div>`;
  if (isT()) $("#newD").onclick = () => editDiscussion();
  const q = isT()
    ? query(col("discussions"), orderBy("createdAt", "desc"))
    : query(col("discussions"), where("members", "array-contains", state.student.id));
  addUnsub(onSnapshot(q, (snap) => {
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      .sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    $("#dList").innerHTML = list.map((d) => {
      const fl = d.lessonKey && findLesson(d.lessonKey);
      return `<a class="card d-card ${d.open === false ? "closed" : ""}" href="#discussion/${d.id}">
        <div class="d-top"><b>${esc(d.title)}</b>${d.open === false ? `<span class="pill">закрыто</span>` : `<span class="pill green">открыто</span>`}</div>
        ${fl ? `<small class="muted">${esc(fl.unit.short)} · ${esc(fl.lesson.code)}</small>` : ""}
        <p>${esc((d.prompt || "").slice(0, 160))}${(d.prompt || "").length > 160 ? "…" : ""}</p>
        <div class="avatars">${(d.members || []).slice(0, 8).map((m) => `<span class="av" title="${esc(d.memberNames?.[m] || "")}">${esc(initials(d.memberNames?.[m] || "?"))}</span>`).join("")}${(d.members || []).length > 8 ? `<span class="av more">+${d.members.length - 8}</span>` : ""}</div>
      </a>`;
    }).join("") || `<div class="card muted">Пока нет обсуждений.</div>`;
  }, (e) => { console.error(e); $("#dList").innerHTML = `<div class="card err-card">Нет доступа к обсуждениям</div>`; }));
}

// ---------- Создание / редактирование (учитель) ----------
async function editDiscussion(existing) {
  const { watchStudents } = await import("./teacher.js");
  const d = existing || { title: "", prompt: "", members: [], lessonKey: "", open: true };
  const m = modal(`
    <h3>${existing ? "Редактировать обсуждение" : "Новое обсуждение"}</h3>
    <label class="lbl">Тема<input id="dTitle" value="${esc(d.title)}" placeholder="напр. Is e-voting fair for everyone?"></label>
    <label class="lbl">Задание / вопрос для обсуждения<textarea id="dPrompt" rows="4" placeholder="Что нужно обсудить, что сдать (файл, ссылка), дедлайн…">${esc(d.prompt)}</textarea></label>
    <label class="lbl">Связанный урок (необязательно)
      <select id="dLesson"><option value="">—</option>${UNITS.map((u) => `<optgroup label="${esc(u.title)}">${u.lessons.map((l) => `<option value="${l.key}" ${d.lessonKey === l.key ? "selected" : ""}>${esc(l.code)} — ${esc(l.topic.slice(0, 60))}</option>`).join("")}</optgroup>`).join("")}</select></label>
    <label class="lbl">Участники</label>
    <div class="row wrap">
      <button class="btn sm" data-sel="SL">+ все SL</button><button class="btn sm" data-sel="HL">+ все HL</button>
      <button class="btn sm" data-sel="none">очистить</button>
      <button class="btn sm" id="rnd">🎲 Разбить на группы…</button>
    </div>
    <div id="mList" class="m-list"><div class="loading">…</div></div>
    <div class="row end"><button class="btn primary" id="dSave">${existing ? "Сохранить" : "Создать"}</button></div>`, { wide: true });

  let students = [];
  const chosen = new Set(d.members || []);
  const drawM = () => {
    $("#mList", m.el).innerHTML = ["SL", "HL"].map((lv) => `
      <div><h5>${lv}</h5>${students.filter((s) => s.level === lv).map((s) => `<label class="chk"><input type="checkbox" value="${s.id}" ${chosen.has(s.id) ? "checked" : ""}> ${esc(s.name)}</label>`).join("") || `<span class="muted small">нет</span>`}</div>`).join("");
    $$("#mList input", m.el).forEach((c) => (c.onchange = () => (c.checked ? chosen.add(c.value) : chosen.delete(c.value))));
  };
  watchStudents((l) => { students = l; drawM(); });
  $$("[data-sel]", m.el).forEach((b) => (b.onclick = () => {
    if (b.dataset.sel === "none") chosen.clear();
    else students.filter((s) => s.level === b.dataset.sel).forEach((s) => chosen.add(s.id));
    drawM();
  }));
  // Автоматически создать несколько групп-обсуждений из выбранных учеников
  $("#rnd", m.el).onclick = async () => {
    if (existing) return toast("Доступно только при создании", "err");
    const pool = students.filter((s) => chosen.has(s.id));
    if (pool.length < 2) return toast("Сначала отметьте учеников", "err");
    const size = parseInt(await askText("Сколько человек в группе?", "3"), 10);
    if (!size || size < 2) return;
    const title = $("#dTitle", m.el).value.trim();
    if (!title) return toast("Введите тему", "err");
    const sh = [...pool].sort(() => Math.random() - 0.5);
    const groups = [];
    for (let i = 0; i < sh.length; i += size) groups.push(sh.slice(i, i + size));
    if (groups.length > 1 && groups.at(-1).length < 2) groups.at(-2).push(...groups.pop());
    for (const [i, g] of groups.entries()) {
      await addDoc(col("discussions"), {
        title: `${title} · Группа ${i + 1}`, prompt: $("#dPrompt", m.el).value.trim(), lessonKey: $("#dLesson", m.el).value,
        members: g.map((s) => s.id), memberNames: Object.fromEntries(g.map((s) => [s.id, s.name])), open: true, createdAt: serverTimestamp(),
      });
    }
    toast(`Создано групп: ${groups.length}`); m.close();
  };
  $("#dSave", m.el).onclick = async () => {
    const title = $("#dTitle", m.el).value.trim();
    if (!title) return toast("Введите тему", "err");
    const members = [...chosen].filter((id) => students.some((s) => s.id === id));
    const data = {
      title, prompt: $("#dPrompt", m.el).value.trim(), lessonKey: $("#dLesson", m.el).value,
      members, memberNames: Object.fromEntries(members.map((id) => [id, students.find((s) => s.id === id).name])),
    };
    try {
      if (existing) await updateDoc(ref("discussions", existing.id), data);
      else await addDoc(col("discussions"), { ...data, open: true, createdAt: serverTimestamp() });
      toast("Сохранено"); m.close();
    } catch (e) { console.error(e); toast("Ошибка сохранения", "err"); }
  };
}

// ---------- Чат ----------
export async function renderChat(view, id) {
  const dsnap = await getDoc(ref("discussions", id)).catch(() => null);
  if (!dsnap || !dsnap.exists()) { view.innerHTML = `<div class="card">Обсуждение не найдено. <a href="#discussions">Назад</a></div>`; return; }
  let d = { id, ...dsnap.data() };
  const me = isT() ? { id: "teacher", name: "Учитель" } : { id: state.student.id, name: state.student.name };

  view.innerHTML = `
    <div class="chat-wrap">
      <div class="chat-head card">
        <a href="#discussions" class="btn ghost sm">← Назад</a>
        <div class="ch-info"><h3 id="cTitle"></h3><p id="cPrompt" class="muted"></p><div id="cMembers" class="avatars"></div></div>
        ${isT() ? `<div class="col"><button class="btn sm" id="cEdit">✏️ Изменить</button><button class="btn sm" id="cToggle"></button><button class="btn sm danger" id="cDel">🗑 Удалить</button></div>` : ""}
      </div>
      <div class="chat card" id="msgs"><div class="loading">…</div></div>
      <form class="composer card" id="comp">
        <div id="attachPreview" class="attach-prev"></div>
        <div class="row">
          <label class="btn ghost attach" title="${USE_STORAGE ? "Прикрепить файл (до 20 МБ)" : "Прикрепить ссылку"}">📎${USE_STORAGE ? `<input type="file" id="file" hidden>` : ""}</label>
          <textarea id="txt" rows="1" placeholder="Сообщение… (Enter — отправить, Shift+Enter — новая строка)"></textarea>
          <button class="btn primary" id="send">➤</button>
        </div>
      </form>
    </div>`;

  const head = () => {
    $("#cTitle").textContent = d.title;
    $("#cPrompt").innerHTML = linkify(d.prompt || "");
    $("#cMembers").innerHTML = (d.members || []).map((m) => `<span class="av" title="${esc(d.memberNames?.[m] || "")}">${esc(initials(d.memberNames?.[m] || "?"))}</span>`).join("") + `<span class="muted small">${(d.members || []).length} участн.</span>`;
    const closed = d.open === false;
    $("#comp").classList.toggle("disabled", closed && !isT());
    $("#txt").placeholder = closed && !isT() ? "Обсуждение закрыто учителем" : "Сообщение… (Enter — отправить, Shift+Enter — новая строка)";
    $("#txt").disabled = closed && !isT();
    if (isT()) $("#cToggle").textContent = closed ? "🔓 Открыть" : "🔒 Закрыть";
  };
  head();
  addUnsub(onSnapshot(ref("discussions", id), (s) => { if (s.exists()) { d = { id, ...s.data() }; head(); } }));

  if (isT()) {
    $("#cEdit").onclick = () => editDiscussion(d);
    $("#cToggle").onclick = () => updateDoc(ref("discussions", id), { open: d.open === false });
    $("#cDel").onclick = async () => {
      if (!(await askConfirm("Удалить обсуждение вместе с сообщениями?", "Удалить"))) return;
      await deleteDoc(ref("discussions", id)); location.hash = "discussions";
    };
  }

  // сообщения
  const box = $("#msgs");
  addUnsub(onSnapshot(query(col("discussions", id, "messages"), orderBy("createdAt"), limit(500)), (snap) => {
    const atBottom = box.scrollHeight - box.scrollTop - box.clientHeight < 80;
    box.innerHTML = snap.docs.map((m) => msgHtml(m.id, m.data(), me)).join("") || `<p class="muted center">Начните обсуждение 👋</p>`;
    if (atBottom || snap.docChanges().some((c) => c.type === "added" && c.doc.data().authorId === me.id)) box.scrollTop = box.scrollHeight;
  }, (e) => { console.error(e); box.innerHTML = `<p class="err">Нет доступа к сообщениям</p>`; }));

  box.onclick = async (e) => {
    const b = e.target.closest("[data-del]");
    if (!b || !(await askConfirm("Удалить сообщение?", "Удалить"))) return;
    const mref = ref("discussions", id, "messages", b.dataset.del);
    const ms = await getDoc(mref);
    if (ms.data()?.file?.path) await removeFile(ms.data().file.path);
    await deleteDoc(mref);
  };

  // отправка
  let pending = null; // File или {link}
  const prev = $("#attachPreview");
  const showPrev = () => {
    prev.innerHTML = pending ? `<span class="pill">${pending instanceof File ? fileIcon(pending.type, pending.name) + " " + esc(pending.name) + " · " + fmtSize(pending.size) : "🔗 " + esc(pending.link)} <button type="button" class="x">✕</button></span>` : "";
    if (pending) $(".x", prev).onclick = () => { pending = null; if ($("#file")) $("#file").value = ""; showPrev(); };
  };
  if (USE_STORAGE) $("#file").onchange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    if (f.size > MAX_FILE) { toast("Файл больше 20 МБ", "err"); e.target.value = ""; return; }
    pending = f; showPrev();
  };
  else $(".attach").onclick = async () => { const u = safeUrl((await askText("Ссылка на файл (Google Drive, OneDrive…):", "", "https://…")) || ""); if (u) { pending = { link: u }; showPrev(); } };

  const txt = $("#txt");
  txt.addEventListener("input", () => { txt.style.height = "auto"; txt.style.height = Math.min(txt.scrollHeight, 160) + "px"; });
  txt.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#comp").requestSubmit(); } });
  $("#comp").onsubmit = async (e) => {
    e.preventDefault();
    const text = txt.value.trim();
    if (!text && !pending) return;
    const btn = $("#send"); btn.disabled = true;
    try {
      const msg = { authorId: me.id, authorName: me.name, text, createdAt: serverTimestamp() };
      if (pending instanceof File) {
        const path = `discussions/${id}/${Date.now()}_${pending.name.replace(/[^\w.\-]+/g, "_")}`;
        const up = await uploadFile(path, pending, (p) => (btn.textContent = p + "%"));
        msg.file = { name: pending.name, type: pending.type || "", size: pending.size, url: up.url, path };
      } else if (pending?.link) msg.link = pending.link;
      await addDoc(col("discussions", id, "messages"), msg);
      txt.value = ""; txt.style.height = "auto"; pending = null; if ($("#file")) $("#file").value = ""; showPrev();
    } catch (err) { console.error(err); toast("Не удалось отправить", "err"); }
    btn.disabled = false; btn.textContent = "➤";
  };
}

function msgHtml(mid, m, me) {
  const mine = m.authorId === me.id, teacher = m.authorId === "teacher";
  const canDel = isT() || mine;
  let att = "";
  if (m.file) {
    const url = safeUrl(m.file.url);
    att = m.file.type?.startsWith("image/")
      ? `<a href="${url}" target="_blank" rel="noopener"><img class="msg-img" src="${url}" alt="${esc(m.file.name)}" loading="lazy"></a>`
      : `<a class="file" href="${url}" target="_blank" rel="noopener">${fileIcon(m.file.type, m.file.name)} <span>${esc(m.file.name)}</span><small>${fmtSize(m.file.size)}</small></a>`;
  } else if (m.link) {
    const url = safeUrl(m.link);
    if (url) att = `<a class="file" href="${url}" target="_blank" rel="noopener">🔗 <span>${esc(url)}</span></a>`;
  }
  return `<div class="msg ${mine ? "mine" : ""} ${teacher ? "teacher" : ""}">
    ${mine ? "" : `<span class="av">${teacher ? "👩‍🏫" : esc(initials(m.authorName))}</span>`}
    <div class="bubble">
      ${mine ? "" : `<b class="author">${esc(m.authorName)}</b>`}
      ${m.text ? `<div>${linkify(m.text)}</div>` : ""}${att}
      <small class="time">${fmtDate(m.createdAt)}${canDel ? ` · <a href="#" data-del="${mid}" onclick="event.preventDefault()">удалить</a>` : ""}</small>
    </div></div>`;
}
