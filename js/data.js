// ============================================================
//  Учебные данные: юниты, уроки, 3C, темы новостей, External assessment
//  Задания по урокам — это значения по умолчанию; учитель меняет их
//  на сайте (Учитель → Уроки и handouts) под свой handout.
// ============================================================

export const CONCEPTS = [
  ["2.1", "Change"], ["2.2", "Expression"], ["2.3", "Identity"], ["2.4", "Power"],
  ["2.5", "Space"], ["2.6", "Systems"], ["2.7", "Values and ethics"],
];
export const CONTENT = [
  ["3.1", "Data"], ["3.2", "Algorithms"], ["3.3", "Computers"], ["3.4", "Networks and the internet"],
  ["3.5", "Media"], ["3.6", "Artificial intelligence"], ["3.7", "Robots and autonomous technologies"],
];
export const CONTEXTS = [
  ["4.1", "Cultural"], ["4.2", "Economic"], ["4.3", "Environmental"], ["4.4", "Health"],
  ["4.5", "Human knowledge"], ["4.6", "Political"], ["4.7", "Social"],
];
export const HL_CHALLENGES = [
  ["5.1A", "Local and global inequalities"], ["5.1B", "Changing populations"], ["5.1C", "The future of work"],
  ["5.2A", "Conflict, peace and security"], ["5.2B", "Participation and representation"], ["5.2C", "Diversity and discrimination"],
  ["5.3A", "Climate change and action"], ["5.3B", "Responsible use of resources"], ["5.3C", "Managing pollution and waste"],
];

// Темы для ИИ-категоризации новостей (можно менять)
export const NEWS_THEMES = [
  { id: "ai", label: "AI & automation", kw: ["ai", "artificial intelligence", "chatgpt", "gemini", "llm", "machine learning", "neural", "automation", "deepfake", "генератив", "нейросет", "ии "] },
  { id: "privacy", label: "Privacy & surveillance", kw: ["privacy", "surveillance", "facial recognition", "cctv", "tracking", "gdpr", "персональн", "слежк", "камер"] },
  { id: "security", label: "Cybersecurity & conflict", kw: ["cyber", "hack", "ransomware", "breach", "attack", "war", "military", "drone", "кибер", "утечк", "взлом"] },
  { id: "media", label: "Media & misinformation", kw: ["misinformation", "disinformation", "fake news", "social media", "tiktok", "instagram", "youtube", "influencer", "algorithm feed", "дезинформ", "соцсет"] },
  { id: "politics", label: "Governance & participation", kw: ["election", "vote", "voting", "government", "egov", "law", "regulation", "act", "activism", "protest", "выбор", "закон", "госуслуг"] },
  { id: "inequality", label: "Inequality & digital divide", kw: ["digital divide", "access", "inequality", "rural", "poverty", "connectivity", "broadband", "неравен", "доступ"] },
  { id: "health", label: "Health & wellbeing", kw: ["health", "medical", "hospital", "mental", "wellbeing", "telemedicine", "здоров", "медиц"] },
  { id: "environment", label: "Environment & sustainability", kw: ["climate", "energy", "e-waste", "carbon", "data centre", "data center", "pollution", "recycl", "климат", "экол", "отход"] },
  { id: "work", label: "Work & economy", kw: ["job", "work", "employment", "gig", "platform work", "economy", "startup", "market", "работ", "экономик"] },
  { id: "identity", label: "Identity, culture & discrimination", kw: ["bias", "discrimination", "gender", "race", "identity", "culture", "accessibility", "дискрим", "культур"] },
  { id: "education", label: "Education & knowledge", kw: ["school", "education", "student", "university", "learning", "wikipedia", "образован", "школ"] },
  { id: "robots", label: "Robots & autonomous tech", kw: ["robot", "autonomous", "self-driving", "tesla", "waymo", "робот", "беспилот"] },
  { id: "other", label: "Other", kw: [] },
];

