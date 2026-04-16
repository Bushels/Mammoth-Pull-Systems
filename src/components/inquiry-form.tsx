"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { submitInquiry, type InquiryState } from "@/app/actions";

const INITIAL_STATE: InquiryState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="hero-button hero-button-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Sending…" : "Request Specs"}
    </button>
  );
}

export function InquiryForm() {
  const [state, formAction] = useActionState(submitInquiry, INITIAL_STATE);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Name"
          name="name"
          autoComplete="name"
          required
          error={state.fieldErrors?.name}
        />
        <Field
          label="Company"
          name="company"
          autoComplete="organization"
          required
          error={state.fieldErrors?.company}
        />
        <Field
          label="Location"
          name="location"
          autoComplete="address-level2"
          placeholder="City, region"
          error={state.fieldErrors?.location}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          required
          error={state.fieldErrors?.email}
        />
      </div>

      <Field
        label="What are you hauling?"
        name="haul"
        placeholder="Tanks, modules, equipment"
        required
        error={state.fieldErrors?.haul}
      />
      <Field
        label="Terrain and route"
        name="terrain"
        placeholder="Ice road, tundra, frozen lake"
        error={state.fieldErrors?.terrain}
      />
      <Field
        label="Approximate size needed"
        name="size"
        placeholder="Deck length or footprint"
        error={state.fieldErrors?.size}
      />

      <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
        <SubmitButton />
        <p
          aria-live="polite"
          className={`text-sm leading-6 ${
            state.status === "success"
              ? "text-[var(--color-ice-blue)]"
              : state.status === "error"
                ? "text-[#f7a4a0]"
                : "text-white/60"
          }`}
        >
          {state.message ||
            "We read every inquiry. Expect a reply within one business day."}
        </p>
      </div>
    </form>
  );
}

type FieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  error?: string;
};

function Field({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
  error,
}: FieldProps) {
  const id = `inquiry-${name}`;
  return (
    <label htmlFor={id} className="block text-left">
      <span className="eyebrow text-[var(--color-ice-blue)]">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 w-full rounded-xl border bg-black/28 px-4 py-3 text-base leading-7 text-white placeholder:text-white/40 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)] ${
          error ? "border-[#f7a4a0]" : "border-white/14 hover:border-white/28"
        }`}
      />
      {error ? (
        <span id={`${id}-error`} className="mt-1 block text-xs text-[#f7a4a0]">
          {error}
        </span>
      ) : null}
    </label>
  );
}
