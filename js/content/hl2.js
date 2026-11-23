// HL extension · 5.2 Governance and human rights (L8–L14)
import { R, Q, M, S, T, X, E, W, CRIT5, CHAIN } from "./h.js";

export default {
  "hl-8": {
    q: "Do digital systems strengthen or weaken human rights?",
    obj: ["Explain how governance and human rights connect to digital systems", "Link digital issues to articles of the UDHR", "Identify key global frameworks (EU AI Act, DSA)"],
    c3: "Concepts: <b>power, values and ethics</b>. Content: data, algorithms, AI. Contexts: political, social.",
    terms: [["Governance", "How decisions are made and power is exercised, by states and other actors"], ["UDHR", "Universal Declaration of Human Rights (1948)"], ["EU AI Act", "EU law that regulates AI systems by level of risk"], ["Digital Services Act (DSA)", "EU law setting duties for online platforms on illegal content and transparency"]],
    acts: [
      R("Rights in a digital world", `<p>Many UDHR rights now depend on digital systems: <b>Article 12</b> (privacy), <b>Article 19</b> (freedom of expression and information), <b>Article 20</b> (assembly and association), <b>Article 21</b> (taking part in government), <b>Article 2 & 7</b> (non-discrimination and equality).</p>
        <p>Governance actors include governments, companies (platforms set rules for billions), international bodies (UN, EU) and civil society. The EU <b>AI Act</b> bans some uses (e.g. social scoring) and strictly regulates "high-risk" AI; the <b>DSA</b> requires large platforms to assess risks such as election manipulation.</p>`, 6),
      M("m1", "Match the case to the right it most affects", [["Police use facial recognition at protests", "Article 20 — assembly"], ["An internet shutdown during elections", "Article 19 — expression and information"], ["An app collects location data without consent", "Article 12 — privacy"], ["A hiring algorithm rejects older applicants", "Article 7 — equality before the law / non-discrimination"], ["Online voting for citizens abroad", "Article 21 — taking part in government"]], 6),
      S("s1", "Who governs? Sort the actors", ["State", "Company", "International / civil society"], [["Ministry of Digital Development", 0], ["Meta's content moderation policy", 1], ["UN Human Rights Council", 2], ["Data protection authority", 0], ["Access Now (digital rights NGO)", 2], ["Google's search ranking rules", 1]], 5),
      X("x1", "Your position", "", ["Which actor has the MOST power over your digital rights today: your government, platforms or international bodies? Justify with one example."], 6, 4),
    ],
    exit: ["Name one right that technology both protects and threatens. Explain both sides briefly."],
  },

  "hl-9": {
    q: "Has technology made war and conflict more or less dangerous?",
    obj: ["Explain cyber conflict, autonomous weapons and disinformation", "Build a process chain of a cyber attack or a disinformation campaign", "Evaluate interventions for peace and security"],
    c3: "Concepts: <b>power, systems, values and ethics</b>. Content: networks, AI, robots and autonomous technologies, media. Contexts: political, social.",
    terms: [["Cyber conflict", "Use of digital attacks by states or groups to damage, spy or disrupt"], ["Lethal autonomous weapon (LAWS)", "A weapon that can select and engage targets without human control"], ["Disinformation", "False information spread deliberately to deceive"], ["Deepfake", "AI-generated audio/video that imitates a real person"]],
    acts: [
      R("Cases", `<ul><li><b>Stuxnet (discovered 2010):</b> malware that damaged centrifuges in Iran — the first widely known cyber weapon to cause physical damage.</li>
        <li><b>NotPetya (2017):</b> destructive malware that spread from Ukraine to global companies, causing billions of dollars of losses.</li>
        <li><b>Drones in modern wars:</b> cheap drones changed battlefields; debates at the UN (CCW) on limits for autonomous weapons continue.</li>
        <li><b>Deepfake (2022):</b> a fake video of Ukraine's president asking soldiers to surrender spread online and was quickly debunked.</li></ul>`, 7),
      T("t1", "Process chain: a disinformation campaign", "", ["What happens", "Possible intervention at this stage"], ["Create (who makes the content?)", "Amplify (bots, ads, influencers)", "Spread (algorithms, shares)", "Effect on people / decisions"], 10),
      Q("q1", "Check", [
        ["Why are cyber attacks hard to respond to?", ["They are always legal", "Attribution — it is hard to prove who did it", "They only affect computers", "They are rare"], 1, "Attribution problems weaken deterrence and law."],
        ["A key ethical objection to autonomous weapons is…", ["They are expensive", "No human is accountable for a decision to kill", "They are slow", "They use too much data"], 1, "'Meaningful human control' is central to the debate."]], 4),
      E("e1", "Evaluate an intervention", "Choose ONE: platform deepfake labels / an international treaty on autonomous weapons / national cyber-defence centres. Write your choice in the judgement.", CRIT5, 10),
    ],
    exit: ["Which threat (cyber attack, autonomous weapon, disinformation) affects ordinary citizens most? Why?"],
  },

  "hl-10": {
    q: "How much privacy should we give up for security?",
    obj: ["Explain how facial recognition surveillance works", "Evaluate a surveillance intervention using criteria", "Write a timed 8-mark evaluation"],
    c3: "Concepts: <b>power, identity, values and ethics</b>. Content: data, AI (computer vision). Contexts: political, social.",
    terms: [["Facial recognition", "AI that matches a face image to stored biometric templates"], ["False positive", "The system wrongly matches an innocent person"], ["Function creep", "Data collected for one purpose is later used for others"], ["Mass surveillance", "Monitoring of whole populations rather than specific suspects"]],
    acts: [
      R("Cases", `<ul><li><b>Astana / Almaty:</b> large camera networks with analytics support traffic enforcement and public safety.</li>
        <li><b>London:</b> the Metropolitan Police uses live facial recognition vans at selected locations; supporters cite arrests, critics cite accuracy and consent.</li>
        <li><b>Clearview AI:</b> scraped billions of online photos to build a face database; data-protection regulators in several countries fined it.</li>
        <li><b>EU AI Act:</b> largely bans real-time remote biometric identification in public spaces by police, with narrow exceptions.</li></ul>`, 7),
      T("t1", "Process chain: live facial recognition", "", ["What happens", "Where can errors or abuse happen?"], CHAIN, 10),
      S("s1", "Security argument or privacy argument?", ["Supports surveillance", "Supports privacy"], [["Helps find missing children", 0], ["Chilling effect on protests", 1], ["Higher error rates for some groups", 1], ["Deters crime in busy places", 0], ["Function creep risk", 1], ["Speeds up identification of suspects", 0]], 4),
      W("w1", "8-mark evaluation", "Evaluate the use of facial recognition by police as an intervention to improve public security.", 8, 16),
    ],
    exit: ["Where would YOU draw the line on surveillance? One sentence."],
  },

  "hl-11": {
    q: "Can e-government and e-voting make democracy more inclusive?",
    obj: ["Explain how e-government and e-voting systems work", "Map stakeholder power in eGov.kz and Estonia's i-Voting", "Prepare arguments for a seminar on e-voting"],
    c3: "Concepts: <b>power, systems, identity</b>. Content: data, networks, algorithms (encryption). Contexts: political, social.",
    terms: [["E-government", "Delivering public services and information online"], ["E-voting / i-voting", "Casting a vote electronically; i-voting = over the internet"], ["Digital ID", "An electronic identity used to authenticate citizens"], ["Voter turnout", "Share of eligible voters who actually vote"]],
    acts: [
      R("Cases", `<p><b>Estonia:</b> internet voting since 2005 using the national digital ID card or mobile ID. Voters can re-vote online during the advance period (only the last vote counts) — designed to reduce coercion. In the 2023 parliamentary election, more than half of the votes were cast online.</p>
        <p><b>Kazakhstan — eGov.kz:</b> hundreds of public services online with digital signature (EDS) and biometric/SMS authentication; voting itself remains at polling stations.</p>
        <p><b>Switzerland:</b> paused e-voting trials in 2019 after researchers found serious security flaws, then restarted limited trials with new systems.</p>`, 7),
      T("t1", "Stakeholder power map", "eGov.kz vs Estonia i-Voting.", ["Power (H/L)", "What they gain", "What they risk"], ["Central election commission / government", "Young urban voters", "Elderly rural voters", "Citizens abroad", "Cybersecurity researchers", "Opposition parties"], 12),
      Q("q1", "Check", [
        ["Why can Estonian voters change their online vote?", ["To fix typos", "To protect against coercion — only the final vote counts", "To increase turnout", "Because ballots are free"], 1, ""],
        ["Which is a <b>political</b> implication of e-voting?", ["Lower printing costs", "Lower trust if results are disputed and hard to audit", "Faster internet", "More smartphones sold"], 1, "Trust and verifiability are central political implications."]], 4),
      X("x1", "Seminar on e-voting: prepare", "Bring evidence, not opinions only.", ["Claim FOR e-voting + evidence", "Claim AGAINST e-voting + evidence", "A question you will ask the group"], 10),
      W("w1", "Handout Q3 practice", "Evaluate whether internet voting increases participation and representation.", 8, 16),
    ],
    exit: ["Would e-voting work in Kazakhstan today? One reason for, one against."],
    hw: "Pre-release 2027 link: read I1 (making voting easier) and add two notes to your dossier.",
  },

  "hl-12": {
    q: "Who should decide what is true online during elections?",
    obj: ["Explain online activism and platform governance", "Analyse how misinformation spreads through platform design", "Evaluate interventions: fact-checking, labels, regulation (DSA)"],
    c3: "Concepts: <b>expression, power, values and ethics</b>. Content: media, algorithms. Contexts: political, social.",
    terms: [["Misinformation", "False information shared without intent to deceive"], ["Platform governance", "Rules and processes platforms use to moderate content"], ["Content moderation", "Reviewing and removing or limiting content"], ["Hashtag activism", "Using social media to organise and raise awareness"]],
    acts: [
      R("Cases", `<ul><li><b>Arab Spring (2010–11)</b> and <b>#MeToo (2017)</b> showed how social media helps people organise and be heard.</li>
        <li><b>Myanmar:</b> a UN fact-finding mission (2018) found that Facebook played a role in spreading hate speech against the Rohingya.</li>
        <li><b>EU Digital Services Act:</b> very large platforms must assess and reduce systemic risks, including to elections, and open data to researchers.</li>
        <li>Platforms use fact-checking partners, labels, reduced reach and, on some platforms, community notes.</li></ul>`, 7),
      S("s1", "Activism tool or misinformation risk?", ["Empowers participation", "Risk to democracy", "Both"], [["Livestreaming a peaceful protest", 0], ["Bot networks boosting a hashtag", 1], ["Recommendation algorithms favouring outrage", 1], ["Crowdfunding for a campaign", 0], ["Anonymous accounts", 2], ["Viral memes about candidates", 2]], 5),
      T("t1", "Stakeholder power map: platform governance", "", ["Power", "Interest", "Goal"], ["Platform company", "Government / regulator", "Activists", "Ordinary users", "Fact-checkers", "Advertisers"], 10),
      E("e1", "Evaluate ONE intervention", "Fact-checking labels OR the EU DSA. State which in your judgement.", CRIT5, 10),
    ],
    exit: ["Should platforms remove false election content or only label it? Justify."],
  },

  "hl-13": {
    q: "Can an algorithm be racist or sexist — and how do we audit it?",
    obj: ["Explain sources of algorithmic bias", "Analyse an algorithmic audit case", "Evaluate accessibility as a digital inclusion intervention"],
    c3: "Concepts: <b>identity, power, values and ethics</b>. Content: algorithms, AI, data. Contexts: social, economic, political.",
    terms: [["Algorithmic bias", "Systematic unfair outcomes produced by an algorithm"], ["Training data", "Data used to teach a machine-learning model"], ["Algorithmic audit", "An independent test of a system for bias, accuracy and harm"], ["Accessibility", "Designing technology usable by people with disabilities"]],
    acts: [
      R("Cases", `<ul><li><b>Amazon hiring tool:</b> an experimental CV-screening model trained on past hires downgraded CVs that mentioned "women's"; Amazon dropped it (reported 2018).</li>
        <li><b>Gender Shades (2018):</b> Joy Buolamwini and Timnit Gebru found commercial face-analysis systems were far less accurate for darker-skinned women than for lighter-skinned men.</li>
        <li><b>COMPAS:</b> a ProPublica investigation (2016) reported racial disparities in a US risk-assessment tool used in courts.</li>
        <li><b>New York City Local Law 144:</b> employers using automated hiring tools must commission an annual bias audit (enforced from 2023).</li>
        <li><b>Accessibility:</b> screen readers, captions and WCAG standards make services usable for people with disabilities.</li></ul>`, 8),
      S("s1", "Where does the bias come from?", ["Biased training data", "Design / proxy variable", "Use in context"], [["Past hiring data mostly from men", 0], ["Using postcode, which correlates with ethnicity", 1], ["A face dataset with few darker-skinned faces", 0], ["Police deploying a tool only in poor districts", 2], ["Optimising for 'culture fit'", 1], ["Using a model built in one country in another", 2]], 6),
      T("t1", "Algorithmic audit case analysis", "Choose one case above.", ["Your analysis"], ["System and purpose", "Who was harmed and how?", "Cause of bias", "How was it discovered?", "What changed afterwards?", "What should an audit check?"], 14),
      X("x1", "Accessibility", "", ["Choose one public digital service in Kazakhstan. Suggest two changes that would make it more accessible and explain who benefits."], 6, 4),
    ],
    exit: ["Is an independent audit enough to make an algorithm fair? Why or why not?"],
  },

  "hl-14": {
    q: "Which intervention best protects human rights — and how do we know?",
    obj: ["Synthesise 5.2A–C cases and interventions", "Compare interventions across sub-topics", "Write a timed Section B response (Summative 2)"],
    c3: "Concepts: all seven — especially <b>power</b> and <b>values and ethics</b>.",
    acts: [
      T("t1", "5.2 synthesis grid", "One strong example per sub-topic.", ["Intervention (who, where, when)", "Strongest impact", "Biggest limitation", "Concept"], ["5.2A Conflict, peace and security", "5.2B Participation and representation", "5.2C Diversity and discrimination"], 12),
      Q("q1", "Quick recall", [
        ["Which EU law sets duties for large platforms on election risks?", ["GDPR", "Digital Services Act", "AI Act", "Platform Work Directive"], 1, ""],
        ["Estonia has used internet voting since…", ["1995", "2005", "2015", "2022"], 1, ""],
        ["Gender Shades studied bias in…", ["Search engines", "Face-analysis systems", "Credit scores", "Voting machines"], 1, ""],
        ["The EU AI Act largely bans police use of…", ["CCTV", "Real-time remote biometric identification in public", "Body cameras", "Drones"], 1, ""]], 5),
      W("w1", "Summative 2 — Paper 1 Section B", "<b>Discuss</b> the extent to which digital interventions have protected human rights in one area of governance you have studied.", 12, 30),
    ],
    exit: ["Compare with Summative 1: what improved? What is your next target?"],
  },
};
