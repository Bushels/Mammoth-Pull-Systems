/**
 * SVG silhouettes for scale visualization on the model cards.
 *
 * All silhouettes are drawn in a unit system where 1 unit = 1 foot. Each
 * component receives a `widthFeet` prop and internally scales its own native
 * coordinate system so the final silhouette takes up exactly that width on
 * the deck. `x` is the horizontal offset from the left edge of the deck.
 *
 * Silhouettes use `currentColor` by default so the parent can control fill
 * via CSS `color`. Inner details (windows, wheels, louvers) are drawn with
 * `rgba(10,20,32, opacity)` so they show up as darker accents on a light
 * silhouette — and blend into the silhouette on dark themes, which is the
 * desired simpler read at smaller sizes.
 *
 * Estimated real-world widths:
 *   - CAT D8 dozer:     ~17 ft (tracks + blade)
 *   - Picker truck:     ~33 ft (Peterbilt cab + stowed boom)
 *   - Wheel loader:     ~28 ft (Volvo L150 with forks)
 *   - Process tank:     ~20 ft diameter horizontal tank
 *   - Drilling module:  ~25 ft
 *   - Genset skid:      ~20 ft
 *   - Person:            2.5 ft wide, 6 ft tall
 */

type SilhouetteProps = {
  /** Width in feet in the parent coordinate system. */
  widthFeet: number;
  /** X offset on the deck in feet (0 = left edge of deck). */
  x: number;
  /** Accessible label. */
  label: string;
  /** Fill color (defaults to `currentColor`). */
  fill?: string;
};

const DEFAULT_FILL = "currentColor";
const DETAIL = "rgba(10,20,32,0.55)";
const DETAIL_LIGHT = "rgba(10,20,32,0.28)";

/* -------------------------------------------------------------------------- */
/* Person                                                                      */
/* -------------------------------------------------------------------------- */

