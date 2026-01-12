<script setup lang="ts">
import { pixelSlideIn, pixelFadeIn, pixelScanIn, fastStaggerContainer } from '~/composables/usePixelAnimation'

const features = [
  { icon: '🤖', title: 'AI Agent 赛道', desc: '基于大模型构建智能体应用' },
  { icon: '🦾', title: '具身智能赛道', desc: '感知-决策-执行闭环机器人' },
  { icon: '🏆', title: '¥60,000+ 奖金', desc: '丰厚奖金与孵化机会' },
  { icon: '🍽️', title: '全程免费', desc: '食宿交通全包，专注创造' },
]

const featureItem = {
  initial: {
    opacity: 0,
    x: -30,
    scale: 0.95,
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
}
</script>

<template>
  <section id="about" class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div
        v-motion
        :initial="pixelSlideIn.initial"
        :visible-once="pixelSlideIn.visibleOnce"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          《 WHY ATTEND 》
        </span>
      </div>

      <h2
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="font-pixel-cn text-2xl md:text-3xl mb-6 leading-relaxed"
      >
        Here's to the
        <span class="text-gradient ml-4">Crazy Ones</span>
      </h2>

      <div
        v-motion
        :initial="pixelScanIn.initial"
        :visible-once="pixelScanIn.visibleOnce"
        class="pixel-card p-6 mb-12 max-w-2xl"
      >
        <p class="font-pixel-cn text-xl leading-relaxed text-foreground/90">
          这个世界总有一群不安分的人——他们是创造者、梦想家、那些敢于改变世界的人。
          48小时内，不可能变为可能。
        </p>
      </div>

      <div
        v-motion
        class="grid sm:grid-cols-2 gap-4"
        :initial="fastStaggerContainer.initial"
        :visible-once="fastStaggerContainer.visibleOnce"
      >
        <div
          v-for="item in features"
          :key="item.title"
          v-motion
          :initial="featureItem.initial"
          :visible-once="featureItem.visibleOnce"
          class="pixel-card p-4 flex items-start gap-4 hover:scale-[1.01] transition-transform"
          :hover="{ x: 5, boxShadow: '6px 6px 0 0 hsl(160 60% 45% / 0.3)' }"
        >
          <div
            v-motion
            class="w-12 h-12 flex-shrink-0 flex items-center justify-center text-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/30"
            style="clip-path: polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))"
            :hover="{ rotate: 10 }"
          >
            {{ item.icon }}
          </div>
          <div>
            <h4 class="font-pixel-cn text-sm mb-2 text-primary">{{ item.title }}</h4>
            <p class="font-pixel-cn text-lg text-muted-foreground">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
