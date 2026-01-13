# Contributing Guide

感谢你对 23.5°N GEEKDAY 项目的贡献！本文档提供了代码贡献的规范和最佳实践。

## Development Setup

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 生成静态站点
pnpm generate

# 本地预览生产版本
pnpm preview
```

---

## Commit Convention

本项目使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范。

### Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | 新功能 |
| `fix` | Bug 修复 |
| `docs` | 文档更新 |
| `style` | 代码格式（不影响代码运行的变动） |
| `refactor` | 重构（既不是新功能，也不是修复 bug） |
| `perf` | 性能优化 |
| `test` | 添加或修改测试 |
| `chore` | 构建过程或辅助工具的变动 |
| `ci` | CI 配置变动 |

### Scopes

| Scope | Description |
|-------|-------------|
| `hero` | HeroSection 组件 |
| `nav` | Navbar 组件 |
| `schedule` | ScheduleSection 及相关内容 |
| `sponsors` | SponsorsSection 及相关内容 |
| `prizes` | PrizesSection 及相关内容 |
| `faq` | FAQSection 及相关内容 |
| `content` | Markdown 内容文件 |
| `animation` | 动画系统 |
| `modal` | Modal 组件 |
| `layout` | 布局相关 |
| `config` | 配置文件 |
| `deploy` | 部署相关 |

### Examples

```bash
# 新功能
feat(sponsors): add interactive terminal display

# Bug 修复
fix(nav): correct mobile menu z-index

# 文档
docs: update README with new setup instructions

# 样式调整（不影响功能）
style(hero): adjust gradient colors

# 重构
refactor(animation): consolidate motion variants

# 性能优化
perf(sponsors): lazy load sponsor logos

# 部署相关
chore(deploy): remove base URL prefix for org pages
```

---

## Pull Request Guidelines

### PR Title

PR 标题应遵循与 Commit 相同的规范：

```
<type>(<scope>): <description>
```

### PR Description Template

```markdown
## Summary
<!-- 简要描述本 PR 的目的和改动 -->

## Changes
<!-- 列出主要改动 -->
- 
- 

## Screenshots / Recordings
<!-- 如果是 UI 变更，请附上截图或录屏 -->

## Checklist
- [ ] 本地 `pnpm build` 通过
- [ ] 本地 `pnpm preview` 验证通过
- [ ] 已测试移动端响应式布局
- [ ] 已检查动画效果正常
- [ ] 相关文档已更新（如适用）

## Related Issues
<!-- 关联的 Issue，如 Closes #123 -->
```

### Review Checklist

在提交 PR 前，请确保：

1. **代码规范**
   - 使用 TypeScript 和 `<script setup lang="ts">`
   - 遵循 Vue 3 组合式 API 风格
   - 组件名使用 PascalCase

2. **UI/UX**
   - 保持像素风格一致性
   - 使用 Tailwind 样式而非内联样式
   - 动画使用 `composables/usePixelAnimation.ts` 中的预设

3. **构建验证**
   - `pnpm build` 无错误
   - `pnpm preview` 本地预览正常

4. **响应式**
   - 测试移动端布局（< 768px）
   - 测试桌面端布局（≥ 1024px）

---

## Branch Naming

```
<type>/<short-description>
```

### Examples

```
feat/terminal-sponsor-display
fix/mobile-menu-animation
docs/update-contributing-guide
refactor/consolidate-animations
```

---

## Content Updates

如需更新网站内容（如日程、赞助商、FAQ 等），请优先编辑 `content/` 目录下的 Markdown 文件，而非直接修改 Vue 组件。

### Content Structure

```
content/
├── about.md          # 关于活动
├── faq.md            # 常见问题
├── prizes.md         # 奖项设置
├── sponsors.md       # 赞助商信息
├── schedule/         # 日程安排
│   ├── day1.md
│   └── day2.md
├── tracks/           # 赛道介绍
│   ├── ai-agent.md
│   └── embodied-ai.md
└── workshops/        # 工作坊
    ├── embodied-ai.md
    └── ...
```

---

## Questions?

如有任何问题，请通过 Issue 提问或联系项目维护者。
