<script setup lang="ts">
import { withBase } from 'ufo'

const props = defineProps<{
  visible: boolean
  sponsor: {
    name: string
    logo: string
    description: string
    url?: string
  } | null
}>()

const emit = defineEmits<{
  close: []
}>()

const baseURL = useRuntimeConfig().app.baseURL || '/'
const logoSrc = computed(() => props.sponsor ? withBase(props.sponsor.logo, baseURL) : '')

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
        v-if="visible && sponsor"
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
          class="relative w-full max-w-lg pixel-macos-window"
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
            <span class="pixel-macos-title font-pixel-cn">{{ sponsor.name }} - 技术支持</span>
          </div>

          <!-- Content -->
          <div class="pixel-macos-content">
            <div class="flex flex-col items-center">
              <!-- Logo -->
              <div class="mb-6 flex justify-center">
                <div class="pixel-logo-box">
                  <img
                    :src="logoSrc"
                    :alt="sponsor.name"
                    class="h-16 max-w-full object-contain"
                  />
                </div>
              </div>

              <!-- Sponsor Name -->
              <a
                v-if="sponsor.url"
                :href="sponsor.url"
                target="_blank"
                class="font-pixel-cn text-xl text-primary mb-4 hover:text-[#B185DB] transition-colors cursor-pointer hover:underline"
              >
                {{ sponsor.name }} ↗
              </a>
              <h3 v-else class="font-pixel-cn text-xl text-primary mb-4">
                {{ sponsor.name }}
              </h3>

              <!-- Description -->
              <div class="pixel-info-card w-full max-h-64 overflow-y-auto">
                <p class="font-pixel-cn text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                  {{ sponsor.description }}
                </p>
              </div>
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

.pixel-logo-box {
  padding: 16px 24px;
  background: #d4c6e8;
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

.pixel-info-card::-webkit-scrollbar {
  width: 8px;
}

.pixel-info-card::-webkit-scrollbar-track {
  background: hsl(250 50% 12%);
}

.pixel-info-card::-webkit-scrollbar-thumb {
  background: hsl(160 60% 55%);
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
