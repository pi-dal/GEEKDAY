<script setup lang="ts">
import { withBase } from 'ufo'
import PixelButton from './PixelButton.vue'
import { useRegisterModal } from '~/composables/useRegisterModal'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const { openModal } = useRegisterModal()

const baseURL = useRuntimeConfig().app.baseURL || '/'
const toBase = (path: string) => withBase(path, baseURL)

const registrationDeadline = new Date('2026-01-31T23:59:00+08:00').getTime()
const kickoffTime = new Date('2026-02-23T10:00:00+08:00').getTime()

const now = ref(Date.now())
let timer: ReturnType<typeof setInterval> | null = null

// Track previous values for flip animation
const prevSeconds = ref(-1)
const isFlipping = ref(false)

const countdownTarget = computed(() =>
  now.value <= registrationDeadline ? registrationDeadline : kickoffTime,
)

const countdownLabel = computed(() =>
  now.value <= registrationDeadline ? '截止报名' : '距离开幕Kick Off',
)

const countdown = computed(() => {
  const diff = countdownTarget.value - now.value

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true }
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  return { days, hours, minutes, seconds, isOver: false }
})

watch(countdownTarget, () => {
  prevSeconds.value = -1
  isFlipping.value = false
})

// Watch for second changes to trigger flip animation
watch(() => countdown.value.seconds, (newVal, oldVal) => {
  if (oldVal !== undefined && newVal !== oldVal) {
    prevSeconds.value = oldVal
    isFlipping.value = true
    setTimeout(() => {
      isFlipping.value = false
    }, 600)
  }
})

// Format number to always have 2 digits
const pad = (n: number) => n.toString().padStart(2, '0')

