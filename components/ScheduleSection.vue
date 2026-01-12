<script setup lang="ts">
import { pixelSlideIn, pixelFadeIn, pixelScanIn } from '~/composables/usePixelAnimation'

const scheduleDay1 = [
  { time: '08:00', event: '签到入场', icon: '📝' },
  { time: '09:00', event: '开幕式', icon: '🎬' },
  { time: '10:00', event: '主题发布 & 组队', icon: '👥' },
  { time: '11:00', event: '▶ 48小时编程开始', icon: '💻' },
  { time: '12:00', event: '午餐', icon: '🍜' },
  { time: '18:00', event: '晚餐', icon: '🍕' },
  { time: '00:00', event: '午夜茶歇', icon: '🌙' },
]

const scheduleDay2 = [
  { time: '08:00', event: '早餐', icon: '☕' },
  { time: '11:00', event: '■ 编程结束 & 提交', icon: '🏁' },
  { time: '12:00', event: '午餐', icon: '🍜' },
  { time: '13:00', event: '项目路演', icon: '🎤' },
  { time: '16:00', event: '颁奖典礼', icon: '🏆' },
  { time: '17:00', event: '闭幕式', icon: '👋' },
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

const activeDay = ref(1)
const currentSchedule = computed(() => activeDay.value === 1 ? scheduleDay1 : scheduleDay2)
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
          v-for="day in [1, 2]"
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
