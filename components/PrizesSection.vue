<script setup lang="ts">
import { pixelSlideIn, pixelFadeIn, staggerContainer, fastStaggerContainer } from '~/composables/usePixelAnimation'

const prizes = [
  { rank: 'AI AGENT', amount: '赛道奖金', icon: '🤖', color: 'text-cyan-400' },
  { rank: 'EMBODIED', amount: '赛道奖金', icon: '🦾', color: 'text-purple-400' },
  { rank: 'SPECIAL', amount: '特别奖项', icon: '🌟', color: 'text-amber-400' },
]

const specialPrizes = [
  '企业实习推荐',
  '项目孵化机会',
  '导师指导资源',
  '产业对接通道',
]

const prizeCard = {
  initial: {
    opacity: 0,
    y: 60,
    rotateY: -15,
    scale: 0.9,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    rotateY: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 150,
      damping: 15,
    },
  },
}

const tagPop = {
  initial: { opacity: 0, scale: 0.5, y: 10 },
  visibleOnce: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 15,
    },
  },
}
</script>

<template>
  <section id="prizes" class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div
        v-motion
        :initial="pixelSlideIn.initial"
        :visible-once="pixelSlideIn.visibleOnce"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          《 PRIZES 》
        </span>
      </div>

        <div
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="mb-12"
        >
          <h2
            v-motion
            class="font-pixel-cn text-3xl md:text-5xl text-gradient mb-2"
            :animate="{
              textShadow: [
                '0 0 20px hsl(160 60% 65% / 0.3)',
                '0 0 40px hsl(160 60% 65% / 0.5)',
                '0 0 20px hsl(160 60% 65% / 0.3)',
              ],
            }"
            :transition="{ duration: 2000, repeat: Infinity }"
          >
            ¥60,000+
          </h2>
        <p class="font-pixel-cn text-xl text-muted-foreground">
          总奖金池
        </p>
      </div>

      <div
        v-motion
        class="grid md:grid-cols-3 gap-4 mb-12"
        :initial="staggerContainer.initial"
        :visible-once="staggerContainer.visibleOnce"
        style="perspective: 1200px"
      >
        <div
          v-for="(prize, index) in prizes"
          :key="prize.rank"
          v-motion
          :initial="prizeCard.initial"
          :visible-once="prizeCard.visibleOnce"
          :class="[
            'pixel-card p-6 text-center group',
            index === 0 ? 'md:-mt-4 prize-card-gold' : ''
          ]"
          :hover="{ y: -8, rotateY: 5 }"
          :transition="{ type: 'spring', stiffness: 300 }"
        >
          <div
            v-motion
            :class="`w-20 h-20 mx-auto mb-4 flex items-center justify-center text-5xl ${index === 0 ? 'bg-gradient-to-br from-yellow-500/30 to-orange-500/20' : 'bg-gradient-to-br from-primary/10 to-secondary/10'}`"
            style="clip-path: polygon(0 8px, 8px 8px, 8px 0, calc(100% - 8px) 0, calc(100% - 8px) 8px, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 8px calc(100% - 8px), 0 calc(100% - 8px))"
            :hover="{ scale: 1.15, rotate: 10 }"
            :transition="{ type: 'spring', stiffness: 300 }"
          >
            {{ prize.icon }}
          </div>
          <div class="font-pixel text-xs text-muted-foreground mb-2">
            {{ prize.rank }} PLACE
          </div>
          <div :class="`font-pixel text-xl md:text-2xl ${prize.color}`">
            {{ prize.amount }}
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
      >
        <h3 class="font-pixel-cn text-sm text-muted-foreground mb-4">
          ◆ 总奖金池，含实物与现金奖励
        </h3>
        <div
          v-motion
          class="flex flex-wrap gap-3"
          :initial="fastStaggerContainer.initial"
          :visible-once="fastStaggerContainer.visibleOnce"
        >
          <span
            v-for="prize in specialPrizes"
            :key="prize"
            v-motion
            :initial="tagPop.initial"
            :visible-once="tagPop.visibleOnce"
            class="font-pixel-cn text-lg px-4 py-2 rounded-lg bg-card border-2 border-border/30 hover:border-primary hover:text-primary transition-colors cursor-default"
            :hover="{ scale: 1.05, y: -3 }"
          >
            {{ prize }}
          </span>
        </div>
      </div>

      <p
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{ opacity: 1, transition: { duration: 400, delay: 1000 } }"
        class="font-pixel-cn text-sm text-muted-foreground mt-8"
      >
        ▲ 以上为参与活动附带获得的福利
      </p>

      <NuxtLink
        to="/prizes"
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{ opacity: 1, transition: { duration: 400, delay: 1100 } }"
        class="inline-block mt-4 font-pixel text-xs text-primary hover:text-[#B185DB] transition-colors"
        :hover="{ x: 5 }"
      >
        [ READ MORE... ]
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.prize-card-gold {
  box-shadow: 4px 4px 0 0 hsl(45 90% 50% / 0.4), inset 0 0 20px hsl(45 90% 60% / 0.1);
}

.prize-card-gold:hover {
  box-shadow: 8px 8px 0 0 hsl(45 90% 55% / 0.5), inset 0 0 30px hsl(45 90% 60% / 0.15);
}

.pixel-card:hover {
  box-shadow: 8px 8px 0 0 hsl(160 60% 45% / 0.4);
}
</style>
