<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'outline'
  showDots?: boolean
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  showDots: true,
  class: '',
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const baseClass = 'pixel-btn font-pixel-cn'

const variantClass = computed(() => {
  if (props.variant === 'secondary') return 'pixel-btn-secondary'
  if (props.variant === 'outline') return 'pixel-btn-outline'
  return ''
})

const combinedClass = computed(() => `${baseClass} ${variantClass.value} ${props.class}`)
</script>

<template>
  <button
    v-motion
    :initial="{ scale: 1 }"
    :enter="{ scale: 1 }"
    :hover="{ scale: 1.02 }"
    :press="{ scale: 0.98 }"
    :class="combinedClass"
    @click="(e: MouseEvent) => emit('click', e)"
  >
    <slot />
    <span v-if="showDots" class="pixel-btn-dots">
      <span></span>
      <span></span>
      <span></span>
    </span>
  </button>
</template>
