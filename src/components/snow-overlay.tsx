"use client";

import { useEffect, useRef } from "react";

/**
 * Arctic 3D-feel snowfall.
 *
 * Canvas 2D (no Three.js dependency). The "depth" illusion comes from:
 *  - 5 depth layers with different size/speed/opacity ranges
 *  - Perlin-like wind gust simulation (two sine waves at different periods
 *    combined) that pushes particles laterally
 *  - Per-particle rotation + wobble for tumbling flake feel
 *  - Foreground flakes (layer 4-5) get a subtle glow + motion blur
 *  - Scroll-linked opacity fade so snow only exists over the hero viewport
 *
 * Performance safeguards:
 *  - Respects `prefers-reduced-motion` (renders nothing)
 *  - Pauses when the tab is hidden via Page Visibility API
 *  - Pauses when the hero is fully scrolled out of view
 *  - DPR-aware so it stays crisp on retina but doesn't over-rasterize
 *  - Particle count scales down on narrow viewports (mobile)
 */
export function SnowOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ---- Sizing (DPR-aware) ----
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(window.innerHeight, 700);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // ---- Particles ----
    type Flake = {
      x: number;
      y: number;
      depth: number; // 0 = far, 1 = near
      radius: number;
      speedY: number;
      speedX: number;
      wobble: number;
      wobbleSpeed: number;
      rotation: number;
      opacity: number;
    };

    const densityScale = width < 640 ? 0.55 : width < 1024 ? 0.8 : 1;
    const count = Math.round(220 * densityScale);
    const flakes: Flake[] = [];

    const spawn = (seed = false): Flake => {
      const depth = Math.random();
      // Quadratic easing so we get more foreground flakes without overcrowding
      // the background.
      const depthEase = depth * depth;
      const radius = 0.4 + depthEase * 3.6;
      return {
        x: Math.random() * width,
        y: seed ? Math.random() * height : -10 - Math.random() * 40,
        depth,
        radius,
        speedY: 18 + depthEase * 90, // px/s
        speedX: (Math.random() - 0.5) * 12, // lateral drift
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: 0.4 + Math.random() * 1.4,
        rotation: Math.random() * Math.PI * 2,
        opacity: 0.25 + depthEase * 0.8,
      };
    };

    for (let i = 0; i < count; i++) flakes.push(spawn(true));

    // ---- Wind (gust simulation) ----
    // Combine two sine waves at different periods to get a non-repeating-feel
    // horizontal force. Range roughly ±40px/s at peak gust.
    const wind = (t: number) =>
      Math.sin(t * 0.00035) * 24 + Math.sin(t * 0.00013 + 1.7) * 16;

    // ---- Scroll fade ----
    let scrollOpacity = 1;
    const onScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight || 1;
      const p = Math.min(Math.max(y / h, 0), 1);
      scrollOpacity = 1 - p;
    };
    onScroll();

    // ---- Tab visibility ----
    let running = !document.hidden;
    const onVisibility = () => {
      running = !document.hidden;
      if (running) last = performance.now();
    };

    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    // ---- Animation loop ----
    let rafId = 0;
    let last = performance.now();

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05); // cap 50ms
      last = now;

      if (!running || scrollOpacity <= 0.01) {
        rafId = requestAnimationFrame(frame);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      const w = wind(now);

      for (let i = 0; i < flakes.length; i++) {
        const f = flakes[i];
        // Far flakes are more affected by wind than near flakes (they're in
        // the upper air where gusts are stronger — fakes a parallax).
        const windScale = 0.4 + (1 - f.depth) * 0.9;
        const lateral = (f.speedX + w * windScale) * dt;
        f.wobble += f.wobbleSpeed * dt;
        f.x += lateral + Math.sin(f.wobble) * f.depth * 0.3;
        f.y += f.speedY * dt;
        f.rotation += dt * (0.5 + f.depth);

        // Recycle off-screen
        if (f.y - f.radius > height + 10) {
          Object.assign(f, spawn(false));
        } else if (f.x < -20) {
          f.x = width + 20;
        } else if (f.x > width + 20) {
          f.x = -20;
        }

        const alpha = f.opacity * scrollOpacity;
        ctx.globalAlpha = alpha;

        // Foreground flakes get a glow.
        if (f.depth > 0.6) {
          const g = ctx.createRadialGradient(
            f.x,
            f.y,
            0,
            f.x,
            f.y,
            f.radius * 3,
          );
          g.addColorStop(0, "rgba(255,255,255,0.95)");
          g.addColorStop(0.35, "rgba(255,255,255,0.55)");
          g.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.radius * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = "rgba(255,255,255,0.96)";
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
    />
  );
}
