<script setup lang="ts">
import { withBase } from 'ufo'
import { pixelFadeIn, usePixelInView } from '~/composables/usePixelAnimation'

const { target, isVisible } = usePixelInView('-10%')
const baseURL = useRuntimeConfig().app.baseURL || '/'
const towerSrc = computed(() => withBase('/images/tower.jpg', baseURL))
</script>

<template>
  <section id="intro" class="py-20 px-6" ref="target">
    <div class="max-w-4xl mx-auto">
      <!-- Tower Image -->
      <div
        v-motion
        :initial="{ opacity: 1, y: 30 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 800 }"
        class="mb-10"
      >
        <img 
          :src="towerSrc" 
          alt="北回归线标志塔" 
          class="tower-image w-4/5 mx-auto rounded-lg border-2 border-primary/20"
          width="800"
          height="533"
          loading="lazy"
        />
      </div>

      <!-- Description Text -->
      <div
        v-motion
        :variants="pixelFadeIn"
        :initial="pixelFadeIn.hidden"
        :visible="isVisible ? pixelFadeIn.visible : pixelFadeIn.hidden"
        class="max-w-4xl mx-auto"
      >
        <div class="space-y-6 font-pixel-cn text-base md:text-lg text-foreground/85 leading-relaxed">
          <p>
            <span class="text-primary font-bold">"北回归线极客节"</span>（23.5°N GeekDay）是粤东首个大型极客盛会。"<span class="text-primary">北回归线</span>"取名自潮汕地区所处的北纬 23.5 度，坐落在汕头的两座北回归线标志塔是本土青年成长记忆中的标志性建筑。"<span class="text-primary">极客节</span>"的宗旨是<span class="text-foreground underline">立足潮汕、面向湾区、辐射全国</span>，目标将前沿的极客精神、科技社区、产业技术引回潮汕，带动本土中小学青少年启蒙、高校科班后备人才培养、行业开发者项目落地孵化。活动简称<span class="text-secondary">"北归"</span>，也蕴含了主创团队<span class="text-foreground underline">在京学成、自北归南、反哺家乡</span>的初衷。
          </p>
          <p>
            "北回归线极客节"自2024年开始筹备，首届以一场 <span class="text-cyan-400">Hackathon 黑客马拉松</span>、一场 <span class="text-orange-400">Nerd Bar 圆桌酒会</span>、一场 <span class="text-green-400">Maker Show 科技庙会 </span>组成，计划长期持续运营。北回归线是太阳在地球上直射的北界，也是创意与热情的沸点。我们期待同好们用实践和创造开拓认知边界，以灵感的迸发、智慧的涌现建设潮汕，启迪湾区，直至触达世界。我们也期待共同的极客精神超越方言、地域，持续促成极客联结与思想交融，在现代化、智能化的阈限中建构创造价值认同与文化互认体系。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tower-image {
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(139, 92, 246, 0.15);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.tower-image:hover {
  transform: scale(1.02);
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.35),
    0 0 60px rgba(139, 92, 246, 0.25),
    0 0 100px rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.4);
}
</style>
