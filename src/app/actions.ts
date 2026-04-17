"use server";

import { Resend } from "resend";

import { CONTACT } from "@/lib/brand";

// =============================================================================
// Inquiry form → Resend transactional send
// =============================================================================
//
// The template lives in the Resend dashboard; its ID is taken from the
// template editor URL (https://resend.com/templates/<id>/editor). If the
// template is renamed in the dashboard the ID does NOT change, so this
// constant is stable across content edits.
//
// Why template-mode instead of React Email / inline HTML: the marketing
// team owns the copy, not engineering. Routing through a dashboard
// template means Nathan can tweak the wording, header image, or signature
// without a deploy — and the site code just passes the raw field values
// as template `variables`.
//
// Variable naming contract: the keys below must match the {{placeholder}}
// tokens in the Resend template exactly. Extras passed here are ignored
// by Resend, so it is safe (and intentional) to send the full form
// superset — that way adding a new `{{terrain}}` placeholder in the
// template works without a code change.
const TEMPLATE_ID = "600d3c17-254e-4477-92ac-c000ce891946";

// Env var names are namespaced with `MAMMOTH_` rather than the Resend
// default `RESEND_API_KEY` / `RESEND_FROM` so that a shared Vercel team
// can host multiple projects with different Resend accounts without
// colliding. If you copy a code snippet from Resend's docs, swap the
// variable name before wiring it in.
const ENV_API_KEY = "MAMMOTH_RESEND_API";
const ENV_FROM = "MAMMOTH_RESEND_FROM";

// Sender must be a verified address on the Resend account. During local
// dev (or before mammothpullsleds.com is verified), the Resend sandbox
// sender `onboarding@resend.dev` works — but it only delivers to the
// Resend account owner's own inbox. In production, set:
//   MAMMOTH_RESEND_FROM="Mammoth Pull Sleds <inquiries@mammothpullsleds.com>"
// on Vercel once the domain DNS is verified.
const FROM =
  process.env[ENV_FROM] ?? "Mammoth Pull Sleds <onboarding@resend.dev>";

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

// Friendly fallback for optional fields that end up empty. Templates
// render `{{terrain}}` as a literal empty string when the variable is
// "" — which looks broken in an email. A short placeholder reads
// cleanly while still making the data gap visible to the reader.
const NOT_PROVIDED = "Not provided";

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

  // Config guard: treat a missing API key as a configuration error
  // rather than letting the Resend SDK throw a cryptic auth failure.
  // Log loudly server-side so a bad prod deploy shows up in Vercel logs,
  // but give the user a calm, actionable message pointing them at the
  // phone line so a form outage never blocks a real lead.
  const apiKey = process.env[ENV_API_KEY];
  if (!apiKey) {
    console.error(
      `[Mammoth Pull Sleds inquiry] ${ENV_API_KEY} is not configured`,
    );
    return {
      status: "error",
      message:
        "Sorry — our form is temporarily offline. Please call the direct line instead.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: [CONTACT.email],
      // `replyTo` is the critical piece: when Nathan hits Reply in his
      // inbox, the reply goes to the submitter's email — not back to the
      // Resend sender address. That turns the form into a two-way
      // channel without exposing a public mailbox.
      replyTo: values.email,
      template: {
        id: TEMPLATE_ID,
        variables: {
          name: values.name,
          company: values.company,
          location: values.location || NOT_PROVIDED,
          email: values.email,
          haul: values.haul,
          terrain: values.terrain || NOT_PROVIDED,
          size: values.size || NOT_PROVIDED,
          submitted_at: new Date().toISOString(),
        },
      },
    });

    if (error) {
      // The Resend SDK returns errors as a field rather than throwing.
      // Surface the raw error to the server log (useful for debugging
      // domain-not-verified, rate-limit, or template-not-found issues)
      // but don't echo provider internals to the user.
      console.error("[Mammoth Pull Sleds inquiry] Resend error:", error);
      return {
        status: "error",
        message:
          "Sorry — we couldn't send your request just now. Please try again, or call the direct line.",
      };
    }
  } catch (err) {
    console.error("[Mammoth Pull Sleds inquiry] send failed:", err);
    return {
      status: "error",
      message:
        "Sorry — we couldn't send your request just now. Please try again, or call the direct line.",
    };
  }

  return {
    status: "success",
    message: `Thanks ${values.name.split(/\s+/)[0]} — your request is in. We'll be in touch within one business day.`,
  };
}
