"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

const QUOTES = [
  "Real problems. Real solutions. Raavon.",
  "Ideas don't build themselves. We do.",
  "We build what the world needs next.",
  "The world changes. We build what changes it.",
  "Every great product started here.",
  "We build. Full stop.",
  "One studio. Many empires.",
  "Built by Raavon. Used by the world.",
  "We turn ideas into industries.",
  "We see it. We build it. It exists.",
];

const INTERVAL = 3200;

export default function Philosophy() {
  const [index, setIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), INTERVAL);
    return () => clearInterval(id);
  }, []);

  /* Mouse parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(useTransform(rawX, [-1, 1], [-18, 18]), { stiffness: 80, damping: 20 });
  const y = useSpring(useTransform(rawY, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => { rawX.set(0); rawY.set(0); }, [rawX, rawY]);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative px-10 py-36 md:py-48 flex items-center justify-center overflow-hidden text-center"
      aria-label="Philosophy"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Ghost RAAVON watermark */}
      <span
        aria-hidden="true"
        className="absolute font-jakarta font-extrabold select-none pointer-events-none"
        style={{
          fontSize: "clamp(6rem, 22vw, 20rem)",
          color: "transparent",
          WebkitTextStroke: "1px rgba(193,154,107,0.07)",
          letterSpacing: "-0.04em",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          whiteSpace: "nowrap",
          zIndex: 0,
        }}
      >
        RAAVON
      </span>

      {/* Parallax content */}
      <motion.div style={{ x, y }} className="relative z-10 max-w-3xl w-full">

        {/* Quote carousel */}
        <div className="relative" style={{ minHeight: "clamp(6rem, 12vw, 10rem)" }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="font-fraunces italic font-light leading-snug absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)",
                color: "var(--text)",
                lineHeight: 1.35,
              }}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            >
              &ldquo;{QUOTES[index]}&rdquo;
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Attribution */}
        <p
          className="font-dm text-sm tracking-widest uppercase mt-10"
          style={{ color: "#C19A6B" }}
        >
          — Raavon Group
        </p>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {QUOTES.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Quote ${i + 1}`}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                width: i === index ? "20px" : "6px",
                height: "6px",
                borderRadius: "999px",
                background: i === index ? "#C19A6B" : "rgba(193,154,107,0.25)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
