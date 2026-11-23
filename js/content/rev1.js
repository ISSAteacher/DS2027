// Unit 1 · Revisiting digital society — concepts and content 3.1–3.2 (blocks 1–6)
import { R, Q, M, S, T, X, E, W } from "./h.js";

const CONCEPT_TERMS = [["Change", "How digital systems transform, and are transformed by, people and societies over time"], ["Expression", "How people convey ideas, emotions and creativity through digital media"], ["Identity", "How people define themselves and are defined by others, online and offline"], ["Power", "Who can influence, control or decide — and how technology shifts this"], ["Space", "How technology changes physical and virtual places, distance and access"], ["Systems", "Interconnected parts — people, technology, rules — that affect each other"], ["Values and ethics", "Beliefs about right and wrong that shape and judge technology"]];

export default {
  "rev-1": {
    q: "What do I already know about digital society — and where are my gaps?",
    obj: ["Explain the 3Cs framework: concepts, content, contexts", "Complete a diagnostic test on the whole course", "Set personal revision priorities"],
    c3: "<b>Concepts</b> (2.1–2.7) are the lenses; <b>content</b> (3.1–3.7) is the technology; <b>contexts</b> (4.1–4.7) are the areas of life affected. Every strong answer links all three.",
    terms: [["Concept", "A big idea used to analyse digital systems (e.g. power)"], ["Content", "The digital technology itself (e.g. AI)"], ["Context", "Where impacts happen (e.g. health)"], ["Real-world example", "A specific, verifiable case: who, what, where, when"]],
    acts: [
      R("The 3Cs framework", `<div class="cols3"><div><b>Concepts</b><br>2.1 Change · 2.2 Expression · 2.3 Identity · 2.4 Power · 2.5 Space · 2.6 Systems · 2.7 Values and ethics</div><div><b>Content</b><br>3.1 Data · 3.2 Algorithms · 3.3 Computers · 3.4 Networks and the internet · 3.5 Media · 3.6 AI · 3.7 Robots and autonomous technologies</div><div><b>Contexts</b><br>4.1 Cultural · 4.2 Economic · 4.3 Environmental · 4.4 Health · 4.5 Human knowledge · 4.6 Political · 4.7 Social</div></div>
        <p><b>Example:</b> TikTok's recommendation algorithm (3.2) shapes what teenagers see (4.7 social) and gives the platform <b>power</b> (2.4) over attention.</p>`, 5),
      Q("q1", "Diagnostic test (part 1): concepts and content", [
        ["Which concept best fits: 'A government can switch off the internet in one region'?", ["Expression", "Power", "Space", "Change"], 1, ""],
        ["Metadata is…", ["Data about data", "Very large data", "Encrypted data", "Deleted data"], 0, ""],
        ["An algorithm must be…", ["Written in Python", "A finite sequence of well-defined steps", "Always fair", "Run on the internet"], 1, ""],
        ["Which is an example of supervised machine learning?", ["Grouping customers without labels", "Learning to classify emails as spam from labelled examples", "A robot learning by trial and reward", "Writing an if-statement"], 1, ""],
        ["The difference between the internet and the web:", ["They are the same", "The web is a service that runs on the internet", "The internet runs on the web", "The web is wireless"], 1, ""],
        ["AR differs from VR because AR…", ["Needs no device", "Overlays digital content on the real world", "Is only for games", "Replaces the real world fully"], 1, ""]], 10),
      Q("q2", "Diagnostic test (part 2): contexts and skills", [
        ["Telemedicine is mainly in which context?", ["Cultural", "Health", "Environmental", "Political"], 1, ""],
        ["Which command term needs a judgement?", ["Identify", "Describe", "Evaluate", "Outline"], 2, ""],
        ["In Paper 2, OPVL stands for…", ["Origin, Purpose, Value, Limitation", "Opinion, Point, View, Line", "Order, Process, Value, Logic", "Origin, Plan, Verify, List"], 0, ""],
        ["An implication is…", ["The same as an impact", "A wider, longer-term consequence", "A type of data", "A definition"], 1, ""]], 6),
      T("t1", "Self-rating: how confident am I?", "Write 1 (not at all) to 5 (very) and one example you know.", ["Confidence 1–5", "An example I could use"], ["Concepts 2.1–2.7", "Data & algorithms", "Computers & networks", "Media, AI & robots", "Contexts 4.1–4.7", "Paper 1 technique", "Paper 2 sources"], 8),
      T("t2", "Map one example with the 3Cs", "Choose a technology you used today.", ["Your answer"], ["Technology (content)", "Concept that explains it best", "Context(s) affected", "One impact", "One implication"], 8),
    ],
    exit: ["My top two revision priorities are…"],
  },

  "rev-2": {
    q: "How do digital systems change how we express ourselves?",
    obj: ["Define and apply the concepts of change and expression", "Distinguish types of change (sudden/gradual, intended/unintended)", "Build a concept map with real examples"],
    c3: "Concepts 2.1 Change and 2.2 Expression.",
    terms: CONCEPT_TERMS.slice(0, 2).concat([["Disruption", "A sudden change that reshapes an industry or habit"], ["Affordance", "What a technology makes possible or easy for users"]]),
    acts: [
      R("Change and expression", `<p><b>Change</b> can be gradual (the slow shift from print to digital news) or sudden (lockdown moving schools online in 2020); intended or unintended; reversible or not.</p>
        <p><b>Expression</b> covers how people share ideas, art and identity: memes, short videos, music production apps, emojis, livestreams. Platforms' affordances (length limits, filters, algorithms) shape what people express.</p>`, 5),
      S("s1", "Change or expression?", ["Mainly change", "Mainly expression"], [["Streaming replaced CD sales", 0], ["A student makes a TikTok dance", 1], ["Banks close branches as apps grow", 0], ["Fans write fan fiction online", 1], ["Remote work becomes normal", 0], ["An artist sells digital art", 1]], 4),
      T("t1", "Concept map", "Give one real example for each.", ["Example (who, where, when)", "Impact"], ["Sudden change", "Gradual change", "Unintended change", "Creative expression", "Political expression", "Limits on expression"], 15),
      Q("q1", "Recall quiz", [
        ["Which is an unintended change?", ["A school adopts a learning platform", "Social media increases anxiety in some teens", "A city launches an app", "A company automates invoices"], 1, ""],
        ["Platform design shapes expression mainly through…", ["Affordances and algorithms", "Hardware only", "Electricity", "Laws only"], 0, ""],
        ["Expression links most closely to which other concept?", ["Space", "Identity", "Systems", "Change"], 1, "Expression is how identity becomes visible."]], 5),
      X("x1", "Apply", "", ["Explain how ONE platform both enables and limits expression. (4 marks)"], 8, 5),
    ],
    exit: ["One change in your life caused by digital technology — gradual or sudden?"],
  },

  "rev-3": {
    q: "Who am I online — and who has power over that?",
    obj: ["Define and apply identity and power", "Analyse how platforms construct digital identities", "Build a concept map and recall quiz"],
    c3: "Concepts 2.3 Identity and 2.4 Power.",
    terms: CONCEPT_TERMS.slice(2, 4).concat([["Digital footprint", "The trail of data a person leaves online"], ["Profiling", "Using data to infer characteristics of a person"]]),
    acts: [
      R("Identity and power", `<p><b>Identity</b>: users curate profiles, but platforms also build hidden profiles (interests, location, likely income) from data. Digital IDs (eGov, biometric passports) make identity machine-readable.</p>
        <p><b>Power</b>: who decides? Governments (laws, shutdowns), companies (terms of service, algorithms), users (boycotts, activism), hackers. Power can be visible or hidden in code.</p>`, 5),
      M("m1", "Match the example to the type of power", [["A platform changes its algorithm and news sites lose traffic", "Corporate power"], ["A government blocks a messaging app", "State power"], ["Users boycott an app over privacy", "Collective user power"], ["Ransomware shuts a hospital", "Disruptive power of non-state actors"]], 5),
      T("t1", "Concept map", "", ["Example", "Who gains / who loses?"], ["Self-presented identity", "Identity assigned by data (profiling)", "Digital ID by state", "Visible power", "Hidden power (in code)"], 14),
      Q("q1", "Recall quiz", [
        ["A digital footprint includes…", ["Only posts you publish", "Active and passive data you leave", "Only deleted data", "Only passwords"], 1, ""],
        ["Profiling relates most to…", ["Identity and power", "Space only", "Expression only", "Change only"], 0, ""]], 4),
      X("x1", "Apply", "", ["Explain how a recommendation system can shape a teenager's identity. (4 marks)"], 8, 5),
    ],
    exit: ["Who has more power over your online identity: you or the platforms? One reason."],
  },

  "rev-4": {
    q: "How do space, systems and values help us analyse any technology?",
    obj: ["Define and apply space, systems, and values and ethics", "Identify ethical dilemmas and stakeholders' values", "Complete concept maps for all seven concepts"],
    c3: "Concepts 2.5 Space, 2.6 Systems, 2.7 Values and ethics.",
    terms: CONCEPT_TERMS.slice(4).concat([["Ethical dilemma", "A situation where values conflict and every choice has a cost"], ["Feedback loop", "Outputs of a system affect its future inputs"]]),
    acts: [
      R("Three more lenses", `<p><b>Space:</b> remote work, virtual classrooms, metaverse spaces, geofencing, the digital divide between city and village.</p>
        <p><b>Systems:</b> a food-delivery app = customers + couriers + restaurants + algorithms + payment + city roads. Change one part and others react (feedback loops).</p>
        <p><b>Values and ethics:</b> privacy vs security, free speech vs harm, efficiency vs jobs. Ethical frameworks: consequences (utilitarian), duties/rights (deontological), character (virtue).</p>`, 6),
      S("s1", "Which concept is the best lens?", ["Space", "Systems", "Values and ethics"], [["Students in villages join city classes via video", 0], ["A ride-hailing price surge pulls more drivers to an area", 1], ["Should parents read their child's messages?", 2], ["Geofenced ads near a stadium", 0], ["A bank outage stops shops and transport", 1], ["Is it fair to use AI to grade essays?", 2]], 5),
      T("t1", "All-seven concept map", "One example each — no repeats!", ["Example", "Key question it raises"], ["Change", "Expression", "Identity", "Power", "Space", "Systems", "Values and ethics"], 15),
      X("x1", "Ethical dilemma", "", ["Dilemma: a school installs AI cameras to detect vaping in toilets. Identify two stakeholders, their values, and give your judgement."], 10, 6),
    ],
    exit: ["Which concept do you find hardest to apply? Why?"],
  },

  "rev-5": {
    q: "Data: what is collected, how is it kept safe, and who benefits?",
    obj: ["Describe types of data and the data life cycle", "Explain data security measures", "Discuss big data and data dilemmas"],
    c3: "Content 3.1 Data. Concepts: power, values and ethics. Contexts: economic, political, health.",
    terms: [["Structured / unstructured data", "Organised in fields (database) vs free form (video, text)"], ["Data life cycle", "Collection → storage → processing → sharing → archiving/deletion"], ["CIA triad", "Confidentiality, integrity, availability — goals of security"], ["Big data", "Data sets so large and fast (volume, velocity, variety) that new tools are needed"], ["Informed consent", "Agreeing to data use with clear understanding"]],
    acts: [
      S("s1", "Classify the data", ["Quantitative", "Qualitative", "Metadata"], [["Steps walked today", 0], ["A product review text", 1], ["Time and GPS location of a photo", 2], ["Exam score", 0], ["Interview recording", 1], ["Sender and time of an email", 2]], 4),
      T("t1", "Data life cycle: eGov.kz or a fitness app", "Choose one.", ["What happens", "Risk", "Protection"], ["Collection", "Storage", "Processing", "Sharing", "Deletion"], 12),
      M("m1", "Match the security measure to its goal", [["Encryption", "Confidentiality — only authorised people read data"], ["Hashing / checksums", "Integrity — data is not altered"], ["Backups and redundancy", "Availability — data is there when needed"], ["Two-factor authentication", "Stronger proof of identity"]], 5),
      X("x1", "Dilemmas", "", ["Big data helped track disease spread during COVID-19. Explain one benefit and one ethical problem.", "Should a school be allowed to sell anonymised student data to an ed-tech company? Justify."], 12),
      Q("q1", "Check", [
        ["Which is NOT one of the 'Vs' of big data?", ["Volume", "Velocity", "Variety", "Visibility"], 3, ""],
        ["Anonymised data can still be risky because…", ["It is encrypted", "Combining datasets can re-identify people", "It is small", "It is deleted"], 1, ""]], 4),
    ],
    exit: ["One piece of data about you that you would never share — and why."],
  },

  "rev-6": {
    q: "How do algorithms decide — and should they?",
    obj: ["Describe characteristics of algorithms", "Represent an algorithm with pseudocode or a flowchart", "Explain uses and dilemmas of algorithms"],
    c3: "Content 3.2 Algorithms. Concepts: power, values and ethics, systems.",
    terms: [["Algorithm", "A finite, unambiguous sequence of steps to solve a problem"], ["Flowchart", "A diagram representing an algorithm with symbols"], ["Pseudocode", "Structured plain-language description of an algorithm"], ["Recommendation algorithm", "Ranks content for a user from their data and others' behaviour"], ["Transparency", "Being able to see and understand how decisions are made"]],
    acts: [
      Q("q1", "Characteristics", [
        ["Which is a required property of an algorithm?", ["It runs forever", "Each step is precisely defined", "It uses AI", "It needs internet"], 1, ""],
        ["A flowchart diamond represents…", ["Start/stop", "Input/output", "A decision", "A process"], 2, ""],
        ["What does a sorting algorithm do?", ["Encrypts data", "Puts items in order", "Deletes duplicates only", "Searches the web"], 1, ""]], 5),
      X("x1", "Write pseudocode", "Write a simple algorithm: <i>A library app recommends a book. If the student read 3+ books of one genre, recommend a new book of that genre; otherwise recommend the most popular book.</i>", ["Your pseudocode"], 12, 8),
      S("s1", "Benefit or concern?", ["Benefit", "Concern"], [["Spam filters protect inboxes", 0], ["Filter bubbles narrow views", 1], ["Route planning saves fuel", 0], ["Opaque credit scoring", 1], ["Fraud detection at banks", 0], ["Automated content takedowns of legitimate posts", 1]], 4),
      X("x2", "Dilemma", "", ["Explain why algorithmic transparency matters for a university admissions algorithm. (4 marks)"], 8, 5),
    ],
    exit: ["Name one algorithm that affected you today."],
  },
};
