// Har bir sahifa uchun <head> teglari, JSON-LD va sitemap.xml shu yerda tayyorlanadi.
// Faqat build vaqtida (prerender) ishlatiladi.
import { site, courses, faq } from "./data/landing";
import {
  SITE_URL,
  routes,
  toStandard,
  branchSeoName,
  branchPath,
  coursePath,
} from "./data/routes";

const ORG_ID = `${SITE_URL}/#organization`;
const OG_IMAGE = `${SITE_URL}/images/og-image.png`;

const esc = (s = "") =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const ld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(
    /</g,
    "\\u003c"
  )}</script>`;

const abs = (p) => (p.startsWith("http") ? p : SITE_URL + p);

function breadcrumb(items) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

const organization = {
  "@type": "EducationalOrganization",
  "@id": ORG_ID,
  name: "Mendeleyev",
  alternateName: [
    "Mendeleyev ta’lim markazi",
    "Mendeleyev o‘quv markazi",
    "mendeleyev.uz",
  ],
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.webp` },
  image: OG_IMAGE,
  description:
  "Mendeleyev — o‘quv markazlari va maktablar tarmog‘i. Sifatli ta’lim, innovatsion o‘quv dasturlari va tajribali ustozlar.",
  telephone: site.phoneRaw,
  address: {
    "@type": "PostalAddress",
    streetAddress: toStandard(site.address.uz),
    addressLocality: "Qo‘qon",
    addressCountry: "UZ",
  },
  sameAs: [
    "https://t.me/Mendeleyev_qoqon_lc",
    "https://instagram.com/mendeleyev_kokand",
    "https://youtube.com/@mendeleyev_markaz",
  ],
};

function pageMeta(route) {
  if (route.type === "branch") {
    const b = route.ref;
    const name = branchSeoName(b);
    const address = toStandard(b.address.uz);
    return {
      title: `${name} — manzil, telefon, aloqa | Mendeleyev`,
      description: `${name}: manzil — ${address}. Telefon: ${b.phone}. Qabul, o‘quv dasturlari va dars jadvali haqida ma’lumot — Mendeleyev rasmiy sayti.`,
      image: b.images?.[0] || b.image,
      ogType: "website",
      jsonld: [
        {
          "@type":
            b.id === "school-bogcha"
              ? "Preschool"
              : b.kind === "school"
              ? "School"
              : "EducationalOrganization",
          "@id": `${SITE_URL}${branchPath(b)}#branch`,
          name,
          url: abs(branchPath(b)),
          image: abs(b.images?.[0] || b.image),
          telephone: b.phoneRaw,
          address: {
            "@type": "PostalAddress",
            streetAddress: address,
            addressCountry: "UZ",
          },
          ...(b.coordinates
            ? {
                geo: {
                  "@type": "GeoCoordinates",
                  latitude: b.coordinates.lat,
                  longitude: b.coordinates.lng,
                },
              }
            : {}),
          parentOrganization: { "@id": ORG_ID },
          sameAs: [b.telegram, b.instagram].filter(Boolean),
        },
        breadcrumb([
          { name: "Mendeleyev", path: "/" },
          { name: "Filiallar", path: "/#schools" },
          { name, path: branchPath(b) },
        ]),
      ],
    };
  }

  if (route.type === "course") {
    const c = route.ref;
    const name = toStandard(c.name.uz);
    const desc = toStandard(c.desc.uz);
    return {
      title: `${name} — ta’lim dasturi | Mendeleyev`,
      description: `${name} (${toStandard(c.level.uz)} bosqich). ${desc}`.slice(
        0,
        300
      ),
      image: null,
      ogType: "website",
      jsonld: [
        {
          "@type": "Course",
          name,
          description: desc,
          url: abs(coursePath(c)),
          inLanguage: "uz",
          provider: { "@id": ORG_ID },
        },
        breadcrumb([
          { name: "Mendeleyev", path: "/" },
          { name: "Yo‘nalishlar", path: "/#courses" },
          { name, path: coursePath(c) },
        ]),
      ],
    };
  }

  // Bosh sahifa
  return {
    title: "Mendeleyev o‘quv markazi va maktablari | mendeleyev.uz",
    description:
      "Mendeleyev.uz — Mendeleyev o‘quv markazi va maktablarining rasmiy sayti. Filiallar, o‘quv dasturlari, tajribali ustozlar, yangiliklar va aloqa ma’lumotlari.",
    image: null,
    ogType: "website",
    jsonld: [
      organization,
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: "Mendeleyev",
        alternateName: "mendeleyev.uz",
        inLanguage: "uz",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: toStandard(f.q.uz),
          acceptedAnswer: { "@type": "Answer", text: toStandard(f.a.uz) },
        })),
      },
    ],
  };
}

export function buildHead(route) {
  const m = pageMeta(route);
  const url = abs(route.path === "/" ? "/" : route.path);
  const image = m.image ? abs(m.image) : OG_IMAGE;
  const lines = [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${m.ogType}" />`,
    `<meta property="og:locale" content="uz_UZ" />`,
    `<meta property="og:site_name" content="Mendeleyev" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ld({ "@context": "https://schema.org", "@graph": m.jsonld }),
  ];
  return { title: m.title, html: lines.join("\n    ") };
}

export function buildSitemap(lastmod) {
  const prio = { home: "1.0", branch: "0.8", course: "0.7" };
  const urls = routes
    .map(
      (r) =>
        `  <url>\n    <loc>${abs(
          r.path === "/" ? "/" : r.path
        )}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${
          r.type === "home" ? "weekly" : "monthly"
        }</changefreq>\n    <priority>${prio[r.type]}</priority>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
