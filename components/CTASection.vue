<script setup lang="ts">
import PixelButton from './PixelButton.vue'
import { pixelFadeIn, pixelPopIn } from '~/composables/usePixelAnimation'
import { useRegisterModal } from '~/composables/useRegisterModal'

const { openModal } = useRegisterModal()
</script>

<template>
  <section class="py-32 px-6">
    <div class="max-w-3xl mx-auto text-center">
      <div
        v-motion
        :variants="pixelFadeIn"
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="pixel-card p-12 relative"
        :style="{
          boxShadow: '6px 6px 0 0 hsl(160 50% 35% / 0.4), inset 0 0 30px hsl(160 60% 65% / 0.05)',
        }"
        :hover="{
          boxShadow: '8px 8px 0 0 hsl(160 50% 35% / 0.5), inset 0 0 40px hsl(160 60% 65% / 0.08)',
        }"
      >
        <div
          v-motion
          class="absolute top-4 left-4 w-3 h-3 bg-primary/50"
          :animate="{ scale: [1, 1.2, 1] }"
          :transition="{ duration: 2000, repeat: Infinity, delay: 0 }"
        />
        <div
          v-motion
          class="absolute top-4 right-4 w-3 h-3 bg-secondary/50"
          :animate="{ scale: [1, 1.2, 1] }"
          :transition="{ duration: 2000, repeat: Infinity, delay: 500 }"
        />
        <div
          v-motion
          class="absolute bottom-4 left-4 w-3 h-3 bg-secondary/50"
          :animate="{ scale: [1, 1.2, 1] }"
          :transition="{ duration: 2000, repeat: Infinity, delay: 1000 }"
        />
        <div
          v-motion
          class="absolute bottom-4 right-4 w-3 h-3 bg-primary/50"
          :animate="{ scale: [1, 1.2, 1] }"
          :transition="{ duration: 2000, repeat: Infinity, delay: 1500 }"
        />

        <div class="flex justify-center gap-3 mb-8">
          <span
            v-for="(star, i) in ['★', '☆', '★', '☆', '★']"
            :key="i"
            v-motion
            :initial="{ opacity: 0, scale: 0 }"
            :visible-once="{
              opacity: 1,
              scale: 1,
              rotate: [0, 10, -10, 0],
            }"
            :transition="{
              opacity: { delay: 300 + i * 100, duration: 300 },
              scale: { delay: 300 + i * 100, type: 'spring', stiffness: 300 },
              rotate: { duration: 2000, delay: i * 200, repeat: Infinity },
            }"
            class="text-2xl text-secondary"
          >
            {{ star }}
          </span>
        </div>

        <h2
          v-motion
          class="font-pixel-cn text-2xl md:text-3xl mb-4 leading-relaxed"
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :transition="{ delay: 200, type: 'spring', stiffness: 200 }"
        >
          Ready to
          <span
            v-motion
            class="text-gradient ml-2"
            :animate="{
              textShadow: [
                '0 0 10px hsl(160 60% 65% / 0.3)',
                '0 0 25px hsl(160 60% 65% / 0.5)',
                '0 0 10px hsl(160 60% 65% / 0.3)',
              ],
            }"
            :transition="{ duration: 1500, repeat: Infinity }"
          >
            Build?
          </span>
        </h2>

        <p
          v-motion
          class="font-pixel-cn text-xl text-muted-foreground mb-8"
          :initial="{ opacity: 0 }"
          :visible-once="{ opacity: 1 }"
          :transition="{ delay: 400 }"
        >
          加入我们，48 小时将你的疯狂想法变成现实！
        </p>

        <div
          v-motion
          :variants="pixelPopIn"
          :initial="pixelPopIn.initial"
          :visible-once="pixelPopIn.visibleOnce"
        >
          <PixelButton @click="openModal">
            立即报名
          </PixelButton>
        </div>
      </div>
    </div>
  </section>
</template>
