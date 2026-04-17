import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { BRAND_NAME, CONTACT, MAMMOTH, MASTODON } from "@/lib/brand";

import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

// Canonical production URL. Set NEXT_PUBLIC_SITE_URL on Vercel to override
// for preview deployments; falls back to the apex domain in prod.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://mammothpullsystems.com";

const TITLE = `${BRAND_NAME} | Heavy-Haul Snow & Ice Sleds for the North Slope`;
const DESCRIPTION = `${BRAND_NAME} builds heavy-haul snow and ice sleds — the 25' ${MASTODON.name} point-loader and the 53' ${MAMMOTH.name} long-deck hauler — for Alaska North Slope freight: tanks, modules, tracked equipment, and rigs across tundra and ice roads.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${BRAND_NAME}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND_NAME,
  authors: [{ name: BRAND_NAME, url: SITE_URL }],
  generator: "Next.js",
  keywords: [
    "heavy haul sled",
    "snow sled",
    "ice road sled",
    "North Slope logistics",
    "Alaska heavy haul",
    "tundra transport",
    "arctic freight sled",
    "oilfield sled",
    "drilling module transport",
    "tank hauling sled",
    "Mammoth Pull Systems",
    "Mastodon sled",
    "Mammoth sled",
    "53 foot sled",
    "25 foot sled",
    "point-load sled",
    "long-deck hauler",
    "Anaktuvuk Pass",
    "Point Lay",
    "arctic oilfield equipment",
    "continuous duty sled",
  ],
  category: "industrial equipment",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: BRAND_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/media/hero-convoy.jpg",
        width: 1600,
        height: 900,
        alt: "A convoy of tracked prime movers pulling Mammoth Pull Systems sleds across open arctic tundra.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/media/hero-convoy.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/media/logo.png", type: "image/png" },
    ],
    apple: "/media/logo.png",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  other: {
    // Allow AI crawlers to cite the site. Mirrored in robots.ts and llms.txt.
    "ai-content-declaration": "allow-training:no; allow-citation:yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#08111b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

// JSON-LD structured data. Two payloads: an Organization (the company) and
// a pair of Products (the two sled models). Google, Bing, Perplexity, and
// most LLM retrievers read these blocks as authoritative facts — this is
// where "the company builds two sleds, one 25', one 53'" gets encoded in
// machine-readable form.
const organizationLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: BRAND_NAME,
  alternateName: ["Mammoth Sleds", "MPS"],
  url: SITE_URL,
  logo: `${SITE_URL}/media/logo.png`,
  description: DESCRIPTION,
  slogan: "Built to Haul the North",
  foundingLocation: {
    "@type": "Place",
    name: "Canada",
  },
  areaServed: [
    { "@type": "Place", name: "Alaska North Slope" },
    { "@type": "Place", name: "Arctic Canada" },
    { "@type": "Place", name: "Northern Alberta" },
    { "@type": "Place", name: "Northwest Territories" },
    { "@type": "Place", name: "Yukon" },
  ],
  knowsAbout: [
    "Heavy-haul sled fabrication",
    "Snow and ice road logistics",
    "Arctic tundra transport",
    "Point-load sled design",
    "Drilling module transport",
    "Oilfield equipment mobilization",
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      name: CONTACT.person,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      areaServed: ["US-AK", "CA"],
      availableLanguage: ["en"],
    },
  ],
  sameAs: [] as string[],
};

const mastodonProductLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-mastodon`,
  name: `${MASTODON.name} ${MASTODON.length} Heavy-Haul Sled`,
  alternateName: `${MASTODON.length} Point-Load Sled`,
  description:
    "Compact 25-foot point-loader. Low deck, 32.5-inch deck height. Field-run at 40,000 to 60,000 lb. Built around tracked equipment and heavy iron — has hauled a CAT D8 dozer.",
  brand: { "@type": "Brand", name: BRAND_NAME },
  manufacturer: { "@id": `${SITE_URL}/#organization` },
  category: "Heavy haul sled",
  image: `${SITE_URL}/media/mastodon-profile.jpg`,
  url: `${SITE_URL}/#models`,
  additionalProperty: [
    { "@type": "PropertyValue", name: "Deck length", value: "25 ft" },
    { "@type": "PropertyValue", name: "Deck height", value: "32.5 in" },
    { "@type": "PropertyValue", name: "Deck style", value: "Low, point-load" },
    {
      "@type": "PropertyValue",
      name: "Typical field load",
      value: "40,000-60,000 lb",
    },
  ],
};

const mammothProductLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${SITE_URL}/#product-mammoth`,
  name: `${MAMMOTH.name} ${MAMMOTH.length} Heavy-Haul Sled`,
  alternateName: `${MAMMOTH.length} Long-Deck Snow Sled`,
  description:
    "Full 53-foot usable deck. Rated 65,000 lb at highway speeds. Peak field load 85,000 lb. Built for tanks, drilling modules, and long freight across snow and ice.",
  brand: { "@type": "Brand", name: BRAND_NAME },
  manufacturer: { "@id": `${SITE_URL}/#organization` },
  category: "Heavy haul sled",
  image: `${SITE_URL}/media/mammoth-crane.jpg`,
  url: `${SITE_URL}/#models`,
  additionalProperty: [
    { "@type": "PropertyValue", name: "Deck length", value: "53 ft" },
    { "@type": "PropertyValue", name: "Deck profile", value: "Low, sled-runner" },
    { "@type": "PropertyValue", name: "Rated load", value: "65,000 lb" },
    { "@type": "PropertyValue", name: "Peak field load", value: "85,000 lb" },
  ],
};

const websiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: BRAND_NAME,
  description: DESCRIPTION,
  publisher: { "@id": `${SITE_URL}/#organization` },
  inLanguage: "en-US",
};

// SAFETY NOTE: dangerouslySetInnerHTML below is the Next.js-recommended
// pattern for JSON-LD. The payloads are COMPILE-TIME CONSTANTS built from
// trusted project constants (brand.ts) — no user input flows through.
// JSON.stringify escapes the values; the script tag type is
// "application/ld+json" so the browser does NOT execute it.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mastodonProductLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(mammothProductLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
