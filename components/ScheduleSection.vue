<script setup lang="ts">
import { pixelSlideIn, pixelFadeIn, pixelScanIn } from '~/composables/usePixelAnimation'

const scheduleDay0 = [
  { time: '18:00', event: 'Kick Off Party Night 开始', icon: '🎉' },
  { time: '18:00-22:00', event: '破冰交流 & 组队', icon: '🤝' },
  { time: '全程', event: '轻食饮品供应', icon: '🍕' },
]

const scheduleDay1 = [
  { time: '10:00', event: 'Kick Off Ceremony 开幕', icon: '🎤' },
  { time: '10:00-11:00', event: '赛道介绍 & 嘉宾分享', icon: '💡' },
  { time: '11:00', event: 'Hackathon 正式开始', icon: '⚡' },
  { time: '11:00-24:00', event: '全天开发 + 技术支持', icon: '💻' },
]

const scheduleDay2 = [
  { time: '00:00-24:00', event: 'Hackathon 持续开发', icon: '🚀' },
  { time: '全天', event: '技术导师答疑', icon: '👨‍🏫' },
  { time: '全天', event: '硬件资源支持', icon: '🛠️' },
  { time: '待定', event: 'Workshop & Tech Talk', icon: '📚' },
]

const scheduleDay3 = [
  { time: '00:00-11:00', event: 'Final Sprint 最后冲刺', icon: '⏰' },
  { time: '11:00', event: '作品提交截止', icon: '📦' },
  { time: '12:30-14:30', event: 'Nerd Bar + Maker Show', icon: '🍻' },
  { time: '14:30-15:30', event: 'Closing Forum 闭幕论坛', icon: '🏆' },
  { time: '18:00-22:00', event: 'After Party 庆功派对', icon: '🎊' },
]

const scheduleItemVariants = {
  initial: { opacity: 0, x: -40, scale: 0.95 },
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

const activeDay = ref(0)
const currentSchedule = computed(() => {
  if (activeDay.value === 0) return scheduleDay0
  if (activeDay.value === 1) return scheduleDay1
  if (activeDay.value === 2) return scheduleDay2
  return scheduleDay3
})
const activeDayPath = computed(() => `/schedule/day${activeDay.value}`)
</script>

<template>
  <section id="schedule" class="py-24 px-6">
    <div class="max-w-3xl mx-auto">
      <div
        v-motion
        :initial="pixelSlideIn.initial"
        :visible-once="pixelSlideIn.visibleOnce"
        class="mb-8"
      >
        <span class="font-pixel text-xs text-primary">
          《 SCHEDULE 》
        </span>
      </div>

      <h2
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="font-pixel-cn text-2xl md:text-3xl mb-8"
      >
        活动日程
      </h2>

      <div
        v-motion
        :initial="pixelFadeIn.initial"
        :visible-once="pixelFadeIn.visibleOnce"
        class="flex gap-3 mb-8"
      >
        <button
          v-for="day in [0, 1, 2, 3]"
          :key="day"
          @click="activeDay = day"
          class="font-pixel text-xs px-6 py-3 transition-all"
          :class="activeDay === day ? 'bg-primary text-primary-foreground' : 'pixel-card text-muted-foreground hover:text-foreground'"
          :style="activeDay === day ? { boxShadow: '3px 3px 0 0 hsl(160 50% 35%)' } : undefined"
          v-motion
          :hover="{ scale: 1.05 }"
          :press="{ scale: 0.98 }"
        >
          DAY {{ day }}
        </button>
      </div>

      <div
        v-motion
        :initial="pixelScanIn.initial"
        :visible-once="pixelScanIn.visibleOnce"
        class="pixel-card p-6 overflow-hidden"
      >
        <Transition name="list" mode="out-in">
          <div :key="activeDay" class="space-y-0">
            <div
              v-for="(item, index) in currentSchedule"
              :key="item.time + item.event"
              v-motion
              :initial="scheduleItemVariants.initial"
              :enter="{ ...scheduleItemVariants.visibleOnce, transition: { ...scheduleItemVariants.visibleOnce.transition, delay: index * 80 } }"
              class="flex items-center gap-4 py-3 border-b border-border/30 last:border-0 hover:bg-primary/5 transition-colors px-2 -mx-2"
              :hover="{ x: 8 }"
            >
              <div
                v-motion
                class="w-10 h-10 flex-shrink-0 flex items-center justify-center text-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
                style="clip-path: polygon(0 3px, 3px 3px, 3px 0, calc(100% - 3px) 0, calc(100% - 3px) 3px, 100% 3px, 100% calc(100% - 3px), calc(100% - 3px) calc(100% - 3px), calc(100% - 3px) 100%, 3px 100%, 3px calc(100% - 3px), 0 calc(100% - 3px))"
                :hover="{ scale: 1.2, rotate: 10 }"
                :transition="{ type: 'spring', stiffness: 400 }"
              >
                {{ item.icon }}
              </div>
              <span class="font-pixel text-xs text-primary w-16">
                {{ item.time }}
              </span>
              <span class="font-pixel-cn text-xl flex-1 text-foreground">
                {{ item.event }}
              </span>
            </div>
          </div>
        </Transition>
      </div>

      <NuxtLink
        :to="activeDayPath"
        v-motion
        :initial="{ opacity: 0 }"
        :visible-once="{ opacity: 1, transition: { duration: 400, delay: 900 } }"
        class="inline-block mt-6 font-pixel text-xs text-primary hover:text-[#B185DB] transition-colors"
        :hover="{ x: 5 }"
      >
        [ READ MORE... ]
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
