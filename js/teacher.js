// Учитель: ученики и PIN, прогресс и обратная связь, настройки уроков
import { state, lessonTasks, addUnsub, loadLessonMeta } from "./app.js";
import { col, ref, getDoc, setDoc, updateDoc, onSnapshot, writeBatch, serverTimestamp, db, query, orderBy } from "./fb.js";
import { UNITS, STATUSES, LEVELS_OF_ACHIEVEMENT } from "./data.js";
import { askConfirm, askText } from "./ui.js";
import { $, $$, esc, toast, modal, fmtDate, linkify } from "./ui.js";

// ============ Ученики и PIN ============
async function freePin(len = 6) {
  for (let i = 0; i < 30; i++) {
    const p = String(Math.floor(Math.random() * 10 ** len)).padStart(len, "0");
    if (!(await getDoc(ref("pins", p))).exists()) return p;
  }
  throw new Error("Не удалось подобрать свободный PIN");
}

async function addStudent(name, level) {
  const pin = await freePin();
  const sref = ref("students", crypto.randomUUID().replace(/-/g, "").slice(0, 20));
  const b = writeBatch(db);
  b.set(sref, { name, level, pin, createdAt: serverTimestamp() });
  b.set(ref("pins", pin), { studentId: sref.id });
  await b.commit();
}

async function changePin(st, newPin) {
  if (!/^[0-9]{4,8}$/.test(newPin)) throw new Error("PIN — от 4 до 8 цифр");
  if (newPin !== st.pin && (await getDoc(ref("pins", newPin))).exists()) throw new Error("Такой PIN уже занят");
  const b = writeBatch(db);
  if (st.pin) b.delete(ref("pins", st.pin));
  b.set(ref("pins", newPin), { studentId: st.id });
  b.update(ref("students", st.id), { pin: newPin });
  await b.commit();
}

export function watchStudents(cb) {
  const u = onSnapshot(query(col("students"), orderBy("name")), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  }, (e) => { console.error(e); toast("Нет доступа к списку учеников", "err"); });
  addUnsub(u);
}

