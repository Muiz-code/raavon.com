"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { X } from "lucide-react";

const SPRING = { type: "spring" as const, stiffness: 280, damping: 22 };

/* Tile wrapper — lifts + straightens on hover */
function Tile({
  children,
  rotate = 0,
  col,
  row,
  onClick,
  className = "",
  style = {},
}: {
  children: React.ReactNode;
  rotate?: number;
  col: number;
  row: number;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={{ gridColumn: `span ${col}`, gridRow: `span ${row}`, rotate, originX: 0.5, originY: 0.5, ...style }}
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 30,
        boxShadow: "0 24px 60px rgba(0,0,0,0.55)",
      }}
      transition={SPRING}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

export default function Philosophy() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Mouse parallax */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const gridX = useSpring(useTransform(rawX, [-1, 1], [-10, 10]), { stiffness: 80, damping: 20 });
  const gridY = useSpring(useTransform(rawY, [-1, 1], [-7, 7]), { stiffness: 80, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }, [rawX, rawY]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const open = (src: string) => setLightbox(src);
  const close = () => setLightbox(null);

  return (
    <section
      ref={sectionRef}
      id="philosophy"
      className="relative px-6 md:px-10 py-24 md:py-36 overflow-hidden"
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

      {/* Section label */}
      <p
        className="relative z-10 font-dm text-base tracking-[0.25em] uppercase mb-10 text-center"
        style={{ color: "#C19A6B" }}
      >
        Moodboard
      </p>

      {/* Parallax grid wrapper */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto"
        style={{
          x: gridX,
          y: gridY,
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoRows: "110px",
          gap: "8px",
        }}
      >
        {/* Responsive override via CSS */}
        <style>{`
          @media (min-width: 768px) {
            .moodboard { grid-template-columns: repeat(4, 1fr) !important; grid-auto-rows: 140px !important; gap: 10px !important; }
          }
        `}</style>

        {/* 1 — hero image + quote */}
        <Tile rotate={-0.5} col={2} row={2} onClick={() => open("/herobg.jpg")}
          className="moodboard-img rounded-[14px] overflow-hidden relative cursor-zoom-in">
          <Image src="/herobg.jpg" alt="Raavon" fill style={{ objectFit: "cover", objectPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.55)" }} />
          <p className="font-fraunces italic absolute bottom-5 left-5 right-5 text-base leading-snug" style={{ color: "#FAF7F2" }}>
            &quot;We build what the world needs next.&quot;
          </p>
        </Tile>

        {/* 2 — caramel swatch */}
        <Tile rotate={-1.5} col={1} row={1}
          className="rounded-[14px] flex items-end p-3 md:p-4" style={{ background: "#C19A6B" } as React.CSSProperties}>
          <span className="font-dm text-base tracking-[0.25em] uppercase" style={{ color: "#0A0A0A" }}>Caramel</span>
        </Tile>

        {/* 3 — mood-1 image */}
        <Tile rotate={1} col={1} row={1} onClick={() => open("/mood-1.jpeg")}
          className="rounded-[14px] overflow-hidden relative cursor-zoom-in">
          <Image src="/mood-1.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "80% 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.45)" }} />
        </Tile>

        {/* 4 — mahogany swatch tall */}
        <Tile rotate={0.5} col={1} row={2}
          className="rounded-[14px] flex flex-col justify-between p-4" style={{ background: "#4E2C20" } as React.CSSProperties}>
          <span className="font-dm text-base tracking-[0.25em] uppercase" style={{ color: "rgba(193,154,107,0.7)" }}>Mahogany</span>
          <span className="font-jakarta font-extrabold" style={{ fontSize: "1.6rem", color: "rgba(193,154,107,0.3)", letterSpacing: "-0.02em" }}>DEEP</span>
        </Tile>

        {/* 5 — Est. 2026 */}
        <Tile rotate={-1} col={1} row={1}
          className="rounded-[14px] flex items-center justify-center" style={{ background: "var(--card)", border: "1px solid var(--border)" } as React.CSSProperties}>
          <span className="font-dm text-base tracking-[0.3em] uppercase" style={{ color: "#C19A6B" }}>Est. 2026</span>
        </Tile>

        {/* 6 — quote tall */}
        <Tile rotate={2} col={1} row={2}
          className="rounded-[14px] flex flex-col justify-end p-5 md:p-6" style={{ background: "var(--card)", border: "1px solid var(--border)" } as React.CSSProperties}>
          <p className="font-fraunces italic text-base leading-snug" style={{ color: "var(--text)" }}>
            &quot;We see it.<br />We build it.<br />It exists.&quot;
          </p>
          <span className="font-dm text-base mt-3 tracking-widest uppercase" style={{ color: "#C19A6B" }}>— Raavon</span>
        </Tile>

        {/* 7 — off-white swatch */}
        <Tile rotate={1.5} col={1} row={1}
          className="rounded-[14px] flex items-end p-3 md:p-4" style={{ background: "#FAF7F2" } as React.CSSProperties}>
          <span className="font-dm text-base tracking-[0.25em] uppercase" style={{ color: "#4E2C20" }}>Off White</span>
        </Tile>

        {/* 8 — mood-3 wide image */}
        <Tile rotate={-0.8} col={2} row={1} onClick={() => open("/mood-3.jpeg")}
          className="hidden md:block rounded-[14px] overflow-hidden relative cursor-zoom-in">
          <Image src="/mood-3.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "90% 30%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.5)" }} />
          <p className="font-fraunces italic text-base absolute bottom-4 left-4 right-4 leading-snug" style={{ color: "#FAF7F2" }}>
            &quot;One studio. Many empires.&quot;
          </p>
        </Tile>

        {/* 9 — caramel quote */}
        <Tile rotate={0} col={1} row={1}
          className="rounded-[14px] flex items-center justify-center p-4" style={{ background: "#C19A6B" } as React.CSSProperties}>
          <p className="font-fraunces italic text-base text-center leading-snug" style={{ color: "#0A0A0A" }}>
            &quot;Real problems.<br />Real solutions.&quot;
          </p>
        </Tile>

        {/* 10 — LEGACY word */}
        <Tile rotate={-2} col={1} row={1}
          className="rounded-[14px] flex items-center justify-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" } as React.CSSProperties}>
          <span className="font-jakarta font-extrabold" style={{ fontSize: "1.3rem", letterSpacing: "0.1em", color: "rgba(193,154,107,0.55)" }}>LEGACY</span>
        </Tile>

        {/* 11 — mood-2 tall image */}
        <Tile rotate={1} col={1} row={2} onClick={() => open("/mood-2.jpeg")}
          className="rounded-[14px] overflow-hidden relative cursor-zoom-in">
          <Image src="/mood-2.jpeg" alt="" fill style={{ objectFit: "cover", objectPosition: "30% 40%" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,8,6,0.45)" }} />
          <p className="font-fraunces italic text-base absolute top-4 left-4 right-4 leading-snug" style={{ color: "#FAF7F2" }}>
            &quot;We turn ideas into industries.&quot;
          </p>
        </Tile>

        {/* 12 — Raavon Group */}
        <Tile rotate={1.5} col={1} row={1}
          className="rounded-[14px] flex items-center justify-center" style={{ background: "var(--card)", border: "1px solid rgba(193,154,107,0.3)" } as React.CSSProperties}>
          <span className="font-dm text-base tracking-[0.25em] uppercase" style={{ color: "#C19A6B" }}>Raavon Group</span>
        </Tile>

        {/* 13 — wide quote */}
        <Tile rotate={-0.5} col={2} row={1}
          className="rounded-[14px] flex items-center px-5 md:px-7" style={{ background: "var(--surface)", border: "1px solid var(--border)" } as React.CSSProperties}>
          <p className="font-fraunces italic text-base leading-snug" style={{ color: "var(--text)" }}>
            &quot;Built by Raavon. Used by the world.&quot;
          </p>
        </Tile>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 md:p-16"
            style={{ background: "rgba(0,0,0,0.92)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={SPRING}
              onClick={(e) => e.stopPropagation()}
            >
              <Image src={lightbox} alt="" fill style={{ objectFit: "cover" }} />
            </motion.div>
            <button
              onClick={close}
              className="fixed top-6 right-6 flex items-center justify-center w-10 h-10 rounded-full"
              style={{ background: "rgba(193,154,107,0.15)", border: "1px solid rgba(193,154,107,0.4)" }}
              aria-label="Close"
            >
              <X size={18} style={{ color: "#C19A6B" }} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
