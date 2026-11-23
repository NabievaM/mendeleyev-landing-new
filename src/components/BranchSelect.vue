<template>
  <div>
    <!-- TUGMA (maydon ko'rinishi) -->
    <button
      type="button"
      @click="toggle"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      :class="triggerClass"
    >
      <span
        class="truncate"
        :class="selectedLabel ? selectedTextClass : placeholderTextClass"
      >
        {{ selectedLabel || placeholder }}
      </span>
      <svg
        class="ml-3 h-4 w-4 shrink-0 transition-transform duration-200"
        :class="[isOpen ? 'rotate-180' : '', chevronClass]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <!-- RO'YXAT: telefonda pastdan chiqadigan oyna, kompyuterda markazda -->
    <Teleport v-if="mounted" to="body">
      <Transition
        enter-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-150"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isOpen"
          class="fixed inset-0 z-[400] flex items-end justify-center bg-black/55 sm:items-center sm:p-4"
          @click.self="isOpen = false"
        >
          <Transition
            appear
            enter-active-class="transition-all duration-250 ease-out"
            enter-from-class="translate-y-8 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
          >
            <div
              class="flex max-h-[70dvh] sm:max-h-[min(560px,80dvh)] w-full flex-col rounded-t-[26px] bg-white shadow-2xl dark:bg-ink sm:max-w-105 sm:rounded-[26px]"
            >
              <div class="flex items-center justify-between px-6 pb-2 pt-5">
                <p class="text-[16px] font-bold text-ink dark:text-white">
                  {{ placeholder }}
                </p>
                <button
                  type="button"
                  @click="isOpen = false"
                  aria-label="Yopiş"
                  class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-gray-100 p-0 text-ink dark:bg-white/10 dark:text-white"
                >
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M6 6L18 18"
                      stroke="currentColor"
                      stroke-width="2.2"
                      stroke-linecap="round"
                    />
                    <path
                      d="M18 6L6 18"
                      stroke="currentColor"
                      stroke-width="2.2"
                      stroke-linecap="round"
                    />
                  </svg>
                </button>
              </div>

              <ul
                role="listbox"
                class="overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-3 pb-[max(16px,env(safe-area-inset-bottom))] pt-1"
              >
                <li
                  v-for="o in options"
                  :key="o.id"
                  role="option"
                  :aria-selected="o.value === modelValue"
                >
                  <button
                    type="button"
                    @click="choose(o.value)"
                    class="flex w-full cursor-pointer items-center justify-between rounded-xl border-0 bg-transparent px-3 py-2.5 text-left text-[15px] transition-colors hover:bg-gray-100 dark:hover:bg-white/10"
                    :class="
                      o.value === modelValue
                        ? 'font-bold text-red-500'
                        : 'text-ink dark:text-white'
                    "
                  >
                    <span>{{ o.label }}</span>
                    <svg
                      v-if="o.value === modelValue"
                      class="ml-3 h-5 w-5 shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M5 12.5l4.5 4.5L19 7.5"
                        stroke="currentColor"
                        stroke-width="2.4"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const props = defineProps({
  modelValue: { type: String, default: "" },
  options: { type: Array, default: () => [] }, // [{ id, value, label }]
  placeholder: { type: String, default: "" },
  variant: { type: String, default: "modal" }, // "modal" | "section"
});
const emit = defineEmits(["update:modelValue"]);

const isOpen = ref(false);

const selectedLabel = computed(
  () => props.options.find((o) => o.value === props.modelValue)?.label || ""
);

function toggle() {
  isOpen.value = !isOpen.value;
}

function choose(value) {
  emit("update:modelValue", value);
  isOpen.value = false;
}

// Escape faqat ro'yxatni yopadi (modalni emas)
function onKeyDown(e) {
  if (e.key === "Escape") {
    e.stopPropagation();
    isOpen.value = false;
  }
}

watch(isOpen, (open) => {
  if (open) document.addEventListener("keydown", onKeyDown, true);
  else document.removeEventListener("keydown", onKeyDown, true);
});

onUnmounted(() => document.removeEventListener("keydown", onKeyDown, true));

// ---- ko'rinish (modal yoki pastdagi qizil forma uchun) ----
const isSection = computed(() => props.variant === "section");

const triggerClass = computed(() =>
  isSection.value
    ? "flex w-full cursor-pointer items-center justify-between rounded-md border-none bg-white/30 px-6 py-5 text-left text-[15.5px] outline-none transition-colors duration-200 hover:bg-white/22"
    : "flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200 bg-transparent px-5 py-4 text-left text-[15px] outline-none transition-colors duration-200 focus:border-red-400 dark:border-white/15 max-[480px]:py-3 max-[480px]:text-[16px]"
);
const selectedTextClass = computed(() =>
  isSection.value ? "text-white" : "text-ink dark:text-white"
);
const placeholderTextClass = computed(() =>
  isSection.value ? "text-white/70" : "text-gray-400 dark:text-white/40"
);
const chevronClass = computed(() =>
  isSection.value ? "text-white/80" : "text-gray-400 dark:text-white/50"
);
</script>
