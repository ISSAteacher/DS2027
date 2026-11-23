// Unit 1 · Formative 3, Paper 1 mock, Paper 2 skills, revision (blocks 23–33)
import { R, Q, M, S, T, X, E, W, OPVL } from "./h.js";
import { P1 } from "./rev2.js";

const SRC_SCREEN = `
<div class="source"><b>Source A</b> — <i>Government press release, Ministry of Education (fictional country), 2026</i><p>"From September, all schools will use the SmartClass platform. Teachers report that automated marking saves up to five hours a week. Student results in pilot schools improved by 8% in mathematics."</p></div>
<div class="source"><b>Source B</b> — <i>Survey by a parents' association, 2026 (n = 1,200 parents)</i><p>62% of parents said their children spend more than 4 hours a day on screens for school and leisure combined. 41% were worried about how SmartClass stores their child's data. Rural parents were twice as likely to report connection problems.</p></div>
<div class="source"><b>Source C</b> — <i>Opinion column by a teacher, national newspaper, 2026</i><p>"Platforms are tools, not teachers. When the software marks an essay, it rewards keywords, not thinking. We are training students to write for algorithms."</p></div>
<div class="source"><b>Source D</b> — <i>Infographic, international education NGO, 2025</i><p>Countries with the highest digital-learning adoption show mixed results: strong gains in practice-based subjects (maths, languages), small or negative effects on reading comprehension when screen time replaces books.</p></div>`;

const SRC_AI = `
<div class="source"><b>Source A</b> — <i>Company blog, AI start-up, 2026</i><p>"Our hiring AI screened 2 million CVs last year, cutting time-to-hire by 60%. Because it ignores names and photos, it is fairer than human recruiters."</p></div>
<div class="source"><b>Source B</b> — <i>Academic study summary, 2025</i><p>An audit of four hiring algorithms found that even without names, models used proxies such as university, postcode and gaps in employment, which disadvantaged women returning from parental leave.</p></div>
<div class="source"><b>Source C</b> — <i>Cartoon description, 2026</i><p>A robot in a suit stamps "REJECTED" on a pile of CVs while saying: "Nothing personal — it's just math."</p></div>
<div class="source"><b>Source D</b> — <i>Government regulation summary, 2024</i><p>Employers using automated hiring tools must commission an annual independent bias audit, publish a summary and tell candidates that an automated tool is used.</p></div>`;

const P2 = (id, src) => [
  R("Source booklet", src, 8),
  X(id + "1", "Question 1", "Short answer from Source A / B.", ["Identify two claims made in Source A.", "According to Source B, identify one group that is disadvantaged."], 5),
  X(id + "2", "Question 2", "", ["Explain the message of Source C."], 6, 5),
  T(id + "3", "Question 3 — OPVL", "Evaluate the value and limitations of Source A and Source B as evidence.", OPVL, ["Source A", "Source B"], 12),
  W(id + "4", "Question 4", "Using all the sources and your own knowledge, evaluate the claim made in Source A.", 12, 30),
];

