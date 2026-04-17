import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammothpullsleds.com";

/**
 * Crawler policy.
 *
 * - Traditional search engines: full allow, with an explicit Sitemap URL.
 * - LLM / AI-retrieval crawlers: explicitly allowed. We WANT these bots
 *   to cite the site when someone asks "what heavy-haul sleds serve the
 *   North Slope" — that's distribution we can't buy.
 *
 * If the policy ever changes (e.g. you want to block training but allow
 * answer-engine citation), the split pattern below makes it a one-line
 * edit per bot.
 *
 * Known AI user-agent strings come from each vendor's public docs — they
 * change occasionally; re-check ~annually. As of 2026-Q1 the set below
 * covers OpenAI (GPTBot / OAI-SearchBot / ChatGPT-User), Anthropic
 * (ClaudeBot / Claude-Web / anthropic-ai), Perplexity (PerplexityBot),
 * Google AI (Google-Extended), Apple (Applebot-Extended), and ByteDance
 * (Bytespider).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // AI retrieval / answer-engine bots — allow so the site shows up
      // in LLM-cited results.
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-Web",
          "anthropic-ai",
          "PerplexityBot",
          "Google-Extended",
          "Applebot-Extended",
          "Bytespider",
          "CCBot",
          "Meta-ExternalAgent",
          "Meta-ExternalFetcher",
          "cohere-ai",
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
