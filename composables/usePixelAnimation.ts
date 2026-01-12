import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export const pixelFadeIn = {
  initial: {
    opacity: 0,
    y: 40,
    filter: 'blur(4px)',
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 600,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const pixelSlideIn = {
  initial: {
    opacity: 0,
    x: -60,
    scaleX: 0.8,
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    scaleX: 1,
    transition: {
      duration: 500,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
}

export const pixelPopIn = {
  initial: {
    opacity: 0,
    scale: 0.6,
    rotate: -5,
  },
  visibleOnce: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
}

export const pixelScanIn = {
  initial: {
    opacity: 0,
    clipPath: 'inset(0 0 100% 0)',
  },
  visibleOnce: {
    opacity: 1,
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 800,
      ease: 'easeOut',
    },
  },
}

export const pixelBuildIn = {
  initial: {
    opacity: 0,
    scale: 0.9,
    y: 30,
  },
  visibleOnce: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 400,
      ease: [0, 0.55, 0.45, 1],
    },
  },
}

export const pixelCardFloat = {
  initial: {
    opacity: 0,
    y: 50,
    rotateX: 15,
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 600,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const staggerContainer = {
  initial: { opacity: 1 },
  visibleOnce: {
    opacity: 1,
    transition: {
      staggerChildren: 100,
      delayChildren: 150,
    },
  },
}

export const fastStaggerContainer = {
  initial: { opacity: 1 },
  visibleOnce: {
    opacity: 1,
    transition: {
      staggerChildren: 60,
      delayChildren: 100,
    },
  },
}

// Deprecated: usePixelInView is no longer needed with proper v-motion :visible-once
export function usePixelInView(margin = '-15%') {
  const target = ref<HTMLElement>()
  const isVisible = ref(false)

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting) {
        isVisible.value = true
        stop()
      }
    },
    { threshold: 0.1, rootMargin: margin },
  )

  return { target, isVisible }
}

