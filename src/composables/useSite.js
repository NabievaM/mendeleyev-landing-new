import { computed, onMounted, reactive, ref, watch } from "vue";
import { dict } from "../data/landing";
import { initDark } from "./useDarkMode";

const LANGS = ["uz", "ru", "en"];

// Barcha sahifalar uchun umumiy holat: til, menyu, ariza formasi, statistika.
export function useSite() {
  const lang = ref("uz");
  const menuOpen = ref(false);
  const submitted = ref(false);
  const contactModalOpen = ref(false);
  const formData = reactive({ name: "", phone: "", course: "" });
  const t = computed(() => dict[lang.value]);

  function openContactModal() {
    menuOpen.value = false;
    contactModalOpen.value = true;
  }

  function closeContactModal() {
    contactModalOpen.value = false;
  }

  function formatPhone(event) {
    let digits = event.target.value.replace(/\D/g, "").replace(/^998/, "");
    digits = digits.slice(0, 9);

    let out = "+998";
    if (digits.length > 0) out += " " + digits.slice(0, 2);
    if (digits.length > 2) out += "-" + digits.slice(2, 5);
    if (digits.length > 5) out += "-" + digits.slice(5, 7);
    if (digits.length > 7) out += "-" + digits.slice(7, 9);

    formData.phone = out;
  }

  async function onSubmitForm() {
    const endpoint = import.meta.env.VITE_LEAD_API_URL;

    if (!endpoint) {
      console.error("VITE_LEAD_API_URL is not configured");
      alert("Server manzili sozlanmagan. .env faylini tekşiring.");
      return;
    }

    if (!formData.name.trim() || !formData.phone.trim()) {
      alert("Iltimos, barça maydonlarni töldiring.");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(
          result?.message || "Arizani yuborişda xatolik yuz berdi."
        );
      }

      submitted.value = true;
      formData.name = "";
      formData.phone = "";

      if (contactModalOpen.value) {
        setTimeout(closeContactModal, 3000);
      }
    } catch (error) {
      console.error("Lead request failed:", error);
      alert(
        error?.message ||
          "Arizani yuborib bölmadi. Server işlayotganini tekşiring."
      );
    }
  }

  function getVisitorId() {
    try {
      let vid = localStorage.getItem("vid");
      if (!vid) {
        vid =
          typeof crypto !== "undefined" && crypto.randomUUID
            ? crypto.randomUUID()
            : `${Date.now().toString(36)}-${Math.random()
                .toString(36)
                .slice(2, 12)}`;
        localStorage.setItem("vid", vid);
      }
      return vid;
    } catch {
      return null;
    }
  }

  // Statistika: har bir brauzer sessiyasida sayt ochilishini 1 marta hisoblaydi
  function trackVisit() {
    try {
      if (sessionStorage.getItem("visit_counted")) return;
      const vid = getVisitorId();
      if (!vid) return;
      sessionStorage.setItem("visit_counted", "1");

      const leadUrl = import.meta.env.VITE_LEAD_API_URL || "/api/lead";
      fetch(leadUrl.replace(/\/lead$/, "/visit"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ vid }),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // statistika sayt ishlashiga xalaqit bermasligi kerak
    }
  }

  // Sahifalar orasida tanlangan til saqlanadi
  watch(lang, (v) => {
    try {
      localStorage.setItem("lang", v);
    } catch {
      /* private rejim */
    }
    if (typeof document !== "undefined") document.documentElement.lang = v;
  });

  onMounted(() => {
    initDark();
    try {
      const saved = localStorage.getItem("lang");
      if (LANGS.includes(saved)) lang.value = saved;
    } catch {
      /* private rejim */
    }

    trackVisit();

    // .reveal elementlari ko'ringanda paydo bo'ladi
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  });

  return {
    lang,
    menuOpen,
    submitted,
    contactModalOpen,
    formData,
    t,
    openContactModal,
    closeContactModal,
    formatPhone,
    onSubmitForm,
  };
}
