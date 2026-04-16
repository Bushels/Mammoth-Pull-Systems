import {
  Dozer,
  Generator,
  Loader,
  Module,
  Person,
  Picker,
  Tank,
} from "@/components/deck-silhouettes";

type CargoKey = "dozer" | "picker" | "loader" | "tank" | "module" | "generator";

type CargoDef = {
  key: CargoKey;
  label: string;
  widthFeet: number;
};

const CARGO_CATALOG: Record<CargoKey, CargoDef> = {
  dozer: { key: "dozer", label: "CAT D8 dozer", widthFeet: 17 },
  picker: { key: "picker", label: "Picker truck", widthFeet: 33 },
  loader: { key: "loader", label: "Wheel loader", widthFeet: 28 },
  tank: { key: "tank", label: "Process tank", widthFeet: 20 },
  module: { key: "module", label: "Drilling module", widthFeet: 25 },
  generator: { key: "generator", label: "Genset skid", widthFeet: 20 },
};

type DeckScaleProps = {
  /** Deck length in feet (25 for Mastodon, 53 for Mammoth). */
  deckFeet: number;
  /** Longest deck in the comparison range, used so both cards share a scale. */
  maxDeckFeet: number;
  /** Cargo to draw on the deck, left-to-right (x is in feet on the deck). */
  cargo: Array<{ key: CargoKey; x: number }>;
  /** Accent color for the deck shell (matches model card eyebrow). */
  accent: string;
};

/**
 * Side-view of a sled deck with to-scale silhouettes on top and a foot ruler
 * below. SVG uses 1 unit = 1 foot on the horizontal axis; the viewBox is
 * always maxDeckFeet + padding wide so the Mastodon reads as genuinely
 * shorter than the Mammoth (not stretched to card width).
 *
 * The deck is left-aligned with the 0' tick on the ruler so the end of the
 * deck lines up with its length label (25' or 53'). This is the visual
 * affordance that tells a buyer "this deck is 25 feet long" at a glance.
 */
