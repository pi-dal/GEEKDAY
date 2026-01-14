<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import HeroSection from '~/components/HeroSection.vue'
import IntroSection from '~/components/IntroSection.vue'
import { useRegisterModal } from '~/composables/useRegisterModal'

// Lazy load below-the-fold components for better initial load performance
const StatsSection = defineAsyncComponent(() => import('~/components/StatsSection.vue'))
const AboutSection = defineAsyncComponent(() => import('~/components/AboutSection.vue'))
const VenueSection = defineAsyncComponent(() => import('~/components/VenueSection.vue'))
const ScheduleSection = defineAsyncComponent(() => import('~/components/ScheduleSection.vue'))
const PrizesSection = defineAsyncComponent(() => import('~/components/PrizesSection.vue'))
const SponsorsSection = defineAsyncComponent(() => import('~/components/SponsorsSection.vue'))
const FAQSection = defineAsyncComponent(() => import('~/components/FAQSection.vue'))
const CTASection = defineAsyncComponent(() => import('~/components/CTASection.vue'))
const Footer = defineAsyncComponent(() => import('~/components/Footer.vue'))
const RegisterModal = defineAsyncComponent(() => import('~/components/RegisterModal.vue'))

const { isOpen, closeModal } = useRegisterModal()
</script>

<template>
  <div class="min-h-screen">
    <!-- Main content - ensure content is visible above background -->
    <main class="relative">
      <HeroSection />
      <IntroSection />
      <StatsSection />
      <AboutSection />
      <VenueSection />
      <ScheduleSection />
      <PrizesSection />
      <SponsorsSection />
      <FAQSection />
      <CTASection />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Register Modal -->
    <RegisterModal :visible="isOpen" @close="closeModal" />
  </div>
</template>
