import { h } from "vue";
import App from "./App.vue";
import BranchPage from "./pages/BranchPage.vue";
import CoursePage from "./pages/CoursePage.vue";

// Marshrutga mos ildiz komponent (server va brauzer bir xil ishlatadi)
export function rootFor(route) {
  if (route?.type === "branch") return { render: () => h(BranchPage, { branch: route.ref }) };
  if (route?.type === "course") return { render: () => h(CoursePage, { course: route.ref }) };
  return { render: () => h(App) };
}
