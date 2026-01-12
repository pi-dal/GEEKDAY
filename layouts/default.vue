<template>
  <div class="min-h-screen text-foreground relative z-0">
    <!-- Background layers - LOWEST z-index to stay behind content -->
    <div class="fixed inset-0 -z-50 bg-gradient-to-br from-[#1a1a4e] via-[#2d1b69] to-[#1a1a4e]" />

    <div class="fixed top-0 right-0 -z-40 w-2/3 h-2/5 bg-gradient-to-bl from-orange-500/20 via-yellow-500/10 to-transparent" />

    <div class="fixed bottom-0 left-0 -z-40 w-1/2 h-1/3 bg-gradient-to-tr from-cyan-500/15 via-blue-500/5 to-transparent" />

    <div
      class="fixed inset-0 -z-30 opacity-[0.02]"
      :style="{
        backgroundImage: `
          linear-gradient(hsl(160 60% 65%) 1px, transparent 1px),
          linear-gradient(90deg, hsl(160 60% 65%) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }"
    />

    <!-- Navbar - fixed with high z-index -->
    <Navbar />

    <!-- Main content -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>
