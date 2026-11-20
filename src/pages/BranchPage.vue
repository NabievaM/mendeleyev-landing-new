<template>
  <PageShell v-slot="{ lang, t, openContact }">
    <section class="pb-20 pt-8 max-[640px]:pt-5">
      <div class="mx-auto max-w-7xl px-8 max-[640px]:px-5">
        <!-- BREADCRUMB -->
        <nav
          aria-label="breadcrumb"
          class="mb-6 flex flex-wrap items-center gap-2 text-[14px] text-gray-400 dark:text-white/50"
        >
          <a href="/" class="hover:text-red">{{ pagesText[lang].home }}</a>
          <span>/</span>
          <a
            :href="'/#' + (branch.kind === 'school' ? 'schools' : 'learning-centers')"
            class="hover:text-red"
          >
            {{ branch.kind === "school" ? pagesText[lang].schoolsLabel : pagesText[lang].lcLabel }}
          </a>
          <span>/</span>
          <span class="text-ink dark:text-white/80">{{ branch.name[lang] }}</span>
        </nav>

        <span
          class="inline-block rounded-full bg-blush px-4 py-1.5 text-[13px] font-bold text-red dark:bg-white/10 dark:text-white/80"
        >
          {{ branch.kind === "school" ? pagesText[lang].kindSchool : pagesText[lang].kindLc }}
        </span>

        <h1
          class="mt-4 max-w-[900px] text-[clamp(30px,4vw,48px)] font-bold leading-[1.12] text-[#0F1E33] dark:text-white"
        >
          {{ branch.name[lang] }}
        </h1>

        <p
          class="mt-4 max-w-[760px] text-[17px] leading-[1.65] text-gray-500 dark:text-white/60"
        >
          {{ pagesText[lang].branchIntro(branch.name[lang], branch.kind, branch.address[lang]) }}
        </p>

        <div class="mt-10 grid grid-cols-[1.3fr_1fr] gap-8 max-[900px]:grid-cols-1">
          <!-- RASMLAR -->
          <div>
            <img
              v-if="images[0]"
              :src="images[0]"
              :alt="branch.name[lang]"
              width="960"
              height="640"
              class="aspect-[3/2] w-full rounded-[22px] object-cover"
            />
            <div
              v-if="images.length > 1"
              class="mt-4 grid grid-cols-2 gap-4"
            >
              <img
                v-for="(img, i) in images.slice(1)"
                :key="img"
                :src="img"
                :alt="branch.name[lang] + ' — ' + (i + 2)"
                loading="lazy"
                class="aspect-[3/2] w-full rounded-[18px] object-cover"
              />
            </div>
          </div>

          <!-- MA'LUMOT -->
          <aside
            class="h-fit rounded-[22px] bg-[#F5F6F8] p-7 dark:bg-white/5 max-[480px]:p-5"
          >
            <h2 class="text-[20px] font-bold text-ink dark:text-white">
              {{ pagesText[lang].contacts }}
            </h2>

            <dl class="mt-5 space-y-4 text-[15.5px] leading-[1.5]">
              <div>
                <dt class="text-[12.5px] font-bold uppercase tracking-wide text-gray-400 dark:text-white/50">
                  {{ t.branches.addressLabel }}
                </dt>
                <dd class="text-ink dark:text-white">{{ branch.address[lang] }}</dd>
              </div>
              <div v-if="branch.landmark">
                <dt class="text-[12.5px] font-bold uppercase tracking-wide text-gray-400 dark:text-white/50">
                  {{ t.branches.landmarkLabel }}
                </dt>
                <dd class="text-ink dark:text-white">{{ branch.landmark[lang] }}</dd>
              </div>
              <div>
                <dt class="text-[12.5px] font-bold uppercase tracking-wide text-gray-400 dark:text-white/50">
                  {{ t.branches.phoneLabel }}
                </dt>
                <dd>
                  <a
                    :href="'tel:' + branch.phoneRaw"
                    class="font-bold text-ink hover:text-red dark:text-white"
                  >
                    {{ branch.phone }}
                  </a>
                </dd>
              </div>
            </dl>

            <div class="mt-6 grid grid-cols-3 gap-2.5 max-[480px]:grid-cols-1">
              <a
                v-if="branch.telegram"
                :href="branch.telegram"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-center rounded-xl bg-[#29A9EA] px-2 py-3 text-[13.5px] font-bold text-white hover:opacity-90"
              >
                {{ t.branches.telegramBtn }}
              </a>
              <a
                v-if="branch.instagram"
                :href="branch.instagram"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] px-2 py-3 text-[13.5px] font-bold text-white hover:opacity-90"
              >
                {{ t.branches.instagramBtn }}
              </a>
              <a
                v-if="branch.mapUrl"
                :href="branch.mapUrl"
                target="_blank"
                rel="noopener"
                class="flex items-center justify-center rounded-xl bg-red px-2 py-3 text-[13.5px] font-bold text-white hover:bg-red-mid"
              >
                {{ t.branches.mapBtn }}
              </a>
            </div>

            <p class="mt-6 text-[14.5px] leading-[1.6] text-gray-500 dark:text-white/60">
              {{ pagesText[lang].branchCta }}
            </p>

            <button
              type="button"
              class="mt-4 w-full rounded-xl bg-red-500 px-6 py-3.5 text-[16px] font-bold text-white transition-colors hover:bg-red-600"
              @click="openContact"
            >
              {{ pagesText[lang].apply }}
            </button>
          </aside>
        </div>

        <!-- BOSHQA FILIALLAR -->
        <div class="mt-16">
          <h2 class="text-[26px] font-bold text-[#0F1E33] dark:text-white">
            {{ pagesText[lang].otherBranches }}
          </h2>
          <ul class="mt-5 grid grid-cols-3 gap-x-6 gap-y-2 max-[900px]:grid-cols-2 max-[560px]:grid-cols-1">
            <li v-for="b in otherBranches" :key="b.id">
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
import { pagesText } from "../data/pages";
import { allBranches, branchPath } from "../data/routes";

const props = defineProps({ branch: { type: Object, required: true } });

const images = computed(() => {
  const b = props.branch;
  if (Array.isArray(b.images) && b.images.length) return b.images;
  return b.image ? [b.image] : [];
});

const otherBranches = computed(() =>
  allBranches.filter((b) => b.id !== props.branch.id)
);
</script>
