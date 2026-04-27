'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Phases ────────────────────────────────────────────────────────
 *  0  black
 *  1  R appears centered
 *  2  remaining letters type out → R shifts left naturally
 *  3  tagline fades in
 *  4  exit
 * ─────────────────────────────────────────────────────────────────── */
type Phase = 0 | 1 | 2 | 3 | 4

const CHARS = [
  { char: 'R', color: '#FAF7F2' },
  { char: 'A', color: '#FAF7F2' },
  { char: 'A', color: '#FAF7F2' },
  { char: 'V', color: '#7A4A35' },
  { char: 'O', color: '#7A4A35' },
  { char: 'N', color: '#7A4A35' },
]

export default function Loader() {
  const [phase, setPhase] = useState<Phase>(0)
  const [extraChars, setExtraChars] = useState(0) // letters revealed after R
  const [done, setDone] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 350)
    const t2 = setTimeout(() => setPhase(2), 1000)
    const t3 = setTimeout(() => setPhase(3), 1950)
    const t4 = setTimeout(() => setPhase(4), 2900)
    const tD = setTimeout(() => setDone(true), 3400)
    return () => [t1, t2, t3, t4, tD].forEach(clearTimeout)
  }, [])

  /* Type letters one by one once phase 2 starts */
  useEffect(() => {
    if (phase < 2) return
    intervalRef.current = setInterval(() => {
      setExtraChars((prev) => {
        const next = prev + 1
        if (next >= CHARS.length - 1) clearInterval(intervalRef.current!)
        return next
      })
    }, 90)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [phase])

  if (done) return null

  const exiting = phase >= 4

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.5s ease' : 'none',
        pointerEvents: exiting ? 'none' : 'all',
      }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 55% 35% at 50% 50%, rgba(193,154,107,0.06) 0%, transparent 70%)',
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 1s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Word — nowrap flex centered; R shifts left as letters expand in */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          flexWrap: 'nowrap',
        }}
      >
        {CHARS.map(({ char, color }, i) => {
          const isR = i === 0
          const isVisible = isR ? phase >= 1 : i - 1 < extraChars

          return (
            <div
              key={i}
              style={{
                overflow: 'hidden',
                flexShrink: 0,
                /* 8rem is safely wider than any character at the given font size */
                maxWidth: isVisible ? '8rem' : '0px',
                opacity: isVisible ? 1 : 0,
                transition: isR
                  ? 'opacity 0.45s ease, max-width 0.45s cubic-bezier(0.16,1,0.3,1)'
                  : 'max-width 0.12s ease, opacity 0.12s ease',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-jakarta)',
                  fontWeight: 800,
                  fontSize: 'clamp(3rem, 8vw, 6.5rem)',
                  letterSpacing: '0.04em',
                  color,
                  whiteSpace: 'nowrap',
                }}
              >
                {char}
              </span>
            </div>
          )
        })}
      </div>

      {/* Tagline */}
      <p
        style={{
          marginTop: '1.75rem',
          fontFamily: 'var(--font-fraunces)',
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)',
          color: '#C19A6B',
          letterSpacing: '0.18em',
          opacity: phase >= 3 && !exiting ? 0.7 : 0,
          transform: phase >= 3 && !exiting ? 'translateY(0)' : 'translateY(6px)',
          transition: 'opacity 0.7s ease, transform 0.7s ease',
          whiteSpace: 'nowrap',
        }}
      >
        The spirit behind every brand.
      </p>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          background: 'linear-gradient(90deg, #C19A6B, rgba(193,154,107,0.2))',
          opacity: phase >= 1 && !exiting ? 0.45 : 0,
          width: phase >= 1 ? '100%' : '0%',
          transition: 'width 2.5s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
        }}
      />
    </div>
  )
}
