// ============================================================
// SAHIFALAR RO'YXATI (bosh sahifa + har bir filial + har bir yo'nalish)
// Shu fayl yagona manba: router, prerender va sitemap shundan foydalanadi.
// ============================================================
import { courses, schools, learningCenters } from "./landing";

export const SITE_URL = "https://mendeleyev.uz";

// Yangi alifbo (Ğ Ö Ş Ç) <-> oddiy lotin. Yangi alifbodagi matnlarni
// Google qidiruvi uchun (title, description, schema) oddiy lotinga o'giramiz.
export function toStandard(s = "") {
  return String(s)
    .replace(/Ğ/g, "G‘")
    .replace(/ğ/g, "g‘")
    .replace(/Ö/g, "O‘")
    .replace(/ö/g, "o‘")
    .replace(/Ş/g, "Sh")
    .replace(/ş/g, "sh")
    .replace(/Ç/g, "Ch")
    .replace(/ç/g, "ch");
}

// Oddiy lotinda yozilgan matnni saytning yangi alifbosiga o'giradi.
export function toNewAlphabet(s = "") {
  return String(s)
    .replace(/G[‘’']/g, "Ğ")
    .replace(/g[‘’']/g, "ğ")
    .replace(/O[‘’']/g, "Ö")
    .replace(/o[‘’']/g, "ö")
    .replace(/S[hH]/g, "Ş")
    .replace(/sh/g, "ş")
    .replace(/C[hH]/g, "Ç")
    .replace(/ch/g, "ç");
}

function slugify(s) {
  return toStandard(s)
    .toLowerCase()
    .replace(/[‘’']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Filial URL manzillari va qidiruv uchun oddiy lotindagi nomlari.
// Yangi filial qo'shilsa shu yerga ham qo'shing (qo'shilmasa id ishlatiladi).
const BRANCH_SEO = {
  "school-soy-shildir": {
    slug: "soy-shildir-maktabi",
    name: "Mendeleyev Soy-Shildir maktabi",
  },
  "school-bogish": { slug: "bogish-maktabi", name: "Mendeleyev Bog‘ish maktabi" },
  "school-yakkatut": {
    slug: "yakkatut-maktabi",
    name: "Mendeleyev Yakkatut maktabi",
  },
  "school-buvayda": { slug: "buvayda-maktabi", name: "Mendeleyev Buvayda maktabi" },
  "school-it": { slug: "it-school", name: "Mendeleyev IT School" },
  "school-bogcha": { slug: "bogcha", name: "Mendeleyev bog‘chasi" },
  "lc-it-academy": { slug: "it-academy", name: "Kokand IT Academy" },
  "lc-kokand": {
    slug: "qoqon-oquv-markazi",
    name: "Mendeleyev Qo‘qon o‘quv markazi",
  },
  "lc-dangara": {
    slug: "dangara-oquv-markazi",
    name: "Mendeleyev Dang‘ara o‘quv markazi",
  },
  "lc-tillar-markazi": { slug: "tillar-markazi", name: "Tillar markazi" },
  "lc-uchkoprik": {
    slug: "uchkoprik-oquv-markazi",
    name: "Mendeleyev Uchko‘prik o‘quv markazi",
  },
  "lc-buvayda": {
    slug: "buvayda-oquv-markazi",
    name: "Mendeleyev Buvayda o‘quv markazi",
  },
};

export const branchPrefix = "/filial/";
export const coursePrefix = "/yonalish/";

export function branchSlug(b) {
  return BRANCH_SEO[b.id]?.slug || b.id;
}
export function branchSeoName(b) {
  return BRANCH_SEO[b.id]?.name || toStandard(b.name.uz);
}
export function branchPath(b) {
  return branchPrefix + branchSlug(b);
}
export function courseSlug(c) {
  return slugify(c.name.uz);
}
export function coursePath(c) {
  return coursePrefix + courseSlug(c);
}

export const allBranches = [
  ...schools.map((b) => ({ ...b, kind: "school" })),
  ...learningCenters.map((b) => ({ ...b, kind: "lc" })),
];

// Barcha sahifalar
export const routes = [
  { path: "/", type: "home" },
  ...courses.map((c) => ({ path: coursePath(c), type: "course", ref: c })),
  ...allBranches.map((b) => ({ path: branchPath(b), type: "branch", ref: b })),
];

const routeMap = new Map(routes.map((r) => [r.path, r]));

export function normalizePath(p = "/") {
  let path = String(p).split("?")[0].split("#")[0] || "/";
  try {
    path = decodeURIComponent(path);
  } catch {
    /* noto'g'ri kodlangan yo'l */
  }
  if (path.length > 1) path = path.replace(/\/+$/, "");
  return path || "/";
}

export function resolveRoute(p) {
  return routeMap.get(normalizePath(p)) || null;
}
