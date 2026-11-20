import { ref } from 'vue'

// Serverda `document` yo'q, shuning uchun boshlang'ich qiymat false;
// brauzerda initDark() mount bo'lgach haqiqiy holatni o'qiydi (hydration mos tushishi uchun).
const isDark = ref(false)

function applyDark(value) {
  isDark.value = value
  document.documentElement.classList.toggle('dark', value)
  try {
    localStorage.setItem('theme', value ? 'dark' : 'light')
  } catch {
    /* private rejim */
  }
}

function toggleDark() {
  applyDark(!isDark.value)
}

export function initDark() {
  if (typeof document !== 'undefined') {
    isDark.value = document.documentElement.classList.contains('dark')
  }
}

export function useDarkMode() {
  return { isDark, toggleDark, initDark }
}
