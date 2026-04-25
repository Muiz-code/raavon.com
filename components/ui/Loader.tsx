"use client";

import { useEffect, useState } from "react";

/* ─── Phase timeline ─────────────────────────────────────────────────
 *  0  hidden       — dark screen
 *  1  bulb-in      — dim bulb silhouette fades in
 *  2  flicker      — filament flickers as power rises
 *  3  glow         — full glow + ambient halo
 *  4  wire+text    — wire draws down, RAAVON reveals letter by letter
 *  5  exit         — whole loader fades out
 * ────────────────────────────────────────────────────────────────── */
type Phase = 0 | 1 | 2 | 3 | 4 | 5;

const CHARS = ["R", "A", "A", "V", "O", "N"];
/* Match logo: "RAA" = off-white (logo-primary), "VON" = mahogany */
const CHAR_COLORS = [
  "#FAF7F2",
  "#FAF7F2",
  "#FAF7F2",
  "#4E2C20",
  "#4E2C20",
  "#4E2C20",
];

const DELAYS: [Phase, number][] = [
  [1, 200],
  [2, 800],
  [3, 1300],
  [4, 1700],
  [5, 2700],
];

export default function Loader() {
  const [phase, setPhase] = useState<Phase>(0);
  const [letterCount, setLetterCount] = useState(0);
  const [done, setDone] = useState(false);

  /* Phase transitions */
  useEffect(() => {
    const timers = DELAYS.map(([p, ms]) => setTimeout(() => setPhase(p), ms));
    const exitTimer = setTimeout(() => setDone(true), 3100);
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(exitTimer);
    };
  }, []);

  /* Stagger letters once text phase starts */
  useEffect(() => {
    if (phase < 4) return;
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      setLetterCount(n);
      if (n >= CHARS.length) clearInterval(id);
    }, 85);
    return () => clearInterval(id);
  }, [phase]);

  if (done) return null;

  const lit = phase >= 3;
  const flicker = phase === 2;
  const wireOn = phase >= 4;
  const textOn = phase >= 4;
  const exiting = phase >= 5;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none"
      style={{
        background: "#0A0A0A",
        opacity: exiting ? 0 : 1,
        transition: exiting ? "opacity 0.45s ease" : "none",
        pointerEvents: exiting ? "none" : "all",
      }}
      aria-hidden="true"
    >
      {/* ── Ambient page glow (only when lit) ── */}
      {lit && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 40% at 50% 35%, rgba(193,154,107,0.07) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}

      {/* ── Bulb ── */}
      <div
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transition: "opacity 0.55s ease",
          animation: flicker ? "ld-flicker 0.55s ease-in-out forwards" : "none",
          position: "relative",
          zIndex: 1,
        }}
      >
        <BulbSVG lit={lit} />

        {/* Radial halo */}
        <div
          style={{
            position: "absolute",
            inset: "-50px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(193,154,107,0.18) 0%, transparent 65%)",
            opacity: lit ? 1 : 0,
            transition: "opacity 0.6s ease",
            animation: lit ? "ld-halo 2.4s ease-in-out infinite" : "none",
            pointerEvents: "none",
            zIndex: -1,
          }}
        />
      </div>

      {/* ── Connecting wire (SVG draws itself down) ── */}
      <svg
        width="2"
        height="44"
        viewBox="0 0 2 44"
        overflow="visible"
        style={{ display: "block", zIndex: 1 }}
      >
        <line
          x1="1"
          y1="0"
          x2="1"
          y2="44"
          stroke="#C19A6B"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="44"
          strokeDashoffset={wireOn ? 0 : 44}
          style={{
            transition: wireOn
              ? "stroke-dashoffset 0.5s cubic-bezier(0.16,1,0.3,1)"
              : "none",
          }}
        />
        {/* Terminal dot */}
        {wireOn && (
          <circle
            cx="1"
            cy="44"
            r="2.5"
            fill="#C19A6B"
            opacity={wireOn ? 1 : 0}
            style={{ transition: "opacity 0.2s ease 0.5s" }}
          />
        )}
      </svg>

      {/* ── RAAVON text ── */}
      <div
        className="font-jakarta font-extrabold tracking-[0.18em]"
        style={{
          fontSize: "clamp(2rem, 5.5vw, 4rem)",
          opacity: textOn ? 1 : 0,
          transition: "opacity 0.25s ease",
          filter: lit ? "drop-shadow(0 0 18px rgba(193,154,107,0.45))" : "none",
          zIndex: 1,
        }}
      >
        {CHARS.map((char, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              color: i < letterCount ? CHAR_COLORS[i] : "transparent",
              transition: `color 0.12s ease ${i * 0.04}s`,
            }}
          >
            {char}
          </span>
        ))}
      </div>

      {/* ── Tagline ── */}
      <p
        className="font-fraunces italic"
        style={{
          fontSize: "clamp(0.7rem, 1.2vw, 0.85rem)",
          color: "#C19A6B",
          opacity: letterCount >= CHARS.length ? 0.55 : 0,
          transition: "opacity 0.5s ease 0.3s",
          marginTop: "0.6rem",
          letterSpacing: "0.12em",
          zIndex: 1,
        }}
      >
        The spirit behind every brand.
      </p>

      <style>{`
        @keyframes ld-flicker {
          0%   { opacity: 1;    }
          8%   { opacity: 0.2;  }
          16%  { opacity: 0.85; }
          26%  { opacity: 0.15; }
          34%  { opacity: 0.9;  }
          44%  { opacity: 0.3;  }
          52%  { opacity: 1;    }
          62%  { opacity: 0.2;  }
          72%  { opacity: 0.95; }
          82%  { opacity: 0.4;  }
          100% { opacity: 1;    }
        }
        @keyframes ld-halo {
          0%, 100% { transform: scale(1);    opacity: 1;   }
          50%      { transform: scale(1.12); opacity: 0.65; }
        }
      `}</style>
    </div>
  );
}

