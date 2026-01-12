<script setup lang="ts">
import { pixelSlideIn, pixelFadeIn, fastStaggerContainer } from '~/composables/usePixelAnimation'

const faqs = [
  {
    question: '谁可以参加？',
    answer: '主要面向潮籍青年学子和粤港澳地区极客爱好者，包括中学生、本硕博学子、AI/互联网从业者。非技术背景的AI爱好者同样欢迎！',
  },
  {
    question: '如何组队？',
    answer: 'AI Agent赛道推荐1-5人，Embodied AI赛道推荐3-5人。可自行组队或接受组委会调配，鼓励"算法+工程+设计"互补。',
  },
  {
    question: '报名截止时间？',
    answer: '2026年1月31日 24:00（北京时间），需将项目计划书和团队信息表提交至 cysybeijing@163.com。',
  },
  {
    question: '需要自带设备吗？',
    answer: '是的，请自带笔记本电脑。组委会提供算力支持、技术资源包、TRAE Pro会员等开发工具。',
  },
  {
    question: '有参赛费用吗？',
    answer: '完全免费！组委会提供免费餐食住宿、汕头/潮州/揭阳跨市交通接送、官方纪念周边。',
  },
  {
    question: '开发周期多长？',
    answer: '48小时！参赛队伍须在规定时间内完成项目开发并提交成果，场地全程开放。',
  },
]

const faqItem = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  visibleOnce: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20,
    },
  },
}

const openIndex = ref<number | null>(null)
</script>

<template>
  <section id="faq" class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div
        v-motion
        :initial="pixelSlideIn.initial"
        :visible-once="pixelSlideIn.visibleOnce"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          {"<<"} FAQ {">>"}
        </span>
      </div>

      <h2
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="font-pixel-cn text-2xl md:text-3xl mb-12"
      >
        常见问题
      </h2>

      <div
        v-motion
        class="space-y-2"
        :initial="fastStaggerContainer.initial"
        :visible-once="fastStaggerContainer.visibleOnce"
      >
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          v-motion
          :initial="faqItem.initial"
          :visible-once="faqItem.visibleOnce"
          class="pixel-card overflow-hidden group"
          :hover="{ x: 5 }"
        >
          <button
            @click="openIndex = openIndex === index ? null : index"
            class="w-full p-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
            v-motion
            :press="{ scale: 0.995 }"
          >
            <span class="font-pixel-cn text-sm pr-4 flex items-center gap-3">
              <span
                v-motion
                class="w-6 h-6 flex items-center justify-center bg-primary/20 border border-primary/40 text-primary text-xs"
                :animate="{ rotate: openIndex === index ? 180 : 0 }"
                :transition="{ type: 'spring', stiffness: 300 }"
              >
                {{ openIndex === index ? '−' : '+' }}
              </span>
              {{ faq.question }}
            </span>
          </button>
          <Transition name="accordion">
            <div v-if="openIndex === index" class="overflow-hidden">
              <p
                v-motion
                :initial="{ y: -10 }"
                :enter="{ y: 0 }"
                :transition="{ type: 'spring', stiffness: 300, damping: 25 }"
                class="px-4 pb-4 font-pixel-cn text-lg text-muted-foreground border-t border-dashed border-border/50 pt-4 ml-9"
              >
                {{ faq.answer }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
}
.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
