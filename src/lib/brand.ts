// Single source of truth for brand naming, contact, and address. Use these
// constants instead of hardcoding the strings so a rename (or a phone move)
// stays consistent across the site, the JSON-LD structured data, the
// sitemap, the llms.txt file, and every form action.

export const BRAND_NAME = "Mammoth Pull Sleds";
export const BRAND_ACRONYM = "MPS";
export const BRAND_TAGLINE =
  "Heavy-haul sleds built for snow and ice transport across Alaska and northern operations.";

export const MASTODON = {
  name: "Mastodon",
  length: "25'",
  lengthFeet: 25,
  label: "Compact point-loader",
} as const;

export const MAMMOTH = {
  name: "Mammoth",
  length: "53'",
  lengthFeet: 53,
  label: "Long-deck hauler",
} as const;

// Primary sales contact — the person a buyer talks to on the first call.
// `phone` is E.164 for `tel:` hrefs; `phoneDisplay` is the human version.
// `email` is the shared inbox where inquiry-form submissions land via
// Resend — it is NOT surfaced in the UI or in structured data. Every
// typed inquiry is routed through the form so leads arrive pre-formatted
// with the five spec fields. If a second destination is ever needed,
// split this into a separate `INQUIRY_INBOX` constant rather than
// exposing a mailto on the site.
export const CONTACT = {
  person: "Nathan Turchyn",
  phone: "+13068397481",
  phoneDisplay: "(306) 839-7481",
  email: "info@mpsgroup.ca",
} as const;

// Main office — used for LocalBusiness schema and the footer. The office
// number is distinct from Nathan's direct line above; buyers may be routed
// through the office during regular hours.
export const OFFICE = {
  phone: "+17805948100",
  phoneDisplay: "(780) 594-8100",
} as const;

// Physical address for LocalBusiness JSON-LD. Pierceland SK is on the
// Alberta/Saskatchewan border — relevant to Google's "near me" matching
// for prairie-based heavy-haul buyers.
export const ADDRESS = {
  streetAddress: "E Range Rd #3264",
  addressLocality: "Pierceland",
  addressRegion: "SK",
  postalCode: "S0M 2K0",
  addressCountry: "CA",
  // Human-readable one-liner for footer / UI display.
  display: "E Range Rd #3264, Pierceland, SK S0M 2K0, Canada",
} as const;