export function Person({
  x,
  label,
  fill = DEFAULT_FILL,
}: Omit<SilhouetteProps, "widthFeet">) {
  // 2.5 ft wide, 6 ft tall. Rendered with feet at y=0 (the deck surface).
  const w = 2.5;
  const h = 6;
  return (
    <g transform={`translate(${x}, ${-h})`} aria-label={label}>
      <title>{label}</title>
      {/* Head */}
      <circle cx={w / 2} cy={h * 0.12} r={0.45} fill={fill} />
      {/* Shoulders + torso */}
      <path
        d={`
          M ${w * 0.18} ${h * 0.3}
          Q ${w / 2} ${h * 0.22} ${w * 0.82} ${h * 0.3}
          L ${w * 0.72} ${h * 0.58}
          L ${w * 0.72} ${h}
          L ${w * 0.55} ${h}
          L ${w * 0.5} ${h * 0.75}
          L ${w * 0.45} ${h}
          L ${w * 0.28} ${h}
          L ${w * 0.28} ${h * 0.58}
          Z
        `}
        fill={fill}
      />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* CAT D8 dozer — cleaner: distinctive track trapezoid, ROPS cage,             */
/* front-mounted exhaust stack, angled U-blade.                                */
/* -------------------------------------------------------------------------- */

export function Dozer({
  widthFeet,
  x,
  label,
  fill = DEFAULT_FILL,
}: SilhouetteProps) {
  const h = 11;
  const native = 17;
  const scale = widthFeet / native;
  return (
    <g
      transform={`translate(${x}, ${-h * scale}) scale(${scale})`}
      aria-label={label}
    >
      <title>{label}</title>

      {/* Track — trapezoidal side profile (sprocket back, idler front) */}
      <path
        d="M 1.5 8.6 L 3 8.2 L 14 8.2 L 15.8 8.6 L 15.8 10.3 L 1.5 10.3 Z"
        fill={fill}
      />
      {/* Track tread pattern */}
      <g fill={DETAIL}>
        {[2.2, 3.8, 5.4, 7.0, 8.6, 10.2, 11.8, 13.4, 15.0].map((cx) => (
          <circle key={cx} cx={cx} cy={10} r={0.28} />
        ))}
      </g>

      {/* Main body / engine hood — slopes down to front */}
      <path
        d="M 4.2 4.6 L 12.2 4.6 L 13 6.2 L 13 8.2 L 4.2 8.2 Z"
        fill={fill}
      />

      {/* ROPS cab — open-sided roll cage */}
      <path
        d="M 6.5 1.2 L 11.5 1.2 L 11.5 4.6 L 6.5 4.6 Z"
        fill={fill}
      />
      {/* Cab window cut-out */}
      <rect x={7.1} y={2.0} width={3.8} height={2.0} fill={DETAIL} />
      {/* Roof overhang */}
      <rect x={6.0} y={1.0} width={6.0} height={0.4} fill={fill} />

      {/* Exhaust stack — front-left of cab */}
      <rect x={5.7} y={-1.2} width={0.6} height={2.4} fill={fill} />
      <rect x={5.55} y={-1.45} width={0.9} height={0.3} fill={fill} />

      {/* Angled U-blade — leaning forward */}
      <path
        d="M 0 5.2 L 2.8 3.4 L 3.2 3.4 L 3.2 8.4 L 0 9.0 Z"
        fill={fill}
      />
      {/* Blade push-arm */}
      <rect x={2.8} y={6.6} width={1.8} height={0.5} fill={fill} />

      {/* Ripper on back */}
      <path
        d="M 16.0 5.6 L 17 5.6 L 17 8.2 L 16.2 9.4 L 15.6 9.4 Z"
        fill={fill}
      />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Picker truck — cleaner: classic conventional cab, sleeper-less, boom        */
/* stowed at a shallow angle above the deck.                                   */
/* -------------------------------------------------------------------------- */

export function Picker({
  widthFeet,
  x,
  label,
  fill = DEFAULT_FILL,
}: SilhouetteProps) {
  const h = 13;
  const native = 33;
  const scale = widthFeet / native;
  return (
    <g
      transform={`translate(${x}, ${-h * scale}) scale(${scale})`}
      aria-label={label}
    >
      <title>{label}</title>

      {/* Frame rail under the body */}
      <rect x={0.5} y={10.4} width={32} height={0.7} fill={fill} />

      {/* Hood — long conventional nose */}
      <path
        d="M 0.5 7.0 L 4.0 6.6 L 6.2 6.6 L 6.2 10.4 L 0.5 10.4 Z"
        fill={fill}
      />
      {/* Grille */}
      <rect x={0.8} y={8.4} width={0.6} height={1.8} fill={DETAIL} />
      {/* Headlight */}
      <circle cx={1.9} cy={7.8} r={0.35} fill={DETAIL_LIGHT} />

      {/* Cab */}
      <path
        d="M 6.2 3.0 L 11.2 3.0 L 11.2 10.4 L 6.2 10.4 Z"
        fill={fill}
      />
      {/* Windshield */}
      <path
        d="M 6.5 3.4 L 11.0 3.4 L 11.0 6.2 L 6.5 6.2 Z"
        fill={DETAIL}
      />
      {/* Side door line */}
      <line x1={8.8} y1={6.2} x2={8.8} y2={10} stroke={DETAIL_LIGHT} strokeWidth={0.1} />

      {/* Deck body */}
      <rect x={11.2} y={8.0} width={19.5} height={2.4} fill={fill} />
      {/* Stake pockets */}
      <g fill={DETAIL_LIGHT}>
        {[13, 16, 19, 22, 25, 28].map((sx) => (
          <rect key={sx} x={sx} y={8.1} width={0.3} height={0.8} />
        ))}
      </g>

      {/* Outrigger pad */}
      <rect x={11.2} y={10.4} width={1.5} height={1.1} fill={fill} />
      <rect x={29.2} y={10.4} width={1.5} height={1.1} fill={fill} />

      {/* Crane turret */}
      <rect x={12.5} y={5.4} width={2.6} height={2.6} fill={fill} />
      <rect x={13.0} y={4.6} width={1.6} height={0.8} fill={fill} />

      {/* Boom — stowed, angled up to the right */}
      <path
        d="M 13.8 5.2 L 32.5 1.6 L 32.5 2.6 L 14.0 6.6 Z"
        fill={fill}
      />
      {/* Boom tip */}
      <path
        d="M 32.0 1.8 L 32.8 2.0 L 32.8 2.4 L 32.0 2.6 Z"
        fill={DETAIL}
      />
      {/* Boom rest saddle at rear of deck */}
      <rect x={30} y={6.2} width={1.4} height={1.8} fill={fill} />

      {/* Wheels */}
      <g>
        {[2.8, 9.5, 15.0, 19.0, 23.0].map((cx, i) => (
          <g key={cx}>
            <circle cx={cx} cy={11.4} r={1.1} fill="rgba(10,20,32,0.8)" />
            <circle cx={cx} cy={11.4} r={0.4} fill={fill} />
            {i > 0 ? (
              <circle cx={cx + 1.5} cy={11.4} r={1.1} fill="rgba(10,20,32,0.8)" />
            ) : null}
          </g>
        ))}
      </g>
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Wheel loader — cleaner articulated loader with pivot.                       */
/* -------------------------------------------------------------------------- */

export function Loader({
  widthFeet,
  x,
  label,
  fill = DEFAULT_FILL,
}: SilhouetteProps) {
  const h = 12;
  const native = 28;
  const scale = widthFeet / native;
  return (
    <g
      transform={`translate(${x}, ${-h * scale}) scale(${scale})`}
      aria-label={label}
    >
      <title>{label}</title>

      {/* Forks */}
      <rect x={0} y={9.6} width={4} height={0.5} fill={fill} />
      <rect x={0} y={10.9} width={4} height={0.5} fill={fill} />
      {/* Fork carriage */}
      <rect x={3.6} y={8.8} width={0.6} height={2.8} fill={fill} />

      {/* Front arm pivot */}
      <path
        d="M 4.2 9.0 L 10.5 6.5 L 12.5 7.5 L 6.2 10.5 Z"
        fill={fill}
      />

      {/* Front chassis (with articulation joint) */}
      <path
        d="M 11.5 5.5 L 14.5 5.5 L 14.5 10.5 L 11.5 10.5 Z"
        fill={fill}
      />
      {/* Articulation joint pin */}
      <circle cx={14.5} cy={8.0} r={0.4} fill={DETAIL} />

      {/* Cab */}
      <path
        d="M 14.5 2.5 L 20.5 2.5 L 20.5 10.5 L 14.5 10.5 Z"
        fill={fill}
      />
      {/* Cab windows */}
      <path d="M 14.8 2.8 L 20.2 2.8 L 20.2 6.5 L 14.8 6.5 Z" fill={DETAIL} />

      {/* Rear engine housing */}
      <path
        d="M 20.5 4.5 L 27.5 4.5 L 28 8.0 L 28 10.5 L 20.5 10.5 Z"
        fill={fill}
      />
      {/* Exhaust */}
      <rect x={21.8} y={2.8} width={0.6} height={1.8} fill={fill} />

      {/* Wheels */}
      <circle cx={16} cy={11.4} r={1.5} fill="rgba(10,20,32,0.8)" />
      <circle cx={16} cy={11.4} r={0.55} fill={fill} />
      <circle cx={25.5} cy={11.4} r={1.5} fill="rgba(10,20,32,0.8)" />
      <circle cx={25.5} cy={11.4} r={0.55} fill={fill} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Horizontal process tank — cleaner with proper heads and saddles.            */
/* -------------------------------------------------------------------------- */

export function Tank({
  widthFeet,
  x,
  label,
  fill = DEFAULT_FILL,
}: SilhouetteProps) {
  const h = 14;
  const native = 20;
  const scale = widthFeet / native;
  return (
    <g
      transform={`translate(${x}, ${-h * scale}) scale(${scale})`}
      aria-label={label}
    >
      <title>{label}</title>

      {/* Skid frame */}
      <rect x={0} y={12.2} width={20} height={1.8} fill={fill} />
      {/* Saddle supports */}
      <path
        d="M 2.5 11.0 L 4.5 11.0 L 4.5 12.2 L 2.5 12.2 Z"
        fill={fill}
      />
      <path
        d="M 15.5 11.0 L 17.5 11.0 L 17.5 12.2 L 15.5 12.2 Z"
        fill={fill}
      />

      {/* Tank body — horizontal cylinder with rounded heads */}
      <path
        d="
          M 3.2 11.0
          L 16.8 11.0
          C 18.8 11.0 19.8 10.0 19.8 6.0
          C 19.8 2.0 18.8 1.0 16.8 1.0
          L 3.2 1.0
          C 1.2 1.0 0.2 2.0 0.2 6.0
          C 0.2 10.0 1.2 11.0 3.2 11.0
          Z
        "
        fill={fill}
      />
      {/* Weld seam lines */}
      <line x1={3.5} y1={1.2} x2={3.5} y2={10.8} stroke={DETAIL_LIGHT} strokeWidth={0.1} />
      <line x1={16.5} y1={1.2} x2={16.5} y2={10.8} stroke={DETAIL_LIGHT} strokeWidth={0.1} />

      {/* Top nozzles / manway */}
      <rect x={5.6} y={-0.3} width={1.2} height={1.5} fill={fill} />
      <rect x={5.35} y={-0.6} width={1.7} height={0.35} fill={fill} />
      <rect x={13.2} y={-0.3} width={1.2} height={1.5} fill={fill} />
      <rect x={12.95} y={-0.6} width={1.7} height={0.35} fill={fill} />

      {/* Side access door */}
      <rect
        x={8.6}
        y={4.6}
        width={2.8}
        height={3.4}
        rx={0.3}
        fill={DETAIL}
      />
      <circle cx={10.9} cy={6.3} r={0.2} fill={fill} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Drilling module — cleaner framed skid with vertical door panels.            */
/* -------------------------------------------------------------------------- */

export function Module({
  widthFeet,
  x,
  label,
  fill = DEFAULT_FILL,
}: SilhouetteProps) {
  const h = 14;
  const native = 25;
  const scale = widthFeet / native;
  return (
    <g
      transform={`translate(${x}, ${-h * scale}) scale(${scale})`}
      aria-label={label}
    >
      <title>{label}</title>

      {/* Skid */}
      <rect x={-0.5} y={12.5} width={26} height={1.5} fill={fill} />
      {/* Lift points */}
      <rect x={0.5} y={11.5} width={0.5} height={1.0} fill={fill} />
      <rect x={24} y={11.5} width={0.5} height={1.0} fill={fill} />

      {/* Main enclosure */}
      <rect x={0} y={0.6} width={25} height={11.9} fill={fill} />
      {/* Roof cap */}
      <rect x={-0.3} y={0.3} width={25.6} height={0.6} fill={fill} />

      {/* Vertical door panel lines */}
      <g stroke={DETAIL} strokeWidth={0.15} fill="none">
        <line x1={4.2} y1={1.0} x2={4.2} y2={12.2} />
        <line x1={8.4} y1={1.0} x2={8.4} y2={12.2} />
        <line x1={12.5} y1={1.0} x2={12.5} y2={12.2} />
        <line x1={16.7} y1={1.0} x2={16.7} y2={12.2} />
        <line x1={20.8} y1={1.0} x2={20.8} y2={12.2} />
      </g>
      {/* Door handles */}
      <g fill={DETAIL}>
        {[3.8, 8.0, 12.1, 16.3, 20.4].map((dx) => (
          <rect key={dx} x={dx} y={7.5} width={0.4} height={0.8} />
        ))}
      </g>
      {/* Small roof vent */}
      <rect x={11.5} y={-0.5} width={2} height={0.9} fill={fill} />

      {/* Project markings */}
      <rect x={1.2} y={2.0} width={2.2} height={1.3} fill={DETAIL_LIGHT} />
      <rect x={20.5} y={2.0} width={3.2} height={1.3} fill={DETAIL_LIGHT} />
    </g>
  );
}

/* -------------------------------------------------------------------------- */
/* Skid-mounted generator — enclosed genset on a skid with radiator exhaust.   */
/* -------------------------------------------------------------------------- */

export function Generator({
  widthFeet,
  x,
  label,
  fill = DEFAULT_FILL,
}: SilhouetteProps) {
  const h = 10;
  const native = 20;
  const scale = widthFeet / native;
  return (
    <g
      transform={`translate(${x}, ${-h * scale}) scale(${scale})`}
      aria-label={label}
    >
      <title>{label}</title>

      {/* Enclosure */}
      <rect x={0.5} y={2.4} width={19} height={7.2} rx={0.4} fill={fill} />
      {/* Roof cap */}
      <rect x={0.2} y={2.1} width={19.6} height={0.5} fill={fill} />

      {/* Radiator louvers (left side) */}
      <g fill={DETAIL_LIGHT}>
        <rect x={1.6} y={3.6} width={3.8} height={0.5} />
        <rect x={1.6} y={4.8} width={3.8} height={0.5} />
        <rect x={1.6} y={6.0} width={3.8} height={0.5} />
        <rect x={1.6} y={7.2} width={3.8} height={0.5} />
      </g>
      {/* Access door */}
      <rect
        x={9}
        y={4.2}
        width={3.2}
        height={4.8}
        rx={0.15}
        fill={DETAIL}
      />
      {/* Panel grid on right */}
      <rect x={13.6} y={4.8} width={4.6} height={3.0} fill={DETAIL_LIGHT} />

      {/* Exhaust stack */}
      <rect x={14.4} y={-0.2} width={1.0} height={2.6} fill={fill} />
      <rect x={14.1} y={-0.5} width={1.6} height={0.35} fill={fill} />

      {/* Skid */}
      <rect x={-0.5} y={9.6} width={21} height={1} fill={fill} />
      {/* Lift lugs */}
      <rect x={0.2} y={8.8} width={0.6} height={0.8} fill={fill} />
      <rect x={19.2} y={8.8} width={0.6} height={0.8} fill={fill} />
    </g>
  );
}
