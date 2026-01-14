<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import { withBase } from 'ufo'
import { useRegisterModal } from '~/composables/useRegisterModal'

const { openModal } = useRegisterModal()

const route = useRoute()
const baseURL = useRuntimeConfig().app.baseURL || '/'
const logoSrc = computed(() => withBase('/logo.png', baseURL))
const isHomePage = computed(() => route.path === '/')

const navItems = [
  { label: '关于', href: '#about', path: '/about' },
  { label: '日程', href: '#schedule', path: '/schedule/day1' },
  { label: '奖项', href: '#prizes', path: '/prizes' },
  { label: 'FAQ', href: '#faq', path: '/faq' },
]

const moreItems = [
  { label: '赛道介绍', children: [
    { label: 'AI Agent 赛道', path: '/tracks/ai-agent' },
    { label: '具身智能赛道', path: '/tracks/embodied-ai' },
  ]},
  { label: '技术工作坊', children: [
    { label: 'AI Agent 开发', path: '/workshops/ai-agent-dev' },
    { label: '具身智能入门', path: '/workshops/embodied-ai' },
  ]},
  { label: '合作伙伴', path: '/#sponsors' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const showMoreMenu = ref(false)

const handleNavClick = (item: { href: string; path: string }) => {
  if (isHomePage.value) {
    // On home page, scroll to section
    const element = document.querySelector(item.href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  } else {
    // On other pages, navigate to home with hash
    navigateTo('/' + item.href)
  }
  isMobileMenuOpen.value = false
}

const handleSponsorsClick = () => {
  showMoreMenu.value = false
  if (isHomePage.value) {
    document.querySelector('#sponsors')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    navigateTo('/#sponsors')
  }
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 100
}

const handleLogoClick = () => {
  if (isHomePage.value) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    navigateTo('/')
  }
}

const navMotionClass = computed(() => {
  // Always show navbar on content pages
  if (!isHomePage.value) {
    return '-translate-y-0 opacity-100 pointer-events-auto bg-background/95'
  }
  return isScrolled.value
    ? '-translate-y-0 opacity-100 pointer-events-auto bg-background/95'
    : '-translate-y-[100px] opacity-0 pointer-events-none bg-background/95'
})

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav
    :class="[
      'fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-border/30',
      'transition-all duration-200 ease-out will-change-transform',
      navMotionClass
    ]"
  >
    <div class="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
      <a
        href="/"
        class="cursor-pointer"
        @click.prevent="handleLogoClick"
      >
        <img :src="logoSrc" alt="北回归线极客节" class="h-11" width="176" height="44" loading="eager" />
      </a>

      <div class="hidden md:flex items-center gap-6">
        <button
          v-for="item in navItems"
          :key="item.href"
          @click="handleNavClick(item)"
          class="font-pixel-cn text-lg text-muted-foreground hover:text-foreground transition-colors"
        >
          {{ item.label }}
        </button>
        
        <!-- More dropdown -->
        <div class="relative" @mouseleave="showMoreMenu = false">
          <button
            @mouseenter="showMoreMenu = true"
            class="font-pixel-cn text-lg text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            更多
            <span class="text-xs">▼</span>
          </button>
          
          <Transition name="fade">
            <div
              v-if="showMoreMenu"
              class="absolute top-full right-0 mt-2 w-48 pixel-card p-2 shadow-lg"
              @mouseenter="showMoreMenu = true"
            >
              <template v-for="item in moreItems" :key="item.label">
                <div v-if="item.children" class="mb-2">
                  <div class="font-pixel text-xs text-primary px-3 py-1">{{ item.label }}</div>
                  <NuxtLink
                    v-for="child in item.children"
                    :key="child.path"
                    :to="child.path"
                    class="block px-3 py-2 font-pixel-cn text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                    @click="showMoreMenu = false"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
                <button
                  v-else-if="item.path === '/#sponsors'"
                  class="block w-full text-left px-3 py-2 font-pixel-cn text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                  @click="handleSponsorsClick"
                >
                  {{ item.label }}
                </button>
                <NuxtLink
                  v-else
                  :to="item.path"
                  class="block px-3 py-2 font-pixel-cn text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                  @click="showMoreMenu = false"
                >
                  {{ item.label }}
                </NuxtLink>
              </template>
            </div>
          </Transition>
        </div>
        
        <PixelButton :show-dots="false" class="py-2 px-4 text-xs font-pixel-cn" @click="openModal">
          报名
        </PixelButton>
      </div>

      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden font-pixel text-xs text-primary"
      >
        {{ isMobileMenuOpen ? '[X]' : '[≡]' }}
      </button>
    </div>
  </nav>

  <Transition name="fade">
    <div v-if="isMobileMenuOpen" class="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-4 overflow-y-auto py-20">
      <button
        v-for="item in navItems"
        :key="item.href"
        @click="handleNavClick(item)"
        class="font-pixel-cn text-xl hover:text-primary transition-colors"
      >
        《 {{ item.label }} 》
      </button>
      
      <div class="w-48 h-px bg-border/50 my-4"></div>
      
      <template v-for="item in moreItems" :key="item.label">
        <div v-if="item.children" class="text-center">
          <div class="font-pixel text-xs text-primary mb-2">{{ item.label }}</div>
          <NuxtLink
            v-for="child in item.children"
            :key="child.path"
            :to="child.path"
            class="block font-pixel-cn text-lg text-muted-foreground hover:text-foreground py-1"
            @click="isMobileMenuOpen = false"
          >
            {{ child.label }}
          </NuxtLink>
        </div>
        <NuxtLink
          v-else
          :to="item.path"
          class="font-pixel-cn text-xl hover:text-primary transition-colors"
          @click="isMobileMenuOpen = false"
        >
          《 {{ item.label }} 》
        </NuxtLink>
      </template>
      
      <PixelButton class="mt-4 font-pixel-cn" @click="() => { openModal(); isMobileMenuOpen = false }">
        立即报名
      </PixelButton>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
