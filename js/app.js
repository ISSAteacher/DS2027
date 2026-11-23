import { TEACHER_EMAILS, SCHOOL_NAME } from "./config.js";
import { auth, authMod, ref, getDoc, setDoc, deleteDoc, col, getDocs, serverTimestamp } from "./fb.js";
import { $, $$, esc, toast } from "./ui.js";
import { UNITS } from "./data.js";

// ---------- Общее состояние ----------
export const state = {
  role: null,          // "teacher" | "student"
  student: null,       // { id, name, level }
  lessonMeta: {},      // lessonKey -> { tasks, handoutUrl, slidesUrl, note }
  unsub: [],           // активные подписки onSnapshot текущей страницы
};

export function addUnsub(fn) { state.unsub.push(fn); }
function clearUnsub() { state.unsub.forEach((f) => { try { f(); } catch {} }); state.unsub = []; }

export function lessonTasks(lesson) {
  const m = state.lessonMeta[lesson.key];
  if (m && Array.isArray(m.tasks) && m.tasks.length) return m.tasks;
  return lesson.tasks.map((t, i) => ({ id: "t" + (i + 1), text: t }));
}

export async function loadLessonMeta() {
  state.lessonMeta = {};
  const snap = await getDocs(col("lessonMeta"));
  snap.forEach((d) => (state.lessonMeta[d.id] = d.data()));
}

// ---------- Вход ----------
const isTeacherUser = (u) => u && !u.isAnonymous && TEACHER_EMAILS.map((e) => e.toLowerCase()).includes((u.email || "").toLowerCase());

function renderLogin(msg = "") {
  clearUnsub();
  document.body.classList.remove("logged");
  $("#app").innerHTML = `
  <section class="login">
    <div class="login-card">
      <div class="logo">DS</div>
      <h1>Digital Society</h1>
      <p class="muted">IB Diploma · ${esc(SCHOOL_NAME)}</p>
      <form id="pinForm">
        <label class="lbl">Введите ваш PIN-код</label>
                <input id="pin" inputmode="numeric" autocomplete="one-time-code" maxlength="8" pattern="[0-9]*" placeholder="••••••" class="pin-input" autofocus>
        <div class="pinpad">${[1,2,3,4,5,6,7,8,9,"⌫",0,"→"].map((k) => `<button type="button" data-k="${k}">${k}</button>`).join("")}</div>
        <p class="err">${esc(msg)}</p>
      </form>
      <details class="teacher-login">
        <summary>Вход для учителя</summary>
        <form id="tForm">
          <input id="tEmail" type="email" placeholder="E-mail" required>
          <input id="tPass" type="password" placeholder="Пароль" required>
          <button class="btn primary">Войти</button>
        </form>
      </details>
    </div>
  </section>`;
  const pin = $("#pin");
  $$(".pinpad button").forEach((b) => (b.onclick = () => {
    const k = b.dataset.k;
    if (k === "⌫") pin.value = pin.value.slice(0, -1);
    else if (k === "→") return studentLogin(pin.value);
    else if (pin.value.length < 8) pin.value += k;
    pin.focus();
  }));
  $("#pinForm").onsubmit = (e) => { e.preventDefault(); studentLogin(pin.value); };
  $("#tForm").onsubmit = async (e) => {
    e.preventDefault();
    try {
      await authMod.signInWithEmailAndPassword(auth, $("#tEmail").value.trim(), $("#tPass").value);
    } catch (err) { toast("Неверный e-mail или пароль", "err"); }
  };
}

async function studentLogin(pin) {
  pin = (pin || "").trim();
  if (!/^[0-9]{4,8}$/.test(pin)) return renderLogin("PIN — от 4 до 8 цифр");
  state.loggingIn = true;
  try {
    if (!auth.currentUser || !auth.currentUser.isAnonymous) {
      if (auth.currentUser) await authMod.signOut(auth);
      await authMod.signInAnonymously(auth);
    }
    const uid = auth.currentUser.uid;
    const p = await getDoc(ref("pins", pin));
    if (!p.exists()) return renderLogin("Неверный PIN. Обратитесь к учителю.");
    await setDoc(ref("sessions", uid), { studentId: p.data().studentId, pin, at: serverTimestamp() });
    await bootStudent(uid);
  } catch (e) {
    console.error(e);
    renderLogin("Не удалось войти. Проверьте интернет и PIN.");
  } finally { state.loggingIn = false; }
}