export function renderStudents(view) {
  let students = [];
  let showPins = false;
  let filter = "all";
  view.innerHTML = `
    <div class="page-head">
      <div><h2>Ученики и PIN-коды</h2><p class="muted">Ученик входит только по PIN. После смены PIN старый перестаёт работать на всех устройствах.</p></div>
      <div class="actions">
        <button class="btn" id="togglePins">👁 Показать PIN</button>
        <button class="btn" id="printPins">🖨 Карточки PIN</button>
      </div>
    </div>
    <div class="card">
      <h3>Добавить учеников</h3>
      <div class="row wrap">
        <textarea id="newNames" rows="3" placeholder="Имя Фамилия — по одному на строку"></textarea>
        <div class="col">
          <select id="newLevel"><option value="SL">SL — Standard Level</option><option value="HL">HL — Higher Level</option></select>
          <button class="btn primary" id="addBtn">＋ Добавить</button>
        </div>
      </div>
      <p class="muted small">PIN (6 цифр) создаётся автоматически; его можно сразу заменить своим.</p>
    </div>
    <div class="filters">
      <button class="chip on" data-f="all">Все</button><button class="chip" data-f="SL">SL</button><button class="chip" data-f="HL">HL</button>
      <span class="muted" id="cnt"></span>
    </div>
    <div class="card p0"><table class="tbl" id="stTbl"></table></div>`;

  const draw = () => {
    const list = students.filter((s) => filter === "all" || s.level === filter);
    $("#cnt").textContent = `${list.length} учеников (SL: ${students.filter((s) => s.level === "SL").length}, HL: ${students.filter((s) => s.level === "HL").length})`;
    $("#stTbl").innerHTML = `
      <thead><tr><th>Имя</th><th>Группа</th><th>PIN</th><th></th></tr></thead>
      <tbody>${list.map((s) => `
        <tr data-id="${s.id}">
          <td><input class="inl name" value="${esc(s.name)}"></td>
          <td><select class="inl lvl"><option ${s.level === "SL" ? "selected" : ""}>SL</option><option ${s.level === "HL" ? "selected" : ""}>HL</option></select></td>
          <td><code class="pin">${showPins ? esc(s.pin) : "••••••"}</code></td>
          <td class="nowrap">
            <button class="btn sm" data-a="pin">✏️ PIN</button>
            <button class="btn sm" data-a="regen">🎲 Новый</button>
            <button class="btn sm danger" data-a="del">🗑</button>
          </td>
        </tr>`).join("") || `<tr><td colspan="4" class="muted center">Пока нет учеников</td></tr>`}
      </tbody>`;
    $$("#stTbl tr[data-id]").forEach((tr) => {
      const st = students.find((x) => x.id === tr.dataset.id);
      $(".name", tr).onchange = (e) => updateDoc(ref("students", st.id), { name: e.target.value.trim() }).then(() => toast("Имя сохранено"));
      $(".lvl", tr).onchange = (e) => updateDoc(ref("students", st.id), { level: e.target.value }).then(() => toast("Группа изменена"));
      tr.onclick = async (e) => {
        const a = e.target.dataset.a;
        if (!a) return;
        try {
          if (a === "pin") {
            const p = await askText(`Новый PIN для ${st.name} (4–8 цифр):`, st.pin);
            if (p == null) return;
            await changePin(st, p.trim()); toast("PIN изменён");
          } else if (a === "regen") {
            if (!(await askConfirm(`Создать новый PIN для ${st.name}?`))) return;
            await changePin(st, await freePin()); toast("Новый PIN создан");
          } else if (a === "del") {
            if (!(await askConfirm(`Удалить ${st.name}? Прогресс останется в базе, но вход будет закрыт.`, "Удалить"))) return;
            const b = writeBatch(db);
            b.delete(ref("students", st.id));
            if (st.pin) b.delete(ref("pins", st.pin));
            await b.commit(); toast("Удалено");
          }
        } catch (err) { toast(err.message, "err"); }
      };
    });
  };

  $("#addBtn").onclick = async () => {
    const names = $("#newNames").value.split("\n").map((s) => s.trim()).filter(Boolean);
    if (!names.length) return toast("Введите имена", "err");
    const level = $("#newLevel").value;
    try {
      for (const n of names) await addStudent(n, level);
      $("#newNames").value = "";
      toast(`Добавлено: ${names.length}`);
    } catch (e) { toast(e.message, "err"); }
  };
  $("#togglePins").onclick = (e) => { showPins = !showPins; e.target.textContent = showPins ? "🙈 Скрыть PIN" : "👁 Показать PIN"; draw(); };
  $("#printPins").onclick = () => {
    const list = students.filter((s) => filter === "all" || s.level === filter);
    const w = window.open("", "_blank");
    if (!w) return toast("Браузер заблокировал окно печати — разрешите всплывающие окна", "err");
    w.document.write(`<html><head><title>PIN cards</title><style>
      body{font-family:system-ui;display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:16px}
      .c{border:1.5px dashed #888;border-radius:10px;padding:14px;text-align:center}
      .p{font:700 26px monospace;letter-spacing:4px;margin:8px 0}.s{color:#666;font-size:12px}</style></head><body>
      ${list.map((s) => `<div class="c"><b>${esc(s.name)}</b><div class="p">${esc(s.pin)}</div><div class="s">Digital Society · ${esc(s.level)} · ${esc(location.origin + location.pathname)}</div></div>`).join("")}
      <script>print()<\/script></body></html>`);
    w.document.close();
  };
  $$(".filters .chip").forEach((c) => (c.onclick = () => { $$(".filters .chip").forEach((x) => x.classList.remove("on")); c.classList.add("on"); filter = c.dataset.f; draw(); }));
  watchStudents((l) => { students = l; draw(); });
}