onMounted(() => {
  timer = setInterval(() => {
    now.value = Date.now()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
    <!-- Hero-specific background - ensure it doesn't interfere with page background -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-br from-[#1a1a4e] via-[#2d1b69] to-[#1a1a4e]" />

    <div class="absolute top-0 right-0 -z-10 w-2/3 h-2/5 bg-gradient-to-bl from-orange-500/40 via-yellow-500/25 to-transparent" />

    <div class="absolute bottom-0 left-0 -z-10 w-1/2 h-1/3 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent" />



    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        v-motion
        class="absolute top-[35%] left-1/2 -translate-x-1/2 w-[500px] md:w-[700px] h-[200px] md:h-[280px] border border-white/15 rounded-full"
        style="transform: translate(-50%, -50%) rotateX(70deg)"
      />

      <div
        v-motion
        class="absolute top-[38%] left-1/2 -translate-x-1/2 w-[350px] md:w-[500px] h-[140px] md:h-[180px] border border-white/10 rounded-full"
        style="transform: translate(-50%, -50%) rotateX(70deg)"
      />

      <div
        v-motion
        class="absolute top-[22%] left-[8%] md:left-[12%] px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded text-green-400 font-mono text-sm border border-green-400/30"
        :animate="{ y: [0, -8, 0] }"
        :transition="{ duration: 4000, repeat: Infinity }"
      >
        {"&lt;hello&gt;"}
      </div>

      <div
        v-motion
        class="absolute top-[18%] right-[8%] md:right-[12%] px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded text-green-400 font-mono text-sm border border-green-400/30"
        :animate="{ y: [0, -6, 0] }"
        :transition="{ duration: 5000, repeat: Infinity, delay: 1000 }"
      >
        23.5°N
      </div>

      <div
        v-motion
        class="absolute top-[28%] right-[20%] text-white/25 font-mono text-xs hidden md:block"
        :animate="{ opacity: [0.15, 0.35, 0.15] }"
        :transition="{ duration: 3000, repeat: Infinity }"
      >
        e35c2b94e8476563
      </div>

      <div
        v-motion
        class="absolute top-[25%] left-[18%] text-white/20 font-mono text-xs hidden md:block"
        :animate="{ opacity: [0.1, 0.3, 0.1] }"
        :transition="{ duration: 4000, repeat: Infinity, delay: 1000 }"
      >
        4e17908c32b
      </div>

      <div
        v-motion
        class="absolute top-[15%] left-[3%] hidden lg:flex flex-col items-center gap-1"
        :animate="{ opacity: [0.5, 0.8, 0.5] }"
        :transition="{ duration: 6000, repeat: Infinity }"
      >
        <div class="w-8 h-8 rounded-full border-2 border-green-400/50 flex items-center justify-center">
          <div class="w-2 h-2 rounded-full bg-green-400/80" />
        </div>
        <span class="text-green-400/70 text-[10px] font-mono">23.5° N</span>
        <span class="text-green-400/70 text-[10px] font-mono">GEEKDAY</span>
      </div>

      <div class="absolute top-[12%] right-[4%] flex gap-2">
        <div class="w-3 h-3 rounded-full bg-green-400/80" />
        <div class="w-3 h-3 rounded-full bg-green-400/40" />
      </div>
    </div>

    <div class="max-w-5xl mx-auto text-center relative z-10">
      <div
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1 }"
        :transition="{ duration: 600, delay: 500 }"
        class="mb-6"
      >
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
          <span class="font-mono text-2xl md:text-3xl text-white/90 tracking-[0.35em]">
            2026.02.
          </span>
          <span class="keycap font-pixel text-xl md:text-2xl">23-25</span>
        </div>
      </div>


      <p
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1 }"
        :transition="{ duration: 600, delay: 600 }"
        class="text-lg md:text-xl font-pixel-cn text-white/80 mb-8"
      >
        用 <span class="text-cyan-300 font-bold">创造</span> · 触碰 <span class="text-orange-300 font-bold">认知边界</span>
      </p>

      <div
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 800, delay: 700 }"
        class="mb-8"
      >
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-2">
          <span class="font-pixel">23.5°N</span>
        </h1>
        <h2 class="text-4xl md:text-6xl lg:text-7xl font-bold tracking-widest">
          <span class="font-pixel mario-text">GEEKDAY</span>
        </h2>
      </div>

      <!-- Countdown Timer -->
      <div
        v-if="!countdown.isOver"
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1 }"
        :transition="{ duration: 600, delay: 850 }"
        class="mb-6"
      >
        <p class="font-pixel-cn text-lg text-white/90 mb-4" style="text-shadow: 0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.4), 0 0 30px rgba(255,255,255,0.2);">
          {{ countdownLabel }}
        </p>
        <div class="flip-countdown">
          <div class="flip-item">
            <div class="flip-card">
              <div class="flip-card-inner">
                <span class="flip-num font-mono">{{ countdown.days }}</span>
              </div>
            </div>
            <span class="flip-unit">天</span>
          </div>
          <div class="flip-item">
            <div class="flip-card">
              <div class="flip-card-inner">
                <span class="flip-num font-mono">{{ pad(countdown.hours) }}</span>
              </div>
            </div>
            <span class="flip-unit">时</span>
          </div>
          <div class="flip-item">
            <div class="flip-card">
              <div class="flip-card-inner">
                <span class="flip-num font-mono">{{ pad(countdown.minutes) }}</span>
              </div>
            </div>
            <span class="flip-unit">分</span>
          </div>
          <div class="flip-item">
            <div class="flip-card-wrapper">
              <!-- Static background showing new value -->
              <div class="flip-card-static">
                <div class="flip-half flip-half-top">
                  <span class="flip-num font-mono">{{ pad(countdown.seconds) }}</span>
                </div>
                <div class="flip-half flip-half-bottom">
                  <span class="flip-num font-mono">{{ pad(countdown.seconds) }}</span>
                </div>
              </div>
              <!-- Animated flipping card -->
              <div v-if="isFlipping" class="flip-card-animated">
                <div class="flip-panel flip-panel-top" :class="{ 'do-flip': isFlipping }">
                  <span class="flip-num font-mono">{{ pad(prevSeconds >= 0 ? prevSeconds : countdown.seconds) }}</span>
                </div>
                <div class="flip-panel flip-panel-bottom" :class="{ 'do-flip-up': isFlipping }">
                  <span class="flip-num font-mono">{{ pad(countdown.seconds) }}</span>
                </div>
              </div>
            </div>
            <span class="flip-unit">秒</span>
          </div>
        </div>
      </div>

      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visible="{ opacity: 1, y: 0 }"
        :transition="{ duration: 600, delay: 900 }"
        class="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <PixelButton @click="openModal">
          立即报名
        </PixelButton>
        <a href="https://mp.weixin.qq.com/s/2yIlxKBQouacdL06iv6jrA" target="_blank">
          <PixelButton variant="outline" :show-dots="false">
            了解更多
          </PixelButton>
        </a>
      </div>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1 }"
      :transition="{ delay: 1000 }"
      class="absolute bottom-[25%] right-[8%] hidden md:block"
    >
      <div
        v-motion
        :animate="{ opacity: [1, 0, 1] }"
        :transition="{ duration: 1000, repeat: Infinity }"
        class="w-3 h-8 bg-green-400"
      />
    </div>

    <!-- QR Codes -->
    <div
      v-motion
      :initial="{ opacity: 0, x: -20 }"
      :visible="{ opacity: 1, x: 0 }"
      :transition="{ delay: 1500, duration: 800 }"
      class="absolute bottom-4 left-4 z-20 hidden origin-bottom-left gap-3 md:flex md:gap-4"
    >
      <div class="group flex flex-col items-center gap-1 md:gap-2">
        <div class="overflow-hidden rounded-lg bg-white p-1 shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] transition-transform group-hover:-translate-y-1 md:shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
          <img
            :src="toBase('/images/RedNote.png')"
            alt="小红书 RedNote 二维码"
            loading="lazy"
            class="h-16 w-16 [image-rendering:pixelated] md:h-20 md:w-20"
          />
        </div>
        <span class="rounded bg-black/40 px-1.5 py-0.5 font-pixel text-[8px] text-white/80 backdrop-blur-sm md:text-[10px]">RedNote</span>
      </div>

      <div class="group flex flex-col items-center gap-1 md:gap-2">
        <div class="overflow-hidden rounded-lg bg-white p-1 shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] transition-transform group-hover:-translate-y-1 md:shadow-[4px_4px_0_0_rgba(0,0,0,0.5)]">
          <img
            :src="toBase('/images/WeChat.png')"
            alt="微信公众号 二维码"
            loading="lazy"
            class="h-16 w-16 [image-rendering:pixelated] md:h-20 md:w-20"
          />
        </div>
        <span class="rounded bg-black/40 px-1.5 py-0.5 font-pixel text-[8px] text-white/80 backdrop-blur-sm md:text-[10px]">WeChat</span>
      </div>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0 }"
      :visible="{ opacity: 1 }"
      :transition="{ delay: 1200 }"
      class="absolute bottom-6 left-1/2 -translate-x-1/2"
    >
      <div
        v-motion
        :animate="{ y: [0, 8, 0] }"
        :transition="{ duration: 1500, repeat: Infinity }"
        class="font-pixel-body text-2xl text-white/50"
      >
        ▼
      </div>
    </div>
  </section>
