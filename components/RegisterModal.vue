<script setup lang="ts">
import { withBase } from 'ufo'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const baseURL = useRuntimeConfig().app.baseURL || '/'
const qrCodeSrc = computed(() => withBase('/WeChatBot.png', baseURL))

const handleBackdropClick = (e: MouseEvent) => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}

// ESC key to close
onMounted(() => {
  const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.visible) {
      emit('close')
    }
  }
  window.addEventListener('keydown', handleEsc)
  onUnmounted(() => window.removeEventListener('keydown', handleEsc))
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4"
        @click="handleBackdropClick"
      >
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        <!-- Modal Window - macOS Pixel Style -->
        <div
          v-motion
          :initial="{ opacity: 0, scale: 0.9, y: 20 }"
          :enter="{ opacity: 1, scale: 1, y: 0 }"
          :leave="{ opacity: 0, scale: 0.9, y: 20 }"
          class="relative w-full max-w-md pixel-macos-window"
        >
          <!-- Title Bar -->
          <div class="pixel-macos-titlebar">
            <div class="pixel-macos-buttons">
              <button
                class="pixel-macos-btn pixel-macos-btn-close"
                @click="emit('close')"
                title="关闭"
              />
              <button
                class="pixel-macos-btn pixel-macos-btn-disabled"
                title="禁用"
                disabled
              />
              <button
                class="pixel-macos-btn pixel-macos-btn-shrink"
                @click="emit('close')"
                title="缩小"
              />
            </div>
            <span class="pixel-macos-title font-pixel-cn">报名 - 北回归线极客节</span>
          </div>

          <!-- Content -->
          <div class="pixel-macos-content">
            <div class="text-center">
              <!-- QR Code -->
              <div class="mb-6 flex justify-center">
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

              <!-- Instructions -->
              <h3 class="font-pixel-cn text-xl text-foreground mb-3">
                扫码添加企业微信
              </h3>
              <p class="font-pixel-cn text-lg text-primary mb-5">
                「北回归线极客节小助手」
              </p>

              <div class="pixel-info-card mb-5">
                <p class="font-pixel-cn text-sm text-muted-foreground mb-2">
                  添加后请发送备注：
                </p>
                <p class="font-pixel-cn text-base text-foreground mb-3">
                  <span class="text-primary">姓名</span> - <span class="text-secondary">赛道意向</span>
                </p>
                <div class="font-pixel-cn text-sm text-muted-foreground">
                  <p class="mb-2 text-xs text-primary/70">示例：</p>
                  <div class="space-y-1 text-foreground/80">
                    <p>• 张三 - AI Agent</p>
                    <p>• 李四 - 具身智能</p>
                    <p>• 王五 - AI Agent、具身智能</p>
                  </div>
                </div>
              </div>

              <p class="font-pixel-cn text-xs text-muted-foreground/70">
                可同时选择多个意向赛道
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
  position: relative;
}

.pixel-macos-btn::after {
  content: '';
  position: absolute;
  inset: 2px;
  border-radius: 50%;
  background: inherit;
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
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.15);
}

.pixel-macos-btn-close:hover {
  background: #ff3b30;
}

.pixel-macos-btn-disabled {
  background: #8e8e93;
  border-color: #636366;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.15);
  cursor: not-allowed;
  opacity: 0.6;
}

.pixel-macos-btn-shrink {
  background: #28c840;
  border-color: #1dad2f;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,0.15);
}

.pixel-macos-btn-shrink:hover {
  background: #2de045;
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

.pixel-info-card {
  background: hsl(250 50% 16%);
  border: 2px solid hsl(var(--border) / 0.5);
  padding: 16px;
  text-align: left;
  box-shadow:
    inset 1px 1px 0 0 hsl(250 50% 20%),
    inset -1px -1px 0 0 hsl(250 50% 12%);
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

.modal-enter-active .pixel-macos-window,
.modal-leave-active .pixel-macos-window {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from .pixel-macos-window,
.modal-leave-to .pixel-macos-window {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>


