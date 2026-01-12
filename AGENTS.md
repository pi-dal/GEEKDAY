# Repository Guidelines

## Project Structure & Module Organization
- `pages/` holds route-level views; `layouts/` wraps shared chrome; `app.vue` hosts the layout shell.
- `components/` contains page sections (Hero/Stats/About/Venue/Schedule/Prizes/Sponsors/FAQ/CTA/Footer) in PascalCase.
- `composables/usePixelAnimation.ts` centralizes motion variants and visibility helpers; add new animation presets here.
- `assets/css/main.css` defines the pixel theme and Tailwind entrypoint; `public/` stores static files (favicons, shared logos).
- `content/` is available for MDC/Markdown content rendered via `@nuxt/content`; keep frontmatter fields aligned with `content.config.ts`.
- Root configs: `nuxt.config.ts` (app/meta, modules, static preset), `tailwind.config.js` (theme tokens/animations), `tsconfig.json`.

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (Nuxt 4, Tailwind, @nuxt/content, @vueuse/motion).
- `pnpm dev` — start the Nuxt dev server.
- `pnpm build` — production build; fails on type or compilation errors.
- `pnpm generate` — export static site (Nitro static preset).
- `pnpm preview` — serve the production build locally for smoke tests.

## Coding Style & Naming Conventions
- Use TypeScript and `<script setup lang="ts">`; 2-space indentation, single quotes, trailing commas preferred.
- Follow Vue 3 style guide: PascalCase components, composables start with `use*`, props/events in camelCase; keep section-level components colocated in `components/`.
- JS/TS hygiene: avoid `any`, type props/emit payloads, prefer computed/watches over manual DOM reads, and keep reactivity rules (no destructuring refs without `.value`).
- Vue SFC hygiene: single root, `<script setup>` only, scoped state per component, use `defineProps/defineEmits` for interfaces.
- Favor Tailwind utility classes; extend design tokens in `tailwind.config.js` rather than ad-hoc inline styles. Keep motion variants in `composables/usePixelAnimation.ts`; reuse existing variants before adding new ones.
- Place global styles in `assets/css/main.css`; put immutable assets in `public/` and authored images in `assets/`.

## Testing Guidelines
- No automated tests yet; at minimum run `pnpm build` and `pnpm preview` before sharing changes.
- Manually verify key flows on `/`: hero animations, navigation, schedule tabs, FAQ accordion, CTA buttons, and image/logo rendering.
- For content changes, check Markdown rendering via `@nuxt/content` and confirm Shiki highlighting where code blocks exist.

## Content Updates
- Place textual/content edits in `content/` (MDC/Markdown) so `@nuxt/content` renders them; avoid hard-coding copy inside components when possible.
- If another agent needs to modify displayed text, update the relevant entry under `content/` instead of editing Vue templates directly; keep frontmatter fields aligned with `content.config.ts`.

## Commit & Pull Request Guidelines
- Git history is unavailable here; follow Conventional Commits (`feat`, `fix`, `chore`, `docs`, `style`, `refactor`).
- PRs should include: concise summary, linked issue (if any), before/after screenshots or short videos for UI changes, and a checklist of manual verifications.
- Call out SEO/meta updates (e.g., `app.head` changes) and any new assets added to `public/` or `assets/`.
