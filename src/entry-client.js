import { createApp, createSSRApp } from "vue";
import "./assets/main.css";
import { rootFor } from "./app";
import { resolveRoute } from "./data/routes";

const el = document.getElementById("app");
const route = resolveRoute(location.pathname);

if (el) {
  // Prerender qilingan sahifa bo'lsa hydrate qilinadi, aks holda (dev) oddiy mount
  const create = el.hasAttribute("data-server-rendered") ? createSSRApp : createApp;
  create(rootFor(route)).mount(el);
}
