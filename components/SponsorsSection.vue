<script setup lang="ts">
import { withBase } from 'ufo'
import { pixelSlideIn, pixelFadeIn, staggerContainer } from '~/composables/usePixelAnimation'

// 赛事指导单位
const guidanceSponsors = [
  { name: '百度飞桨', logo: '/sponsors/paddlepaddle.png' },
  { name: '阿里魔搭', logo: '/sponsors/modelscope.png' },
  { name: '天翼AI', logo: '/sponsors/tianyiai.png' },
]

// 赛道支持单位
const trackSponsors = [
  { name: '算能科技', logo: '/sponsors/sophgo.png' },
  { name: 'TRAE', logo: '/sponsors/trae.png' },
  { name: '非夕科技', logo: '/sponsors/flexiv.png' },
  { name: 'SeeedStudio', logo: '/sponsors/seeedstudio.png' },
  { name: '拓竹Cyberbrick', logo: '/sponsors/cyberbrick.svg' },
]

// 社区伙伴
const communityPartners = [
  { name: '观潮KwanTeo', logo: '/sponsors/kwanteo.png' },
  { name: 'OpenBuild', logo: '/sponsors/openbuild.png' },
  { name: '硅星人', logo: '/sponsors/guixingren.png' },
]

const baseURL = useRuntimeConfig().app.baseURL || '/'
const logoSrc = (path: string) => withBase(path, baseURL)

const sponsorCard = {
  initial: { opacity: 0, y: 30, scale: 0.9 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
    },
  },
}
</script>

<template>
  <section id="sponsors" class="py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <div
        v-motion
        :initial="pixelSlideIn.initial"
        :visible-once="pixelSlideIn.visibleOnce"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          {"<<"} PARTNERS {">>"}
        </span>
      </div>

      <h2
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="font-pixel-cn text-2xl md:text-3xl mb-12"
      >
        合作伙伴
      </h2>

      <!-- 赛事指导单位 -->
      <div class="mb-12">
        <h3
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="font-pixel text-xs text-primary/70 mb-6"
        >
          ◆ 赛事指导单位
        </h3>
        <div
          v-motion
          class="grid grid-cols-2 md:grid-cols-3 gap-4"
          :initial="staggerContainer.initial"
          :visible-once="staggerContainer.visibleOnce"
        >
          <div
            v-for="sponsor in guidanceSponsors"
            :key="sponsor.name"
            v-motion
            :initial="sponsorCard.initial"
            :visible-once="sponsorCard.visibleOnce"
            class="aspect-[2/1] pixel-card flex items-center justify-center p-4 cursor-pointer group"
            style="background: #d4c6e8 !important;"
            :hover="{ scale: 1.05, y: -5, boxShadow: '5px 5px 0 0 hsl(160 60% 45% / 0.3)' }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
          >
            <img
              :src="logoSrc(sponsor.logo)"
              :alt="sponsor.name"
              class="max-h-12 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- 赛道支持单位 -->
      <div class="mb-12">
        <h3
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="font-pixel text-xs text-primary/70 mb-6"
        >
          ◆ 赛道支持单位
        </h3>
        <div
          v-motion
          class="grid grid-cols-2 md:grid-cols-5 gap-4"
          :initial="staggerContainer.initial"
          :visible-once="staggerContainer.visibleOnce"
        >
          <div
            v-for="sponsor in trackSponsors"
            :key="sponsor.name"
            v-motion
            :initial="sponsorCard.initial"
            :visible-once="sponsorCard.visibleOnce"
            class="aspect-[2/1] pixel-card flex items-center justify-center p-4 cursor-pointer group"
            style="background: #d4c6e8 !important;"
            :hover="{ scale: 1.05, y: -5, boxShadow: '5px 5px 0 0 hsl(160 60% 45% / 0.3)' }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
          >
            <img
              :src="logoSrc(sponsor.logo)"
              :alt="sponsor.name"
              class="max-h-10 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all"
            />
          </div>
        </div>
      </div>

      <!-- 社区伙伴 -->
      <div class="mb-8">
        <h3
          v-motion
          :initial="pixelFadeIn.initial"
          :visible-once="pixelFadeIn.visibleOnce"
          class="font-pixel text-xs text-primary/70 mb-6"
        >
          ◆ 社区伙伴
        </h3>
        <div
          v-motion
          class="grid grid-cols-3 md:grid-cols-3 gap-4"
          :initial="staggerContainer.initial"
          :visible-once="staggerContainer.visibleOnce"
        >
          <div
            v-for="sponsor in communityPartners"
            :key="sponsor.name"
            v-motion
            :initial="sponsorCard.initial"
            :visible-once="sponsorCard.visibleOnce"
            class="aspect-[2/1] pixel-card flex items-center justify-center p-4 cursor-pointer group"
            style="background: #d4c6e8 !important;"
            :hover="{ scale: 1.05, y: -5, boxShadow: '5px 5px 0 0 hsl(160 60% 45% / 0.3)' }"
            :transition="{ type: 'spring', stiffness: 400, damping: 25 }"
          >
            <img
              :src="logoSrc(sponsor.logo)"
              :alt="sponsor.name"
              class="max-h-8 max-w-full object-contain filter brightness-100 group-hover:brightness-110 transition-all"
            />
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 10 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: 600 } }"
        class="mt-8 text-center"
      >
        <a
          href="mailto:cysybeijing@163.com"
          v-motion
          class="font-pixel-cn text-sm text-primary hover:underline inline-block"
          :hover="{ x: 5 }"
        >
          ▶ 成为赞助商
        </a>
      </div>
    </div>
  </section>
</template>