// ============ Прогресс и обратная связь ============
export function renderProgress(view) {
  let students = [], progress = {}, answers = {};
  const saved = JSON.parse(sessionStorage.getItem("tprog") || "{}");
  let unitId = saved.unitId || "rev", group = saved.group || "all", lessonKey = saved.lessonKey || "", mode = saved.mode || "lesson";

  view.innerHTML = `
    <div class="page-head">
      <div><h2>Прогресс и обратная связь</h2><p class="muted">Отмечайте выполнение заданий handout, ставьте статус, оценку и пишите feedback. Сохраняется автоматически.</p></div>
    </div>
    <div class="card controls">
      <label>Юнит <select id="pUnit">${UNITS.map((u) => `<option value="${u.id}">${esc(u.title)}</option>`).join("")}</select></label>
      <label>Группа <select id="pGroup"><option value="all">SL + HL</option><option value="SL">SL</option><option value="HL">HL</option></select></label>
      <label id="lsWrap">Урок <select id="pLesson"></select></label>
      <div class="seg"><button data-m="lesson">По уроку</button><button data-m="grid">Сводка</button></div>
    </div>
    <div id="pBody"></div>`;

  const persist = () => sessionStorage.setItem("tprog", JSON.stringify({ unitId, group, lessonKey, mode }));
  const unit = () => UNITS.find((u) => u.id === unitId);
  const visibleStudents = () => students.filter((s) => unit().levels.includes(s.level) && (group === "all" || s.level === group));

  const fillLessons = () => {
    const u = unit();
    if (!u.lessons.find((l) => l.key === lessonKey)) lessonKey = u.lessons[0].key;
    $("#pLesson").innerHTML = u.lessons.map((l) => `<option value="${l.key}" ${l.key === lessonKey ? "selected" : ""}>${esc(l.code)} — ${esc(l.topic.slice(0, 70))}</option>`).join("");
    $("#pGroup").disabled = u.id === "hl";
    if (u.id === "hl") group = "HL";
    $("#pGroup").value = group;
  };

  const draw = () => {
    persist();
    $$(".seg button").forEach((b) => b.classList.toggle("on", b.dataset.m === mode));
    $("#lsWrap").style.display = mode === "lesson" ? "" : "none";
    mode === "lesson" ? drawLesson() : drawGrid();
  };

  const drawGrid = () => {
    const u = unit(), list = visibleStudents();
    const pct = (s, l) => {
      const t = lessonTasks(l), p = progress[`${s.id}_${l.key}`];
      if (!p) return null;
      if (p.status === "absent") return "abs";
      return t.length ? Math.round((t.filter((x) => p.tasks?.[x.id]).length / t.length) * 100) : 0;
    };
    $("#pBody").innerHTML = `
      <div class="card p0 scroll-x"><table class="tbl grid">
        <thead><tr><th class="sticky">Ученик</th>${u.lessons.map((l) => `<th title="${esc(l.topic)}"><a href="#" data-l="${l.key}">${esc(l.code)}</a></th>`).join("")}<th>Итого</th></tr></thead>
        <tbody>${list.map((s) => {
          let tot = 0, dn = 0;
          u.lessons.forEach((l) => { const t = lessonTasks(l); tot += t.length; const p = progress[`${s.id}_${l.key}`]; if (p?.tasks) dn += t.filter((x) => p.tasks[x.id]).length; });
          return `<tr><td class="sticky"><b>${esc(s.name)}</b> <span class="badge ${s.level === "HL" ? "hl" : "sl"}">${s.level}</span></td>
          ${u.lessons.map((l) => { const v = pct(s, l); const p = progress[`${s.id}_${l.key}`];
            const cls = v === null ? "gc0" : v === "abs" ? "gcabs" : v >= 100 ? "gc3" : v >= 50 ? "gc2" : "gc1";
            return `<td class="cell ${cls}" data-l="${l.key}" title="${esc(l.code)}${p?.feedback ? " · есть feedback" : ""}">${v === null ? "" : v === "abs" ? "Н" : v + "%"}${p?.feedback ? "•" : ""}</td>`; }).join("")}
          <td><b>${tot ? Math.round((dn / tot) * 100) : 0}%</b></td></tr>`;
        }).join("") || `<tr><td class="muted">Нет учеников в группе</td></tr>`}</tbody>
      </table></div>
      <p class="muted small">Цвет: серый — нет данных, красный — &lt;50%, жёлтый — 50–99%, зелёный — 100%, Н — отсутствовал(а), • — есть feedback. Нажмите на урок, чтобы перейти к отметкам.</p>`;
    $$("#pBody [data-l]").forEach((el) => (el.onclick = (e) => { e.preventDefault(); lessonKey = el.dataset.l; mode = "lesson"; fillLessons(); draw(); }));
  };

  const drawLesson = () => {
    const l = unit().lessons.find((x) => x.key === lessonKey);
    const tasks = lessonTasks(l), list = visibleStudents();
    const meta = state.lessonMeta[l.key] || {};
    $("#pBody").innerHTML = `
      <div class="card lesson-title">
        <div><span class="ln">${esc(l.code)}</span> <b>${esc(l.topic)}</b> <span class="muted">· Week ${l.week}${l.date ? " · " + l.date : ""}</span></div>
        <div class="row">
          ${meta.handoutUrl ? `<a class="btn sm" target="_blank" rel="noopener" href="${esc(meta.handoutUrl)}">📄 Handout</a>` : ""}
          <a class="btn sm" href="#lesson/${l.key}">👁 Урок и активити</a>
          <a class="btn sm" href="#t-lessons">✏️ Изменить задания</a>
          <button class="btn sm" id="markAll">✔ Всем выполнено</button>
        </div>
      </div>
      <div class="mark-list">${list.map((s) => {
        const p = progress[`${s.id}_${l.key}`] || {};
        return `
        <div class="card mark-row" data-s="${s.id}">
          <div class="mr-head">
            <b>${esc(s.name)}</b> <span class="badge ${s.level === "HL" ? "hl" : "sl"}">${s.level}</span>
            ${(() => { const a = answers[`${s.id}_${l.key}`]; return `<button type="button" class="btn sm ans-btn">📝 Ответы${a?.total ? ` ${a.filled}/${a.total}` : ""}</button>`; })()}
            <span class="saved muted small">${p.updatedAt ? "сохранено " + fmtDate(p.updatedAt) : ""}</span>
          </div>
          <div class="mr-grid">
            <div class="tasks">${tasks.map((t) => `<label class="chk"><input type="checkbox" data-t="${t.id}" ${p.tasks?.[t.id] ? "checked" : ""}> ${esc(t.text)}</label>`).join("")}</div>
            <div class="meta">
              <label>Статус <select data-f="status">${STATUSES.map((x) => `<option value="${x.id}" ${p.status === x.id ? "selected" : ""}>${x.label}</option>`).join("")}</select></label>
              <label>Уровень <select data-f="achievement">${LEVELS_OF_ACHIEVEMENT.map((x) => `<option value="${x.id}" ${p.achievement === x.id ? "selected" : ""}>${x.label}</option>`).join("")}</select></label>
              <label>Оценка <input data-f="mark" value="${esc(p.mark || "")}" placeholder="напр. 6/8"></label>
            </div>
            <div class="fbk">
              <textarea data-f="feedback" rows="3" placeholder="Feedback: что получилось (WWW) и что улучшить (EBI)…">${esc(p.feedback || "")}</textarea>
              ${p.reflection ? `<div class="refl"><b>Рефлексия ученика:</b> ${linkify(p.reflection)}</div>` : ""}
            </div>
          </div>
        </div>`; }).join("") || `<div class="card muted">Нет учеников в группе.</div>`}
      </div>`;

    const save = async (row) => {
      const sid = row.dataset.s;
      const data = { studentId: sid, lessonKey: l.key, unit: unitId, tasks: {}, updatedAt: serverTimestamp() };
      $$("input[data-t]", row).forEach((c) => (data.tasks[c.dataset.t] = c.checked));
      $$("[data-f]", row).forEach((f) => (data[f.dataset.f] = f.value.trim()));
      const allDone = tasks.length && tasks.every((t) => data.tasks[t.id]);
      if (allDone && (data.status === "none" || data.status === "progress")) { data.status = "done"; $('[data-f="status"]', row).value = "done"; }
      else if (!allDone && data.status === "none" && Object.values(data.tasks).some(Boolean)) { data.status = "progress"; $('[data-f="status"]', row).value = "progress"; }
      try {
        await setDoc(ref("progress", `${sid}_${l.key}`), data, { merge: true });
        $(".saved", row).textContent = "✓ сохранено";
      } catch (e) { console.error(e); toast("Ошибка сохранения", "err"); }
    };
    $$(".mark-row").forEach((row) => {
      $(".ans-btn", row).onclick = async () => {
        const st = students.find((x) => x.id === row.dataset.s);
        const m = modal(`<h3>${esc(st.name)} · ${esc(l.code)}</h3><p class="muted small">${esc(l.topic)}</p>`, { wide: true });
        (await import("./lesson.js")).showStudentAnswers(m.el, st.id, l.key);
      };
      let t;
      row.addEventListener("change", () => save(row));
      $("textarea", row).addEventListener("input", () => { clearTimeout(t); $(".saved", row).textContent = "…"; t = setTimeout(() => save(row), 1200); });
    });
    $("#markAll").onclick = async () => {
      if (!(await askConfirm("Отметить все задания выполненными у всех учеников в списке?"))) return;
      for (const row of $$(".mark-row")) { $$("input[data-t]", row).forEach((c) => (c.checked = true)); await save(row); }
      toast("Готово");
    };
  };

  $("#pUnit").value = unitId;
  fillLessons();
  $("#pUnit").onchange = (e) => { unitId = e.target.value; if (unitId === "rev" && group === "HL") group = "all"; fillLessons(); draw(); };
  $("#pGroup").onchange = (e) => { group = e.target.value; draw(); };
  $("#pLesson").onchange = (e) => { lessonKey = e.target.value; draw(); };
  $$(".seg button").forEach((b) => (b.onclick = () => { mode = b.dataset.m; draw(); }));

  let gotS = false, gotP = false;
  const maybeDraw = () => {
    if (!gotS || !gotP) return;
    if (mode === "lesson" && document.activeElement?.closest?.(".mark-row")) return; // не мешать вводу
    draw();
  };
  watchStudents((l) => { students = l; gotS = true; maybeDraw(); });
  addUnsub(onSnapshot(col("answers"), (snap) => {
    answers = {}; snap.forEach((d) => (answers[d.id] = d.data()));
    if (gotS && gotP && !document.activeElement?.closest?.(".mark-row")) draw();
  }, (e) => console.warn(e)));
  addUnsub(onSnapshot(col("progress"), (snap) => {
    progress = {}; snap.forEach((d) => (progress[d.id] = d.data()));
    gotP = true; maybeDraw();
  }, (e) => { console.error(e); toast("Нет доступа к прогрессу", "err"); }));
}

