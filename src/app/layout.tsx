import type { Metadata } from "next";
import { Barlow_Condensed, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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

export const metadata: Metadata = {
  title: "Mammoth Pull Systems",
  description:
    "Heavy-haul sleds built for snow and ice transport across Alaska and northern operations.",
  openGraph: {
    title: "Mammoth Pull Systems",
    description:
      "Heavy-haul sleds built for snow and ice transport across Alaska and northern operations.",
    siteName: "Mammoth Pull Systems",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mammoth Pull Systems",
    description:
      "Heavy-haul sleds built for snow and ice transport across Alaska and northern operations.",
  },
};

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
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
