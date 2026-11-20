<template>
  <div>
    <Header
      base="/"
      :lang="lang"
      :menu-open="menuOpen"
      :t="t"
      :data="site"
      @change-lang="lang = $event"
      @update:menu-open="menuOpen = $event"
      @open-contact="openContactModal"
    />

    <main>
      <slot :lang="lang" :t="t" :open-contact="openContactModal" />
    </main>

    <Footer
      base="/"
      :t="t"
      :data="site"
      :lang="lang"
      @open-contact="openContactModal"
    />

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
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import ContactModal from "../components/ContactModal.vue";
import { site } from "../data/landing";
import { useSite } from "../composables/useSite";

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
</script>
