"use server";

import { CONTACT } from "@/lib/brand";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<InquiryField, string>>;
};

type InquiryField =
  | "name"
  | "company"
  | "location"
  | "email"
  | "haul"
  | "terrain"
  | "size";

const FIELD_LABELS: Record<InquiryField, string> = {
  name: "Name",
  company: "Company",
  location: "Location",
  email: "Email",
  haul: "What you're hauling",
  terrain: "Terrain",
  size: "Approximate size needed",
};

const REQUIRED: InquiryField[] = ["name", "company", "email", "haul"];

export async function submitInquiry(
  _prev: InquiryState,
  formData: FormData,
): Promise<InquiryState> {
  const values: Record<InquiryField, string> = {
    name: String(formData.get("name") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    haul: String(formData.get("haul") ?? "").trim(),
    terrain: String(formData.get("terrain") ?? "").trim(),
    size: String(formData.get("size") ?? "").trim(),
  };

  const fieldErrors: Partial<Record<InquiryField, string>> = {};
  for (const field of REQUIRED) {
    if (!values[field]) {
      fieldErrors[field] = `${FIELD_LABELS[field]} is required.`;
    }
  }

  // Very light email sanity check; the `type="email"` input does the heavy
  // lifting client-side and we only re-check to catch empty-after-trim.
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    fieldErrors.email = "Enter a valid email address.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  // TODO: wire up real email delivery (Resend / SendGrid / Vercel Email).
  // For now log the submission server-side so nothing is lost during dev.
  // Replace this block with a transactional send to `CONTACT.email` and
  // optionally a CRM webhook when the provider is chosen.
  console.info("[Mammoth Pull Systems inquiry]", {
    receivedAt: new Date().toISOString(),
    to: CONTACT.email,
    payload: values,
  });

  return {
    status: "success",
    message: `Thanks ${values.name.split(/\s+/)[0]} — we'll be in touch from ${CONTACT.email}.`,
  };
}