// ============ Настройки уроков (задания handout, ссылки) ============
export function renderLessonSettings(view) {
  let unitId = sessionStorage.getItem("tls") || "rev";
  const draw = () => {
    sessionStorage.setItem("tls", unitId);
    const u = UNITS.find((x) => x.id === unitId);
    view.innerHTML = `
      <div class="page-head">
        <div><h2>Уроки и handouts</h2><p class="muted">Задания из handout становятся чек-листом для отметок и видны ученикам. Добавьте ссылки на handout и слайды (Google Drive / OneDrive).</p></div>
      </div>
      <div class="unit-switch">${UNITS.map((x) => `<button class="unit-tab ${x.id === unitId ? "on" : ""}" data-u="${x.id}"><span class="ut-title">${esc(x.title)}</span><span class="ut-sub">${x.levels.join(" + ")} · ${x.lessons.length} уроков</span></button>`).join("")}</div>
      <div class="lesson-list">${u.lessons.map((l) => {
        const m = state.lessonMeta[l.key] || {};
        return `<article class="lesson" data-key="${l.key}">
          <div class="lesson-head"><span class="ln">${esc(l.code)}</span><div class="lt"><b>${esc(l.topic)}</b><small>Week ${l.week}${l.date ? " · " + l.date : ""} · ${lessonTasks(l).length} заданий ${m.handoutUrl ? "· 📄" : ""}</small></div></div>
          <div class="lesson-body">
            <label class="lbl">Задания handout</label>
            <div class="task-ed">${lessonTasks(l).map((t) => taskRow(t)).join("")}</div>
            <button class="btn sm add-t">＋ задание</button>
            <div class="grid2">
              <label class="lbl">Ссылка на handout<input class="hu" value="${esc(m.handoutUrl || "")}" placeholder="https://…"></label>
              <label class="lbl">Ссылка на слайды<input class="su" value="${esc(m.slidesUrl || "")}" placeholder="https://…"></label>
            </div>
            <label class="lbl">Заметка для учеников<textarea class="nt" rows="2" placeholder="ДЗ, дедлайн, что подготовить…">${esc(m.note || "")}</textarea></label>
            <div class="row"><button class="btn primary sm save-l">Сохранить урок</button><a class="btn sm" href="#lesson/${l.key}">👁 Открыть урок и активити</a></div>
          </div></article>`;
      }).join("")}</div>`;
    $$(".unit-tab", view).forEach((b) => (b.onclick = () => { unitId = b.dataset.u; draw(); }));
    $$(".lesson", view).forEach((card) => {
      $(".lesson-head", card).onclick = () => card.classList.toggle("open");
      $(".add-t", card).onclick = () => { $(".task-ed", card).insertAdjacentHTML("beforeend", taskRow({ id: "t" + Date.now().toString(36), text: "" })); };
      $(".task-ed", card).onclick = (e) => { if (e.target.classList.contains("rm")) e.target.closest(".trow").remove(); };
      $(".save-l", card).onclick = async () => {
        const tasks = $$(".trow", card).map((r) => ({ id: r.dataset.id, text: $("input", r).value.trim() })).filter((t) => t.text);
        const data = { tasks, handoutUrl: $(".hu", card).value.trim(), slidesUrl: $(".su", card).value.trim(), note: $(".nt", card).value.trim(), updatedAt: serverTimestamp() };
        try { await setDoc(ref("lessonMeta", card.dataset.key), data); state.lessonMeta[card.dataset.key] = data; toast("Урок сохранён"); }
        catch (e) { console.error(e); toast("Ошибка сохранения", "err"); }
      };
    });
  };
  loadLessonMeta().then(draw);
}
const taskRow = (t) => `<div class="trow" data-id="${esc(t.id)}"><input value="${esc(t.text)}" placeholder="Задание из handout"><button class="btn sm ghost rm" title="Удалить">✕</button></div>`;
