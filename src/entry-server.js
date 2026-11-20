import { createSSRApp } from "vue";
import { renderToString } from "vue/server-renderer";
import { rootFor } from "./app";
import { routes } from "./data/routes";
import { buildHead, buildSitemap } from "./seo";

export { routes, buildHead, buildSitemap };

export async function render(route) {
  const app = createSSRApp(rootFor(route));
  return renderToString(app);
}
