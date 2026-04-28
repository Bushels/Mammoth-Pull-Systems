import type { MetadataRoute } from "next";

// Canonical production URL. `NEXT_PUBLIC_SITE_URL` lets preview deploys
// (and local dev) swap in their own host if needed; otherwise the apex
// domain is the source of truth for the sitemap.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammothpullsleds.com";

// Hardcoded "content last meaningfully changed" timestamp.
//
// Why not `new Date()`: that resets on every deploy, even for hot-fix
// commits that don't touch indexed content. Google interprets a rolling
// lastModified as low-trust ("you say it changes daily but it doesn't")
// and decays its recrawl frequency. Bumping a literal date when the
// page copy actually changes gives the sitemap real signal.
//
// Update this when public-facing copy, specs, or images change.
const CONTENT_LAST_MODIFIED = "2026-04-18";

/**
 * Sitemap for the single-page site.
 *
 * Fragment URLs (e.g. `/#models`) used to be listed here as separate
 * entries, but Google's webmaster guidelines explicitly state that
 * fragment identifiers are not treated as distinct URLs for indexing —
 * they're collapsed onto the parent URL. So the previous `/#models`,
 * `/#payloads`, `/#inquiry` entries added crawl noise without indexing
 * benefit and have been removed.
 *
 * The image list mirrors every content image rendered on the page.
 * The header logo is intentionally excluded (Google's image sitemap
 * docs caution against listing brand marks / UI chrome — image search
 * ranks photographic content, not logos).
 *
 * If/when this site grows to multi-route (e.g. /sleds/mastodon,
 * /sleds/mammoth, case studies, spec sheets), add entries here with
 * their own `lastModified` values tied to their content source.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1.0,
      images: [
        // Hero
        `${SITE_URL}/media/hero-convoy.jpg`,
        // Northern Ops section
        `${SITE_URL}/media/yard-load.jpg`,
        `${SITE_URL}/media/hero-haul.jpg`,
        `${SITE_URL}/media/convoy-road.jpg`,
        // Models section
        `${SITE_URL}/media/mastodon-profile.jpg`,
        `${SITE_URL}/media/mammoth-crane.jpg`,
        // Payloads section
        `${SITE_URL}/media/payload-tank.jpg`,
        `${SITE_URL}/media/payload-module.jpg`,
        `${SITE_URL}/media/payload-loader.jpg`,
      ],
    },
  ];
}
