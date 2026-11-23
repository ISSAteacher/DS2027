// HL extension · 5.3 Sustainable development + Paper 3 (L15–L21)
import { R, Q, M, S, T, X, E, W, CRIT5, CHAIN, CHECK4 } from "./h.js";

const P3_SRC = `<div class="source"><b>Source A — Pre-released context (summary)</b><p>Many democracies face falling turnout, especially among young people and citizens who live far from polling stations. Governments are testing two types of intervention: <b>I1 — making voting easier</b> (a two-week voting period through an official app, plus self-service voting kiosks in public buildings) and <b>I2 — making voting compulsory</b> (registration at least one month before the election, voting at an official voting centre, and fines for not voting).</p></div>
<div class="source"><b>Source B — The Republic of Aralia (fictional case)</b><p>Aralia's Electoral Office piloted <i>VoteNow</i>, an app that lets citizens vote for 14 days using their national digital ID. 40 kiosks were placed in libraries and post offices. Turnout among 18–25-year-olds rose from 31% to 44% in pilot districts. However, 12% of kiosk users needed help from staff, and an opposition party claimed it could not independently verify the app's results.</p></div>
<div class="source"><b>Source C — Two views</b><p><b>Dana Abenova, Electoral Office director:</b> "VoteNow brings the ballot box to people's pockets. Every audit we ran matched the paper backups."</p>
<p><b>Marat Seitkali, rural community leader:</b> "Half our village has no stable signal. If you want everyone to vote, make it a duty and open more centres — don't build a system for city phones."</p></div>`;