</template>

<style scoped>
.date-glow {
  text-shadow:
    0 0 12px rgba(129, 140, 248, 0.55),
    0 0 24px rgba(129, 140, 248, 0.45),
    0 0 36px rgba(129, 140, 248, 0.35);
}

/* Keycap group container */
.keycap-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Individual keycap styling */
.keycap {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 3rem;
  padding: 0.6rem 1rem;
  
  /* Gradient background - dark with subtle purple tint */
  background: linear-gradient(
    135deg,
    rgba(45, 35, 85, 0.95) 0%,
    rgba(30, 25, 60, 0.98) 50%,
    rgba(25, 20, 50, 1) 100%
  );
  
  /* 3D border effect */
  border: 1px solid rgba(139, 92, 246, 0.4);
  border-radius: 8px;
  
  /* Text styling */
  color: #c4b5fd;
  letter-spacing: 0.1em;
  
  /* 3D shadow for depth - key visual effect */
  box-shadow:
    /* Top highlight */
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    /* Inner shadow for concave effect */
    inset 0 -2px 6px rgba(0, 0, 0, 0.3),
    /* Base shadow - creates 3D lift */
    0 4px 0 rgba(20, 15, 40, 0.95),
    /* Soft shadow below */
    0 6px 12px rgba(0, 0, 0, 0.4),
    /* Neon glow */
    0 0 20px rgba(139, 92, 246, 0.25),
    0 0 40px rgba(139, 92, 246, 0.15);
  
  /* Smooth transition for hover effects */
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  
  /* Text shadow for digital glow */
  text-shadow:
    0 0 8px rgba(196, 181, 253, 0.6),
    0 0 16px rgba(139, 92, 246, 0.4);
}

