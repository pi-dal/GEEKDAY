<script setup lang="ts">
import { ref } from 'vue'
import { withBase } from 'ufo'

const showWeChatModal = ref(false)
const baseURL = useRuntimeConfig().app.baseURL || '/'
const qrCodeSrc = computed(() => withBase('/WeChatBot.png', baseURL))
</script>

<template>
  <footer class="py-12 px-6 border-t-2 border-primary/30 bg-gradient-to-t from-[#1a1a4e]/50 to-transparent">
    <div class="max-w-5xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8 mb-12">
        <div>
          <h3 class="font-pixel-cn text-lg text-gradient mb-2">北回归线极客节</h3>
          <p class="font-pixel-cn text-lg text-muted-foreground">
            23.5° N GEEKDAY
          </p>
        </div>

        <div class="flex gap-12">
          <div>
            <h4 class="font-pixel-cn text-sm text-primary mb-4">◆ 活动</h4>
            <div class="space-y-2 font-pixel-cn text-lg">
              <a href="#about" class="block text-muted-foreground hover:text-foreground transition-colors">关于</a>
              <a href="#schedule" class="block text-muted-foreground hover:text-foreground transition-colors">日程</a>
              <a href="#prizes" class="block text-muted-foreground hover:text-foreground transition-colors">奖项</a>
              <a href="#faq" class="block text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
            </div>
          </div>
          <div>
            <h4 class="font-pixel-cn text-sm text-primary mb-4">◆ 联系</h4>
            <div class="space-y-2 font-pixel-cn text-lg">
              <a href="https://www.xiaohongshu.com/user/profile/63cb5ebb000000002702bd16" target="_blank" class="block text-muted-foreground hover:text-foreground transition-colors">小红书</a>
              <a href="https://mp.weixin.qq.com/s/2yIlxKBQouacdL06iv6jrA" target="_blank" class="block text-muted-foreground hover:text-foreground transition-colors">微信</a>
              <a href="https://github.com/23-5-N-GeekDay" target="_blank" class="block text-muted-foreground hover:text-foreground transition-colors">GitHub</a>
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-pixel-cn text-sm text-primary mb-4">◆ 合作咨询</h4>
          <a href="mailto:cysybeijing@163.com" class="block font-pixel-cn text-lg text-muted-foreground hover:text-foreground transition-colors mb-2">
            cysybeijing@163.com
          </a>
          <button 
            @click="showWeChatModal = true"
            class="font-pixel-cn text-lg text-muted-foreground hover:text-foreground transition-colors"
          >
            企业微信「北回归线极客节小助手」
          </button>
        </div>
      </div>

      <div class="pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="font-pixel-cn text-lg text-muted-foreground">
          © 2026 北回归线极客节
        </p>
        <div class="flex gap-2 font-pixel-cn text-lg text-muted-foreground">
          <span>MADE WITH</span>
          <span class="text-accent">♥</span>
        </div>
      </div>
    </div>
  </footer>

  <!-- Simple WeChat QR Code Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="showWeChatModal"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click.self="showWeChatModal = false"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <!-- Modal Window - macOS Pixel Style -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9, y: 20 }"
          :enter="{ opacity: 1, scale: 1, y: 0 }"
          :leave="{ opacity: 0, scale: 0.9, y: 20 }"
          class="relative w-full max-w-sm pixel-macos-window"
        >
          <!-- Title Bar -->
          <div class="pixel-macos-titlebar">
            <div class="pixel-macos-buttons">
              <button
                class="pixel-macos-btn pixel-macos-btn-close"
                @click="showWeChatModal = false"
                title="关闭"
              />
              <button
                class="pixel-macos-btn pixel-macos-btn-disabled"
                disabled
              />
              <button
                class="pixel-macos-btn pixel-macos-btn-shrink"
                @click="showWeChatModal = false"
              />
            </div>
            <span class="pixel-macos-title font-pixel-cn">企业微信</span>
          </div>

          <!-- Content -->
          <div class="pixel-macos-content">
            <div class="text-center">
              <!-- QR Code -->
              <div class="mb-4 flex justify-center">
                <div class="pixel-qr-box">
                  <img
                    :src="qrCodeSrc"
                    alt="企业微信二维码"
                    class="w-44 h-44 object-contain"
                    width="176"
                    height="176"
                    loading="lazy"
                  />
                </div>
              </div>

              <!-- Simple Instructions -->
              <h3 class="font-pixel-cn text-lg text-foreground mb-2">
                北回归线极客节小助手
              </h3>
              <p class="font-pixel-cn text-sm text-muted-foreground">
                扫码添加企业微信
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.pixel-macos-window {
  background: linear-gradient(
    180deg,
    hsl(250 50% 18%) 0%,
    hsl(250 50% 14%) 100%
  );
  border: 3px solid hsl(160 60% 55%);
  box-shadow:
    6px 6px 0 0 hsl(160 50% 30%),
    0 0 40px rgba(157, 78, 221, 0.25);
  overflow: hidden;
}

.pixel-macos-titlebar {
  background: linear-gradient(
    180deg,
    hsl(250 45% 22%) 0%,
    hsl(250 45% 18%) 100%
  );
  border-bottom: 3px solid hsl(160 60% 55%);
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.pixel-macos-buttons {
  display: flex;
  gap: 8px;
}

.pixel-macos-btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.pixel-macos-btn:hover:not(:disabled) {
  transform: scale(1.15);
}

.pixel-macos-btn:disabled {
  cursor: default;
  opacity: 0.7;
}

.pixel-macos-btn-close {
  background: #ff5f57;
  border-color: #e0443e;
}

.pixel-macos-btn-disabled {
  background: #8e8e93;
  border-color: #636366;
  opacity: 0.6;
}

.pixel-macos-btn-shrink {
  background: #28c840;
  border-color: #1dad2f;
}

.pixel-macos-title {
  flex: 1;
  text-align: center;
  font-size: 0.875rem;
  color: hsl(var(--foreground) / 0.85);
  margin-right: 50px;
}

.pixel-macos-content {
  padding: 24px;
}

.pixel-qr-box {
  padding: 10px;
  background: white;
  border: 3px solid hsl(160 60% 55%);
  box-shadow: 4px 4px 0 0 hsl(160 50% 30%);
}

/* Modal transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
