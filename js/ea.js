// External assessment: структура экзаменов SL/HL, Paper 1–3, command terms, советы
import { state } from "./app.js";
import { $, $$, esc } from "./ui.js";

const TABS = [
  ["overview", "Обзор"], ["p1", "Paper 1"], ["p2", "Paper 2"], ["p3", "Paper 3 (HL)"],
  ["terms", "Command terms"], ["tips", "Советы экзаменаторов"], ["check", "Чек-лист"],
];

const SEC = {
  overview: () => `
    <div class="grid2">
      <div class="card">
        <h3><span class="badge sl">SL</span> Standard Level</h3>
        <table class="tbl">
          <thead><tr><th>Компонент</th><th>Время</th><th>Баллы</th><th>Вес</th></tr></thead>
          <tbody>
            <tr><td>Paper 1</td><td>1 ч 30 мин</td><td>40</td><td><b>40%</b></td></tr>
            <tr><td>Paper 2</td><td>1 ч 15 мин</td><td>24</td><td><b>30%</b></td></tr>
            <tr class="muted"><td>Inquiry project (IA)</td><td>—</td><td>—</td><td>30%</td></tr>
          </tbody>
        </table>
        <p class="muted small">External assessment = 70% итоговой оценки.</p>
      </div>
      <div class="card">
        <h3><span class="badge hl">HL</span> Higher Level</h3>
        <table class="tbl">
          <thead><tr><th>Компонент</th><th>Время</th><th>Баллы</th><th>Вес</th></tr></thead>
          <tbody>
            <tr><td>Paper 1 (Section A + B)</td><td>2 ч 15 мин</td><td>52</td><td><b>35%</b></td></tr>
            <tr><td>Paper 2</td><td>1 ч 15 мин</td><td>24</td><td><b>20%</b></td></tr>
            <tr><td>Paper 3 (pre-release)</td><td>1 ч 15 мин</td><td>30</td><td><b>25%</b></td></tr>
            <tr class="muted"><td>Inquiry project (IA)</td><td>—</td><td>—</td><td>20%</td></tr>
          </tbody>
        </table>
        <p class="muted small">External assessment = 80% итоговой оценки.</p>
      </div>
    </div>
    <div class="card">
      <h3>Что проверяет каждый экзамен</h3>
      <div class="ea-flow">
        <div><b>Paper 1</b><p>Знание 3C курса на реальных примерах: concepts 2.1–2.7, content 3.1–3.7, contexts 4.1–4.7. HL дополнительно — Section B по HL extension (5.1–5.3).</p><small>Unit 1 · Revising (+ Unit 2 для HL)</small></div>
        <div><b>Paper 2</b><p>Работа с источниками (source booklet): анализ, сравнение, origin / purpose / value / limitations, extended response с источниками и собственными знаниями.</p><small>Unit 1 · L49–58</small></div>
        <div class="hl-only"><b>Paper 3</b><p>Pre-released statement о HL challenge + незнакомые источники об интервенциях. Нужно анализировать, оценивать и рекомендовать.</p><small>Unit 2 · HL extension · L18–21</small></div>
      </div>
    </div>`,

  p1: () => `
    <div class="card">
      <h3>Paper 1 — structured questions on the common syllabus</h3>
      <ul class="facts">
        <li><b>SL:</b> 1 ч 30 мин · отвечаете на <b>2 из 4</b> структурированных вопросов · 40 баллов (по 20 за вопрос).</li>
        <li><b>HL:</b> 2 ч 15 мин · Section A — так же 2 из 4 (40 баллов) + <b>Section B — 1 из 2</b> extended-response вопросов по HL extension (12 баллов) · всего 52.</li>
        <li>Каждый вопрос начинается со стимула (короткий текст о реальной технологии) и идёт по нарастающей сложности — от «identify / define» до «evaluate / discuss».</li>
      </ul>
      <h4>Типичная структура вопроса Section A</h4>
      <div class="ladder">
        <div><span>a</span><b>Identify / Define / Outline</b><small>короткие ответы, точные термины</small></div>
        <div><span>b</span><b>Explain / Describe</b><small>как работает технология, шаг за шагом</small></div>
        <div><span>c</span><b>Explain / Analyse</b><small>impacts и implications для стейкхолдеров</small></div>
        <div><span>d</span><b>Evaluate / Discuss / To what extent</b><small>claims + counterclaims + вывод с обоснованием</small></div>
      </div>
      <p class="muted small">Точное распределение баллов по частям смотрите в specimen paper и markscheme (IB Programme Resource Centre).</p>
    </div>
    <div class="card hl-only">
      <h3><span class="badge hl">HL</span> Section B — 12-mark extended response</h3>
      <p>Вопрос по HL challenge (5.1 Global well-being, 5.2 Governance and human rights, 5.3 Sustainable development) и интервенциям. Высокие баллы получают ответы, где есть:</p>
      <ul class="facts">
        <li>ясный тезис и ответ на command term с первого абзаца;</li>
        <li>2–3 реальных примера (локальный — Kazakhstan, и глобальный) с деталями: кто, где, когда;</li>
        <li>impacts на разные группы стейкхолдеров и trade-offs;</li>
        <li>counterclaims и <b>обоснованный вывод</b>, а не пересказ.</li>
      </ul>
      <p class="muted small">Практика в юните HL: L7 (Summative 1) и L14 (Summative 2).</p>
    </div>`,

  p2: () => `
    <div class="card">
      <h3>Paper 2 — source-based analysis (SL и HL одинаково)</h3>
      <ul class="facts">
        <li>1 ч 15 мин · <b>4 обязательных вопроса</b> · 24 балла · SL 30%, HL 20%.</li>
        <li>Источники — тексты, изображения, данные, инфографика на одну тему из курса.</li>
        <li>Первые вопросы короткие: найти claim, объяснить, сравнить/сопоставить источники, оценить value и limitations по origin и purpose.</li>
        <li>Последний вопрос — <b>12-mark extended response</b>: используете и источники, и собственные знания (реальные примеры).</li>
      </ul>
      <div class="grid2">
        <div class="mini-card"><h4>OPVL</h4><p><b>Origin</b> — кто, когда, где? <b>Purpose</b> — зачем создан? <b>Value</b> — чем полезен для вопроса? <b>Limitations</b> — чего не показывает, чья точка зрения отсутствует?</p></div>
        <div class="mini-card"><h4>Сравнение источников</h4><p>Пишите о сходствах и различиях <b>вместе</b> («Both A and C…, whereas B…»), а не по очереди. Ссылайтесь на букву источника и конкретную строку/цифру.</p></div>
      </div>
      <p class="muted small">Практика: Unit 1 · L49–56, Summative 3 — L57–58.</p>
    </div>`,

  p3: () => `
    <div class="card">
      <h3><span class="badge hl">HL</span> Paper 3 — pre-released statement + source booklet</h3>
      <ul class="facts">
        <li>1 ч 15 мин · 4 вопроса · <b>30 баллов</b> · 25% итоговой оценки HL.</li>
        <li>Pre-released statement (250–400 слов) о HL challenge публикуется заранее — с сессии 2026/27 <b>1 ноября</b> для майской сессии.</li>
        <li>На экзамене — source booklet с незнакомыми источниками о конкретной организации и интервенциях.</li>
      </ul>
      <table class="tbl">
        <thead><tr><th>Вопрос</th><th>Баллы</th><th>Что требуется</th></tr></thead>
        <tbody>
          <tr><td>Q1 (a, b)</td><td>4</td><td>Точные определения терминов и причины / признаки из источника. Термины из «Additional terminology» — дословно и строго.</td></tr>
          <tr><td>Q2 (a, b)</td><td>6</td><td>Объяснение: <i>что делает → как → как это влияет</i> (три связанных шага). Привязка к стейкхолдеру и условиям вопроса.</td></tr>
          <tr><td>Q3</td><td>8</td><td>Анализ / оценка (в 2026 — оценить <b>точки зрения</b> двух людей из Sources). Баланс аргументов, ссылки на источники, вывод.</td></tr>
          <tr><td>Q4</td><td>12</td><td>Рекомендация интервенции для организации: критерии evaluation framework, trade-offs между и внутри интервенций, Sources + независимые исследования, обоснованная рекомендация.</td></tr>
        </tbody>
      </table>
    </div>
    <div class="card accent">
      <h3>Pre-release May 2027</h3>
      <p><b>Challenge:</b> 5.2B Participation and representation — political speech and activism.</p>
      <div class="grid2">
        <div class="mini-card"><h4>Intervention 1 — Making voting easier</h4><p>Голосование через приложение в течение 2 недель + киоски для голосования.</p></div>
        <div class="mini-card"><h4>Intervention 2 — Making voting compulsory</h4><p>Регистрация за месяц до выборов, голосование в избирательном центре, штрафы.</p></div>
      </div>
      <p class="muted small">Готовьте dossier: термины, стейкхолдеры, реальные примеры (eGov.kz, Estonia i-Voting, Australia — обязательное голосование и др.), данные и исследования.</p>
    </div>
    <div class="card">
      <h3>Ориентир: границы оценок Paper 3, май 2026 (из 30)</h3>
      <table class="tbl"><thead><tr><th></th><th>TZ1</th><th>TZ2</th><th>TZ3</th></tr></thead>
        <tbody><tr><td>Оценка 7</td><td>20+</td><td>22+</td><td>23+</td></tr><tr><td>Оценка 4</td><td>12–14</td><td>14–16</td><td>15–17</td></tr></tbody></table>
      <p class="muted small">Границы меняются каждую сессию.</p>
    </div>`,

  terms: () => {
    const T = [
      ["AO1", "Identify", "Назвать / выбрать ответ из нескольких вариантов, кратко."],
      ["AO1", "Define", "Дать точное значение термина."],
      ["AO1", "Outline", "Кратко изложить основное, без деталей."],
      ["AO1", "Describe", "Подробно рассказать, как выглядит / что происходит."],
      ["AO2", "Explain", "Объяснить причины и механизм: «потому что… поэтому…»."],
      ["AO2", "Distinguish", "Чётко показать различия между двумя понятиями."],
      ["AO2", "Analyse", "Разобрать на элементы и показать связи, impacts и implications."],
      ["AO2", "Compare / Contrast", "Сходства и различия, обсуждая обе стороны одновременно."],
      ["AO3", "Discuss", "Рассмотреть разные аргументы и факторы, прийти к выводу с доказательствами."],
      ["AO3", "Evaluate", "Взвесить сильные и слабые стороны, сделать суждение."],
      ["AO3", "Examine", "Рассмотреть аргумент / идею так, чтобы раскрыть допущения и связи."],
      ["AO3", "To what extent", "Оценить степень: «в значительной мере / частично / нет» + почему."],
      ["AO3", "Recommend", "Предложить действие и обосновать его, учитывая trade-offs."],
      ["AO3", "Justify", "Привести веские причины / доказательства в поддержку вывода."],
    ];
    return `<div class="card"><h3>Command terms</h3>
      <p class="muted">Чем выше уровень (AO1 → AO3), тем больше баллов и тем важнее counterclaims и вывод.</p>
      <div class="terms">${T.map(([ao, t, d]) => `<div class="term ${ao.toLowerCase()}"><small>${ao}</small><b>${t}</b><p>${d}</p></div>`).join("")}</div></div>`;
  },

  tips: () => `
    <div class="card">
      <h3>Что говорят экзаменаторы (Paper 3, май 2026)</h3>
      <div class="grid2">
        <div class="mini-card bad"><h4>❌ Типичные ошибки</h4><ul>
          <li><b>Q1:</b> неточные термины (data deleting ≠ data sanitization); причины «хочется» вместо «обязательно».</li>
          <li><b>Q2:</b> общий недостаток без привязки к стейкхолдеру из вопроса; игнорирование условий вопроса; не тот стейкхолдер.</li>
          <li><b>Q3:</b> писали про интервенции вместо точек зрения; пересказ цитат; вывод не по вопросу.</li>
          <li><b>Q4:</b> заготовленные ответы без контекста организации; использованы только 1–2 критерия; мало trade-offs; «research shows» без деталей; не хватило времени.</li>
        </ul></div>
        <div class="mini-card good"><h4>✅ Что работает</h4><ul>
          <li>Выученные термины из Additional terminology.</li>
          <li>Плюсы и минусы интервенций с реальными примерами и данными (отчёты UN, ITU, World Bank).</li>
          <li><b>Q3:</b> связывать взгляды людей с их ролью и типом организации, опираться на Source A/B.</li>
          <li><b>Q4 (top band):</b> явное применение к организации, trade-offs между и внутри интервенций, ссылки на Source + независимые исследования.</li>
        </ul></div>
      </div>
      <h4>Рекомендации</h4>
      <ul class="facts">
        <li>PEEL-абзацы; называйте <b>все</b> критерии evaluation framework явно.</li>
        <li>Ссылайтесь на букву источника («Source B shows…»); конкретизируйте исследования: кто, когда, что нашли.</li>
        <li>3C — встроенно в аргумент, а не отдельным абзацем.</li>
        <li>Разбирайте формулировку вопроса: command term, стейкхолдер, условия.</li>
        <li>Пишите от руки на время: Q1–Q2 ≈ 20 мин, Q3 ≈ 20 мин, Q4 ≈ 30 мин.</li>
        <li>ИИ — для флешкарт, мок-сценариев и обратной связи, но не для готовых ответов.</li>
      </ul>
    </div>`,

  check: () => {
    const key = "eaCheck_" + (state.student?.id || "t");
    const items = [
      "Знаю определения 7 concepts (2.1–2.7) и пример к каждому",
      "Могу объяснить 7 content areas (3.1–3.7) и их dilemmas",
      "Для каждого context (4.1–4.7) есть локальный и глобальный пример",
      "Пишу Paper 1 вопрос на время (≈ 45 мин)",
      "Умею делать OPVL и сравнивать источники (Paper 2)",
      "Написал(а) 12-mark extended response и проверил(а) по markband",
      "HL: знаю 3 HL challenges и 9 подтем 5.1A–5.3C",
      "HL: есть dossier по pre-release 2027 (термины, стейкхолдеры, примеры)",
      "HL: написал(а) полный Paper 3 на время (1 ч 15 мин)",
    ];
    let saved = {};
    try { saved = JSON.parse(localStorage.getItem(key) || "{}"); } catch {}
    setTimeout(() => $$(".ea-check input").forEach((c) => (c.onchange = () => {
      saved[c.dataset.i] = c.checked;
      try { localStorage.setItem(key, JSON.stringify(saved)); } catch {}
    })));
    return `<div class="card"><h3>Мой чек-лист подготовки</h3><p class="muted small">Сохраняется в этом браузере.</p>
      <div class="ea-check">${items.map((t, i) => `<label class="chk ${t.startsWith("HL") ? "hl-only" : ""}"><input type="checkbox" data-i="${i}" ${saved[i] ? "checked" : ""}> ${esc(t)}</label>`).join("")}</div></div>`;
  },
};

export function renderEA(view) {
  const sl = state.role === "student" && state.student.level === "SL";
  const tabs = TABS.filter(([id]) => !(sl && id === "p3"));
  let cur = sessionStorage.getItem("eaTab") || "overview";
  if (!tabs.some((t) => t[0] === cur)) cur = "overview";
  const draw = () => {
    sessionStorage.setItem("eaTab", cur);
    view.innerHTML = `
      <div class="page-head"><div><h2>External assessment</h2><p class="muted">IB Digital Society (first assessment 2024) · сессия May 2027</p></div></div>
      <div class="subtabs">${tabs.map(([id, t]) => `<button class="${id === cur ? "on" : ""}" data-t="${id}">${t}</button>`).join("")}</div>
      <div class="ea ${sl ? "is-sl" : ""}">${SEC[cur]()}</div>`;
    $$(".subtabs button", view).forEach((b) => (b.onclick = () => { cur = b.dataset.t; draw(); }));
  };
  draw();
}