/* Scanline overlay for digital feel */
.keycap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255, 255, 255, 0.015) 2px,
    rgba(255, 255, 255, 0.015) 4px
  );
  border-radius: 7px;
  pointer-events: none;
}

/* Glowing border effect */
.keycap::after {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(
    135deg,
    rgba(139, 92, 246, 0.5) 0%,
    rgba(99, 102, 241, 0.3) 25%,
    rgba(139, 92, 246, 0.1) 50%,
    rgba(99, 102, 241, 0.3) 75%,
    rgba(139, 92, 246, 0.5) 100%
  );
  border-radius: 10px;
  z-index: -1;
  opacity: 0.6;
  animation: keycap-glow 3s ease-in-out infinite;
}

/* Hover state - pressed effect */
.keycap:hover {
  transform: translateY(2px);
  
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    inset 0 -1px 4px rgba(0, 0, 0, 0.3),
    0 2px 0 rgba(20, 15, 40, 0.95),
    0 3px 8px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(139, 92, 246, 0.4),
    0 0 60px rgba(139, 92, 246, 0.2);
  
  color: #e9d5ff;
  text-shadow:
    0 0 12px rgba(233, 213, 255, 0.8),
    0 0 24px rgba(139, 92, 246, 0.6);
}

.keycap:hover::after {
  opacity: 1;
}

/* Active state - fully pressed */
.keycap:active {
  transform: translateY(4px);
  
  box-shadow:
    inset 0 2px 4px rgba(0, 0, 0, 0.4),
    0 0px 0 rgba(20, 15, 40, 0.95),
    0 1px 4px rgba(0, 0, 0, 0.3),
    0 0 40px rgba(139, 92, 246, 0.5);
}

/* Dash keycap - slightly smaller */
.keycap-dash {
  min-width: 2rem;
  padding: 0.6rem 0.6rem;
}

/* Pulsing glow animation */
@keyframes keycap-glow {
  0%, 100% {
    opacity: 0.4;
    filter: blur(4px);
  }
  50% {
    opacity: 0.7;
    filter: blur(6px);
  }
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .keycap {
    min-width: 3.5rem;
    padding: 0.75rem 1.25rem;
    border-radius: 10px;
  }
  
  .keycap-dash {
    min-width: 2.5rem;
    padding: 0.75rem 0.75rem;
  }
  
  .keycap-group {
    gap: 0.75rem;
  }
}

/* Flip Clock Countdown */
.flip-countdown {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 1rem;
  perspective: 400px;
}

.flip-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.flip-card {
  position: relative;
  min-width: 3.5rem;
  height: 3.5rem;
  background: linear-gradient(
    180deg,
    rgba(50, 45, 85, 0.95) 0%,
    rgba(50, 45, 85, 0.95) 49%,
    rgba(35, 30, 65, 0.98) 50%,
    rgba(35, 30, 65, 0.98) 100%
  );
  border-radius: 8px;
  border: 1px solid rgba(139, 92, 246, 0.25);
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.25),
    0 6px 12px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.flip-card-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}