export default {
  "rev-23": {
    q: "Formative 3: can I write Paper 1 answers about contexts?",
    obj: ["Answer a Paper 1-style structured question focused on contexts", "Self-mark and identify gaps"],
    acts: [
      ...P1("f3", "Question", `<b>Air-quality apps.</b> In winter, residents of Almaty check smartphone apps that show live air-pollution levels from a network of low-cost sensors installed by volunteers. Some schools use the data to decide whether children play outside.`,
        ["Identify two components of the sensor network.", "Explain how the data from sensors reaches the app.", "Explain two health impacts of the air-quality apps.", "Evaluate the use of citizen sensor networks to address environmental problems."]),
      X("rv", "Self-mark", "", ["Estimated marks a/b/c/d", "Which context do I need to revise?"], 5, 2),
    ],
  },

  "rev-24": {
    q: "Summative 2: Paper 1 mock",
    obj: ["Complete a timed Paper 1 mock (two structured questions)"],
    c3: "SL: 1 h 30 min for two questions. HL: Section A as SL + Section B in the HL lesson.",
    acts: [
      R("Instructions", "<p>Answer <b>two</b> questions. Use the timers. Your teacher may give you the mock paper on paper; if so, type your final answers here or attach them in a discussion.</p>", 2),
      ...P1("m1", "Question 1", `<b>Robotaxis.</b> A company launches driverless taxis in a large city. Passengers book through an app; the cars use cameras, lidar and AI to navigate. Taxi drivers protest outside the city hall.`,
        ["Identify two sensors used by autonomous vehicles.", "Explain how AI allows the car to make driving decisions.", "Explain two economic impacts of robotaxis.", "Discuss who should be held responsible when a robotaxi causes an accident."]),
      ...P1("m2", "Question 2", `<b>Digital ID for refugees.</b> An international agency registers refugees using iris scans. The scan is linked to food assistance and medical records.`,
        ["Define biometric data.", "Explain how data security could be protected in this system.", "Explain two impacts of the system on refugees' identity.", "Evaluate the use of biometric digital ID for humanitarian aid."]),
    ],
  },

  "rev-25": {
    q: "Paper 2: who made this source, why — and can I trust it?",
    obj: ["Analyse origin, purpose, value and limitations (OPVL)", "Develop media literacy: detect bias, missing perspectives and manipulation"],
    c3: "Paper 2 skills. Concepts: power, values and ethics, expression.",
    terms: [["Origin", "Who created the source, when, where, what type"], ["Purpose", "Why it was created (inform, persuade, sell, entertain)"], ["Value", "What it is useful for in answering the question"], ["Limitation", "What it cannot show; bias, gaps, missing voices"]],
    acts: [
      R("OPVL in practice", `<p><b>Don't</b> write "it is biased" — explain <i>how</i> the origin and purpose shape the content and what that means for the question. <b>Do</b> link value and limitation to the specific question asked.</p>${SRC_SCREEN}`, 8),
      T("t1", "OPVL", "Complete for all four sources.", OPVL, ["Source A", "Source B", "Source C", "Source D"], 20),
      Q("q1", "Media literacy check", [
        ["Source A's main limitation is likely…", ["It is too old", "As a government release it promotes its own policy and gives selective figures", "It is a cartoon", "It has no author"], 1, ""],
        ["The value of Source B is…", ["It is neutral", "It gives quantitative evidence of parents' views including rural differences", "It proves learning outcomes", "It is written by experts"], 1, ""],
        ["Which perspective is missing from all sources?", ["Parents", "Teachers", "Students themselves", "Government"], 2, "Noticing missing voices is a strong limitation point."]], 5),
    ],
    exit: ["Which source would you trust most for the question 'Does SmartClass improve learning?' Why?"],
  },

  "rev-26": {
    q: "How do I compare sources and their claims?",
    obj: ["Compare and contrast claims and perspectives across sources", "Write integrated comparisons rather than separate descriptions"],
    c3: "Paper 2 skills: comparing sources.",
    acts: [
      R("Integrated comparison", `<p>Weak: "Source A says… Source C says…" <br>Strong: "<b>Both</b> A and D suggest digital learning improves maths, <b>whereas</b> C argues automated marking rewards keywords rather than thinking; D partly supports C by noting weaker reading outcomes."</p>${SRC_SCREEN}`, 6),
      T("t1", "Compare claims", "", ["Agree with", "Disagree with", "Evidence"], ["Source A claim", "Source C claim", "Source D claim"], 12),
      X("x1", "Write an integrated comparison", "Use: both… whereas… however… this suggests…", ["Compare and contrast what Sources A and C reveal about automated learning platforms."], 12, 7),
      M("m1", "Connectives for comparison", [["Similarity", "Similarly / Both… / Likewise"], ["Difference", "Whereas / In contrast / However"], ["Partial agreement", "Partly supports / qualifies"], ["Judgement", "Therefore / On balance / This suggests"]], 3),
    ],
    exit: ["Rewrite one sentence of yours to make it more integrated."],
  },

  "rev-27": {
    q: "How do I combine sources and own knowledge in a 12-mark answer?",
    obj: ["Plan a Paper 2 extended response using sources and own knowledge", "Use real-world examples beyond the sources"],
    c3: "Paper 2 Q4-style extended response.",
    acts: [
      R("Source booklet", SRC_AI, 6),
      T("t1", "Plan", "", ["Source(s) used", "Own knowledge / real example", "Concept"], ["Argument 1 (supports claim)", "Argument 2 (challenges claim)", "Argument 3", "Counterclaim", "Conclusion"], 15),
      W("w1", "Write", "Using the sources and your own knowledge, evaluate the claim that AI hiring tools are fairer than human recruiters.", 12, 30),
    ],
    exit: ["Name one real-world example (outside the sources) you used."],
  },

  "rev-28": {
    q: "Paper 2 under time: how close am I to the top band?",
    obj: ["Complete a timed Paper 2 practice", "Peer-mark with markbands and give feedback"],
    acts: [
      ...P2("p", SRC_AI),
      X("pm", "Peer marking", "", ["Partner's strengths", "Partner's top target", "Estimated band for Q4"], 8, 2),
    ],
  },

  "rev-29": {
    q: "Summative 3: Paper 2 mock",
    obj: ["Complete a full Paper 2 under exam conditions (1 h 15 min)"],
    acts: P2("s3", SRC_SCREEN),
  },

  "rev-30": {
    q: "One system, all 3Cs: can I analyse a digital system completely?",
    obj: ["Analyse one digital system through all concepts, content areas and contexts", "Synthesise the whole course"],
    c3: "Integrated case study: Kaspi.kz super-app (or a system of your choice).",
    acts: [
      R("Case", `<p><b>Kaspi.kz</b> combines payments, banking, loans, a marketplace, travel booking and access to some government services in one app used by millions in Kazakhstan. It relies on data, algorithms (credit scoring, recommendations), networks, cloud computing and increasingly AI.</p>`, 4),
      T("t1", "Content", "", ["How the system uses it"], ["3.1 Data", "3.2 Algorithms", "3.3 Computers", "3.4 Networks", "3.6 AI"], 10),
      T("t2", "Concepts", "", ["Analysis"], ["Change", "Power", "Identity", "Systems", "Values and ethics"], 10),
      T("t3", "Contexts", "", ["Impact", "Implication"], ["Economic", "Social", "Political"], 10),
      W("w1", "Synthesis", "To what extent has the super-app model been positive for society in Kazakhstan?", 12, 30),
    ],
  },

  "rev-31": {
    q: "What did the mocks tell me — and what will I do about it?",
    obj: ["Analyse mock results by question type and topic", "Set specific revision targets"],
    acts: [
      T("t1", "Gap analysis", "Use your teacher's feedback on the mocks.", ["My mark", "What went wrong?", "Action"], ["Paper 1 (a) identify / define", "Paper 1 (b)/(c) explain", "Paper 1 (d) evaluate / discuss", "Paper 2 Q1–Q2", "Paper 2 OPVL", "Paper 2 Q4 extended"], 15),
      E("e1", "Rate your skills", "1 = weak, 5 = strong.", ["Precise terminology", "Real-world examples (who, where, when)", "Linking the 3Cs", "Counterclaims and judgement", "Timing"], 8),
      X("x1", "Revision targets", "Make them SMART.", ["Target 1", "Target 2", "Target 3"], 6, 2),
    ],
  },

  "rev-32": {
    q: "Targeted workshops: fix the weakest topics",
    obj: ["Practise the weakest topics identified in the gap analysis", "Improve one answer using feedback"],
    acts: [
      Q("q1", "Mixed recall", [
        ["Which concept: 'Users in villages cannot access online banking'?", ["Space", "Expression", "Identity", "Change"], 0, "Also power and values; space is the most direct lens."],
        ["Encryption protects…", ["Availability", "Confidentiality", "Integrity only", "Speed"], 1, ""],
        ["Reinforcement learning learns from…", ["Labels", "Rewards and penalties", "Clusters", "Rules written by humans"], 1, ""],
        ["The web uses which protocol to transfer pages?", ["DNS", "HTTP(S)", "TCP only", "FTP only"], 1, ""],
        ["OPVL 'purpose' asks…", ["When it was made", "Why it was made", "Who paid for it only", "How long it is"], 1, ""],
        ["An implication is…", ["An immediate effect", "A wider, longer-term consequence", "A definition", "A source"], 1, ""]], 8),
      X("x1", "Improve an answer", "Paste a paragraph from a mock and rewrite it using your teacher's feedback.", ["Original paragraph", "Improved paragraph", "What changed?"], 20, 5),
      T("t1", "Example bank", "Add a strong real example for your weakest areas.", ["Example (who, where, when)", "3C link"], ["Weak area 1", "Weak area 2", "Weak area 3"], 10),
    ],
  },

  "rev-33": {
    q: "Am I ready? Unit review and revision plan",
    obj: ["Reflect on progress in the unit", "Build a revision plan to the exams"],
    acts: [
      E("e1", "Final self-assessment", "", ["Concepts 2.1–2.7", "Content 3.1–3.7", "Contexts 4.1–4.7", "Paper 1 technique", "Paper 2 technique"], 8),
      T("t1", "Revision plan", "Plan your weeks until the exams.", ["Topic / skill", "Activity (quiz, timed answer, flashcards)", "Done?"], ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6"], 15),
      X("x1", "Reflection", "", ["What I am most proud of in this unit", "What I will do differently before the exam"], 6),
    ],
  },
};
