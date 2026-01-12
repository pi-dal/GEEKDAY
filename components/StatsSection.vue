<script setup lang="ts">
import { pixelSlideIn, pixelFadeIn, pixelPopIn, staggerContainer, usePixelInView } from '~/composables/usePixelAnimation'

const stats = [
  { value: '48', label: '小时编程', icon: '⏰' },
  { value: '¥60K+', label: '奖金池', icon: '💰' },
  { value: '2', label: '赛道', icon: '🎯' },
]

const { target, isVisible } = usePixelInView('-10%')
</script>

<template>
  <section class="py-24 px-6" ref="target">
    <div class="max-w-5xl mx-auto">
      <div
        v-motion
        :variants="pixelSlideIn"
        :initial="pixelSlideIn.hidden"
        :visible="isVisible ? pixelSlideIn.visible : pixelSlideIn.hidden"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          《 PREVIEW 》
        </span>
      </div>

      <h2
        v-motion
        :variants="pixelFadeIn"
        :initial="pixelFadeIn.hidden"
        :visible="isVisible ? pixelFadeIn.visible : pixelFadeIn.hidden"
        class="font-pixel-cn text-2xl md:text-3xl mb-16 leading-relaxed"
      >
        北回归线极客节
        <span class="text-muted-foreground ml-4">2026</span>
      </h2>

      <div
        v-motion
        class="grid md:grid-cols-3 gap-6"
        :variants="staggerContainer"
        :initial="staggerContainer.hidden"
        :visible="isVisible ? staggerContainer.visible : staggerContainer.hidden"
        style="perspective: 1000px"
      >
        <div
          v-for="stat in stats"
          :key="stat.label"
          v-motion
          :variants="pixelPopIn"
          :initial="pixelPopIn.hidden"
          :visible="isVisible ? pixelPopIn.visible : pixelPopIn.hidden"
          class="pixel-card p-8 text-center group hover:scale-[1.02] transition-transform"
          style="perspective: 1000px"
        >
          <div
            v-motion
            class="w-16 h-16 mx-auto mb-4 flex items-center justify-center text-4xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30"
            style="clip-path: polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))"
            :hover="{ scale: 1.1, rotate: 5 }"
            :transition="{ type: 'spring', stiffness: 400 }"
          >
            {{ stat.icon }}
          </div>
          <div class="font-pixel text-2xl md:text-3xl text-gradient mb-3">
            {{ stat.value }}
          </div>
          <div class="font-pixel-cn text-xl text-muted-foreground">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