/* Horizontal line in middle */
.flip-card::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 1px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2;
}

/* Small notches on sides */
.flip-card::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 3px;
  margin-top: -1px;
  background: 
    linear-gradient(90deg, 
      rgba(0,0,0,0.3) 0%, 
      transparent 4%, 
      transparent 96%, 
      rgba(0,0,0,0.3) 100%
    );
  z-index: 3;
}

.flip-num {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: rgba(240, 230, 255, 0.95);
  text-align: center;
  line-height: 1;
}

.flip-unit {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 0.15em;
  font-weight: 500;
}

/* ========== New Flip Animation Styles ========== */

/* Wrapper for the seconds flip card */
.flip-card-wrapper {
  position: relative;
  min-width: 3.5rem;
  height: 3.5rem;
  perspective: 300px;
}

/* Static background card showing the new value */
.flip-card-static {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 3px 6px rgba(0, 0, 0, 0.25),
    0 6px 12px rgba(0, 0, 0, 0.15);
}

/* Top and bottom halves of static card */
.flip-half {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(139, 92, 246, 0.25);
}

.flip-half-top {
  background: linear-gradient(180deg, rgba(50, 45, 85, 0.95) 0%, rgba(45, 40, 80, 0.95) 100%);
  border-radius: 8px 8px 0 0;
  border-bottom: none;
}

.flip-half-top .flip-num {
  transform: translateY(50%);
}

.flip-half-bottom {
  background: linear-gradient(180deg, rgba(35, 30, 65, 0.98) 0%, rgba(40, 35, 75, 0.98) 100%);
  border-radius: 0 0 8px 8px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
}

.flip-half-bottom .flip-num {
  transform: translateY(-50%);
}

/* Animated panels container */
.flip-card-animated {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

/* Top panel - flips down to reveal new number */
.flip-panel-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(50, 45, 85, 0.95) 0%, rgba(45, 40, 80, 0.95) 100%);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 8px 8px 0 0;
  transform-origin: bottom center;
  overflow: hidden;
  z-index: 10;
}

.flip-panel-top .flip-num {
  transform: translateY(50%);
}

/* Bottom panel - flips up from bottom */
.flip-panel-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(35, 30, 65, 0.98) 0%, rgba(40, 35, 75, 0.98) 100%);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 0 0 8px 8px;
  transform-origin: top center;
  transform: rotateX(90deg);
  overflow: hidden;
  z-index: 5;
}

.flip-panel-bottom .flip-num {
  transform: translateY(-50%);
}

/* Flip down animation for top panel */
@keyframes flip-top-down {
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(-90deg);
  }
}

/* Flip up animation for bottom panel */
@keyframes flip-bottom-up {
  0% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}

.do-flip {
  animation: flip-top-down 0.3s ease-in forwards;
}

.do-flip-up {
  animation: flip-bottom-up 0.3s 0.3s ease-out forwards;
}

/* ========== Responsive - larger on desktop ========== */
@media (min-width: 768px) {
  .flip-countdown {
    gap: 1.25rem;
  }
  
  .flip-card {
    min-width: 4.5rem;
    height: 4.5rem;
    border-radius: 10px;
  }
  
  .flip-card-wrapper {
    min-width: 4.5rem;
    height: 4.5rem;
  }
  
  .flip-num {
    font-size: 2.25rem;
  }
  
  .flip-unit {
    font-size: 0.85rem;
  }
  
  .flip-half-top,
  .flip-half-bottom,
  .flip-panel-top,
  .flip-panel-bottom {
    border-radius: 10px 10px 0 0;
  }
  
  .flip-half-bottom,
  .flip-panel-bottom {
    border-radius: 0 0 10px 10px;
  }
}
</style>
