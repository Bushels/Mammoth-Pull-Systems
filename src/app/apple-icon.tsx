import { ImageResponse } from "next/og";

// Next.js file convention: src/app/apple-icon.tsx is rendered to a PNG at
// build time and served as /apple-icon.png with the correct <link
// rel="apple-touch-icon"> wired into every page. iOS home-screen icons
// must be raster (PNG); SVG is not accepted. We therefore generate the
// PNG from the same block-M design used in icon.svg so the favicon and
// the home-screen icon stay in lockstep.

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#08111b",
          borderRadius: 36,
          // Deep red block "M" drawn with a huge sans-serif weight so the
          // proportions read correctly at iOS home-screen size. Barlow
          // Condensed is not available in the build environment, so we
          // rely on a stacked system-font fallback — the exact font
          // doesn't matter because ImageResponse rasterizes once and the
          // result ships as a static PNG.
          fontFamily: "'Arial Black', 'Helvetica Black', 'Impact', sans-serif",
          fontWeight: 900,
          fontSize: 150,
          color: "#d62b1f",
          letterSpacing: -6,
        }}
      >
        M
      </div>
    ),
    { ...size },
  );
}
