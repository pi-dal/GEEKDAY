export default defineNuxtConfig({
  compatibilityDate: '2025-01-12',
  devtools: { enabled: true },

  app: {
    baseURL: process.env.NUXT_PUBLIC_BASE_URL || '/',
    cdnURL: process.env.NUXT_PUBLIC_CDN_URL || process.env.NUXT_PUBLIC_BASE_URL || '/',
    head: {
      title: '23.5°N GEEKDAY | 北回归线极客节',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '北回归线极客节 - 48小时黑客马拉松 | 2026年2月' },
        { name: 'theme-color', content: '#1a1a4e' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/main.css" as *;`,
        },
      },
    },
  },

  modules: ['@nuxt/content', '@vueuse/motion/nuxt'],

  content: {
    // 使用 MDC 语法支持在 Markdown 中使用 Vue 组件
    markdown: {
      mdc: true,
    },
    // 代码高亮配置（使用 Shiki）
    highlight: {
      theme: 'github-dark',
      preload: ['javascript', 'typescript', 'vue', 'json', 'markdown'],
    },
    // 导航生成
    navigation: {
      fields: ['title', 'description', 'date'],
    },
    // 使用 Node 内置 SQLite，避免 native 模块编译问题
    experimental: {
      nativeSqlite: true,
    },
  },

  nitro: {
    preset: 'github-pages',
  },
})