export function DeckScale({
  deckFeet,
  maxDeckFeet,
  cargo,
  accent,
}: DeckScaleProps) {
  // Padding in feet units.
  const padX = 3;
  const padTop = 18;
  const padBottom = 6;
  const vbW = maxDeckFeet + padX * 2;
  const vbH = padTop + padBottom + 4;

  // Deck geometry.
  const deckY = padTop;
  const deckHeight = 1.8; // deck board itself
  const runnerY = deckY + deckHeight + 0.2;
  const runnerHeight = 0.9;
  const deckTop = deckY;
  const deckBottom = deckY + deckHeight;

  // Left-align the deck with the ruler's 0' tick.
  const deckLeft = padX;
  const deckRight = deckLeft + deckFeet;

  // Deck planking spacing for character.
  const plankSpacing = 2;

  return (
    <svg
      viewBox={`0 0 ${vbW} ${vbH}`}
      role="img"
      aria-label={`Deck scale diagram: ${deckFeet}-foot sled with ${cargo
        .map((c) => CARGO_CATALOG[c.key].label)
        .join(", ")}`}
      className="h-auto w-full"
    >
      {/* Ground line under the sled */}
      <line
        x1={0}
        x2={vbW}
        y1={runnerY + runnerHeight + 0.1}
        y2={runnerY + runnerHeight + 0.1}
        stroke="currentColor"
        strokeOpacity={0.18}
        strokeWidth={0.15}
      />

      {/* Cargo silhouettes sitting on the deck. Drawn BEFORE the deck so the
          deck front edge covers the silhouette feet — sells the "load sits on
          the deck" read. */}
      <g transform={`translate(${deckLeft}, ${deckBottom})`}>
        {cargo.map((c) => {
          const def = CARGO_CATALOG[c.key];
          const common = {
            x: c.x,
            widthFeet: def.widthFeet,
            label: def.label,
          };
          switch (c.key) {
            case "dozer":
              return <Dozer key={c.key} {...common} />;
            case "picker":
              return <Picker key={c.key} {...common} />;
            case "loader":
              return <Loader key={c.key} {...common} />;
            case "tank":
              return <Tank key={c.key} {...common} />;
            case "module":
              return <Module key={c.key} {...common} />;
            case "generator":
              return <Generator key={c.key} {...common} />;
          }
        })}
      </g>

      {/* Person silhouette standing on the deck at the front-left edge for
          natural human scale. */}
      <g transform={`translate(${deckLeft + 0.4}, ${deckBottom})`}>
        <Person x={0} label="6 ft operator" />
      </g>

      {/* Sled deck rectangle */}
      <rect
        x={deckLeft}
        y={deckTop}
        width={deckFeet}
        height={deckHeight}
        fill={accent}
        opacity={0.96}
      />
      {/* Deck planking lines — vertical marks every 2 ft */}
      <g opacity={0.25}>
        {Array.from({
          length: Math.max(Math.floor(deckFeet / plankSpacing) - 1, 0),
        }).map((_, i) => {
          const x = deckLeft + (i + 1) * plankSpacing;
          return (
            <line
              key={`plank-${i}`}
              x1={x}
              x2={x}
              y1={deckTop + 0.3}
              y2={deckBottom - 0.3}
              stroke="#000"
              strokeWidth={0.08}
            />
          );
        })}
      </g>
      {/* Deck top highlight */}
      <line
        x1={deckLeft}
        x2={deckRight}
        y1={deckTop + 0.15}
        y2={deckTop + 0.15}
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={0.15}
      />

      {/* Runner */}
      <path
        d={`M ${deckLeft - 1.5} ${runnerY} L ${deckRight + 1.5} ${runnerY} L ${deckRight + 2.5} ${runnerY + runnerHeight} L ${deckLeft - 2.5} ${runnerY + runnerHeight} Z`}
        fill="currentColor"
        fillOpacity={0.72}
      />

      {/* Deck length indicator arrow above the deck */}
      <g
        transform={`translate(0, ${deckTop - 4})`}
        stroke="currentColor"
        strokeOpacity={0.55}
        fill="none"
      >
        <line
          x1={deckLeft}
          x2={deckRight}
          y1={0}
          y2={0}
          strokeWidth={0.15}
        />
        {/* Left arrow head */}
        <path
          d={`M ${deckLeft + 0.6} ${-0.5} L ${deckLeft} 0 L ${deckLeft + 0.6} 0.5`}
          strokeWidth={0.15}
        />
        {/* Right arrow head */}
        <path
          d={`M ${deckRight - 0.6} ${-0.5} L ${deckRight} 0 L ${deckRight - 0.6} 0.5`}
          strokeWidth={0.15}
        />
        {/* Vertical ticks on either end */}
        <line
          x1={deckLeft}
          x2={deckLeft}
          y1={-1.2}
          y2={1.2}
          strokeWidth={0.15}
        />
        <line
          x1={deckRight}
          x2={deckRight}
          y1={-1.2}
          y2={1.2}
          strokeWidth={0.15}
        />
        <text
          x={(deckLeft + deckRight) / 2}
          y={-1.4}
          textAnchor="middle"
          fill="currentColor"
          fillOpacity={0.75}
          stroke="none"
          fontSize={1.6}
          fontFamily="var(--font-ibm-plex-sans), sans-serif"
          fontWeight={600}
        >
          {deckFeet}&apos; DECK
        </text>
      </g>

      {/* Foot ruler at the bottom */}
      <g transform={`translate(0, ${runnerY + runnerHeight + 2.6})`}>
        <line
          x1={padX}
          x2={padX + maxDeckFeet}
          y1={0}
          y2={0}
          stroke="currentColor"
          strokeOpacity={0.4}
          strokeWidth={0.12}
        />
        {Array.from({ length: Math.floor(maxDeckFeet / 5) + 1 }).map((_, i) => {
          const ft = i * 5;
          return (
            <g key={ft} transform={`translate(${padX + ft}, 0)`}>
              <line
                x1={0}
                x2={0}
                y1={-0.4}
                y2={0.4}
                stroke="currentColor"
                strokeOpacity={0.55}
                strokeWidth={0.12}
              />
              {ft % 10 === 0 || ft === deckFeet ? (
                <text
                  x={0}
                  y={2}
                  textAnchor="middle"
                  fill="currentColor"
                  fillOpacity={ft === deckFeet ? 0.95 : 0.6}
                  fontSize={1.4}
                  fontFamily="var(--font-ibm-plex-sans), sans-serif"
                  fontWeight={ft === deckFeet ? 700 : 400}
                >
                  {ft}&apos;
                </text>
              ) : null}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
