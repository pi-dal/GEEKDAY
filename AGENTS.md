# Repository Guidelines

## Overview

23.5°N GEEKDAY 是一个 48 小时黑客马拉松活动的官方网站，采用像素风格设计。技术栈为 **Nuxt 4 + Tailwind CSS + @nuxt/content + @vueuse/motion**。

---

## Project Architecture

```
design-leap-nuxt/
├── app.vue                    # 根组件，挂载 <NuxtLayout>
├── nuxt.config.ts             # Nuxt 配置（meta、modules、preset）
├── tailwind.config.js         # Tailwind 主题扩展
├── content.config.ts          # @nuxt/content 集合定义
├── pages/
│   ├── index.vue              # 首页（组合所有 Section 组件）
│   └── [...slug].vue          # 动态内容页（渲染 Markdown）
├── layouts/
│   └── default.vue            # 默认布局（背景 + Navbar）
├── components/
│   ├── Navbar.vue             # 导航栏（响应式 + 滚动监听）
│   ├── HeroSection.vue        # 主视觉区域（动画入场）
│   ├── StatsSection.vue       # 数据统计展示
│   ├── AboutSection.vue       # 活动介绍
│   ├── VenueSection.vue       # 场地信息
│   ├── ScheduleSection.vue    # 日程表（Tab 切换）
│   ├── PrizesSection.vue      # 奖项展示
│   ├── SponsorsSection.vue    # 赞助商（交互式终端）
│   ├── FAQSection.vue         # FAQ 手风琴
│   ├── CTASection.vue         # 行动召唤区域
│   ├── Footer.vue             # 页脚
│   ├── PixelButton.vue        # 像素风格按钮
│   ├── RegisterModal.vue      # 报名弹窗
│   ├── SponsorModal.vue       # 赞助商详情弹窗
│   └── content/
│       └── ProseCode.vue      # 代码块渲染覆盖
├── composables/
│   ├── usePixelAnimation.ts   # 动画预设（v-motion variants）
│   └── useRegisterModal.ts    # 报名弹窗状态管理
├── content/                   # Markdown 内容（@nuxt/content）
│   ├── about.md
│   ├── faq.md
│   ├── prizes.md
│   ├── sponsors.md
│   ├── schedule/
│   │   ├── day1.md
│   │   └── day2.md
│   ├── tracks/
│   │   ├── ai-agent.md
│   │   └── embodied-ai.md
│   └── workshops/
│       └── ...
├── assets/css/
│   └── main.css               # 全局样式 + CSS 变量 + 像素字体
├── public/                    # 静态资源
│   ├── favicon.ico
│   ├── images/                # Logo、赞助商图片等
│   └── ...
└── .github/workflows/
    └── deploy.yml             # GitHub Pages 部署
```

---

## Key Components

### Animation System (`composables/usePixelAnimation.ts`)

所有动画都使用 `@vueuse/motion` 的 `v-motion` 指令，预设变体包括：

| Variant | Effect | Duration |
|---------|--------|----------|
| `pixelFadeIn` | 淡入 + 上滑 + 模糊 | 600ms |
| `pixelSlideIn` | 左滑入 + 缩放 | 500ms |
| `pixelPopIn` | 弹出 + 旋转（spring） | auto |
| `pixelScanIn` | 从上到下扫描显示 | 800ms |
| `pixelBuildIn` | 缩放 + 上滑 | 400ms |
| `pixelCardFloat` | 卡片浮入 + 3D 旋转 | 600ms |
| `staggerContainer` | 子元素依次入场（100ms 间隔） | - |
| `fastStaggerContainer` | 快速子元素依次入场（60ms 间隔） | - |

**使用方式：**
```vue
<script setup>
import { pixelFadeIn, staggerContainer } from '~/composables/usePixelAnimation'
</script>

<template>
  <div v-motion :initial="staggerContainer.initial" :visible-once="staggerContainer.visibleOnce">
    <div v-motion v-bind="pixelFadeIn">Content</div>
  </div>
</template>
```

### Modal State (`composables/useRegisterModal.ts`)

全局报名弹窗状态管理，使用 Vue 响应式状态：

```typescript
const { isOpen, openModal, closeModal } = useRegisterModal()
```

---

## Design System

### Typography

| Class | Font | Usage |
|-------|------|-------|
| `font-pixel` | Press Start 2P | 英文标题、标签 |
| `font-pixel-cn` | zpix | 中文标题 |
| `font-mono` | VT323 | 数字、代码 |

### Colors (CSS Variables)

主要颜色在 `assets/css/main.css` 中定义为 CSS 变量：

- `--background`: 深蓝背景 (`243 50% 10%`)
- `--foreground`: 浅色文字 (`243 10% 95%`)
- `--primary`: 主色调
- `--accent`: 强调色

### Pixel Aesthetics

- 边框宽度: **4px**（小元素 2px）
- 阴影: `4px 4px 0 0 hsl(...)`
- 圆角: `0.25rem` (4px)
- 图片渲染: `image-rendering: pixelated`

---

## Commands

```bash
pnpm install          # 安装依赖
pnpm dev              # 开发服务器
pnpm build            # 生产构建
pnpm generate         # 生成静态站点
pnpm preview          # 预览构建结果
```

---

## Coding Standards

### Vue Components

- 使用 `<script setup lang="ts">`
- 2 空格缩进，单引号，尾随逗号
- 组件命名: PascalCase
- Props/Emits: 使用 `defineProps` / `defineEmits` 并定义类型
- 避免使用 `any`

### Tailwind

- 优先使用 Tailwind 工具类
- 设计 tokens 在 `tailwind.config.js` 中扩展
- 避免内联样式

### Content

- 内容更新优先编辑 `content/` 目录的 Markdown
- Frontmatter 字段与 `content.config.ts` 保持一致
- 支持 MDC 语法（Markdown 中使用 Vue 组件）

---

## Testing

暂无自动化测试，手动验证清单：

1. `pnpm build` 无错误
2. `pnpm preview` 本地预览正常
3. 验证首页各 Section 动画入场
4. 检查导航、Tab 切换、FAQ 手风琴
5. 测试移动端响应式布局
6. 验证 Markdown 内容页渲染

---

## Deployment

项目使用 GitHub Actions 自动部署到 GitHub Pages。

- 触发条件: `push` 到 `main` 分支
- 构建命令: `pnpm generate`
- 静态输出: `.output/public`
- Nitro preset: `github-pages`

**Note:** Organization GitHub Pages 使用根路径 `/`，无需配置 `baseURL`。

---

## Content Updates

### 日程 (`content/schedule/`)

```markdown
---
title: Day 1
date: 2026-02-14
---

## 09:00 - 开幕式
...
```

### 赞助商 (`content/sponsors.md`)

赞助商数据同时在 `SponsorsSection.vue` 中维护（包含 logo、描述、URL）。

### FAQ (`content/faq.md`)

使用 Markdown 列表格式，`FAQSection.vue` 解析渲染。
