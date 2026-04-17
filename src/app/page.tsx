import Image from "next/image";

import { DeckScale } from "@/components/deck-scale";
import { FadeIn } from "@/components/fade-in";
import { HeroParallax } from "@/components/hero-parallax";
import { InquiryForm } from "@/components/inquiry-form";
import { SnowOverlay } from "@/components/snow-overlay";
import { ADDRESS, BRAND_NAME, CONTACT, MAMMOTH, MASTODON, OFFICE } from "@/lib/brand";

const MAX_DECK_FEET = MAMMOTH.lengthFeet;
const MAX_WEIGHT_LB = 90_000;

type CargoKey = "dozer" | "picker" | "loader" | "tank" | "module" | "generator";

type ModelCard = {
  length: string;
  lengthFeet: number;
  name: string;
  label: string;
  image: string;
  imageAlt: string;
  description: string;
  weight: {
    fillLb: number;
    headline: string;
    detail: string;
  };
  specs: Array<{ label: string; value: string }>;
  cargo: Array<{ key: CargoKey; x: number }>;
  accent: string;
  notes: string[];
  footnote: string;
};

const modelData: ModelCard[] = [
  {
    length: MASTODON.length,
    lengthFeet: MASTODON.lengthFeet,
    name: MASTODON.name,
    label: MASTODON.label,
    image: "/media/mastodon-profile.jpg",
    imageAlt: "Empty Mastodon sled in profile on snow, red deck and white runners.",
    description:
      "The lower, point-loading sled. Field-run at 40,000 to 60,000 lb. It has hauled a CAT D8 dozer.",
    weight: {
      fillLb: 60_000,
      headline: "40,000 – 60,000 lb",
      detail: "Typical field load. Point-loaded weight sits close to the deck.",
    },
    specs: [
      { label: "Deck length", value: "25 ft" },
      { label: "Deck height", value: "32.5 in" },
      { label: "Deck style", value: "Low, point-load" },
      { label: "Typical load", value: "40k – 60k lb" },
    ],
    cargo: [{ key: "dozer", x: 4 }],
    accent: "var(--color-alert-red)",
    notes: [
      "Low deck for concentrated, point-loaded weight",
      "Built around tracked equipment and heavy iron",
      "Compact footprint without giving up ruggedness",
    ],
    footnote: "Weights reflect field experience, not a published deck rating.",
  },
  {
    length: MAMMOTH.length,
    lengthFeet: MAMMOTH.lengthFeet,
    name: MAMMOTH.name,
    label: MAMMOTH.label,
    image: "/media/mammoth-crane.jpg",
    imageAlt: "A Peterbilt picker truck loaded on a Mammoth sled at arctic twilight.",
    description:
      "A full 53' of usable deck. Rated 65,000 lb at highway speeds. Run up to 85,000 lb in the field.",
    weight: {
      fillLb: 85_000,
      headline: "Up to 85,000 lb",
      detail: "Rated 65,000 · Regular ≤ 70,000 · Peak 85,000 lb.",
    },
    specs: [
      { label: "Deck length", value: "53 ft" },
      { label: "Deck profile", value: "Low, sled-runner" },
      { label: "Rated load", value: "65,000 lb" },
      { label: "Peak field load", value: "85,000 lb" },
    ],
    cargo: [{ key: "picker", x: 10 }],
    accent: "var(--color-ice-blue)",
    notes: [
      "Over-the-road trailer length, built for snow and ice",
      "Sized for tanks, modules, and long freight",
      "Configurable for a wide range of load setups",
    ],
    footnote: "Deck rating and field-observed capacity are listed separately.",
  },
];

const capabilityItems = [
  {
    title: "Built for the Slope",
    body: "From Anaktuvuk Pass to Point Lay and the snow roads between them. These sleds were designed around northern routes, not adapted to them.",
  },
  {
    title: "Built for Abuse",
    body: "Structural steel frames. Point-loaded decks. Reinforcement where it's needed to handle the rough arctic tundra. Every sled on the trail has already done real work.",
  },
  {
    title: "Field-Proven",
    body: "Tanks, modules, tracked iron, highway trucks. Ask for a haul history and we'll walk you through what's moved and where.",
  },
];

const buyerGroups = [
  "Energy service operators",
  "Equipment rental fleets",
  "North Slope logistics teams",
  "Municipal and borough operations",
];

