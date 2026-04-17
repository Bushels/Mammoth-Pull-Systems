# Mammoth Pull Sleds

Marketing site for Mammoth Pull Sleds (previously marketed as Mammoth Pull Systems), focused on heavy-haul sleds built for snow and ice transport in Alaska and other northern operating environments. Fabrication shop in Pierceland, Saskatchewan.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Motion for restrained page animation
- Vercel Analytics and Speed Insights for hosted monitoring

## Local development

Run the local development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful commands:

```bash
npm run lint
npm run build
```

## Project structure

- `src/app/page.tsx`
  Main landing page content and section copy
- `src/app/layout.tsx`
  Global metadata plus Vercel Analytics and Speed Insights
- `src/app/globals.css`
  Brand styling, layout primitives, and snow animation
- `public/media/`
  Selected real logo and field images used on the homepage

## Vercel deployment

When you create the Vercel project:

1. Import this repository or folder into Vercel.
2. Keep the framework preset as `Next.js`.
3. Deploy once to get a live preview URL.
4. In the Vercel dashboard, enable:
   Web Analytics
   Speed Insights
5. Add the production domain once the site is ready.

No custom environment variables are required for the current version of the site.

## Current positioning

- Slogan: `Built to Haul the North`
- Core markets: Alaska, North Slope, Prudhoe Bay, northern operators
- Product story:
  `25' Mastodon` for lower, point-loading heavy equipment moves
  `53' Mammoth` for long-deck hauling, larger freight, and more configurations

## Next recommended work

- Add a real inquiry form flow
- Refine model-specific imagery and specs
- Add public credibility proof if customer names/logos are approved for use
