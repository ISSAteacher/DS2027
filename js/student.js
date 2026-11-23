// Ученик: мои уроки, задания, прогресс, feedback, рефлексия
import { state, lessonTasks, addUnsub } from "./app.js";
import { col, ref, query, where, onSnapshot, setDoc, serverTimestamp } from "./fb.js";
import { unitsForLevel, STATUSES, LEVELS_OF_ACHIEVEMENT } from "./data.js";
import { $, $$, esc, linkify, safeUrl, toast, fmtDate } from "./ui.js";

export function renderLessons(view) {
  const s = state.student;
  const units = unitsForLevel(s.level);
  let progress = {}, answers = {};
  let openUnit = sessionStorage.getItem("openUnit") || units[0].id;

  const draw = () => {
    const unit = units.find((u) => u.id === openUnit) || units[0];
    const stats = units.map((u) => unitStats(u, progress));
    view.innerHTML = `
      <div class="page-head">
        <div><h2>Мои уроки</h2><p class="muted">Группа: <b>${s.level === "HL" ? "Higher Level — Revising + HL extension" : "Standard Level — Revising"}</b></p></div>
      </div>
      <div class="unit-switch">
        ${units.map((u, i) => `
          <button class="unit-tab ${u.id === unit.id ? "on" : ""}" data-u="${u.id}">
            <span class="ut-title">${esc(u.title)}</span>
            <span class="bar"><i style="width:${stats[i].pct}%"></i></span>
            <span class="ut-sub">${stats[i].done}/${stats[i].total} заданий · ${stats[i].pct}%</span>
          </button>`).join("")}
      </div>
      <p class="muted unit-desc">${esc(unit.weeks)} · ${esc(unit.description)}</p>
      <div class="lesson-list">${unit.lessons.map((l) => lessonCard(l, progress[l.key], answers[l.key])).join("")}</div>`;
    $$(".unit-tab", view).forEach((b) => (b.onclick = () => { openUnit = b.dataset.u; sessionStorage.setItem("openUnit", openUnit); draw(); }));
    $$(".lesson", view).forEach((card) => {
      $(".lesson-head", card).onclick = () => card.classList.toggle("open");
      const btn = $(".save-refl", card);
      if (btn) btn.onclick = async () => {
        const key = card.dataset.key;
        const text = $("textarea", card).value.trim();
        try {
          await setDoc(ref("progress", `${s.id}_${key}`), { studentId: s.id, lessonKey: key, reflection: text, reflectionAt: serverTimestamp() }, { merge: true });
          toast("Рефлексия сохранена");
        } catch (e) { console.error(e); toast("Не удалось сохранить", "err"); }
      };
    });
  };

  const unsub = onSnapshot(query(col("progress"), where("studentId", "==", s.id)), (snap) => {
    progress = {};
    snap.forEach((d) => (progress[d.data().lessonKey] = d.data()));
    const openKeys = $$(".lesson.open", view).map((c) => c.dataset.key);
    draw();
    openKeys.forEach((k) => $(`.lesson[data-key="${k}"]`, view)?.classList.add("open"));
  }, (e) => { console.error(e); draw(); });
  addUnsub(unsub);
  addUnsub(onSnapshot(query(col("answers"), where("studentId", "==", s.id)), (snap) => {
    answers = {}; snap.forEach((d) => (answers[d.data().lessonKey] = d.data()));
    const openKeys = $$(".lesson.open", view).map((c) => c.dataset.key);
    draw(); openKeys.forEach((k) => $(`.lesson[data-key="${k}"]`, view)?.classList.add("open"));
  }, (e) => console.warn(e)));
  draw();
}

function unitStats(unit, progress) {
  let total = 0, done = 0;
  unit.lessons.forEach((l) => {
    const tasks = lessonTasks(l);
    total += tasks.length;
    const p = progress[l.key];
    if (p?.tasks) done += tasks.filter((t) => p.tasks[t.id]).length;
  });
  return { total, done, pct: total ? Math.round((done / total) * 100) : 0 };
}

function lessonCard(l, p = {}, ans) {
  const meta = state.lessonMeta[l.key] || {};
  const tasks = lessonTasks(l);
  const done = tasks.filter((t) => p.tasks?.[t.id]).length;
  const st = STATUSES.find((x) => x.id === p.status) || STATUSES[0];
  const ach = LEVELS_OF_ACHIEVEMENT.find((x) => x.id === p.achievement);
  const handout = safeUrl(meta.handoutUrl), slides = safeUrl(meta.slidesUrl);
  const hasFb = p.feedback || p.mark || p.achievement;
  return `
  <article class="lesson" data-key="${l.key}">
    <div class="lesson-head">
      <span class="ln">${esc(l.code)}</span>
      <div class="lt"><b>${esc(l.topic)}</b><small>Week ${esc(l.week)}${l.date ? " · " + esc(l.date) : ""}</small></div>
      <span class="mini-bar"><i style="width:${tasks.length ? (done / tasks.length) * 100 : 0}%"></i></span>
      <span class="status ${st.cls}">${st.label}</span>
      ${ans?.total ? `<span class="pill" title="Активити выполнено">📝 ${ans.filled}/${ans.total}</span>` : ""}
      ${hasFb ? `<span class="fb-dot" title="Есть обратная связь">💬</span>` : ""}
    </div>
    <div class="lesson-body">
      ${meta.note ? `<p class="note">${linkify(meta.note)}</p>` : ""}
      <div class="links">
        <a class="btn primary sm" href="#lesson/${l.key}">▶ Открыть урок и активити${ans?.total ? ` · ${ans.filled}/${ans.total}` : ""}</a>
        ${handout ? `<a class="btn sm" href="${handout}" target="_blank" rel="noopener">📄 Handout</a>` : ""}
        ${slides ? `<a class="btn sm" href="${slides}" target="_blank" rel="noopener">📊 Slides</a>` : ""}
      </div>
      <h4>Задания (по handout)</h4>
      <ul class="checks">${tasks.map((t) => `<li class="${p.tasks?.[t.id] ? "ok" : ""}"><span>${p.tasks?.[t.id] ? "✔" : "○"}</span>${esc(t.text)}</li>`).join("")}</ul>
      <div class="fb ${hasFb ? "" : "empty"}">
        <h4>Обратная связь учителя</h4>
        ${hasFb ? `
          <div class="fb-meta">${p.mark ? `<span class="pill">Оценка: <b>${esc(p.mark)}</b></span>` : ""}${ach && ach.id ? `<span class="pill">${esc(ach.label)}</span>` : ""}${p.updatedAt ? `<span class="muted">${fmtDate(p.updatedAt)}</span>` : ""}</div>
          ${p.feedback ? `<p>${linkify(p.feedback)}</p>` : ""}` : `<p class="muted">Пока нет обратной связи.</p>`}
      </div>
      <h4>Моя рефлексия / вопросы учителю</h4>
      <textarea rows="3" placeholder="Что я понял(а), что было сложно, какую цель ставлю на следующий урок…">${esc(p.reflection || "")}</textarea>
      <button class="btn primary sm save-refl">Сохранить</button>
    </div>
  </article>`;
}
