// Build vaqtida har bir sahifani HTML ga aylantiradi (SSG):
//   dist/index.html, dist/filial/<slug>/index.html, dist/yonalish/<slug>/index.html,
//   dist/sitemap.xml, dist/404.html
// Shunda Google JavaScript ishlatmasdan ham butun matnni ko'radi.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf-8");
const serverEntry = pathToFileURL(path.join(serverDir, "entry-server.js")).href;
const { render, routes, buildHead, buildSitemap } = await import(serverEntry);

function inject(appHtml, head) {
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<\/head>/, `    ${head}\n  </head>`);

  const appRe = /<div id="app">[\s\S]*?<\/div>/;
  if (!appRe.test(html)) throw new Error('index.html ichida <div id="app"> topilmadi');
  return html.replace(
    appRe,
    () => `<div id="app" data-server-rendered="true">${appHtml}</div>`
  );
}

let count = 0;
for (const route of routes) {
  const appHtml = await render(route);
  const { html: head } = buildHead(route);
  const html = inject(appHtml, head);

  const outFile =
    route.path === "/"
      ? path.join(dist, "index.html")
      : path.join(dist, route.path, "index.html");
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  count++;
  console.log(`  ✓ ${route.path}  (${(html.length / 1024).toFixed(1)} KB)`);
}

// Sitemap
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, "sitemap.xml"), buildSitemap(today));

// 404 sahifa (qidiruvga kiritilmaydi)
const notFound = template
  .replace(/<title>[\s\S]*?<\/title>/, "<title>404 — Sahifa topilmadi | Mendeleyev</title>")
  .replace(
    /<\/head>/,
    '<meta name="robots" content="noindex, nofollow" />\n  </head>'
  )
  .replace(/<script type="module"[^>]*><\/script>/g, "")
  .replace(
    /<div id="app">[\s\S]*?<\/div>/,
    `<div id="app" style="font-family:Inter,Arial,sans-serif;padding:64px 24px;text-align:center">
      <h1 style="font-size:32px;margin:0 0 12px">404</h1>
      <p style="color:#666;margin:0 0 24px">Sahifa topilmadi.</p>
      <a href="/" style="color:#e11d48;font-weight:600">Bosh sahifaga qaytish</a>
    </div>`
  );
fs.writeFileSync(path.join(dist, "404.html"), notFound);

// Server bundle'i kerak emas
fs.rmSync(serverDir, { recursive: true, force: true });

console.log(`Prerender tugadi: ${count} ta sahifa + sitemap.xml + 404.html`);