type PayloadShowcase = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  cargo: { key: CargoKey; x: number };
  deckFeet: number;
};

const payloadShowcases: PayloadShowcase[] = [
  {
    title: "Process and utility tanks",
    body: "Long-deck sleds keep tanks stable across snow and ice. That stability is the job.",
    image: "/media/payload-tank.jpg",
    imageAlt: "A large process tank secured on a Mammoth sled with supply tanks beside it.",
    cargo: { key: "tank", x: 16 },
    deckFeet: MAMMOTH.lengthFeet,
  },
  {
    title: "Modules and framed systems",
    body: "Oversized freight needs usable deck and tie-down flexibility. The Mammoth is built for it.",
    image: "/media/payload-module.jpg",
    imageAlt: "A framed drilling module on a Mammoth sled being pulled by a tracked prime mover.",
    cargo: { key: "module", x: 14 },
    deckFeet: MAMMOTH.lengthFeet,
  },
  {
    title: "Tracked equipment and point loads",
    body: "Low deck, concentrated load, stable ride. The Mastodon is built around point-loaded weight.",
    image: "/media/payload-loader.jpg",
    imageAlt: "A Volvo wheel loader with forks on a Mammoth sled at dusk.",
    cargo: { key: "loader", x: 12 },
    deckFeet: MAMMOTH.lengthFeet,
  },
];

const planningInputs = [
  "Load type and approximate weight",
  "Route, terrain, and seasonal conditions",
  "Overall load footprint and deck needs",
  "Tow setup and operational constraints",
  "Timing, schedule, and deployment window",
];

