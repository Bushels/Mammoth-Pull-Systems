---
name: next-16-conventions
description: Use whenever Next.js code in this repo is being created, modified, or debugged. Next.js 16 has breaking changes from your training data — APIs, conventions, and file structure differ. Triggers on edits to src/app/**, src/components/**, next.config.ts, package.json (next/react deps), or any prompt mentioning routing, server actions, middleware, or App Router. Read node_modules/next/dist/docs/ before writing code; cite the doc path in any answer.
---

# Next.js 16 conventions for this repo

This is **not** the Next.js you remember from training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing or modifying code. Heed deprecation notices.

## Stack pin (verified 2026-05-01)

- `next` 16.2.4 (App Router only — Pages Router is removed)
- `react` 19.2.4 / `react-dom` 19.2.4
- `tailwindcss` 4 via `@tailwindcss/postcss`
- `typescript` 5
- `resend` 6.x for transactional email (env var: `MAMMOTH_RESEND_FROM`; inquiries route to `nathan@`)
- `@vercel/analytics` 2.x and `@vercel/speed-insights` 2.x
- Hosted on Vercel (Fluid Compute is the default runtime)

## Source of truth, in order

1. `node_modules/next/dist/docs/<topic>.md` — authoritative for the installed version
2. https://nextjs.org/docs with the version selector pinned to 16.x
3. Vercel Fluid Compute / vercel.ts knowledge (see the `vercel:knowledge-update` skill)

## Repository layout

- `src/app/` — App Router routes, layouts, server components
- `src/app/actions.ts` — Server Actions (inquiry form submission)
- `src/components/` — Client and server components (e.g. `inquiry-form.tsx`, `hero-parallax.tsx`)
- `public/media/` — curated, renamed assets used by the site (`hero-convoy.jpg`, `mastodon-profile.jpg`, etc.). The raw iOS dump in `Images_Videos/` is **not** the source of truth for the site — `public/media/` is.
- `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/icon.svg`, `src/app/apple-icon.tsx` — file-based metadata API

## Common drift traps to avoid

- Do not use Pages Router idioms (`getServerSideProps`, `_app.tsx`, `_document.tsx`).
- Middleware supports full Node.js now — write it that way, not as edge-only.
- Edge Functions are deprecated in favor of Fluid Compute — same regions, same price, full Node API.
- `vercel.ts` (TypeScript) is the recommended config format. This project does not have one yet; if config is needed, prefer `vercel.ts` over `vercel.json`.
- Default function timeout is 300s on all plans (was 60–90s).

## When in doubt

Read the doc, cite the path. If `node_modules/next/dist/docs/` is unavailable in the current sandbox, say so and fetch the matching version from nextjs.org rather than answering from training data.