// ---------- Unit 1: Revisiting digital society (SL + HL) ----------
const REV = [
  [13, "L1–2", "What is digital society? 3Cs framework; diagnostic test", ["Diagnostic test on the whole course"]],
  [13, "L3–4", "Concepts 2.1 Change and 2.2 Expression", ["Concept map", "Recall quiz"]],
  [13, "L5–6", "Concepts 2.3 Identity and 2.4 Power", ["Concept map", "Recall quiz"]],
  [14, "L7–8", "Concepts 2.5 Space, 2.6 Systems, 2.7 Values and ethics", ["Concept map", "Recall quiz"]],
  [14, "L9–10", "Content 3.1 Data: types, life cycle, security, big data, dilemmas", []],
  [14, "L11–12", "Content 3.2 Algorithms: characteristics, representation, uses, dilemmas", []],
  [15, "L13–14", "Content 3.3 Computers: types, components, coding, evolution", []],
  [15, "L15–16", "Content 3.4 Networks and the internet: types, components, the web, dilemmas", []],
  [15, "L17–18", "Formative 1: Paper 1-style questions on 3.1–3.4", ["Formative 1: Paper 1-style structured questions", "Self-marking against markbands"]],
  [16, "L19–20", "Content 3.5 Media: digital and immersive media, dilemmas", []],
  [16, "L21–22", "Content 3.6 Artificial intelligence: types, machine learning, neural networks, dilemmas", []],
  [16, "L23–24", "Content 3.7 Robots and autonomous technologies: types, characteristics, dilemmas", []],
  [17, "L25–26", "Content synthesis: linking content areas to concepts", []],
  [17, "L27–28", "Formative 2: 3Cs mapping of an unseen example", ["Formative 2: 3Cs mapping of an unseen example"]],
  [17, "L29–30", "Summative 1: Paper 1-style test on concepts and content", ["Summative 1: Paper 1-style test (concepts 2.1–2.7, content 3.1–3.7)"]],
  [18, "L31–32", "Context 4.1 Cultural", []],
  [18, "L33–34", "Context 4.2 Economic", []],
  [18, "L35–36", "Context 4.3 Environmental", []],
  [19, "L37–38", "Context 4.4 Health", []],
  [19, "L39–40", "Context 4.5 Human knowledge", []],
  [19, "L41–42", "Context 4.6 Political", []],
  [20, "L43–44", "Context 4.7 Social", []],
  [20, "L45–46", "Formative 3: Paper 1-style questions on contexts", ["Formative 3: Paper 1-style questions on contexts"]],
  [20, "L47–48", "Summative 2: Paper 1 mock", ["Summative 2: timed Paper 1 mock"]],
  [21, "L49–50", "Paper 2 skills: origin, purpose, value, limitations; media literacy", ["Paper 2 source-analysis task (OPVL)"]],
  [21, "L51–52", "Paper 2 skills: comparing sources, claims and perspectives", ["Paper 2 source-analysis task (compare sources)"]],
  [21, "L53–54", "Paper 2 skills: extended response using sources and own knowledge", ["Paper 2 extended response (12 marks)"]],
  [22, "L55–56", "Paper 2 timed practice and peer marking", ["Timed Paper 2 practice", "Peer marking with markbands"]],
  [22, "L57–58", "Summative 3: Paper 2 mock", ["Summative 3: timed Paper 2 mock"]],
  [22, "L59–60", "Integrated case study: one digital system across all 3Cs", []],
  [23, "L61–62", "Mock feedback and gap analysis", ["Gap analysis", "Revision targets"]],
  [23, "L63–64", "Targeted revision workshops on the weakest topics", []],
  [23, "L65–66", "Unit review, reflection and revision plan", ["Revision plan"]],
];

