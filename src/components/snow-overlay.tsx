const FLAKES = [
  { left: "4%", size: "0.35rem", duration: "15s", delay: "-4s", opacity: 0.28 },
  { left: "9%", size: "0.25rem", duration: "18s", delay: "-11s", opacity: 0.18 },
  { left: "15%", size: "0.4rem", duration: "16s", delay: "-8s", opacity: 0.22 },
  { left: "21%", size: "0.2rem", duration: "14s", delay: "-5s", opacity: 0.2 },
  { left: "28%", size: "0.5rem", duration: "19s", delay: "-12s", opacity: 0.24 },
  { left: "34%", size: "0.3rem", duration: "17s", delay: "-9s", opacity: 0.2 },
  { left: "41%", size: "0.45rem", duration: "20s", delay: "-14s", opacity: 0.26 },
  { left: "47%", size: "0.22rem", duration: "13s", delay: "-3s", opacity: 0.16 },
  { left: "54%", size: "0.38rem", duration: "16s", delay: "-7s", opacity: 0.21 },
  { left: "61%", size: "0.28rem", duration: "18s", delay: "-15s", opacity: 0.18 },
  { left: "68%", size: "0.42rem", duration: "17s", delay: "-6s", opacity: 0.24 },
  { left: "74%", size: "0.22rem", duration: "15s", delay: "-10s", opacity: 0.16 },
  { left: "81%", size: "0.44rem", duration: "19s", delay: "-13s", opacity: 0.22 },
  { left: "87%", size: "0.3rem", duration: "16s", delay: "-2s", opacity: 0.2 },
  { left: "93%", size: "0.5rem", duration: "18s", delay: "-9s", opacity: 0.28 },
];

export function SnowOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="snow-layer">
        {FLAKES.map((flake, index) => (
          <span
            key={`${flake.left}-${index}`}
            className="snowflake"
            style={
              {
                "--flake-left": flake.left,
                "--flake-size": flake.size,
                "--flake-duration": flake.duration,
                "--flake-delay": flake.delay,
                "--flake-opacity": flake.opacity,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <div className="snow-layer opacity-70">
        {FLAKES.map((flake, index) => (
          <span
            key={`offset-${flake.left}-${index}`}
            className="snowflake snowflake-small"
            style={
              {
                "--flake-left": `calc(${flake.left} + 2.75%)`,
                "--flake-size": "0.18rem",
                "--flake-duration": `${Number.parseFloat(flake.duration) - 3}s`,
                "--flake-delay": `${Number.parseFloat(flake.delay) - 1}s`,
                "--flake-opacity": Math.max(flake.opacity - 0.08, 0.08),
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}
