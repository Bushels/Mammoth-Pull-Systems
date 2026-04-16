import Image from "next/image";

import { FadeIn } from "@/components/fade-in";
import { SnowOverlay } from "@/components/snow-overlay";

const modelData = [
  {
    length: "25'",
    name: "Mastodon",
    label: "Compact heavy-haul platform",
    description:
      "The Mastodon is the lower, point-loading sled in the line. In the field it commonly carries 40,000 to 60,000 lb loads and has even hauled a CAT D8 dozer.",
    widthClass: "w-[47%]",
    notes: [
      "Point-loading friendly for heavy equipment",
      "Keeps the load low to the ground",
      "Built for smaller footprints that still need real ruggedness",
    ],
    footnote: "Field-use numbers, not formal engineering specification language.",
  },
  {
    length: "53'",
    name: "Mammoth",
    label: "Long-deck haul platform",
    description:
      "The Mammoth brings over-the-road trailer deck length into snow and ice hauling. The deck is rated for 65,000 lb at highway speeds, has been used up to 85,000 lb, and is best kept around 70,000 lb or under in regular work.",
    widthClass: "w-full",
    notes: [
      "Maximum deck space for larger load configurations",
      "More flexibility for tanks, modules, and long freight",
      "Built to stay useful across a wider range of load setups",
    ],
    footnote: "Site copy should distinguish deck rating from observed field use.",
  },
];

const capabilityItems = [
  {
    title: "North Slope Positioning",
    body: "The homepage should speak directly to Alaska, Prudhoe Bay, equipment rental groups, energy service companies, and northern municipal operators that already understand frozen-route logistics.",
  },
  {
    title: "Ruggedness First",
    body: "The product story should lean into abuse tolerance, point loading, structural confidence, and real jobs already completed instead of sounding like light-duty winter marketing.",
  },
  {
    title: "Marketable, Not Just Technical",
    body: "This still has to win new work. The visuals should feel aspirational and credible at the same time: premium presentation, real field proof, and clear reasons to inquire.",
  },
];

const buyerGroups = [
  "Energy service operators",
  "Equipment rental fleets",
  "North Slope logistics teams",
  "Municipal and borough operations",
];

const payloadExamples = [
  {
    title: "Process and utility tanks",
    body: "Tank moves show why long deck options matter and why keeping the haul stable over snow and ice is the actual product story.",
  },
  {
    title: "Modules and framed systems",
    body: "Larger freight asks for usable deck space and more configuration flexibility, which is where the Mammoth earns its keep.",
  },
  {
    title: "Tracked equipment and heavy point loads",
    body: "The Mastodon proves its value when heavy equipment needs to sit low, stay stable, and put concentrated load into the platform.",
  },
];

const planningInputs = [
  "Load type and approximate weight",
  "Route, terrain, and seasonal conditions",
  "Overall load footprint and deck needs",
  "Tow setup and operational constraints",
  "Timing, schedule, and deployment window",
];

const heroHighlights = [
  {
    length: "25'",
    name: "Mastodon",
    detail: "Lower point-loading sled for heavy equipment and compact northern moves.",
  },
  {
    length: "53'",
    name: "Mammoth",
    detail: "Long-deck haul platform for tanks, modules, and larger freight footprints.",
  },
];

