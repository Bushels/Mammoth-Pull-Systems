# Project State — Mammoth Pull Systems site

> Current truth lives here. Append-only history lives in `docs/journal/`.
> Rules-only docs are `AGENTS.md` and `CLAUDE.md`.

## Last verified commit

`8990ba6` — feat(seo): add Microsoft Clarity, FAQ schema, and tighten sitemap

## Active task

None — site is in production at the latest commit. Portfolio cleanup completed 2026-05-01 (see `docs/journal/2026-05.md`).

## Known blockers

None.

## Next action

Pending owner decisions:

1. Review and commit the portfolio-cleanup changes (see `docs/journal/2026-05.md` for the full diff).
2. Decide on the deferred deletion candidates listed in `docs/journal/2026-05.md` — especially the 19 MB `Images_Videos/` raw-media dump. Filenames in the dump (iOS-camera-named) share **zero** overlap with the curated names in `public/media/`, so a visual pass is required before deletion is safe.

## Where to find what

- **Project-specific routing rules and skills** → `.claude/skills/` (currently ships `next-16-conventions`)
- **Codex CLI per-project config** → `.codex/config.toml` (gpt-5.5, reasoning_effort=medium)
- **VS Code dev-server launch** → `.vscode/launch.json`
- **Concept and design docs** → `docs/concepts/` (currently ships `mammoth-site-concept.md`)
- **Append-only history** → `docs/journal/<YYYY-MM>.md`

## Quick stack reference

- Next.js 16.2.4 (App Router), React 19.2.4, Tailwind 4
- Email via Resend (`MAMMOTH_RESEND_FROM`, inquiries route to nathan@)
- Vercel Analytics + Speed Insights, Microsoft Clarity session recording
- Hosted on Vercel