// ---------- Unit 2: HL extension (HL only) ----------
const HL = [
  [2, "07.09", "L1", "Introduction to HL challenges and interventions", ["Diagnostic HL framework map", "Exit ticket"]],
  [3, "14.09", "L2", "5.1A Digital access and the digital divide", ["Comparison toolkit", "Stakeholder map", "8-mark written evaluation"]],
  [4, "21.09", "L3", "5.1A Food insecurity and healthcare inequality", ["Process chain", "Paper 3-style Q1–Q3 tasks"]],
  [5, "28.09", "L4", "5.1B Population growth and smart cities", ["Comparison toolkit", "Stakeholder map", "8-mark written evaluation"]],
  [6, "05.10", "L5", "5.1B Ageing populations and migration", ["Process chain", "Paper 3-style Q1–Q3 tasks"]],
  [7, "12.10", "L6", "5.1C Future of work: automation and skills", ["Impact matrix", "Section B response plan"]],
  [8, "19.10", "L7", "5.1C Meaningful and secure work; 5.1 synthesis — Summative 1", ["Summative 1: timed Paper 1 Section B response (platform work)"]],
  [9, "02.11", "L8", "5.2 Introduction: governance, human rights and digital systems", []],
  [10, "09.11", "L9", "5.2A Conflict, peace and security: cyber conflict, autonomous weapons, disinformation", ["Process chain"]],
  [11, "16.11", "L10", "5.2A Security vs privacy: surveillance and facial recognition", ["Process chain", "8-mark evaluation of a surveillance intervention"]],
  [12, "23.11", "L11", "5.2B Participation and representation: e-government and e-voting (eGov.kz, Estonia)", ["Stakeholder power map", "Seminar on e-voting"]],
  [13, "30.11", "L12", "5.2B Online activism, platform governance and election misinformation", ["Stakeholder power map", "Seminar on platform governance"]],
  [14, "07.12", "L13", "5.2C Diversity and discrimination: algorithmic bias, accessibility, algorithmic audits", ["Algorithmic audit case analysis"]],
  [15, "14.12", "L14", "5.2 synthesis — Summative 2 (timed Section B response)", ["Summative 2: timed Paper 1 Section B response"]],
  [16, "21.12", "L15", "5.3A Climate change and action: climate modelling, smart grids, energy cost of AI", ["Intervention evaluation card", "8-mark response"]],
  [17, "11.01", "L16", "5.3B Responsible use of resources: precision agriculture, water, rare-earth minerals", ["Intervention evaluation card", "8-mark response"]],
  [18, "18.01", "L17", "5.3C Managing pollution and waste: e-waste, right to repair, air-quality sensing", ["Intervention evaluation card", "8-mark response"]],
  [19, "25.01", "L18", "5.3 synthesis; Approaches to Paper 3: structure, command terms, specimen paper", ["Pre-release dossier", "Paper 3 Q1–Q4 practice"]],
  [20, "01.02", "L19", "Pre-released statement: unpack the challenge, stakeholders and existing interventions; start the dossier", ["Pre-release dossier", "Paper 3 Q1–Q4 practice"]],
  [21, "08.02", "L20", "Paper 3 practice: unseen intervention source, Q1–Q4, peer marking with markbands", ["Paper 3 Q1–Q4 practice", "Peer marking with markbands"]],
  [22, "15.02", "L21", "Summative 3: Paper 3 mock (1 h 15 min) and review", ["Summative 3: full Paper 3 mock (1 h 15 min)", "Mock review"]],
];

const DEFAULT_TASKS = ["Handout: core tasks", "Exit ticket"];

export const UNITS = [
  {
    id: "rev",
    title: "Unit 1 · Revisiting digital society",
    short: "Revising",
    levels: ["SL", "HL"],
    weeks: "Weeks 13–28",
    description: "Concepts 2.1–2.7, content 3.1–3.7, contexts 4.1–4.7; Paper 1 and Paper 2 skills.",
    lessons: REV.map(([week, code, topic, tasks], i) => ({
      key: `rev-${i + 1}`, n: i + 1, week, code, date: "", topic,
      tasks: tasks.length ? tasks : DEFAULT_TASKS,
    })),
  },
  {
    id: "hl",
    title: "Unit 2 · HL extension",
    short: "HL extension",
    levels: ["HL"],
    weeks: "Weeks 1–21 (Mondays)",
    description: "5.1 Global well-being, 5.2 Governance and human rights, 5.3 Sustainable development; Paper 1 Section B and Paper 3.",
    lessons: HL.map(([week, date, code, topic, tasks], i) => ({
      key: `hl-${i + 1}`, n: i + 1, week, code, date, topic,
      tasks: tasks.length ? tasks : DEFAULT_TASKS,
    })),
  },
];

export function unitsForLevel(level) {
  return UNITS.filter((u) => u.levels.includes(level));
}
export function findLesson(key) {
  for (const u of UNITS) {
    const l = u.lessons.find((x) => x.key === key);
    if (l) return { unit: u, lesson: l };
  }
  return null;
}

export const STATUSES = [
  { id: "none", label: "Не начато", cls: "s-none" },
  { id: "progress", label: "В процессе", cls: "s-progress" },
  { id: "done", label: "Выполнено", cls: "s-done" },
  { id: "redo", label: "Доработать", cls: "s-redo" },
  { id: "absent", label: "Отсутствовал(а)", cls: "s-absent" },
];

export const LEVELS_OF_ACHIEVEMENT = [
  { id: "", label: "—" },
  { id: "beginning", label: "Beginning" },
  { id: "developing", label: "Developing" },
  { id: "secure", label: "Secure" },
  { id: "excelling", label: "Excelling" },
];
