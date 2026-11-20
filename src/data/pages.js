// Filial va yo'nalish sahifalari uchun matnlar (uz / ru / en).
// O'zbekcha matnlar oddiy lotinda yoziladi va saytning yangi alifbosiga o'giriladi.
import { toNewAlphabet as n } from "./routes";

export const pagesText = {
  uz: {
    home: n("Bosh sahifa"),
    schoolsLabel: n("Mendeleyev maktablari"),
    lcLabel: n("Mendeleyev o‘quv markazlari"),
    kindSchool: n("Maktab"),
    kindLc: n("O‘quv markazi"),
    otherBranches: n("Boshqa filiallarimiz"),
    otherCourses: n("Boshqa yo‘nalishlar"),
    branchesAll: n("Barcha filiallar"),
    apply: n("Ariza qoldirish"),
    callUs: n("Qo‘ng‘iroq qilish"),
    openMap: n("Xaritada ko‘rish"),
    gallery: n("Filial suratlari"),
    contacts: n("Aloqa ma’lumotlari"),
    branchIntro: (name, kind, address) =>
      n(
        `${name} — Mendeleyev ta’lim tarmog‘iga kiruvchi ${
          kind === "school" ? "maktab" : "o‘quv markazi"
        }. Manzil: ${address}.`
      ),
    branchCta: n(
      "Qabul, o‘quv dasturlari va dars jadvali haqida batafsil ma’lumot olish uchun ariza qoldiring — mutaxassislarimiz siz bilan bog‘lanadi."
    ),
    courseIntro: (name, level) =>
      n(`${name} — Mendeleyev ta’lim tarmog‘idagi «${level}» bosqich dasturi.`),
    courseCta: n(
      "Qabul, narxlar va dars jadvali haqida batafsil ma’lumot olish uchun ariza qoldiring — mutaxassislarimiz siz bilan bog‘lanadi."
    ),
    levelLabel: n("Bosqich"),
  },
  ru: {
    home: "Главная",
    schoolsLabel: "Школы Mendeleyev",
    lcLabel: "Учебные центры Mendeleyev",
    kindSchool: "Школа",
    kindLc: "Учебный центр",
    otherBranches: "Другие филиалы",
    otherCourses: "Другие направления",
    branchesAll: "Все филиалы",
    apply: "Оставить заявку",
    callUs: "Позвонить",
    openMap: "Показать на карте",
    gallery: "Фотографии филиала",
    contacts: "Контакты",
    branchIntro: (name, kind, address) =>
      `${name} — ${
        kind === "school" ? "школа" : "учебный центр"
      } образовательной сети Mendeleyev. Адрес: ${address}.`,
    branchCta:
      "Оставьте заявку, чтобы узнать подробнее о приёме, учебных программах и расписании — наши специалисты свяжутся с вами.",
    courseIntro: (name, level) =>
      `${name} — программа ступени «${level}» в образовательной сети Mendeleyev.`,
    courseCta:
      "Оставьте заявку, чтобы узнать подробнее о приёме, стоимости и расписании — наши специалисты свяжутся с вами.",
    levelLabel: "Ступень",
  },
  en: {
    home: "Home",
    schoolsLabel: "Mendeleyev schools",
    lcLabel: "Mendeleyev learning centers",
    kindSchool: "School",
    kindLc: "Learning center",
    otherBranches: "Our other branches",
    otherCourses: "Other programs",
    branchesAll: "All branches",
    apply: "Apply now",
    callUs: "Call us",
    openMap: "View on map",
    gallery: "Branch photos",
    contacts: "Contact details",
    branchIntro: (name, kind, address) =>
      `${name} is a ${
        kind === "school" ? "school" : "learning center"
      } of the Mendeleyev education network. Address: ${address}.`,
    branchCta:
      "Leave a request to learn more about admission, study programs and schedules — our team will get in touch with you.",
    courseIntro: (name, level) =>
      `${name} is the “${level}” level program of the Mendeleyev education network.`,
    courseCta:
      "Leave a request to learn more about admission, prices and schedules — our team will get in touch with you.",
    levelLabel: "Level",
  },
};
