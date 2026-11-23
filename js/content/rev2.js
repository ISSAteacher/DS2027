// Unit 1 · content 3.3–3.7, formatives, summative 1 (blocks 7–15)
import { R, Q, M, S, T, X, E, W } from "./h.js";

export const P1 = (id, title, stim, parts) => [
  R(title + ": stimulus", `<div class="source">${stim}</div>`, 3),
  X(id + "a", "Part (a) [2]", "", [parts[0]], 4, 3),
  X(id + "b", "Part (b) [4]", "", [parts[1]], 8, 5),
  W(id + "c", "Part (c) [6]", parts[2], 6, 12),
  W(id + "d", "Part (d) [8]", parts[3], 8, 16),
];

export default {
  "rev-7": {
    q: "From supercomputers to smart fridges: how have computers changed society?",
    obj: ["Describe types and components of computers", "Explain how code becomes instructions a computer runs", "Explain the evolution of computing and its implications"],
    c3: "Content 3.3 Computers. Concepts: change, systems, power. Contexts: economic, environmental.",
    terms: [["CPU", "Processes instructions (fetch–decode–execute)"], ["RAM", "Fast, volatile memory for running programs"], ["Embedded system", "A computer built into another device with a dedicated function"], ["Compiler / interpreter", "Translate high-level code into machine code"], ["Moore's law", "Observation that transistor counts roughly doubled every two years"]],
    acts: [
      M("m1", "Match the type of computer to an example", [["Supercomputer", "Weather and climate modelling"], ["Server", "Hosting a school website"], ["Embedded system", "A washing machine controller"], ["Mobile device", "A smartphone"], ["Quantum computer (emerging)", "Experimental problems in cryptography and chemistry"]], 5),
      S("s1", "Component sort", ["Processing", "Memory / storage", "Input / output"], [["CPU", 0], ["GPU", 0], ["RAM", 1], ["SSD", 1], ["Touchscreen", 2], ["Microphone", 2]], 4),
      T("t1", "Evolution of computing", "Give one implication of each shift.", ["Implication for society"], ["Mainframes → personal computers", "PCs → smartphones", "Local storage → cloud computing", "General CPUs → AI chips (GPUs/TPUs)"], 10),
      X("x1", "Explain", "", ["Explain the difference between a compiler and an interpreter. (4 marks)", "Explain one environmental impact of the rapid replacement of computers. (4 marks)"], 12, 4),
    ],
    exit: ["Which shift in computing had the biggest impact on your generation?"],
  },

  "rev-8": {
    q: "How does the internet actually work — and who controls it?",
    obj: ["Describe types and components of networks", "Distinguish the internet and the web; explain DNS and HTTP(S)", "Discuss dilemmas: shutdowns, net neutrality, surveillance"],
    c3: "Content 3.4 Networks and the internet. Concepts: power, space, systems. Contexts: political, economic, social.",
    terms: [["LAN / WAN", "Local area network / wide area network"], ["Router", "Forwards data packets between networks"], ["TCP/IP", "Core protocols for sending data across the internet"], ["DNS", "Translates domain names into IP addresses"], ["Net neutrality", "Principle that all internet traffic is treated equally"]],
    acts: [
      T("t1", "What happens when you open eGov.kz?", "Put the journey into steps.", ["What happens"], ["You type the address", "DNS lookup", "Request sent (HTTPS)", "Packets routed", "Server responds", "Browser renders the page"], 10),
      Q("q1", "Check", [
        ["Which is a WAN?", ["Home Wi-Fi", "The internet", "Bluetooth headphones", "A school lab"], 1, ""],
        ["HTTPS adds…", ["Speed", "Encryption between browser and server", "Colour", "Free access"], 1, ""],
        ["The web is…", ["All networks", "Linked documents and apps accessed over the internet", "Fibre cables", "A type of router"], 1, ""]], 4),
      S("s1", "Who holds power?", ["Governments", "Companies", "Users / civil society"], [["Ordering an internet shutdown", 0], ["Owning undersea cables", 1], ["Running community mesh networks", 2], ["Prioritising own streaming service traffic", 1], ["Requiring data to be stored locally", 0], ["Using VPNs to bypass blocks", 2]], 5),
      X("x1", "Dilemma", "", ["Discuss whether governments should ever be allowed to shut down the internet. (8-mark plan: 2 claims, 1 counterclaim, judgement)"], 12, 6),
    ],
    exit: ["Explain DNS to a 10-year-old in one sentence."],
  },

  "rev-9": {
    q: "Formative 1: can I answer Paper 1 questions on 3.1–3.4?",
    obj: ["Answer a Paper 1-style structured question under time", "Self-mark against the markband checklist"],
    c3: "Use precise terminology and a real-world example in every part.",
    acts: [
      ...P1("f1", "Question 1", `<b>Kazakhstan's digital government.</b> eGov.kz lets citizens access hundreds of public services online using a digital signature or biometric login. Data from many ministries is linked so that, for example, a birth registration can automatically trigger child-benefit payments.`,
        ["Identify two types of data collected by eGov.kz.", "Explain how data is kept secure when citizens log in to eGov.kz.", "Explain two impacts of linking data between government ministries.", "Evaluate the use of a single government data system for delivering public services."]),
      X("rv", "Self-mark", "", ["Estimated marks a/b/c/d", "What I need to revise"], 5, 2),
    ],
  },

  "rev-10": {
    q: "Real, fake or immersive: how is digital media changing what we believe?",
    obj: ["Describe digital and immersive media (VR, AR, MR)", "Explain media dilemmas: deepfakes, intellectual property, misinformation", "Apply concepts of expression and values"],
    c3: "Content 3.5 Media. Concepts: expression, identity, values and ethics. Contexts: cultural, political, social.",
    terms: [["Immersive media", "Media that surrounds the user (VR, AR, MR)"], ["Deepfake", "Synthetic audio/video imitating a real person"], ["Intellectual property", "Legal rights over creations (copyright, trademarks)"], ["Creative Commons", "Licences that let creators share work with conditions"]],
    acts: [
      M("m1", "Match", [["Virtual reality (VR)", "A headset replaces your surroundings with a simulated world"], ["Augmented reality (AR)", "A phone shows furniture placed in your real room"], ["Mixed reality (MR)", "Virtual objects interact with real ones in real time"], ["Livestreaming", "Real-time video broadcast to an audience"]], 5),
      S("s1", "Opportunity or risk?", ["Opportunity", "Risk", "Both"], [["VR surgical training", 0], ["Voice-cloning scams", 1], ["AI-generated music", 2], ["Virtual museum tours", 0], ["Deepfake election ads", 1], ["Filters on selfies", 2]], 5),
      X("x1", "Deepfake dilemma", "", ["Explain two ways deepfakes threaten trust in media. (4 marks)", "Suggest one technical and one legal response."], 10, 4),
      X("x2", "IP dilemma", "", ["Should AI companies be allowed to train on artists' work without permission? Give one argument each way and your judgement."], 8, 5),
    ],
    exit: ["How do you check whether a viral video is real?"],
  },

  "rev-11": {
    q: "How does AI learn — and can we trust what it decides?",
    obj: ["Distinguish types of AI and machine learning", "Describe how neural networks are trained", "Discuss AI dilemmas: bias, explainability, jobs, misuse"],
    c3: "Content 3.6 AI. Concepts: power, change, values and ethics. Contexts: all.",
    terms: [["Narrow AI", "AI designed for a specific task"], ["Machine learning", "Systems that improve at a task by learning patterns from data"], ["Supervised / unsupervised / reinforcement", "Learn from labelled data / find patterns without labels / learn from rewards"], ["Neural network", "Layers of connected nodes whose weights are adjusted during training"], ["Explainability", "Ability to explain why an AI produced an output"]],
    acts: [
      S("s1", "Which type of machine learning?", ["Supervised", "Unsupervised", "Reinforcement"], [["Classifying X-rays as healthy/unhealthy from labelled scans", 0], ["Grouping shoppers into segments", 1], ["A game AI improving by winning/losing", 2], ["Predicting house prices from past sales", 0], ["Finding unusual bank transactions without labels", 1], ["A robot learning to walk by trial and error", 2]], 5),
      T("t1", "How a neural network learns", "Explain each step for an image classifier.", ["Explanation"], ["Training data", "Input layer", "Hidden layers and weights", "Output / prediction", "Error and adjustment (training)", "Testing on new data"], 12),
      Q("q1", "Check", [
        ["A large language model is an example of…", ["General AI", "Narrow AI trained on huge text data", "A rule-based expert system", "A robot"], 1, ""],
        ["Why is AI bias hard to fix?", ["AI is always neutral", "Bias often comes from historical data and design choices", "AI cannot be retrained", "Bias only exists in robots"], 1, ""]], 4),
      W("w1", "Practice", "Discuss the extent to which AI should be used to make decisions in education.", 8, 16),
    ],
    exit: ["One AI tool you use. One thing you don't know about how it works."],
  },

  "rev-12": {
    q: "When machines act on their own, who is responsible?",
    obj: ["Describe types and characteristics of robots and autonomous technologies", "Explain sensors, actuators and levels of autonomy", "Discuss dilemmas: safety, accountability, employment"],
    c3: "Content 3.7 Robots and autonomous technologies. Concepts: change, values and ethics, power.",
    terms: [["Robot", "A programmable machine that senses, processes and acts in the physical world"], ["Sensor / actuator", "Detects the environment / produces movement"], ["Autonomy", "Ability to operate without human control"], ["Accountability gap", "Unclear who is responsible when an autonomous system causes harm"]],
    acts: [
      M("m1", "Match", [["Industrial robot", "Welding car bodies on an assembly line"], ["Service robot", "Delivering room service in a hotel"], ["Social robot", "Companion robot for elderly people"], ["Autonomous vehicle", "Robotaxi without a driver"], ["Drone", "Mapping crops from the air"]], 5),
      T("t1", "How a robot vacuum works", "", ["Explanation"], ["Sensors", "Processing / algorithm", "Actuators", "Level of autonomy", "One limitation"], 8),
      X("x1", "Accountability", "", ["A self-driving taxi injures a pedestrian. Who could be responsible (list stakeholders), and who do YOU think should be? Justify."], 10, 6),
      E("e1", "Evaluate delivery robots in Astana", "Rate and justify.", ["Effectiveness", "Safety", "Impact on jobs", "Accessibility for all citizens", "Cost"], 10),
    ],
    exit: ["Would you ride in a robotaxi? Why / why not?"],
  },

  "rev-13": {
    q: "How do the content areas connect to the concepts?",
    obj: ["Link content 3.1–3.7 to concepts 2.1–2.7", "Use one example to show several content areas working together"],
    c3: "Synthesis: content × concepts.",
    acts: [
      T("t1", "Content × concept grid", "For each content area, choose the strongest concept and an example.", ["Strongest concept", "Real example", "Why this concept?"], ["3.1 Data", "3.2 Algorithms", "3.3 Computers", "3.4 Networks", "3.5 Media", "3.6 AI", "3.7 Robots"], 20),
      X("x1", "One system, many contents", "Example: a ride-hailing app.", ["Which content areas does it use? Explain each in one line.", "Which concept best explains its impact on drivers? Why?"], 12),
      Q("q1", "Quick quiz", [
        ["Filter bubbles connect algorithms with which concept most?", ["Space", "Identity / expression", "Change", "Systems"], 1, ""],
        ["Cloud computing changes which concept most obviously?", ["Space", "Expression", "Identity", "Values"], 0, "Data and computing move away from the user's location."]], 4),
    ],
    exit: ["Which content area do you need to revise most?"],
  },

  "rev-14": {
    q: "Formative 2: can I map an unseen example with the 3Cs?",
    obj: ["Apply the 3Cs to an unseen example", "Explain impacts and implications for stakeholders"],
    acts: [
      R("Unseen example", `<div class="source"><b>AI tutors in schools.</b> A city education department gives every Grade 8 student access to an AI chatbot tutor that explains maths problems, tracks mistakes and sends weekly reports to teachers and parents. Some parents praise the extra help; others worry about data collection and students copying answers.</div>`, 3),
      T("t1", "3Cs mapping", "", ["Your analysis"], ["Content areas involved (and how)", "Concept 1 + explanation", "Concept 2 + explanation", "Context(s)", "Stakeholders", "Impacts", "Implications"], 20),
      W("w1", "Extended response", "Evaluate the use of AI tutors in this city's schools.", 8, 16),
    ],
  },

  "rev-15": {
    q: "Summative 1: Paper 1-style test on concepts and content",
    obj: ["Answer two structured questions under exam conditions"],
    acts: [
      ...P1("s1q1", "Question 1", `<b>Smart cameras on buses.</b> A city installs AI cameras on buses that count passengers, detect fare evasion and recognise faces of wanted people. Data is stored on a cloud server for 30 days.`,
        ["Identify two types of data the cameras collect.", "Explain how machine learning allows the cameras to recognise faces.", "Explain two impacts of storing the data in the cloud.", "Discuss whether the benefits of the system outweigh concerns about privacy."]),
      ...P1("s1q2", "Question 2", `<b>Music streaming.</b> A streaming platform uses an algorithm to create personalised playlists. Independent artists say it is hard to be discovered; the platform says personalisation helps listeners find new music.`,
        ["Outline two characteristics of an algorithm.", "Explain how a recommendation algorithm uses data to create a playlist.", "Explain the concept of power in relation to the streaming platform and artists.", "Evaluate the impact of recommendation algorithms on cultural expression."]),
    ],
  },

  "rev-16": {
    q: "How is digital technology changing culture?",
    obj: ["Explain impacts of digital systems in the cultural context", "Use local and global examples", "Apply concepts of expression and identity"],
    c3: "Context 4.1 Cultural: arts, entertainment, popular culture, subcultures, language, heritage.",
    terms: [["Cultural homogenisation", "Global platforms making cultures more similar"], ["Digital heritage", "Digitising cultural artefacts and traditions"], ["Subculture", "A group with distinct interests or styles within a culture"]],
    acts: [
      R("Examples", `<ul><li>Kazakh artists reaching global audiences through streaming and short video (Q-pop and Kazakh-language music).</li><li>Digitising heritage: museum collections online, 3D scans of historic sites.</li><li>Language: apps and keyboards support Kazakh in Latin and Cyrillic scripts; AI translation helps — or replaces — language learning.</li><li>Global platforms spread K-pop, anime and memes; critics warn of homogenisation.</li></ul>`, 5),
      S("s1", "Strengthens or threatens local culture?", ["Strengthens", "Threatens", "Both"], [["Kazakh-language content creators", 0], ["Global algorithms favouring English content", 1], ["Online dombra lessons", 0], ["Viral trends replacing local traditions", 1], ["AI translation", 2], ["Virtual museum of Kazakh history", 0]], 5),
      T("t1", "Context case cards", "", ["Technology (content)", "Concept", "Impact"], ["Local example", "Global example"], 10),
      W("w1", "Practice", "Evaluate the impact of global streaming platforms on local cultures.", 8, 16),
    ],
    exit: ["One cultural tradition that technology helps preserve."],
  },

  "rev-17": {
    q: "Who wins and who loses in the digital economy?",
    obj: ["Explain impacts in the economic context: business, employment, markets, globalisation", "Analyse the platform and sharing economy"],
    c3: "Context 4.2 Economic.",
    terms: [["Platform economy", "Economic activity organised through digital platforms"], ["Network effect", "A service becomes more valuable as more people use it"], ["E-commerce", "Buying and selling online"], ["Fintech", "Technology-driven financial services (e.g. Kaspi.kz)"]],
    acts: [
      R("Examples", `<ul><li><b>Kaspi.kz:</b> a super-app combining payments, banking, marketplace and government services — a strong network effect in Kazakhstan.</li><li>Global e-commerce (Amazon, Wildberries, Temu) changes retail and logistics.</li><li>Remote freelancing lets Kazakh developers work for foreign clients.</li></ul>`, 5),
      T("t1", "Stakeholder impacts of a super-app", "", ["Positive", "Negative"], ["Consumers", "Small sellers", "Traditional banks / shops", "Government (tax, competition)", "People without smartphones"], 10),
      Q("q1", "Check", [
        ["A network effect means…", ["Networks get slower", "More users make the service more valuable", "Internet prices rise", "A firm uses LANs"], 1, ""],
        ["A risk of a dominant platform is…", ["Too much competition", "Monopoly power over prices and sellers", "Lower data use", "Fewer apps"], 1, ""]], 3),
      W("w1", "Practice", "Discuss the impact of digital platforms on small businesses.", 8, 16),
    ],
    exit: ["Which app could you not live without — and what economic power does it have?"],
  },

  "rev-18": {
    q: "Can digital technology save the planet it is harming?",
    obj: ["Explain impacts in the environmental context: climate, agriculture, natural world, urban environments", "Weigh environmental benefits against costs"],
    c3: "Context 4.3 Environmental.",
    terms: [["Carbon footprint", "Greenhouse gases caused by an activity or product"], ["Remote sensing", "Collecting data about Earth from satellites or aircraft"], ["E-waste", "Discarded electronic devices"]],
    acts: [
      S("s1", "Benefit or cost to the environment?", ["Benefit", "Cost"], [["Satellite monitoring of illegal logging", 0], ["Mining minerals for batteries", 1], ["Smart thermostats", 0], ["Data-centre energy and water use", 1], ["Drone tracking of saiga antelope", 0], ["Short phone lifespans", 1]], 4),
      T("t1", "Context case cards", "", ["Technology", "Benefit", "Cost / risk"], ["Climate", "Agriculture", "Natural world / wildlife", "Cities"], 12),
      W("w1", "Practice", "To what extent are digital technologies a solution to environmental problems?", 8, 16),
    ],
    exit: ["One digital habit you could change to reduce your footprint."],
  },

  "rev-19": {
    q: "Is digital health making us healthier?",
    obj: ["Explain impacts in the health context: medicine, public health, fitness, mental health", "Evaluate a digital health intervention"],
    c3: "Context 4.4 Health.",
    terms: [["Telemedicine", "Remote healthcare via telecommunications"], ["Wearable", "A body-worn device that collects health data"], ["Electronic health record", "Digital record of a patient's medical history"]],
    acts: [
      R("Examples", `<ul><li>Kazakhstan's electronic health records and online doctor appointments.</li><li>AI that reads medical images, approved in several countries as a support tool.</li><li>Wearables tracking heart rate and sleep.</li><li>Concerns about social media and teenagers' mental health.</li></ul>`, 4),
      E("e1", "Evaluate a health intervention", "Choose ONE (telemedicine / wearables / AI diagnosis) and name it in the judgement.", ["Effectiveness", "Equity / access", "Privacy of health data", "Accuracy and safety", "Cost"], 12),
      X("x1", "Mental health", "", ["Explain two ways social media can affect teenagers' mental health — one positive, one negative. (4 marks)"], 8, 5),
    ],
    exit: ["Would you share your health data with an app for a discount? Why?"],
  },

  "rev-20": {
    q: "How is technology changing what we know and how we learn?",
    obj: ["Explain impacts in the human knowledge context: education, research, information access", "Discuss AI and the reliability of knowledge"],
    c3: "Context 4.5 Human knowledge.",
    terms: [["Open access", "Research freely available online"], ["Information literacy", "Ability to find, evaluate and use information"], ["Hallucination (AI)", "Confident but false output from a generative AI"]],
    acts: [
      S("s1", "Expands or threatens knowledge?", ["Expands", "Threatens", "Both"], [["Wikipedia", 2], ["Open-access journals", 0], ["AI hallucinations", 1], ["MOOCs and online courses", 0], ["Paywalls on research", 1], ["Generative AI for homework", 2]], 5),
      X("x1", "Reliability", "", ["Explain how you would check a fact produced by an AI chatbot. (3 steps)", "Discuss whether generative AI improves or weakens students' learning."], 12),
      W("w1", "Practice", "Evaluate the impact of online learning platforms on access to education.", 8, 16),
    ],
    exit: ["Your rule for using AI in schoolwork, in one sentence."],
  },

  "rev-21": {
    q: "How does technology change who governs and how?",
    obj: ["Explain impacts in the political context: governance, law, policing, activism, conflict", "Analyse power relationships"],
    c3: "Context 4.6 Political.",
    terms: [["E-government", "Online public services"], ["Digital authoritarianism", "Using digital tools to control citizens"], ["Regulation", "Laws and rules that govern technology"]],
    acts: [
      T("t1", "Political context case cards", "", ["Example", "Who gains power?", "Who loses power?"], ["E-government", "Online activism", "Surveillance / policing", "Regulation (e.g. EU AI Act)", "Cyber conflict"], 14),
      Q("q1", "Check", [
        ["Which is an example of digital authoritarianism?", ["Online tax filing", "Mass surveillance of protesters", "Open data portals", "E-petitions"], 1, ""],
        ["GDPR is a…", ["Social network", "EU data protection regulation", "Cyber weapon", "Search engine"], 1, ""]], 3),
      W("w1", "Practice", "Discuss whether social media has strengthened or weakened democracy.", 8, 16),
    ],
    exit: ["One law about technology you think Kazakhstan should have."],
  },

  "rev-22": {
    q: "How are digital systems changing relationships and communities?",
    obj: ["Explain impacts in the social context: relationships, communities, inequality, identity", "Link social impacts to concepts"],
    c3: "Context 4.7 Social.",
    terms: [["Online community", "A group connected by shared interests online"], ["Cyberbullying", "Bullying through digital technologies"], ["Digital divide", "Unequal access and benefits"]],
    acts: [
      S("s1", "Social impact sort", ["Connects people", "Divides / harms", "Both"], [["Family group chats across countries", 0], ["Cyberbullying", 1], ["Dating apps", 2], ["Online support groups", 0], ["Echo chambers", 1], ["Gaming communities", 2]], 5),
      T("t1", "Context case cards", "", ["Example", "Concept", "Impact"], ["Relationships", "Communities", "Inequality", "Youth / identity"], 12),
      W("w1", "Practice", "To what extent has social media improved young people's relationships?", 8, 16),
    ],
    exit: ["Which context (4.1–4.7) do you feel strongest in now?"],
  },
};
