import type { MetadataRoute } from "next";

// Canonical production URL. `NEXT_PUBLIC_SITE_URL` lets preview deploys
// (and local dev) swap in their own host if needed; otherwise the apex
// domain is the source of truth for the sitemap.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammothpullsleds.com";

/**
 * Sitemap for the single-page site. The page is stitched from in-document
 * sections (#north, #models, #payloads, #inquiry), so from a crawler's
 * point of view there is one URL — but we list the section anchors as
 * hints because Google has historically indexed fragment identifiers as
 * in-page jumps in rich results.
 *
 * If/when this site grows to multi-route (e.g. case studies, spec sheets),
 * add entries here with explicit `lastModified` values tied to their
 * content source.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
      images: [
        `${SITE_URL}/media/hero-convoy.jpg`,
        `${SITE_URL}/media/mastodon-profile.jpg`,
        `${SITE_URL}/media/mammoth-crane.jpg`,
      ],
    },
    {
      url: `${SITE_URL}/#models`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/#payloads`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/#inquiry`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