export default {
  "hl-15": {
    q: "Is digital technology part of the climate solution — or part of the problem?",
    obj: ["Explain how climate modelling and smart grids support climate action", "Analyse the energy cost of data centres and AI", "Complete an intervention evaluation card and an 8-mark response"],
    c3: "Concepts: <b>systems, change, values and ethics</b>. Content: computers, data, AI, networks. Contexts: environmental, economic, political.",
    terms: [["Climate model", "A computer simulation of the climate system used to project future change"], ["Smart grid", "An electricity network that uses data and automation to balance supply and demand"], ["Data centre", "A facility of servers that stores and processes data"], ["Rebound effect", "Efficiency gains lead to more use, cancelling some savings"]],
    acts: [
      R("Facts and cases", `<ul><li><b>Climate modelling:</b> supercomputers run models that inform IPCC reports and national adaptation plans.</li>
        <li><b>Smart grids:</b> sensors and smart meters help integrate variable wind and solar power — relevant as Kazakhstan expands renewables alongside coal.</li>
        <li><b>Energy cost of AI:</b> the IEA estimates data centres used about 1.5% of global electricity in 2024 and expects demand to roughly double by 2030, driven largely by AI.</li>
        <li><b>Water:</b> many data centres also use large amounts of water for cooling.</li></ul>`, 7),
      S("s1", "Helps the climate, harms it, or both?", ["Helps", "Harms", "Both / depends"], [["Smart meters that shift demand to off-peak hours", 0], ["Training very large AI models on coal-powered electricity", 1], ["AI that optimises wind-farm output", 0], ["Streaming video in high resolution all day", 1], ["Building a data centre next to a hydro plant", 2], ["Replacing business flights with video calls", 2]], 5),
      T("t1", "Intervention evaluation card: smart grid", "", ["Notes"], ["What problem does it address?", "How does it work? (process chain)", "Stakeholders who gain", "Stakeholders who lose", "Evidence of effectiveness", "Trade-off"], 10),
      W("w1", "8-mark response", "Evaluate whether the benefits of AI for climate action outweigh its environmental costs.", 8, 16),
    ],
    exit: ["One action a school could take to reduce its digital carbon footprint."],
  },

  "hl-16": {
    q: "Can data help us use land, water and minerals responsibly?",
    obj: ["Explain precision agriculture and smart water management", "Analyse the hidden costs of rare-earth and critical minerals", "Evaluate an intervention with an evaluation card"],
    c3: "Concepts: <b>systems, power, space</b>. Content: data, robots, AI, computers (hardware). Contexts: environmental, economic.",
    terms: [["Precision agriculture", "Using sensors, GPS, drones and data to apply water, seed or chemicals only where needed"], ["Critical minerals", "Minerals essential for technology and energy (lithium, cobalt, rare earths)"], ["Supply chain", "All the steps to produce and deliver a product"]],
    acts: [
      R("Cases", `<ul><li><b>Precision spraying:</b> camera-equipped sprayers (e.g. "See & Spray") detect weeds and spray only them, reducing herbicide use.</li>
        <li><b>Smart irrigation:</b> soil-moisture sensors and drip systems cut water use — vital in Central Asia, where the Aral Sea shrank because of irrigation.</li>
        <li><b>Critical minerals:</b> much of the world's cobalt comes from the DR Congo, where informal mining has been linked to child labour; most rare-earth processing is concentrated in China. Kazakhstan is exploring its own critical-mineral deposits.</li></ul>`, 7),
      T("t1", "Process chain: smart irrigation", "", ["What happens", "Who controls this step?"], CHAIN, 8),
      M("m1", "Match the problem to the intervention", [["Over-use of fertiliser", "Variable-rate application using GPS soil maps"], ["Water lost in canals and fields", "Soil-moisture sensors and drip irrigation"], ["Unethical cobalt mining", "Supply-chain traceability and audits"], ["Short device lifespans", "Design for repair and recycling of minerals"]], 5),
      T("t2", "Intervention evaluation card: precision agriculture", "", ["Notes"], ["Problem addressed", "Who can afford it?", "Impact on small farmers", "Environmental benefit", "Data ownership question", "Overall judgement"], 10),
      W("w1", "8-mark response", "Discuss whether precision agriculture is an equitable intervention for responsible use of resources.", 8, 16),
    ],
    exit: ["Who owns the data a farm sensor collects — the farmer or the company? Why does it matter?"],
  },

  "hl-17": {
    q: "Where does your old phone go — and who pays the price?",
    obj: ["Explain the e-waste problem and the right-to-repair movement", "Explain how air-quality sensing networks work", "Evaluate interventions for managing pollution and waste"],
    c3: "Concepts: <b>systems, values and ethics, power</b>. Content: computers, networks, data. Contexts: environmental, health, economic.",
    terms: [["E-waste", "Discarded electrical and electronic equipment"], ["Right to repair", "Rules that give consumers access to parts, tools and information to fix devices"], ["Planned obsolescence", "Designing products to have a limited useful life"], ["Citizen science", "Members of the public collecting scientific data"]],
    acts: [
      R("Facts and cases", `<ul><li>The <b>Global E-waste Monitor 2024</b> reported 62 million tonnes of e-waste in 2022, with only about 22% documented as properly collected and recycled.</li>
        <li><b>EU right-to-repair rules (2024)</b> require manufacturers to offer repair for some products; the EU also made USB-C a common charger.</li>
        <li><b>Almaty:</b> citizen air-quality sensor networks (e.g. AirKaz) publish live PM2.5 data, raising public pressure about winter smog from coal heating.</li>
        <li><b>Delhi</b> and other cities combine low-cost sensors with satellite data to map pollution hot-spots.</li></ul>`, 7),
      Q("q1", "Paper 3 Q1-style: precise terms", [
        ["Which term best describes securely removing all data from a device before reuse?", ["Data deleting", "Data sanitization", "Formatting", "Factory mode"], 1, "Examiners did not accept 'data deleting' for data sanitization in May 2026."],
        ["Which is the strongest reason a company MUST manage e-waste?", ["It wants a green image", "Legal obligations such as extended producer responsibility", "Customers like it", "It is cheap"], 1, "Necessity vs desire — a typical Q1 trap."]], 4),
      T("t1", "Evaluation cards: three interventions", "", ["Effectiveness", "Equity", "Feasibility", "Main trade-off"], ["Right to repair law", "Device take-back / recycling scheme", "Citizen air-quality sensor network"], 12),
      W("w1", "8-mark response", "Evaluate the effectiveness of right-to-repair laws in reducing e-waste.", 8, 16),
    ],
    exit: ["Which is better for the environment: recycling or reuse? Give one reason."],
  },

  "hl-18": {
    q: "How do I turn knowledge into Paper 3 marks?",
    obj: ["Synthesise 5.3A–C", "Explain the structure, command terms and demands of Paper 3 Q1–Q4", "Analyse a specimen-style question and plan answers"],
    c3: "All 3Cs — integrate them into arguments, not as a separate paragraph.",
    terms: [["Pre-released statement", "250–400 words about the challenge, published before the exam"], ["Source booklet", "Unseen sources about an organisation and interventions"], ["Trade-off", "Gaining one benefit means accepting a cost elsewhere"]],
    acts: [
      R("Paper 3 structure", `<table class="tbl"><tr><th>Q</th><th>Marks</th><th>What examiners want</th><th>Time</th></tr>
        <tr><td>Q1 a,b</td><td>4</td><td>Precise definitions / reasons from the source</td><td>≈ 5 min</td></tr>
        <tr><td>Q2 a,b</td><td>6</td><td>Explain: what → how → effect, for the named stakeholder</td><td>≈ 12 min</td></tr>
        <tr><td>Q3</td><td>8</td><td>Analyse / evaluate viewpoints or interventions using Source A, B…; balanced, with conclusion</td><td>≈ 20 min</td></tr>
        <tr><td>Q4</td><td>12</td><td>Recommend: apply every evaluation criterion to the organisation, trade-offs, sources + own research, justified recommendation</td><td>≈ 33 min</td></tr></table>`, 6),
      M("m1", "Match the command term to what you must do", [["Identify", "Name a point or example briefly"], ["Explain", "Give reasons and show how/why"], ["Evaluate", "Weigh strengths and limitations and judge"], ["Recommend", "Propose a course of action and justify it with trade-offs"], ["To what extent", "Judge the degree, with evidence on both sides"]], 5),
      S("s1", "Strong or weak Q4 habit?", ["Strong", "Weak"], [["Context of the organisation in every paragraph", 0], ["Pre-learned essay with the name changed", 1], ["'Research shows…' with no details", 1], ["Citing Source B and an independent study with year", 0], ["Using only cost as a criterion", 1], ["Trade-offs between AND within interventions", 0]], 5),
      T("t1", "5.3 synthesis", "", ["Best intervention + example", "Main trade-off"], ["5.3A Climate change and action", "5.3B Responsible use of resources", "5.3C Pollution and waste"], 10),
      X("x1", "Plan a Q4 (do not write in full)", "<i>Recommend which intervention an organisation should adopt to reduce e-waste.</i>", ["Recommendation in one sentence", "Criterion 1 applied to the organisation", "Criterion 2 applied", "Trade-off", "Source + independent evidence", "Why the alternative is weaker"], 12, 2),
    ],
    exit: ["Your personal Paper 3 timing plan (minutes per question)."],
  },

  "hl-19": {
    q: "What is the 2027 challenge really about — and who has a stake in it?",
    obj: ["Unpack the May 2027 pre-released statement (political speech and activism)", "Identify stakeholders and existing interventions I1 and I2", "Start the research dossier"],
    c3: "5.2B Participation and representation. Concepts: <b>power, identity, values and ethics</b>. Contexts: political, social.",
    terms: [["Compulsory voting", "Citizens are legally required to vote (e.g. Australia, Belgium)"], ["Voter registration", "Being placed on the official list of eligible voters"], ["Voter suppression", "Practices that discourage or prevent people from voting"]],
    acts: [
      R("Pre-release 2027 in brief", `<p><b>I1 — Making voting easier:</b> voting through an official app over two weeks, plus voting kiosks.</p><p><b>I2 — Making voting compulsory:</b> registration one month before the election, voting at an official centre, fines for non-voters.</p>
        <p>Real-world anchors: Estonia (i-voting), Australia and Belgium (compulsory voting), Brazil (compulsory voting with electronic voting machines), Switzerland (e-voting trials).</p>`, 5),
      T("t1", "Unpack the challenge", "", ["Notes"], ["What is the problem (in one sentence)?", "Why does it matter now?", "Key terms to define precisely", "Assumptions in the statement", "Questions I still have"], 10),
      T("t2", "Stakeholders × interventions", "", ["Impact of I1 (app + kiosks)", "Impact of I2 (compulsory)"], ["Young voters", "Elderly / rural voters", "Low-income citizens", "Electoral commission", "Political parties", "Civil society / observers"], 14),
      T("t3", "Dossier starter", "Find at least 3 sources.", ["Source (author, year, link)", "Key evidence / figure", "Supports I1 or I2?"], ["Source 1", "Source 2", "Source 3"], 12),
    ],
    exit: ["Right now, which intervention would you recommend and why? (You can change your mind later.)"],
    hw: "Add 3 more sources to the dossier and post one related news item in the News tab.",
  },

  "hl-20": {
    q: "Can I answer Q1–Q4 on an unseen source under time pressure?",
    obj: ["Apply the pre-release to an unseen source", "Answer Paper 3 Q1–Q4", "Peer-mark with the markbands"],
    c3: "Use Sources by letter. Integrate concepts in Q3–Q4.",
    acts: [
      R("Source booklet (practice)", P3_SRC, 8),
      X("x1", "Q1 [4]", "", ["(a) Define <i>digital ID</i>. [2]", "(b) Identify two reasons why the Electoral Office introduced kiosks as well as the app. [2]"], 5),
      X("x2", "Q2 [6]", "Use what → how → effect.", ["(a) Explain how the 14-day app voting period could increase turnout among young voters. [3]", "(b) Explain one disadvantage of kiosks for elderly voters. [3]"], 12, 4),
      W("w1", "Q3 [8]", "Evaluate the viewpoints of Dana Abenova and Marat Seitkali (Source C) on how to increase participation.", 8, 20),
      W("w2", "Q4 [12]", "Recommend which intervention, I1 or I2, the Republic of Aralia should adopt to improve participation and representation.", 12, 33),
      X("x3", "Peer marking", "Swap with a partner and use the markbands.", ["Partner's estimated marks (Q1/Q2/Q3/Q4)", "One strength", "One target"], 8, 2),
    ],
    exit: ["Which question cost you the most time? What will you change in the mock?"],
  },

  "hl-21": {
    q: "Summative 3: full Paper 3 mock",
    obj: ["Complete Paper 3 under exam conditions (1 h 15 min)", "Review answers against the markbands and set targets"],
    c3: "Exam conditions: no notes. Use the timer in each question.",
    acts: [
      R("Instructions", `<p>Answer <b>all</b> questions. Total 30 marks. Suggested timing: Q1 5 min, Q2 12 min, Q3 20 min, Q4 33 min, check 5 min. Your teacher will give you the mock source booklet; if it is not provided, use the practice sources from L20.</p>`, 2),
      X("x1", "Question 1 [4]", "", ["(a) [2]", "(b) [2]"], 5),
      X("x2", "Question 2 [6]", "", ["(a) [3]", "(b) [3]"], 12, 4),
      W("w1", "Question 3 [8]", "Write your answer to Question 3 from the mock booklet.", 8, 20),
      W("w2", "Question 4 [12]", "Write your answer to Question 4 from the mock booklet.", 12, 33),
      X("x3", "Review after marking", "", ["My marks Q1/Q2/Q3/Q4 and total", "Biggest strength", "Two targets before May 2027"], 10, 2),
    ],
  },
};
