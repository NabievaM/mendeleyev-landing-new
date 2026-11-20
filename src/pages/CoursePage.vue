<template>
  <PageShell v-slot="{ lang, t, openContact }">
    <section class="pb-20 pt-8 max-[640px]:pt-5">
      <div class="mx-auto max-w-7xl px-8 max-[640px]:px-5">
        <nav
          aria-label="breadcrumb"
          class="mb-6 flex flex-wrap items-center gap-2 text-[14px] text-gray-400 dark:text-white/50"
        >
          <a href="/" class="hover:text-red">{{ pagesText[lang].home }}</a>
          <span>/</span>
          <a href="/#courses" class="hover:text-red">{{ t.nav.courses }}</a>
          <span>/</span>
          <span class="text-ink dark:text-white/80">{{ course.name[lang] }}</span>
        </nav>

        <span
          class="inline-block rounded-full bg-blush px-4 py-1.5 text-[13px] font-bold text-red dark:bg-white/10 dark:text-white/80"
        >
          {{ pagesText[lang].levelLabel }}: {{ course.level[lang] }}
        </span>

        <h1
          class="mt-4 max-w-[900px] text-[clamp(30px,4vw,48px)] font-bold leading-[1.12] text-[#0F1E33] dark:text-white"
        >
          {{ course.name[lang] }}
        </h1>

        <p class="mt-4 max-w-[760px] text-[17px] leading-[1.65] text-gray-500 dark:text-white/60">
          {{ pagesText[lang].courseIntro(course.name[lang], course.level[lang]) }}
        </p>

        <div
          class="mt-8 max-w-[860px] rounded-[22px] bg-[#F5F6F8] p-8 dark:bg-white/5 max-[480px]:p-5"
        >
          <p class="text-[18px] leading-[1.7] text-ink dark:text-white">
            {{ course.desc[lang] }}
          </p>

          <p class="mt-5 text-[15px] leading-[1.6] text-gray-500 dark:text-white/60">
            {{ pagesText[lang].courseCta }}
          </p>

          <button
            type="button"
            class="mt-5 rounded-xl bg-red-500 px-8 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-red-600 max-[480px]:w-full"
            @click="openContact"
          >
            {{ pagesText[lang].apply }}
          </button>
        </div>

        <div class="mt-14">
          <h2 class="text-[26px] font-bold text-[#0F1E33] dark:text-white">
            {{ pagesText[lang].otherCourses }}
          </h2>
          <ul class="mt-5 grid grid-cols-3 gap-x-6 gap-y-2 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            <li v-for="c in otherCourses" :key="c.name.uz">
              <a
                :href="coursePath(c)"
                class="block rounded-lg px-3 py-2 text-[16px] text-ink hover:bg-blush hover:text-red dark:text-white/80 dark:hover:bg-white/10"
              >
                {{ c.name[lang] }}
              </a>
            </li>
          </ul>
        </div>

        <div class="mt-12">
          <h2 class="text-[26px] font-bold text-[#0F1E33] dark:text-white">
            {{ pagesText[lang].branchesAll }}
          </h2>
          <ul class="mt-5 grid grid-cols-3 gap-x-6 gap-y-2 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            <li v-for="b in allBranches" :key="b.id">
              <a
                :href="branchPath(b)"
                class="block rounded-lg px-3 py-2 text-[16px] text-ink hover:bg-blush hover:text-red dark:text-white/80 dark:hover:bg-white/10"
              >
                {{ b.name[lang] }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </PageShell>
</template>

<script setup>
import { computed } from "vue";
import PageShell from "./PageShell.vue";
import { courses } from "../data/landing";
import { pagesText } from "../data/pages";
import { allBranches, branchPath, coursePath } from "../data/routes";

const props = defineProps({ course: { type: Object, required: true } });

const otherCourses = computed(() =>
  courses.filter((c) => c.name.uz !== props.course.name.uz)
);
</script>
