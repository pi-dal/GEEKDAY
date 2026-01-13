<script setup lang="ts">
import PixelButton from './PixelButton.vue'
import { useRegisterModal } from '~/composables/useRegisterModal'

const { openModal } = useRegisterModal()
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
        class="mb-4"
      >
        <span class="font-mono text-2xl md:text-3xl text-white/90 tracking-widest">
          2026.02
        </span>
      </div>

      <p
        v-motion
        :initial="{ opacity: 0 }"
        :visible="{ opacity: 1 }"
        :transition="{ duration: 600, delay: 600 }"
        class="text-lg md:text-xl font-pixel-cn text-white/80 mb-8"
      >
        用 <span class="text-cyan-300 font-bold">48小时</span> · 构建 <span class="text-orange-300 font-bold">AI 未来</span>
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
