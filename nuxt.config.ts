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
        // Font preloading for critical fonts
        { rel: 'preload', href: 'https://cdn.jsdelivr.net/gh/SolidZORO/zpix-pixel-font@v3.1.10/website/zpix.woff2', as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
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
    build: {
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Minification options
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  },

  // Enable experimental features for better performance
  experimental: {
    // Payload extraction for smaller initial bundle
    payloadExtraction: true,
    // Tree shake client-only components
    treeshakeClientOnly: true,
  },

  modules: ['@nuxt/content', '@vueuse/motion/nuxt', '@nuxt/image'],

  // Image optimization configuration
  image: {
    quality: 90,
    format: ['webp', 'png', 'jpg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  content: {
    // build 阶段配置
    build: {
      markdown: {
        // 使用 MDC 语法支持在 Markdown 中使用 Vue 组件
        mdc: true,
        // 代码高亮配置（使用 Shiki）
        highlight: {
          theme: 'github-dark',
          langs: ['python'],  // 添加 Python 语言支持
        },
      },
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
    routeRules: {
      // Static assets caching - 1 year for immutable content
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/sponsors/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      // Fonts caching
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
    },
  },
})
