// Контент уроков (цели, активити) — по ключу урока
import hl1 from "./hl1.js";
import hl2 from "./hl2.js";
import hl3 from "./hl3.js";
import rev1 from "./rev1.js";
import rev2 from "./rev2.js";
import rev3 from "./rev3.js";
import extraHL from "./extra-hl.js";
import extraRev from "./extra-rev.js";

const base = { ...hl1, ...hl2, ...hl3, ...rev1, ...rev2, ...rev3 };
const extra = { ...extraHL, ...extraRev };

// В каждый урок: кейсы для чтения — после вводного блока, мини-исследование — в конце
export const CONTENT = Object.fromEntries(Object.entries(base).map(([k, c]) => {
  const x = extra[k];
  if (!x) return [k, c];
  const acts = [...c.acts];
  const at = acts[0]?.t === "read" ? 1 : 0;
  acts.splice(at, 0, ...(x.cases || []));
  if (x.research) acts.push(x.research);
  return [k, { ...c, acts }];
}));