/* ─── Bulb SVG ──────────────────────────────────────────────────────── */
function BulbSVG({ lit }: { lit: boolean }) {
  return (
    <svg
      width="88"
      height="108"
      viewBox="0 0 88 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="ld-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={lit ? 3 : 0}
            result="blur"
          />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <radialGradient id="ld-fill" cx="50%" cy="42%" r="55%">
          <stop offset="0%" stopColor="#C19A6B" stopOpacity={lit ? 0.22 : 0} />
          <stop offset="100%" stopColor="#C19A6B" stopOpacity="0" />
        </radialGradient>

        {/* Bright filament glow */}
        <filter
          id="ld-filament-glow"
          x="-150%"
          y="-150%"
          width="400%"
          height="400%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Soft outer aura (lit only) ── */}
      {lit && (
        <ellipse
          cx="44"
          cy="40"
          rx="40"
          ry="38"
          fill="rgba(193,154,107,0.07)"
          filter="url(#ld-glow)"
        />
      )}

      {/* ── Bulb dome ── */}
      <path
        d="M 14 64 C 14 40 22 8 44 8 C 66 8 74 40 74 64 Z"
        fill="url(#ld-fill)"
        stroke="#C19A6B"
        strokeWidth="1.3"
        opacity={lit ? 0.9 : 0.28}
        filter={lit ? "url(#ld-glow)" : undefined}
      />

      {/* ── Filament support legs ── */}
      <line
        x1="34"
        y1="64"
        x2="34"
        y2="52"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity={lit ? 0.75 : 0.15}
      />
      <line
        x1="54"
        y1="64"
        x2="54"
        y2="52"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity={lit ? 0.75 : 0.15}
      />

      {/* ── Filament (W / zigzag) ── */}
      <path
        d="M 34 52 Q 37 43 44 52 Q 51 43 54 52"
        fill="none"
        stroke={lit ? "#FFD596" : "#C19A6B"}
        strokeWidth={lit ? 2.2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={lit ? 1 : 0.12}
        filter={lit ? "url(#ld-filament-glow)" : undefined}
        style={{ transition: "opacity 0.3s ease, stroke 0.3s ease" }}
      />

      {/* ── Collar bands ── */}
      <line
        x1="14"
        y1="64"
        x2="74"
        y2="64"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="18"
        y1="71"
        x2="70"
        y2="71"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity="0.38"
      />
      <line
        x1="22"
        y1="78"
        x2="66"
        y2="78"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity="0.28"
      />
      <line
        x1="26"
        y1="85"
        x2="62"
        y2="85"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity="0.2"
      />

      {/* ── Base contact block ── */}
      <rect
        x="30"
        y="85"
        width="28"
        height="9"
        rx="1"
        fill="rgba(193,154,107,0.07)"
        stroke="#C19A6B"
        strokeWidth="1"
        opacity="0.42"
      />

      {/* ── Screw threads on base ── */}
      <line
        x1="30"
        y1="89"
        x2="58"
        y2="89"
        stroke="#C19A6B"
        strokeWidth="0.6"
        opacity="0.2"
        strokeDasharray="3 3"
      />
    </svg>
  );
}
