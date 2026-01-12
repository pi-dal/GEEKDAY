# GitHub Copilot Repository Instructions

Use these instructions when assisting in issues/discussions or preparing doc updates. Keep answers concise, action-oriented, and aligned with this Nuxt 4 + @nuxt/content + Tailwind project.

## Scope
- Summarize closed/resolved issues and discussions into concise decisions and action items.
- Reflect resolved outcomes in Markdown under `content/` (rendered by `@nuxt/content`); avoid hard-coding copy in Vue components.
- Prefer updating existing files over adding new ones unless a new page is explicitly required; keep changes CI-friendly for static builds.

## When summarizing a thread
- Extract: problem statement, key options considered, final decision, rationale, and follow-up tasks (owner + due date if given).
- Ignore chit-chat; prefer quotes from maintainers for authoritative sources.
- If language is mixed, default output to 简体中文 for user-facing text; keep code/tool names in English.

## Updating documentation
- Prefer updating an existing relevant file in `content/` (e.g., `content/faq.md`, `content/sponsors.md`, `content/about.md`). If none fits, create `content/updates/<slug>.md`.
- Frontmatter template:
  ```md
  ---
  title: <短标题>
  description: <一句话摘要>
  date: YYYY-MM-DD
  ---
  ```
- Body sections (Markdown, MDC ok):
  - `# 摘要` — 3-6 bullet points of the outcome.
  - `## 决策` — numbered list of final decisions/agreements.
  - `## 行动项` — checklist with owner and due date if specified. Example: `- [ ] @owner - 完成赛程页更新（DDL: 2026-02-10）`.
- Keep tone factual; no speculation.
- When adding or renaming a page, also update discovery and navigation:
  - `components/Navbar.vue`: add the page to `navItems` or `moreItems` with the correct label/path.
  - `pages/[...slug].vue`: update `availablePages` and `findPagesOutput` so the in-page terminal shows the new path/description.
  - `error.vue`: update `findPagesOutput` and the `ls` output list for consistency.

## Response format in issues/discussions
- Start with a one-line status: `总结：...`
- Provide:
  - `关键决策:` bullet list.
  - `待办:` checklist.
  - `建议的文档更新:` file path(s) + brief description (e.g., `content/updates/schedule-adjustment.md: 新增赛程调整摘要`).
- If creating/updating content, include the exact frontmatter and section skeleton for the user to apply; avoid large diffs inline.

## Repository specifics to respect
- Site content lives in `content/` and is built statically via `pnpm generate`; do not suggest runtime storage.
- Keep animation variants inside `composables/usePixelAnimation.ts`; do not add inline motion snippets in docs or components.
- Use 2-space indent, single quotes in code snippets, and PascalCase for components.

## Safety/limits
- Do not invent data; if the thread lacks a decision, state "决策未定" and skip doc updates.
- If an update spans multiple files, list them explicitly and keep each suggestion scoped.
