// Конструкторы активити — короткая запись контента уроков
export const R = (title, body, min) => ({ t: "read", title, body, min });
export const Q = (id, title, qs, min) => ({ t: "mcq", id, title, min, qs: qs.map(([q, o, a, e]) => ({ q, o, a, e })) });
export const M = (id, title, pairs, min) => ({ t: "match", id, title, pairs, min });
export const S = (id, title, cats, items, min) => ({ t: "sort", id, title, cats, items, min });
export const T = (id, title, ins, cols, rows, min) => ({ t: "table", id, title, ins, cols, rows, min });
export const X = (id, title, ins, qs, min, rows) => ({ t: "text", id, title, ins, qs, min, rows });
export const E = (id, title, ins, crit, min) => ({ t: "rate", id, title, ins, crit, min });
export const W = (id, title, q, marks, min, check) => ({ t: "write", id, title, q, marks, min, check: check || (marks >= 12 ? CHECK12 : marks >= 8 ? CHECK8 : CHECK4) });

export const CRIT5 = ["Effectiveness — does it solve the problem?", "Equity — who benefits, who is left out?", "Feasibility — cost, skills, infrastructure", "Ethics — privacy, consent, rights", "Sustainability — long-term and environmental effects"];
export const CHECK4 = ["Answered the command term", "Used precise terminology", "Linked to the example / source"];
export const CHECK8 = ["Clear answer to the question in the first sentence", "At least 2 developed points with real examples", "Named specific stakeholders and impacts", "Counterclaim included", "Justified conclusion linked to the question"];
export const CHECK12 = ["Introduction with a clear position / judgement", "3+ developed arguments using real-world examples (who, where, when)", "Impacts AND implications for different stakeholders", "Trade-offs and counterclaims evaluated, not just listed", "Concepts (3Cs) integrated into the argument", "Conclusion justified by the evidence and answers the command term"];
export const OPVL = ["Origin", "Purpose", "Value", "Limitation"];
export const CHAIN = ["Input / data", "Processing (how)", "Output / decision", "Impact on people"];

// Кейс для чтения и мини-исследование
export const C = (title, place, body, think, links, min = 8) => ({ t: "case", title, place, body, think, links, min });
export const RS = (rq, find, search, src, n = 2, min = 20) => ({ t: "research", id: "research", title: "Independent research", rq, find, search, src, n, min });

// Надёжные стартовые источники
export const L = {
  owid: ["Our World in Data", "https://ourworldindata.org"],
  itu: ["ITU", "https://www.itu.int"],
  wb: ["World Bank Data", "https://data.worldbank.org"],
  un: ["UN", "https://www.un.org"],
  udhr: ["UDHR text", "https://www.un.org/en/about-us/universal-declaration-of-human-rights"],
  ohchr: ["UN Human Rights", "https://www.ohchr.org"],
  who: ["WHO", "https://www.who.int"],
  unesco: ["UNESCO", "https://www.unesco.org"],
  oecd: ["OECD", "https://www.oecd.org"],
  ilo: ["ILO", "https://www.ilo.org"],
  wef: ["World Economic Forum", "https://www.weforum.org"],
  iea: ["IEA", "https://www.iea.org"],
  ipcc: ["IPCC", "https://www.ipcc.ch"],
  unep: ["UNEP", "https://www.unep.org"],
  fao: ["FAO", "https://www.fao.org"],
  ewaste: ["Global E-waste Monitor", "https://ewastemonitor.info"],
  unhcr: ["UNHCR", "https://www.unhcr.org"],
  wfp: ["World Food Programme", "https://www.wfp.org"],
  eu: ["EU digital strategy", "https://digital-strategy.ec.europa.eu"],
  aiact: ["EU AI Act explorer", "https://artificialintelligenceact.eu"],
  estonia: ["e-Estonia", "https://e-estonia.com"],
  egov: ["eGov.kz", "https://egov.kz"],
  govkz: ["gov.kz", "https://www.gov.kz"],
  idea: ["International IDEA", "https://www.idea.int"],
  accessnow: ["Access Now", "https://www.accessnow.org"],
  hrw: ["Human Rights Watch", "https://www.hrw.org"],
  amnesty: ["Amnesty International", "https://www.amnesty.org"],
  gs: ["Gender Shades", "https://www.gendershades.org"],
  wai: ["W3C Web Accessibility (WAI)", "https://www.w3.org/WAI"],
  icrc: ["ICRC", "https://www.icrc.org"],
  skr: ["Stop Killer Robots", "https://www.stopkillerrobots.org"],
  wipo: ["WIPO", "https://www.wipo.int"],
  bbc: ["BBC Technology", "https://www.bbc.com/news/technology"],
  reuters: ["Reuters Technology", "https://www.reuters.com/technology"],
  airkaz: ["AirKaz", "https://airkaz.org"],
  aec: ["Australian Electoral Commission", "https://www.aec.gov.au"],
  pew: ["Pew Research Center", "https://www.pewresearch.org"],
  enbek: ["Enbek.kz", "https://www.enbek.kz"],
};