export default function Home() {
  return (
    <main className="overflow-x-clip bg-[var(--color-deep-night)] text-white">
      {/* ================================================================ */}
      {/* Hero                                                              */}
      {/* ================================================================ */}
      <section className="relative isolate min-h-[100svh] overflow-hidden border-b border-white/10">
        <HeroParallax
          src="/media/hero-convoy.jpg"
          alt={`A convoy of tracked prime movers pulling ${BRAND_NAME} sleds across open arctic tundra.`}
        />
        {/* Lighter gradient on the left only so more of the image breathes. */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(7,17,30,0.86)_0%,rgba(7,17,30,0.5)_45%,rgba(7,17,30,0.12)_75%,rgba(7,17,30,0.4)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-[linear-gradient(180deg,rgba(7,17,30,0.7)_0%,transparent_100%)]" />
        <SnowOverlay />

        <header className="absolute inset-x-0 top-0 z-20">
          <div className="section-shell flex items-center justify-between gap-4 py-4 sm:py-5">
            <a
              href="#"
              aria-label={`${BRAND_NAME} home`}
              className="flex items-center gap-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)] sm:gap-4"
            >
              <Image
                src="/media/mark.svg"
                alt={`${BRAND_NAME} mark`}
                width={64}
                height={64}
                priority
                unoptimized
                className="h-auto w-12 drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)] sm:w-14 lg:w-16"
              />
              <div className="flex flex-col leading-none">
                <span className="font-display text-xl uppercase tracking-[0.04em] text-white sm:text-2xl lg:text-[1.75rem]">
                  {BRAND_NAME}
                </span>
                <span className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-white/75 sm:text-xs lg:tracking-[0.32em]">
                  Heavy-Haul Snow &amp; Ice Sleds
                </span>
              </div>
            </a>
            <nav
              aria-label="Primary"
              className="hidden items-center gap-6 text-xs uppercase tracking-[0.28em] text-white/78 md:flex"
            >
              <a
                href="#north"
                className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
              >
                Use Cases
              </a>
              <a
                href="#models"
                className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
              >
                Sleds
              </a>
              <a
                href="#payloads"
                className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
              >
                Payloads
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="hidden items-center gap-2 rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)] lg:inline-flex"
              >
                <span aria-hidden="true">☏</span>
                {CONTACT.phoneDisplay}
              </a>
              <a
                href="#inquiry"
                className="rounded-full border border-white/35 px-4 py-2 text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
              >
                Get a Quote
              </a>
            </nav>
            <div className="flex items-center gap-2 md:hidden">
              <a
                href={`tel:${CONTACT.phone}`}
                aria-label={`Call ${CONTACT.phoneDisplay}`}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/30 text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
              >
                <span aria-hidden="true" className="text-base">☏</span>
              </a>
              <a
                href="#inquiry"
                className="inline-flex min-h-11 items-center rounded-full border border-white/30 px-4 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white transition hover:border-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
              >
                Quote
              </a>
            </div>
          </div>
        </header>

        <div className="section-shell relative z-10 flex min-h-[100svh] items-end pb-20 pt-36 sm:pb-24 sm:pt-40">
          <FadeIn className="max-w-2xl">
            <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-7xl lg:text-[8rem] lg:leading-[0.9]">
              Built to Haul the North
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/88 sm:text-lg">
              {BRAND_NAME} builds heavy-haul sleds for tanks, modules, and
              equipment moving across snow and ice.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href="#inquiry" className="hero-button hero-button-primary">
                Request Specs
              </a>
              <a
                href={`tel:${CONTACT.phone}`}
                className="hero-button hero-button-secondary"
                aria-label={`Call ${CONTACT.phoneDisplay}`}
              >
                <span aria-hidden="true" className="mr-2 text-sm">☏</span>
                {CONTACT.phoneDisplay}
              </a>
            </div>

            <div className="mt-10 grid gap-2 text-left text-xs uppercase tracking-[0.28em] text-white/70 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
              <span>25&apos; Mastodon</span>
              <span>53&apos; Mammoth</span>
              <span>Custom fabrication</span>
              <span>Industrial haul focus</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Northern Ops                                                      */}
      {/* ================================================================ */}
      <section
        id="north"
        className="border-b border-[var(--color-ice-border)] bg-[var(--color-snowfield)] text-[var(--color-deep-night)]"
      >
        <div className="section-shell grid gap-16 py-20 sm:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <FadeIn className="lg:sticky lg:top-24">
            <p className="eyebrow text-[var(--color-alert-red)]">Northern Ops</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] text-[var(--color-deep-night)] sm:text-5xl">
              We build for the North Slope.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-700 sm:text-lg">
              If you&apos;ve moved freight over frozen ground, you already know
              what works and what doesn&apos;t. Our sleds are built for{" "}
              <span className="font-semibold text-[var(--color-deep-night)]">
                &ldquo;Continuous Duty&rdquo;
              </span>
              &nbsp;&mdash; routes where recovery is expensive and schedule is
              everything.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {buyerGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-[var(--color-deep-night)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/82"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="mt-10 space-y-5">
              {capabilityItems.map((item, index) => (
                <FadeIn
                  key={item.title}
                  delay={index * 0.08}
                  className="frost-panel p-5"
                >
                  <h3 className="font-display text-2xl uppercase tracking-[0.05em] text-[var(--color-deep-night)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {item.body}
                  </p>
                </FadeIn>
              ))}
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn className="image-panel sm:col-span-2">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/media/yard-load.jpg"
                  alt="Mammoth sled assemblies staged and loaded in a snowy yard."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="space-y-2 p-5">
                <p className="eyebrow text-[var(--color-alert-red)]">Yard-ready</p>
                <p className="text-sm leading-7 text-slate-700">
                  Staged in the yard, loaded once, pulled out. The work already
                  done is the spec sheet.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="image-panel">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="/media/hero-haul.jpg"
                  alt="A tank secured on a sled pulled by a tracked prime mover."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-[var(--color-alert-red)]">In haul</p>
                <p className="text-sm leading-7 text-slate-700">
                  Process tanks, tracked prime movers, ice surface. This is
                  what every deployed haul looks like.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="image-panel">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="/media/convoy-road.jpg"
                  alt="A cement truck on a sled pulled across an open ice road."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-[var(--color-alert-red)]">Load variety</p>
                <p className="text-sm leading-7 text-slate-700">
                  Tanks, trucks, modules, dozers, gensets. Every shape of
                  industrial load gets on a deck.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Two Sizes — Model cards                                           */}
      {/* ================================================================ */}
      <section
        id="models"
        className="border-b border-white/10 bg-[linear-gradient(180deg,#08111b_0%,#0d1c30_100%)]"
      >
        <div className="section-shell py-20 sm:py-24">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-[var(--color-ice-blue)]">Two Sizes</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-5xl">
              One lower point-loader. One long-deck hauler.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              Two sleds. Two jobs. Choose by load weight and footprint, not by
              name.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
            {modelData.map((model, index) => {
              const fillPct = Math.round(
                (model.weight.fillLb / MAX_WEIGHT_LB) * 100,
              );
              return (
                <FadeIn
                  key={model.name}
                  delay={index * 0.1}
                  className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_30px_80px_rgba(0,0,0,0.22)]"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={model.image}
                      alt={model.imageAlt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 48vw"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(8,17,27,0.88)_100%)]" />
                    <p className="absolute bottom-4 left-5 font-semibold text-[0.72rem] uppercase tracking-[0.28em] text-white/90">
                      {model.label}
                    </p>
                  </div>

                  <div className="p-6 sm:p-8">
                    <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
                      <h3 className="font-display text-4xl uppercase tracking-[0.05em] text-white sm:text-5xl">
                        {model.name}
                      </h3>
                      <p className="font-display text-5xl uppercase leading-none tracking-[0.04em] text-white/94 sm:text-6xl">
                        {model.length}
                      </p>
                    </div>

                    {/* Deck scale with silhouette */}
                    <div className="mt-6">
                      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">
                        Fits on the deck
                      </p>
                      <div className="mt-3 rounded-xl bg-black/30 p-4 text-white/88">
                        <DeckScale
                          deckFeet={model.lengthFeet}
                          maxDeckFeet={MAX_DECK_FEET}
                          cargo={model.cargo}
                          accent={model.accent}
                        />
                      </div>
                    </div>

                    {/* Load weight bar */}
                    <div
                      className="mt-6"
                      aria-label={`Load capacity: ${model.weight.headline}, max of the chart is ${MAX_WEIGHT_LB.toLocaleString()} lb`}
                    >
                      <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">
                        <span>Load weight</span>
                        <span>lb</span>
                      </div>
                      <p className="mt-2 font-display text-2xl uppercase tracking-[0.04em] text-white">
                        {model.weight.headline}
                      </p>
                      <div className="relative mt-3 h-4 rounded-full bg-white/8">
                        <div
                          className="h-full rounded-full bg-[linear-gradient(90deg,var(--color-alert-red),var(--color-ice-blue))]"
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                      <div className="mt-2 flex justify-between text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-white/55">
                        <span>0</span>
                        <span>30k</span>
                        <span>60k</span>
                        <span>90k</span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/68">
                        {model.weight.detail}
                      </p>
                    </div>

                    {/* Specs grid */}
                    <dl className="mt-6 grid grid-cols-2 gap-3 rounded-xl bg-black/20 p-4 text-sm">
                      {model.specs.map((spec) => (
                        <div key={spec.label} className="space-y-1">
                          <dt className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                            {spec.label}
                          </dt>
                          <dd className="font-display text-lg uppercase tracking-[0.04em] text-white">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>

                    <p className="mt-6 text-sm leading-7 text-white/72">
                      {model.description}
                    </p>

                    <ul className="mt-6 space-y-2.5 text-sm leading-7 text-white/82">
                      {model.notes.map((note) => (
                        <li key={note} className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-[var(--color-ice-blue)]" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mt-6 border-t border-white/10 pt-4 text-[0.68rem] uppercase tracking-[0.22em] text-white/55">
                      {model.footnote}
                    </p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Payloads (photos + silhouettes)                                   */}
      {/* ================================================================ */}
      <section
        id="payloads"
        className="border-b border-[var(--color-ice-border)] bg-white text-[var(--color-deep-night)]"
      >
        <div className="section-shell py-20 sm:py-24">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-[var(--color-alert-red)]">Payload Examples</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] sm:text-5xl">
              Rugged enough for real northern freight.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
              Tanks. Modules. Tracked equipment. These aren&apos;t edge cases
              &mdash; they&apos;re what&apos;s been on the decks.
            </p>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {payloadShowcases.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.08}
                className="overflow-hidden rounded-[1.75rem] border border-[var(--color-ice-border)] bg-white shadow-[0_30px_70px_rgba(8,17,27,0.08)]"
              >
                <div className="relative aspect-[16/11] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="font-display text-2xl uppercase tracking-[0.05em] text-[var(--color-deep-night)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-700">
                    {item.body}
                  </p>

                  {/* Mini silhouette chip — shows how much deck this load
                      typically uses on a Mammoth-sized sled. */}
                  <div className="mt-5 rounded-xl bg-[var(--color-snowfield)] p-4">
                    <p className="text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-alert-red)]">
                      Deck footprint
                    </p>
                    <div className="mt-2 -mx-1 text-[var(--color-deep-night)]">
                      <DeckScale
                        deckFeet={item.deckFeet}
                        maxDeckFeet={MAX_DECK_FEET}
                        cargo={[item.cargo]}
                        accent="#0b1c2f"
                      />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================ */}
      {/* Inquiry                                                           */}
      {/* ================================================================ */}
      <section id="inquiry" className="bg-[var(--color-deep-night)]">
        <div className="section-shell py-20 sm:py-24">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-[var(--color-ice-blue)]">Request Specs</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-5xl">
              Call, email, or send the five things.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              Prefer to talk? Pick up the phone. Prefer to type? Send the load,
              route, and timeline and we&apos;ll come back with a plan.
            </p>
          </FadeIn>

          {/* Quick-contact strip — always visible, before the form. */}
          <FadeIn className="mt-8 grid gap-3 sm:grid-cols-2">
            <a
              href={`tel:${CONTACT.phone}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 transition hover:border-white/24 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
            >
              <div>
                <p className="eyebrow text-[var(--color-ice-blue)]">Call</p>
                <p className="mt-1 font-display text-2xl uppercase tracking-[0.05em] text-white sm:text-3xl">
                  {CONTACT.phoneDisplay}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  {CONTACT.person}, direct line
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/20 text-lg transition group-hover:border-white/40"
              >
                ☏
              </span>
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.04] p-5 transition hover:border-white/24 hover:bg-white/[0.08] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
            >
              <div className="min-w-0">
                <p className="eyebrow text-[var(--color-ice-blue)]">Email</p>
                <p className="mt-1 truncate font-display text-2xl uppercase tracking-[0.05em] text-white sm:text-3xl">
                  {CONTACT.email}
                </p>
                <p className="mt-1 text-sm text-white/60">
                  Responses within one business day
                </p>
              </div>
              <span
                aria-hidden="true"
                className="flex h-12 w-12 flex-none items-center justify-center rounded-full border border-white/20 text-lg transition group-hover:border-white/40"
              >
                ✉
              </span>
            </a>
          </FadeIn>

          {/* Or the form, which is clearly a third option. */}
          <FadeIn className="mt-10 rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,43,31,0.12),rgba(76,132,181,0.10))] p-6 sm:p-8 lg:p-10">
            <p className="eyebrow text-[var(--color-ice-blue)]">Or send the five</p>
            <h3 className="mt-3 font-display text-3xl uppercase tracking-[0.05em] text-white sm:text-4xl">
              Tell us what you&apos;re hauling.
            </h3>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {planningInputs.map((item, index) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[var(--color-ice-blue)]">
                    0{index + 1}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/84">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-black/28 p-5 sm:p-7">
              <InquiryForm />
            </div>
          </FadeIn>

          {/* Footer — visible NAP block (Name, Address, Phone). Google
              weights this heavily for LocalBusiness ranking; schema.org
              JSON-LD in layout.tsx mirrors these exact values. */}
          <FadeIn className="mt-12 border-t border-white/10 pt-8">
            <div className="grid gap-6 text-sm leading-7 text-white/68 sm:grid-cols-3">
              <div>
                <p className="font-display text-xl uppercase tracking-[0.05em] text-white">
                  {BRAND_NAME}
                </p>
                <p className="mt-2 max-w-xs">
                  Heavy-haul sleds built for snow and ice.
                </p>
              </div>

              <address className="not-italic">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-blue)]">
                  Office
                </p>
                <p className="mt-2">{ADDRESS.streetAddress}</p>
                <p>
                  {ADDRESS.addressLocality}, {ADDRESS.addressRegion}{" "}
                  {ADDRESS.postalCode}
                </p>
                <p>Canada</p>
                <p className="mt-3">
                  <a
                    href={`tel:${OFFICE.phone}`}
                    className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
                  >
                    {OFFICE.phoneDisplay}
                  </a>
                </p>
              </address>

              <div>
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[var(--color-ice-blue)]">
                  Sales
                </p>
                <p className="mt-2">{CONTACT.person}</p>
                <p>
                  <a
                    href={`tel:${CONTACT.phone}`}
                    className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
                  >
                    {CONTACT.phoneDisplay}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="rounded-sm transition hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ice-blue)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-deep-night)]"
                  >
                    {CONTACT.email}
                  </a>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
