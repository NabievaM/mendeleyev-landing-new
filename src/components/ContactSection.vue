<template>
  <section
    id="contact"
    class="relative overflow-hidden py-12 max-[640px]:py-16 bg-red-500"
  >
    <!-- fon: takrorlanuvchi uchburchak naqsh -->
    <svg
      class="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="contact-tri"
          width="46"
          height="46"
          patternUnits="userSpaceOnUse"
        >
          <polygon points="0,46 46,46 23,0" fill="#ffffff" opacity="0.05" />
          <polygon points="0,0 46,0 23,46" fill="#ffffff" opacity="0.035" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#contact-tri)" />
    </svg>

    <div class="relative max-w-180 mx-auto px-8 max-[640px]:px-5 text-center">
      <template v-if="!submitted">
        <h2
          class="text-[clamp(30px,4.2vw,46px)] font-extrabold text-white leading-[1.15]"
        >
          {{ t.contactTitle }}
        </h2>
        <p
          class="text-[16px] max-w-92.5 mx-auto mt-4 leading-[1.6] text-white/70"
        >
          {{ t.contactSub }}
        </p>

        <form
          @submit.prevent="canSubmit && $emit('submit')"
          class="max-w-110 mx-auto mt-9 flex flex-col gap-4"
        >
          <input
            type="text"
            v-model="formData.name"
            :placeholder="t.form.namePh"
            required
            class="w-full px-6 py-5 rounded-md bg-white/30 placeholder-white/70 text-white text-[15.5px] outline-none border-none transition-colors duration-200 focus:bg-white/22"
          />

          <div
            class="w-full flex items-center gap-2 px-5 py-5 rounded-md bg-white/30 focus-within:bg-white/22 transition-colors duration-200"
          >
            <span class="inline-block rounded-xs overflow-hidden shrink-0">
              <img class="w-8 h-5" src="/images/ozb-flag.webp" alt="" />
            </span>
            <!-- <span class="text-white/85 text-[15.5px] font-medium">+998</span> -->
            <input
              type="tel"
              v-model="formData.phone"
              @input="$emit('formatPhone', $event)"
              placeholder="**-***-**-**"
              maxlength="17"
              required
              class="flex-1 bg-transparent placeholder-white/60 text-white text-[15.5px] outline-none border-none"
            />
          </div>

          <p
            v-if="phoneTouched && !phoneOk"
            class="-mt-2 px-1 text-left text-[13px] font-medium text-white"
          >
            {{ t.form.phoneError }}
          </p>

          <!-- FILIAL TANLASH -->
          <BranchSelect
            v-model="formData.branch"
            :options="branches"
            :placeholder="t.form.branchPh"
            variant="section"
          />

          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full mt-1.5 px-7 py-5 rounded-md bg-white text-red-500 font-bold text-[15.5px] hover:bg-red-200 hover:text-red-900 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-white disabled:hover:text-red-500"
          >
            {{ t.form.submit }}
          </button>
        </form>
      </template>

      <template v-else>
        <div class="py-6.5">
          <img
            class="w-15 h-15 rounded-full mx-auto"
            src="/images/logo.webp"
            alt=""
          />
          <h3 class="text-[24px] font-bold text-white mb-2">
            {{ t.form.thanksTitle }}
          </h3>
          <p class="text-white/75 text-[15px]">{{ t.form.thanksDesc }}</p>
        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import { computed } from "vue";
import { hexLogoSvg } from "../data/icons";
import { schools, learningCenters } from "../data/landing";
import BranchSelect from "./BranchSelect.vue";

const emit = defineEmits(["submit", "formatPhone"]);
const props = defineProps({
  t: Object,
  lang: String,
  courses: Array,
  data: Object,
  submitted: Boolean,
  formData: Object,
});

// Filiallar ro'yxati (botga doim o'zbekcha nom ketadi)
const branches = computed(() =>
  [...schools, ...learningCenters].map((b) => ({
    id: b.id,
    value: b.name.uz,
    label: b.name[props.lang] || b.name.uz,
  }))
);

const phoneOk = computed(() =>
  /^\+998 \d{2}-\d{3}-\d{2}-\d{2}$/.test((props.formData.phone || "").trim())
);
const phoneTouched = computed(() => (props.formData.phone || "").length > 4);

const canSubmit = computed(
  () => !!props.formData.name.trim() && phoneOk.value && !!props.formData.branch
);
</script>
