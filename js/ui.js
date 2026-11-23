// Мелкие помощники интерфейса
export const $ = (s, el = document) => el.querySelector(s);
export const $$ = (s, el = document) => [...el.querySelectorAll(s)];

export function esc(v) {
  return String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

// Безопасная ссылка: только http(s)
export function safeUrl(u) {
  try {
    const x = new URL(String(u).trim());
    return x.protocol === "http:" || x.protocol === "https:" ? x.href : "";
  } catch { return ""; }
}

// Текст → HTML с кликабельными ссылками и переносами строк
export function linkify(text) {
  return esc(text)
    .replace(/(https?:\/\/[^\s<]+)/g, (m) => `<a href="${m}" target="_blank" rel="noopener">${m}</a>`)
    .replace(/\n/g, "<br>");
}

export function toast(msg, type = "ok") {
  const t = document.createElement("div");
  t.className = `toast ${type}`;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.classList.add("show"), 10);
  setTimeout(() => { t.classList.remove("show"); setTimeout(() => t.remove(), 300); }, 3200);
}

export function modal(html, { wide = false } = {}) {
  const wrap = document.createElement("div");
  wrap.className = "modal-bg";
  wrap.innerHTML = `<div class="modal ${wide ? "wide" : ""}"><button class="modal-x" aria-label="Закрыть">×</button>${html}</div>`;
  document.body.appendChild(wrap);
  const close = () => wrap.remove();
  wrap.addEventListener("click", (e) => { if (e.target === wrap) close(); });
  $(".modal-x", wrap).onclick = close;
  return { el: $(".modal", wrap), close };
}

export function fmtDate(ts) {
  if (!ts) return "";
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
}

export function fileIcon(type = "", name = "") {
  const n = name.toLowerCase();
  if (type.startsWith("image/")) return "🖼️";
  if (type.includes("pdf") || n.endsWith(".pdf")) return "📕";
  if (/\.(docx?|odt|rtf)$/.test(n)) return "📘";
  if (/\.(xlsx?|csv|ods)$/.test(n)) return "📗";
  if (/\.(pptx?|key|odp)$/.test(n)) return "📙";
  if (type.startsWith("video/")) return "🎬";
  if (type.startsWith("audio/")) return "🎧";
  if (/\.(zip|rar|7z)$/.test(n)) return "🗜️";
  return "📄";
}

export function fmtSize(b) {
  if (!b) return "";
  if (b < 1024) return b + " B";
  if (b < 1048576) return (b / 1024).toFixed(0) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

export function initials(name = "") {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((s) => s[0].toUpperCase()).join("");
}

// Встроенные диалоги вместо window.confirm / window.prompt
export function askConfirm(msg, okText = "Да") {
  return new Promise((res) => {
    const m = modal(`<p class="dlg-msg">${esc(msg)}</p><div class="row end"><button class="btn" data-r="0">Отмена</button><button class="btn primary" data-r="1">${esc(okText)}</button></div>`);
    m.el.parentElement.addEventListener("click", (e) => { if (e.target === m.el.parentElement || e.target.classList.contains("modal-x")) res(false); });
    m.el.querySelectorAll("[data-r]").forEach((b) => (b.onclick = () => { m.close(); res(b.dataset.r === "1"); }));
  });
}
export function askText(msg, def = "", placeholder = "") {
  return new Promise((res) => {
    const m = modal(`<form><label class="lbl">${esc(msg)}<input value="${esc(def)}" placeholder="${esc(placeholder)}" autofocus></label><div class="row end"><button type="button" class="btn" data-c>Отмена</button><button class="btn primary">OK</button></div></form>`);
    const inp = m.el.querySelector("input"); setTimeout(() => inp.focus(), 30);
    m.el.parentElement.addEventListener("click", (e) => { if (e.target === m.el.parentElement || e.target.classList.contains("modal-x")) res(null); });
    m.el.querySelector("[data-c]").onclick = () => { m.close(); res(null); };
    m.el.querySelector("form").onsubmit = (e) => { e.preventDefault(); m.close(); res(inp.value); };
  });
}