async function bootStudent(uid) {
  const s = await getDoc(ref("sessions", uid));
  if (!s.exists()) return renderLogin();
  try {
    const st = await getDoc(ref("students", s.data().studentId));
    if (!st.exists()) throw new Error("no student");
    state.role = "student";
    state.student = { id: st.id, ...st.data() };
    await loadLessonMeta();
    renderShell();
  } catch (e) {
    // PIN изменён учителем → сессия недействительна
    try { await deleteDoc(ref("sessions", uid)); } catch {}
    renderLogin("Ваш PIN изменился. Войдите с новым PIN.");
  }
}

export async function logout() {
  clearUnsub();
  const u = auth.currentUser;
  if (u && u.isAnonymous) { try { await deleteDoc(ref("sessions", u.uid)); } catch {} }
  state.role = null; state.student = null;
  await authMod.signOut(auth);
  location.hash = "";
}

// ---------- Оболочка и навигация ----------
const NAV_STUDENT = [
  ["lessons", "📚", "Мои уроки"],
  ["discussions", "💬", "Обсуждения"],
  ["news", "📰", "Новости"],
  ["ea", "🎓", "External assessment"],
];
const NAV_TEACHER = [
  ["t-progress", "✅", "Прогресс"],
  ["t-students", "👥", "Ученики"],
  ["t-lessons", "🗂️", "Уроки"],
  ["discussions", "💬", "Обсуждения"],
  ["news", "📰", "Новости"],
  ["ea", "🎓", "External assessment"],
];

function renderShell() {
  document.body.classList.add("logged");
  const nav = state.role === "teacher" ? NAV_TEACHER : NAV_STUDENT;
  const who = state.role === "teacher"
    ? `<span class="badge t">Учитель</span>`
    : `<span class="who">${esc(state.student.name)}</span><span class="badge ${state.student.level === "HL" ? "hl" : "sl"}">${esc(state.student.level)}</span>`;
  $("#app").innerHTML = `
  <header class="top">
    <div class="brand"><span class="logo sm">DS</span><span>Digital Society <small>IB DP</small></span></div>
    <button class="burger" aria-label="Меню">☰</button>
    <nav class="tabs">${nav.map(([id, ic, t]) => `<a href="#${id}" data-r="${id}"><span>${ic}</span>${t}</a>`).join("")}</nav>
    <div class="me">${who}<button class="btn ghost sm" id="logout">Выйти</button></div>
  </header>
  <main id="view"></main>`;
  $("#logout").onclick = logout;
  $(".burger").onclick = () => $(".tabs").classList.toggle("open");
  if (!location.hash || location.hash === "#") location.hash = nav[0][0];
  route();
}

async function route() {
  if (!state.role) return;
  clearUnsub();
  const [r, arg] = location.hash.slice(1).split("/");
  const alias = { discussion: "discussions", lesson: state.role === "teacher" ? "t-lessons" : "lessons" };
  $$(".tabs a").forEach((a) => a.classList.toggle("on", a.dataset.r === r || alias[r] === a.dataset.r));
  $(".tabs")?.classList.remove("open");
  const view = $("#view");
  view.innerHTML = `<div class="loading">Загрузка…</div>`;
  try {
    const T = state.role === "teacher";
    if (r === "lessons" && !T) (await import("./student.js")).renderLessons(view);
    else if (r === "lesson") (await import("./lesson.js")).renderLessonPage(view, arg);
    else if (r === "discussions") (await import("./discuss.js")).renderList(view);
    else if (r === "discussion") (await import("./discuss.js")).renderChat(view, arg);
    else if (r === "news") (await import("./news.js")).renderNews(view);
    else if (r === "ea") (await import("./ea.js")).renderEA(view);
    else if (r === "t-students" && T) (await import("./teacher.js")).renderStudents(view);
    else if (r === "t-progress" && T) (await import("./teacher.js")).renderProgress(view, arg);
    else if (r === "t-lessons" && T) (await import("./teacher.js")).renderLessonSettings(view);
    else location.hash = T ? "t-progress" : "lessons";
  } catch (e) {
    console.error(e);
    view.innerHTML = `<div class="card err-card">Ошибка загрузки: ${esc(e.message)}</div>`;
  }
}
window.addEventListener("hashchange", route);

// ---------- Старт ----------
authMod.onAuthStateChanged(auth, async (u) => {
  if (state.loggingIn) return;
  if (!u) return renderLogin();
  if (isTeacherUser(u)) {
    state.role = "teacher"; state.student = null;
    await loadLessonMeta();
    return renderShell();
  }
  if (!u.isAnonymous) { await authMod.signOut(auth); return renderLogin("Этот аккаунт не является аккаунтом учителя."); }
  if (state.role === "student") return; // уже загружено при входе
  await bootStudent(u.uid);
});

export { UNITS };
