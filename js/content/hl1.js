// HL extension · 5.1 Global well-being (L1–L7)
import { R, Q, M, S, T, X, E, W, CRIT5, CHAIN } from "./h.js";

export default {
  "hl-1": {
    q: "How can digital interventions help solve problems that no single country can solve alone?",
    obj: ["Distinguish a challenge, an intervention, an impact and an implication", "Name the three HL challenges and their nine sub-topics", "Describe how Paper 1 Section B and Paper 3 assess the HL extension"],
    c3: "Concepts: <b>systems, power, change</b>. Content: any digital technology used as an intervention. Contexts: all seven.",
    terms: [["Challenge", "A complex, often global problem with many causes and stakeholders"], ["Intervention", "A deliberate digital response designed to address a challenge"], ["Impact", "A direct effect of the intervention (positive or negative)"], ["Implication", "A wider, longer-term consequence that follows from the impact"]],
    acts: [
      R("The HL extension at a glance", `<p>At HL you study three <b>global challenges</b>. For each one you investigate real <b>digital interventions</b> and judge whether they work, for whom, and at what cost.</p>
        <div class="cols3"><div><b>5.1 Global well-being</b><br>A Inequalities<br>B Changing populations<br>C Future of work</div><div><b>5.2 Governance & human rights</b><br>A Conflict, peace and security<br>B Participation and representation<br>C Diversity and discrimination</div><div><b>5.3 Sustainable development</b><br>A Climate change and action<br>B Responsible use of resources<br>C Pollution and waste</div></div>
        <p>You are assessed in <b>Paper 1 Section B</b> (one 12-mark extended response) and <b>Paper 3</b> (pre-released challenge + unseen sources, Q1–Q4, 30 marks).</p>`, 5),
      M("m1", "Match the term to the example", [["Challenge", "Millions of rural people cannot see a doctor regularly"], ["Intervention", "A government telemedicine app with video consultations"], ["Impact", "Patients in villages save travel time and money"], ["Implication", "Rural clinics may close because demand falls, so people without internet lose care"]], 5),
      S("s1", "Which HL challenge? Sort the cases", ["5.1 Global well-being", "5.2 Governance & human rights", "5.3 Sustainable development"], [
        ["Robots replace warehouse pickers", 0], ["A smart-city platform for an ageing population", 0], ["Online voting for citizens abroad", 1], ["Facial recognition used by police", 1],
        ["An algorithm that rejects more female job applicants", 1], ["Sensors that track air pollution in a city", 2], ["An app that tracks e-waste recycling", 2], ["Satellite data to model droughts", 2]], 7),
      T("t1", "Diagnostic HL framework map", "For each challenge, write ONE intervention you already know (local in Kazakhstan or global) and one stakeholder it affects.", ["Intervention I know", "Stakeholder affected", "One impact"], ["5.1 Global well-being", "5.2 Governance & human rights", "5.3 Sustainable development"], 10),
      Q("q1", "Paper 3 and Section B: check your understanding", [
        ["How long is Paper 3?", ["45 min", "1 h 15 min", "2 h 15 min", "1 h 30 min"], 1, "Paper 3 is 1 hour 15 minutes, 30 marks, 25% of the HL grade."],
        ["What is released before the Paper 3 exam?", ["The questions", "A pre-released statement about a challenge", "The markscheme", "The source booklet"], 1, "The pre-released statement (250–400 words) describes the challenge; the sources are unseen."],
        ["Paper 1 Section B asks you to…", ["Answer 4 short questions", "Write one extended response on the HL extension", "Analyse sources", "Write a research report"], 1, "Section B: choose 1 of 2 extended-response questions on the HL extension."]], 5),
    ],
    exit: ["In your own words: what is the difference between an impact and an implication?", "Which of the nine sub-topics are you most curious about, and why?"],
    hw: "Find one news article about a digital intervention for any HL challenge. Post it in the <b>News</b> tab using the 3C template.",
  },

  "hl-2": {
    q: "Is internet access a basic right — and who is still left offline?",
    obj: ["Explain the causes and dimensions of the digital divide", "Compare interventions that widen access locally and globally", "Map stakeholders and their power in a connectivity project"],
    c3: "Concepts: <b>power, space, change</b>. Content: 3.4 Networks and the internet. Contexts: economic, social, political.",
    terms: [["Digital divide", "Unequal access to, use of, and benefits from digital technologies"], ["Access divide", "Who has devices and connectivity"], ["Skills divide", "Who can use technology effectively and safely"], ["Outcome divide", "Who actually gains benefits (jobs, services) from being online"]],
    acts: [
      R("Case: closing the gap", `<p>The ITU estimates that roughly <b>a third of the world's population is still offline</b> (about 2.6 billion people in 2024). Most live in rural areas of low- and middle-income countries, and women are less likely to be online than men.</p>
        <p><b>Local:</b> Kazakhstan has invested in bringing broadband to rural settlements and moving public services to <b>eGov.kz</b>. If services move online, people without skills or connections can be excluded unless offline channels remain (Public Service Centres, CONs).</p>
        <p><b>Global:</b> community networks, satellite internet (low-earth-orbit constellations), zero-rating schemes and public Wi-Fi are all interventions — each with different costs, owners and risks.</p>`, 7),
      S("s1", "Which dimension of the divide?", ["Access", "Skills", "Outcome"], [
        ["A village has no mobile signal", 0], ["A grandmother cannot fill in an online form", 1], ["A student has a phone but no laptop for coursework", 0],
        ["A small farmer is online but cannot find better prices", 2], ["A teenager cannot recognise phishing", 1], ["Women in a region earn less from online platforms than men", 2]], 5),
      T("t1", "Comparison toolkit: two interventions", "Compare one local and one global intervention for connectivity.", ["Rural broadband / eGov services (Kazakhstan)", "Satellite internet or community network (global)"], ["Who funds and controls it?", "Who benefits most?", "Who might still be excluded?", "One risk or side effect", "Evidence it works"], 12),
      T("t2", "Stakeholder power map", "Rate power (high/low) and interest (high/low) and explain.", ["Power (H/L)", "Interest (H/L)", "What do they want?"], ["Government", "Telecom company", "Rural families", "Satellite provider", "Elderly citizens", "NGOs / schools"], 8),
      W("w1", "8-mark written evaluation", "Evaluate the effectiveness of one digital intervention designed to reduce the digital divide.", 8, 16),
    ],
    exit: ["Which divide (access, skills, outcome) is hardest to fix with technology alone? Why?"],
    hw: "Interview one family member: which public service do they use online, and what is difficult about it? Bring one quote.",
  },

  "hl-3": {
    q: "Can digital technology feed and heal people who are left behind?",
    obj: ["Explain how digital interventions address food insecurity and healthcare inequality", "Build a process chain from data to decision to outcome", "Practise Paper 3-style Q1–Q3 responses"],
    c3: "Concepts: <b>systems, values and ethics</b>. Content: data, networks, robots and autonomous technologies (drones). Contexts: health, economic, social.",
    terms: [["Food insecurity", "Lack of regular access to enough safe, nutritious food"], ["Telemedicine", "Delivering healthcare remotely using telecommunications"], ["Last-mile delivery", "Getting goods or services to the final, hardest-to-reach users"]],
    acts: [
      R("Cases", `<ul><li><b>Zipline (Rwanda, Ghana):</b> since 2016, autonomous drones deliver blood and medical supplies to rural clinics, cutting delivery times from hours to minutes.</li>
        <li><b>Telemedicine in Kazakhstan:</b> remote consultations connect village clinics with specialists in regional hospitals.</li>
        <li><b>Mobile money (e.g. M-Pesa, Kenya):</b> lets farmers receive payments and buy inputs without a bank branch.</li>
        <li><b>Early-warning data:</b> satellite and market data help humanitarian agencies predict food shortages before they become famines.</li></ul>`, 7),
      T("t1", "Process chain: drone medical delivery", "Explain step by step how the intervention works and where it could fail.", ["What happens", "What could go wrong?"], CHAIN, 10),
      Q("q1", "Paper 3-style Q1 practice", [
        ["Which is the best definition of <i>telemedicine</i>?", ["Medicine sold online", "Remote delivery of healthcare using telecommunications", "Health apps that count steps", "Robots performing surgery"], 1, "Precise definitions earn Q1 marks — avoid vague wording."],
        ["Identify a stakeholder who could LOSE from drone delivery.", ["Rural patients", "Ministry of Health", "Local motorbike couriers", "Hospital doctors"], 2, "Q2b often asks for a disadvantage for a specific stakeholder."]], 4),
      X("x1", "Paper 3-style Q2 (3 marks)", "Use the chain: <b>what it does → how → effect</b>.", ["Explain how telemedicine could reduce healthcare inequality for rural patients. [3]", "Explain one disadvantage of mobile money for elderly farmers. [3]"], 10, 4),
      E("e1", "Q3 practice: evaluate an intervention", "Rate drone delivery of medical supplies against the criteria (1 = weak, 5 = strong).", CRIT5, 10),
    ],
    exit: ["Which part of a process chain is the most common point of failure for health interventions? Give one reason."],
  },

  "hl-4": {
    q: "Smart cities: smarter for whom?",
    obj: ["Explain how smart-city systems use data to manage growing urban populations", "Compare Astana/Almaty with a global smart city", "Write an 8-mark evaluation using stakeholder evidence"],
    c3: "Concepts: <b>space, systems, power</b>. Content: data, networks, AI. Contexts: social, political, environmental.",
    terms: [["Smart city", "A city that uses sensors, data and networks to manage services and infrastructure"], ["IoT", "Internet of Things — physical devices with sensors connected to networks"], ["Urbanisation", "Growth in the share of people living in cities"]],
    acts: [
      R("Cases", `<p><b>Kazakhstan:</b> Astana and Almaty run smart-city projects — traffic cameras and automated fines (e.g. the <i>Sergek</i> system), digital public transport payment, city service apps and situation centres.</p>
        <p><b>Singapore — Smart Nation:</b> sensors, digital ID and data platforms are used to manage transport, housing and an ageing population.</p>
        <p><b>Barcelona:</b> sensors for parking, lighting and waste; the city also created rules on citizen data ownership.</p>
        <p>Critics ask who owns the data, whether surveillance grows, and whether poorer districts get the same investment.</p>`, 7),
      M("m1", "Match the smart-city tool to its purpose", [["Traffic cameras with automatic number-plate recognition", "Enforce speed limits and manage congestion"], ["Smart bins with fill sensors", "Optimise waste-collection routes"], ["Digital transit card / QR payment", "Collect data on passenger flows"], ["City situation centre", "Combine live data for emergency decisions"], ["Smart street lights", "Reduce energy use when streets are empty"]], 5),
      T("t1", "Comparison toolkit", "Compare a Kazakh and a global smart city.", ["Astana / Almaty", "Singapore / Barcelona"], ["Main problem addressed", "Technology used", "Who controls the data?", "Who benefits most?", "Main concern"], 12),
      T("t2", "Stakeholder map", "How does a camera-based traffic system affect each group?", ["Positive impact", "Negative impact"], ["Drivers", "Pedestrians", "City government", "Private technology company", "Residents of outer districts"], 8),
      W("w1", "8-mark evaluation", "Evaluate the use of smart-city technologies to manage population growth in one city you have studied.", 8, 16),
    ],
    exit: ["Name one group that might be excluded from smart-city benefits and suggest one fix."],
  },

  "hl-5": {
    q: "How should technology support people who are older, or who have moved across borders?",
    obj: ["Explain digital interventions for ageing populations and for migrants/refugees", "Build a process chain for a migration intervention", "Answer Paper 3-style Q1–Q3"],
    c3: "Concepts: <b>identity, values and ethics, change</b>. Content: robots, data (biometrics), networks. Contexts: social, health, economic.",
    terms: [["Ageing population", "Rising share of older people due to longer lives and lower birth rates"], ["Remittances", "Money migrants send to family in their home country"], ["Biometric ID", "Identification using body characteristics such as fingerprints or iris"]],
    acts: [
      R("Cases", `<ul><li><b>Japan:</b> care robots (e.g. the therapeutic seal robot <i>PARO</i>) and monitoring sensors support elderly people as the care workforce shrinks.</li>
        <li><b>Remittance apps:</b> digital transfers reduce fees for migrant workers sending money home — important for Central Asian labour migrants.</li>
        <li><b>Refugee biometrics:</b> UNHCR and the World Food Programme have used iris scans to register refugees and pay for food (e.g. in Jordan). Faster and harder to defraud — but raises consent and data-protection concerns for people who cannot easily say no.</li></ul>`, 7),
      T("t1", "Process chain: iris-scan payments in a refugee camp", "", ["What happens", "Risk / question"], CHAIN, 10),
      X("x1", "Values clash", "Answer in 2–3 sentences each.", ["Is it ethical to require biometric registration to receive food aid? Give one argument for and one against.", "Would you prefer a care robot or a human carer for your grandparent? Explain using the concept of <b>identity</b> or <b>values</b>."], 8),
      Q("q1", "Paper 3 Q1-style", [
        ["Which is a reason why governments MUST (not just want to) introduce digital elderly-care solutions?", ["Robots look modern", "A shrinking working-age population means fewer carers", "Elderly people enjoy gadgets", "Robots are cheap"], 1, "Examiners penalised 'wants' instead of necessity in Q1."],
        ["A remittance app mainly benefits…", ["Banks with branches", "Migrant workers and their families through lower fees", "Border police", "Mobile operators only"], 1, ""]], 4),
      X("x2", "Paper 3 Q3-style (8 marks, plan)", "Plan, do not write in full.", ["Claim 1 (with evidence)", "Claim 2 (with evidence)", "Counterclaim", "Judgement"], 10, 2),
    ],
    exit: ["Name one data-protection risk for migrants using digital services."],
  },

  "hl-6": {
    q: "Will automation take our jobs — or change them?",
    obj: ["Explain how automation and AI change tasks and skills", "Build an impact matrix for workers, firms and governments", "Plan a Section B extended response"],
    c3: "Concepts: <b>change, power, systems</b>. Content: AI, robots and autonomous technologies. Contexts: economic, social.",
    terms: [["Automation", "Using machines or software to perform tasks previously done by humans"], ["Augmentation", "Technology that helps humans do tasks better rather than replacing them"], ["Reskilling", "Training workers for new roles"]],
    acts: [
      R("Cases", `<ul><li><b>Warehouses:</b> mobile robots move shelves to human pickers; productivity rises, while jobs shift toward maintenance and supervision.</li>
        <li><b>Generative AI:</b> affects writing, coding, translation and customer service — tasks of educated office workers, not only factory jobs.</li>
        <li><b>Kazakhstan:</b> the state employment portal <i>Enbek.kz</i> offers job matching and online skills courses as part of reskilling policy.</li>
        <li>The World Economic Forum's <i>Future of Jobs</i> reports expect both job losses and new roles, with large reskilling needs.</li></ul>`, 7),
      S("s1", "Automation, augmentation or unaffected (for now)?", ["Mostly automated", "Augmented", "Hard to automate"], [
        ["Scanning items at a supermarket checkout", 0], ["A radiologist using AI to flag scans", 1], ["A nurse comforting a patient", 2], ["Translating a simple product manual", 0], ["A teacher using AI to draft quiz questions", 1], ["A plumber repairing old pipes", 2]], 5),
      T("t1", "Impact matrix", "Short-term vs long-term impacts of automation.", ["Short-term", "Long-term"], ["Low-skilled workers", "High-skilled workers", "Companies", "Government (tax, welfare)", "Young people entering work"], 12),
      X("x1", "Section B response plan", "Question: <i>'To what extent is automation a threat to global well-being?'</i>", ["Thesis (your position)", "Argument 1 + example", "Argument 2 + example", "Counterclaim + example", "Conclusion: to what extent?"], 15, 2),
    ],
    exit: ["Which skill do you think AI will make MORE valuable? Why?"],
  },

  "hl-7": {
    q: "What makes work meaningful and secure in the platform economy?",
    obj: ["Explain algorithmic management and its effects on platform workers", "Evaluate interventions that protect workers", "Synthesise 5.1 and write a timed Section B response (Summative 1)"],
    c3: "Concepts: <b>power, values and ethics</b>. Content: algorithms, data. Contexts: economic, social, political.",
    terms: [["Platform work", "Work arranged through digital platforms (delivery, ride-hailing, freelancing)"], ["Algorithmic management", "Algorithms assign, monitor, rate and pay workers"], ["Gig economy", "Short-term, task-based work instead of permanent jobs"]],
    acts: [
      R("Case: couriers and algorithms", `<p>Delivery and taxi apps (e.g. Yandex Go, Glovo, Wolt, Uber) give flexible income but workers are usually classed as independent contractors: no sick pay, and pay can change when the algorithm changes.</p>
        <p><b>Intervention:</b> the EU <b>Platform Work Directive</b> (adopted 2024) creates a presumption of employment in some cases and requires transparency and human review of important algorithmic decisions such as account deactivation.</p>`, 6),
      E("e1", "Evaluate the EU Platform Work Directive", "Rate it and justify with evidence.", CRIT5, 10),
      X("x1", "5.1 synthesis", "Connect the three sub-topics.", ["How does the digital divide (5.1A) affect who can do platform work?", "How could ageing populations (5.1B) change the demand for automation (5.1C)?", "Which ONE intervention from 5.1 had the most equitable impact? Justify."], 10),
      W("w1", "Summative 1 — Paper 1 Section B", "<b>Evaluate</b> the impact of platform work on global well-being.", 12, 30),
    ],
    exit: ["After the timed response: one thing you did well and one target for Summative 2."],
  },
};
