<template>
  <div id="app">
    <Header
      :lang="lang"
      :menu-open="menuOpen"
      :t="t"
      :data="site"
      @change-lang="lang = $event"
      @update:menu-open="menuOpen = $event"
      @open-contact="openContactModal"
    />

    <main>
      <HeroSection
        :t="t"
        :hero-loaded="heroLoaded"
        @open-contact="openContactModal"
      />
      <Partnerlogosmarquee :lang="lang" />
      <NewsSection :lang="lang" />
      <ResultsSection :t="t" :lang="lang" :images="resultsImages" />
      <AdvantagesSection :t="t" :lang="lang" :advantages="advantages" />
      <ProblemsSection :t="t" :lang="lang" :problems="problems" />
      <AmenitiesSection :t="t" :lang="lang" :amenities="amenities" />
      <CoursesSection
        :t="t"
        :lang="lang"
        :courses="courses"
        @open-contact="openContactModal"
      />
      <TeamSection :t="t" :lang="lang" :team="team" />
      <TeamGallery :lang="lang" />
      <ProcessSection :t="t" :lang="lang" :steps="steps" />
      <ContactSection
        :t="t"
        :lang="lang"
        :courses="courses"
        :data="site"
        :submitted="submitted"
        :form-data="formData"
        @submit="onSubmitForm"
        @format-phone="formatPhone"
      />
      <FaqSection
        :t="t"
        :lang="lang"
        :faq="faq"
        :open-faq="openFaq"
        @toggle-faq="openFaq = openFaq === $event ? null : $event"
      />
      <BranchesSection
        section-id="schools"
        :title="t.branches.schoolsTitle"
        :subtitle="t.branches.schoolsSub"
        :branches="schools"
        :lang="lang"
        :t="t"
        icon="school"
      />

      <BranchesSection
        section-id="learning-centers"
        :title="t.branches.lcTitle"
        :subtitle="t.branches.lcSub"
        :branches="learningCenters"
        :lang="lang"
        :t="t"
        icon="lc"
      />
    </main>

    <Footer :t="t" :data="site" :lang="lang" @open-contact="openContactModal" />

    <ContactModal
      :open="contactModalOpen"
      :t="t"
      :submitted="submitted"
      :form-data="formData"
      @close="closeContactModal"
      @submit="onSubmitForm"
      @format-phone="formatPhone"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Header from "./components/Header.vue";
import HeroSection from "./components/HeroSection.vue";
import Partnerlogosmarquee from "./components/Partnerlogosmarquee.vue";
import AdvantagesSection from "./components/AdvantagesSection.vue";
import ProblemsSection from "./components/ProblemsSection.vue";
import AmenitiesSection from "./components/AmenitiesSection.vue";
import CoursesSection from "./components/CoursesSection.vue";
import TeamSection from "./components/TeamSection.vue";
import ProcessSection from "./components/ProcessSection.vue";
import ContactSection from "./components/ContactSection.vue";
import FaqSection from "./components/FaqSection.vue";
import ResultsSection from "./components/ResultsSection.vue";
import Footer from "./components/Footer.vue";
import ContactModal from "./components/ContactModal.vue";
import BranchesSection from "./components/BranchesSection.vue";
import TeamGallery from "./components/TeamGallery.vue";
import NewsSection from "./components/NewsSection.vue";
import { useSite } from "./composables/useSite";

import {
  site,
  advantages,
  resultsImages,
  problems,
  amenities,
  courses,
  team,
  steps,
  faq,
  schools,
  learningCenters,
} from "./data/landing";

const {
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
} = useSite();

const openFaq = ref(0);
const heroLoaded = ref(false);

onMounted(() => {
  requestAnimationFrame(() => {
    heroLoaded.value = true;
  });
});
</script>