export default function Home() {
  return (
    <main className="overflow-x-clip bg-[var(--color-deep-night)] text-white">
      <section className="relative isolate min-h-screen overflow-hidden border-b border-white/10">
        <Image
          src="/media/hero-haul.jpg"
          alt="Heavy haul sled moving a tank across snow and ice."
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,17,30,0.9)_10%,rgba(7,17,30,0.62)_45%,rgba(7,17,30,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(158,196,219,0.24),transparent_42%)]" />
        <SnowOverlay />

        <header className="absolute inset-x-0 top-0 z-20">
          <div className="section-shell flex items-center justify-between py-5">
            <a href="#" className="flex items-center gap-3">
              <Image
                src="/media/logo.png"
                alt="Mammoth Pull Systems logo"
                width={92}
                height={61}
                className="h-auto w-24 sm:w-28"
              />
              <span className="hidden max-w-40 text-xs uppercase tracking-[0.3em] text-white/72 sm:block">
                Heavy-haul sleds for snow and ice terrain
              </span>
            </a>
            <nav className="hidden items-center gap-7 text-xs uppercase tracking-[0.28em] text-white/70 md:flex">
              <a href="#north" className="transition hover:text-white">
                North
              </a>
              <a href="#models" className="transition hover:text-white">
                Sizes
              </a>
              <a href="#payloads" className="transition hover:text-white">
                Payloads
              </a>
              <a href="#planning" className="transition hover:text-white">
                Planning
              </a>
            </nav>
          </div>
        </header>

        <div className="section-shell relative z-10 flex min-h-screen items-center py-24 sm:py-28">
          <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end lg:gap-16">
            <FadeIn className="max-w-3xl pt-20 sm:pt-24 lg:pt-28">
              <p className="eyebrow mb-6">
                Alaska • North Slope • Prudhoe Bay • Remote snow-and-ice hauling
              </p>
              <h1 className="max-w-4xl font-display text-6xl uppercase leading-[0.9] tracking-[0.04em] text-white sm:text-7xl lg:text-[7.5rem]">
                Built to Haul the North
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-lg">
                Mammoth Pull Systems builds oversized hauling sleds for tanks,
                modules, equipment, and support cargo moving across northern snow
                and ice terrain.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#models" className="hero-button hero-button-primary">
                  See the two sizes
                </a>
                <a href="#north" className="hero-button hero-button-secondary">
                  Northern use cases
                </a>
              </div>

              <div className="mt-12 grid gap-3 text-left text-xs uppercase tracking-[0.28em] text-white/66 sm:grid-cols-2 lg:grid-cols-4">
                <span>Snow-and-ice transport</span>
                <span>Oversized northern loads</span>
                <span>Custom fabrication</span>
                <span>Industrial haul focus</span>
              </div>
            </FadeIn>

            <FadeIn
              delay={0.12}
              className="hidden self-end border-l border-white/16 pl-7 text-right lg:block"
            >
              <p className="eyebrow text-[var(--color-ice-blue)]">
                Two Field-Proven Platforms
              </p>
              <div className="mt-8 space-y-8">
                {heroHighlights.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-end justify-end gap-3">
                      <span className="font-display text-6xl uppercase tracking-[0.04em] text-white/96">
                        {item.length}
                      </span>
                      <span className="font-display text-3xl uppercase tracking-[0.06em] text-white/92">
                        {item.name}
                      </span>
                    </div>
                    <p className="ml-auto max-w-[16rem] text-sm leading-7 text-white/68">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section
        id="north"
        className="border-b border-[var(--color-ice-border)] bg-[var(--color-snowfield)] text-[var(--color-deep-night)]"
      >
        <div className="section-shell grid gap-16 py-24 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
          <FadeIn className="lg:sticky lg:top-24">
            <p className="eyebrow text-[var(--color-alert-red)]">Northern Ops</p>
            <h2 className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] text-[var(--color-deep-night)] sm:text-5xl">
              Built for the buyers already operating in the North.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-700 sm:text-lg">
              The first audience is current northern operators and rental groups.
              The page should feel credible to people who already understand what
              it takes to move serious freight over frozen ground.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {buyerGroups.map((group) => (
                <span key={group} className="rounded-full bg-[var(--color-deep-night)] px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/82">
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
                  alt="Mammoth sled assemblies loaded in a snowy yard."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
              <div className="space-y-2 p-5">
                <p className="eyebrow text-[var(--color-alert-red)]">Field-ready</p>
                <p className="text-sm leading-7 text-slate-700">
                  The product already has the right proof photography: yard
                  loading, structural steel, and freight that reads as real work
                  instead of staged marketing.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="image-panel">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="/media/module-haul.jpg"
                  alt="Large module carried on a Mammoth sled."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-[var(--color-alert-red)]">Deck space</p>
                <p className="text-sm leading-7 text-slate-700">
                  The Mammoth story is deck space, configuration flexibility, and
                  over-the-road trailer length translated into snow hauling.
                </p>
              </div>
            </FadeIn>

            <FadeIn className="image-panel">
              <div className="relative aspect-[5/4] overflow-hidden">
                <Image
                  src="/media/tank-detail.jpg"
                  alt="Operators standing beside a tank loaded on a sled."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 30vw"
                />
              </div>
              <div className="p-5">
                <p className="eyebrow text-[var(--color-alert-red)]">Human scale</p>
                <p className="text-sm leading-7 text-slate-700">
                  Putting operators in frame helps buyers read deck scale and
                  ruggedness faster than copy alone ever will.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section
        id="models"
        className="border-b border-white/10 bg-[linear-gradient(180deg,#08111b_0%,#0d1c30_100%)]"
      >
        <div className="section-shell py-24">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-[var(--color-ice-blue)]">Two Sizes</p>
            <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-5xl">
              One lower point-loader. One long-deck hauler.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              This is where the site should shift from mood into practical
              selling. Use real field history, clear tradeoffs, and simple
              language that matches how operators already talk about loads.
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            {modelData.map((model, index) => (
              <FadeIn
                key={model.name}
                delay={index * 0.1}
                className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.2)]"
              >
                <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-7">
                  <div>
                    <p className="eyebrow text-[var(--color-ice-blue)]">
                      {model.label}
                    </p>
                    <h3 className="mt-3 font-display text-4xl uppercase tracking-[0.05em] text-white sm:text-5xl">
                      {model.name}
                    </h3>
                  </div>
                  <p className="font-display text-6xl uppercase tracking-[0.04em] text-white/94 sm:text-7xl">
                    {model.length}
                  </p>
                </div>

                <div className="mt-8">
                  <div className="h-3 rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-[linear-gradient(90deg,var(--color-alert-red),var(--color-ice-blue))] ${model.widthClass}`}
                    />
                  </div>
                  <p className="mt-5 text-sm leading-7 text-white/72">
                    {model.description}
                  </p>
                </div>

                <ul className="mt-8 space-y-3 text-sm leading-7 text-white/82">
                  {model.notes.map((note) => (
                    <li key={note} className="flex items-start gap-3">
                      <span className="mt-2 h-2.5 w-2.5 flex-none rounded-full bg-[var(--color-ice-blue)]" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-7 border-t border-white/10 pt-5 text-xs uppercase tracking-[0.22em] text-white/46">
                  {model.footnote}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section
        id="payloads"
        className="border-b border-[var(--color-ice-border)] bg-white text-[var(--color-deep-night)]"
      >
        <div className="section-shell grid gap-16 py-24 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="space-y-6">
            <FadeIn>
              <p className="eyebrow text-[var(--color-alert-red)]">Payload Examples</p>
              <h2 className="mt-4 max-w-xl font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] sm:text-5xl">
                Rugged enough for real northern freight.
              </h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-slate-700 sm:text-lg">
                This is the section where the site proves the sleds are not
                theoretical. Point loads, tanks, and working equipment should all
                read as normal, not exceptional.
              </p>
            </FadeIn>

            <FadeIn className="image-panel overflow-hidden">
              <div className="relative aspect-[16/10]">
                <Image
                  src="/media/dozer-load.jpg"
                  alt="Tracked equipment carried on a sled in snow."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 52vw"
                />
              </div>
            </FadeIn>
          </div>

          <div className="space-y-7 lg:pt-20">
            {payloadExamples.map((item, index) => (
              <FadeIn
                key={item.title}
                delay={index * 0.08}
                className="border-b border-[var(--color-ice-border)] pb-7"
              >
                <p className="font-display text-3xl uppercase tracking-[0.05em] text-[var(--color-deep-night)]">
                  {item.title}
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-700">
                  {item.body}
                </p>
              </FadeIn>
            ))}

            <FadeIn className="image-panel overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/media/module-haul.jpg"
                  alt="Large module supported on a Mammoth pull system sled."
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="planning" className="bg-[var(--color-deep-night)]">
        <div className="section-shell py-24">
          <FadeIn className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(214,43,31,0.16),rgba(76,132,181,0.12))] p-8 sm:p-12">
            <p className="eyebrow text-[var(--color-ice-blue)]">Build Planning</p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.95] tracking-[0.04em] text-white sm:text-5xl">
              Before a build starts, we want five things clear.
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/74 sm:text-lg">
              The cleanest marketing move is to show buyers that the conversation
              will be organized from the first call. Clarity on load, route, and
              setup is part of the product.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
              {planningInputs.map((item, index) => (
                <FadeIn
                  key={item}
                  delay={index * 0.05}
                  className="rounded-[1.6rem] border border-white/10 bg-black/18 p-5"
                >
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-ice-blue)]">
                    0{index + 1}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/84">{item}</p>
                </FadeIn>
              ))}
            </div>

            <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-display text-3xl uppercase tracking-[0.05em] text-white">
                  Mammoth Pull Systems
                </p>
                <p className="mt-2 max-w-xl text-sm leading-7 text-white/66">
                  Built with a heavy-haul mindset for Alaska and northern
                  snow-and-ice operations that need rugged equipment under real
                  loads.
                </p>
                <div className="mt-6 space-y-2 text-sm leading-7 text-white/82">
                  <p className="font-display text-2xl uppercase tracking-[0.05em] text-white">
                    Contact Nathan Turchyn
                  </p>
                  <a
                    href="tel:+13068397481"
                    className="block w-fit transition hover:text-[var(--color-ice-blue)]"
                  >
                    (306) 839-7481
                  </a>
                  <a
                    href="mailto:nathan@mpsgroup.ca"
                    className="block w-fit transition hover:text-[var(--color-ice-blue)]"
                  >
                    nathan@mpsgroup.ca
                  </a>
                </div>
              </div>
              <a href="#" className="hero-button hero-button-secondary w-full sm:w-auto">
                Back to the top
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
