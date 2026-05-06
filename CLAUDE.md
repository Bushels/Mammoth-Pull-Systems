# CLAUDE.md — Mammoth Pull Sleds site

Rules for any agent (Claude, Codex, or otherwise) working on the Mammoth Pull Sleds marketing site.

> This file is **rules-only**. It does not record activity, recent changes, or session notes — those belong in `docs/journal/YYYY-MM.md`. Current task state lives in `PROJECT_STATE.md`.

<!-- BEGIN:nextjs-agent-rules -->
## ⚠ This is NOT the Next.js you know

This site is on **Next.js 16 App Router** with breaking changes from earlier versions. APIs, conventions, and file structure may all differ from your training data. **Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.** Heed deprecation notices.

When in doubt, check `.claude/skills/next-16-conventions/SKILL.md` for project-specific Next 16 patterns.
<!-- END:nextjs-agent-rules -->

## Project context

- **What this is** — Marketing site for **Mammoth Pull Sleds** (formerly Mammoth Pull Systems), heavy-haul sleds for snow and ice transport in Alaska and other northern operating environments. Fabrication shop in Pierceland, Saskatchewan.
- **Stack** — Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Motion (animation), Vercel Analytics + Speed Insights.
- **Hosting** — Vercel auto-deploys from `main`.

## Read first

1. `AGENTS.md` — Codex entry; same content as this file (cross-model alignment)
2. `PROJECT_STATE.md` — current truth (active task, blockers, next action, deferred decisions)
3. `docs/journal/YYYY-MM.md` — append-only history
4. `.claude/skills/next-16-conventions/SKILL.md` — Next 16-specific patterns
5. `README.md` — quick stack overview + local dev commands

## Operating rules

- **Next.js 16 deprecation notices are mandatory reading** before writing any file under `app/` or `components/`. Don't pattern-match against Next 13/14/15 examples — they may be invalid.
- **Tailwind CSS 4** uses different config than Tailwind 3. Check the existing config first.
- **All animation goes through Motion** (formerly Framer Motion). Don't introduce a second animation library.
- **Vercel Analytics + Speed Insights are wired into the root layout** — don't add page-by-page analytics calls.
- **Image optimization** — use Next 16's Image component. Don't use plain `<img>` for product images.

## Cross-model rule

Keep `AGENTS.md` and `CLAUDE.md` aligned. Both are entry points; same content.

## Working rules

- Update `PROJECT_STATE.md` when active task or blockers change.
- Update `docs/journal/YYYY-MM.md` at session end.
- Don't commit `node_modules/`, `.next/`, or `Images_Videos/raw-dump/` working files.
- `Images_Videos/` deletion pending owner decision (see PROJECT_STATE.md).
