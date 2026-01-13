<script setup lang="ts">
import HeroSection from '~/components/HeroSection.vue'
import StatsSection from '~/components/StatsSection.vue'
import AboutSection from '~/components/AboutSection.vue'
import VenueSection from '~/components/VenueSection.vue'
import ScheduleSection from '~/components/ScheduleSection.vue'
import PrizesSection from '~/components/PrizesSection.vue'
import SponsorsSection from '~/components/SponsorsSection.vue'
import FAQSection from '~/components/FAQSection.vue'
import CTASection from '~/components/CTASection.vue'
import Footer from '~/components/Footer.vue'
import RegisterModal from '~/components/RegisterModal.vue'
import { useRegisterModal } from '~/composables/useRegisterModal'

const { isOpen, closeModal } = useRegisterModal()
</script>

<template>
  <div class="min-h-screen">
    <!-- Main content - ensure content is visible above background -->
    <main class="relative">
      <HeroSection />
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
