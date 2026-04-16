"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

type HeroParallaxProps = {
  src: string;
  alt: string;
};

/**
 * Hero image with a subtle scroll-driven reveal.
 *
 * - The image drifts upward and scales gently as the user scrolls, giving the
 *   sense that the scene is settling into the landscape.
 * - A dark scrim crossfades in so text stays legible while the user is in the
 *   hero viewport.
 * - Respects `prefers-reduced-motion` by rendering a static image.
 *
 * We drive the effect off of the root page scroll rather than `target`/`offset`
 * so there's no intermediate container whose `position` changes the math.
 * `viewportHeight` is read once on mount and resize so we can map the first
 * viewport of scroll (0 → 100vh) to 0 → 1 progress.
 */
export function HeroParallax({ src, alt }: HeroParallaxProps) {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const viewport = useMotionValue(
    typeof window === "undefined" ? 1 : window.innerHeight,
  );

  useEffect(() => {
    const handle = () => viewport.set(window.innerHeight);
    handle();
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, [viewport]);

  const progress = useTransform([scrollY, viewport], ([y, h]: number[]) =>
    h > 0 ? Math.min(Math.max(y / h, 0), 1) : 0,
  );

  const imageY = useTransform(progress, [0, 1], ["0%", "14%"]);
  const imageScale = useTransform(progress, [0, 1], [1.06, 1.18]);
  const scrimOpacity = useTransform(progress, [0, 0.6], [0, 0.35]);

  if (reduceMotion) {
    return (
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: imageY, scale: imageScale }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-[var(--color-deep-night)]"
        style={{ opacity: scrimOpacity }}
      />
    </div>
  );
}
