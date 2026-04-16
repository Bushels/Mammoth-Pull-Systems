// Single source of truth for brand naming. Use these constants instead of
// hardcoding the strings so a rename stays consistent across the site.

export const BRAND_NAME = "Mammoth Pull Systems";
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

export const CONTACT = {
  person: "Nathan Turchyn",
  phone: "+13068397481",
  phoneDisplay: "(306) 839-7481",
  email: "nathan@mpsgroup.ca",
} as const;
