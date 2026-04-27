'use client'

import { useEffect, useRef, useState } from 'react'

/* ─── Phases ────────────────────────────────────────────────────────
 *  0  black
 *  1  R appears centered
 *  2  dot appears + blinks 3×
 *  3  dot fades, AAVON types out (R naturally shifts left)
 *  4  tagline fades in
 *  5  exit
 * ─────────────────────────────────────────────────────────────────── */
type Phase = 0 | 1 | 2 | 3 | 4 | 5

const LETTERS = [
  { char: 'A', color: '#FAF7F2' },
  { char: 'A', color: '#FAF7F2' },
  { char: 'V', color: '#7A4A35' },
  { char: 'O', color: '#7A4A35' },
  { char: 'N', color: '#7A4A35' },
]

const FONT_SIZE = 'clamp(3rem, 8vw, 6.5rem)'

export default function Loader() {
  const [phase, setPhase]           = useState<Phase>(0)
  const [dotOn, setDotOn]           = useState(false)
  const [typedCount, setTypedCount] = useState(0)
  const [done, setDone]             = useState(false)
  const typingStarted               = useRef(false)

  /* ── Timeline ───────────────────────────────────────────────────── */
  useEffect(() => {
    const t: ReturnType<typeof setTimeout>[] = []

    t.push(setTimeout(() => setPhase(1), 350))

    // dot slides in
    t.push(setTimeout(() => { setPhase(2); setDotOn(true) }, 950))

    // 3 blinks
    t.push(setTimeout(() => setDotOn(false), 1150))
    t.push(setTimeout(() => setDotOn(true),  1350))
    t.push(setTimeout(() => setDotOn(false), 1550))
    t.push(setTimeout(() => setDotOn(true),  1750))

    // dot fades, letters start
    t.push(setTimeout(() => { setPhase(3); setDotOn(false) }, 1950))

    t.push(setTimeout(() => setPhase(4), 2900))
    t.push(setTimeout(() => setPhase(5), 3700))
    t.push(setTimeout(() => setDone(true), 4250))

    return () => t.forEach(clearTimeout)
  }, [])

  /* ── Type AAVON once — ref prevents re-trigger on phase 4, 5 ───── */
  useEffect(() => {
    if (phase < 3 || typingStarted.current) return
    typingStarted.current = true

    let n = 0
    const id = setInterval(() => {
      n += 1
      setTypedCount(n)
      if (n >= LETTERS.length) clearInterval(id)
    }, 95)

    return () => clearInterval(id)
  }, [phase])

  if (done) return null

  const exiting = phase >= 5

  const letterStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-jakarta)',
    fontWeight: 800,
    fontSize: FONT_SIZE,
    letterSpacing: '0.04em',
    whiteSpace: 'nowrap',
  }

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: '#0A0A0A',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        opacity: exiting ? 0 : 1,
        transition: exiting ? 'opacity 0.55s ease' : 'none',
        pointerEvents: exiting ? 'none' : 'all',
      }}
    >
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 55% 35% at 50% 50%, rgba(193,154,107,0.06) 0%, transparent 70%)',
        opacity: phase >= 3 ? 1 : 0,
        transition: 'opacity 1.2s ease',
      }} />

      {/* Wordmark row — flex centered; R shifts left as siblings expand */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', flexWrap: 'nowrap' }}>

        {/* R — always visible once phase 1 */}
        <div style={{
          overflow: 'hidden', flexShrink: 0,
          maxWidth: phase >= 1 ? '8rem' : '0px',
          opacity: phase >= 1 ? 1 : 0,
          transition: 'opacity 0.45s ease, max-width 0.45s cubic-bezier(0.16,1,0.3,1)',
        }}>
          <span style={{ ...letterStyle, color: '#FAF7F2' }}>R</span>
        </div>

        {/* Dot — slides in (phase 2), collapses out (phase 3) */}
        <div style={{
          overflow: 'hidden', flexShrink: 0,
          maxWidth: phase === 2 ? '2rem' : '0px',
          opacity: dotOn ? 1 : 0,
          transition: phase >= 3
            ? 'max-width 0.35s ease, opacity 0.35s ease'
            : 'max-width 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.08s linear',
        }}>
          <span style={{ ...letterStyle, color: '#C19A6B', letterSpacing: 0 }}>.</span>
        </div>

        {/* A A V O N — expand from 0 one by one */}
        {LETTERS.map(({ char, color }, i) => {
          const visible = i < typedCount
          return (
            <div key={i} style={{
              overflow: 'hidden', flexShrink: 0,
              maxWidth: visible ? '8rem' : '0px',
              opacity: visible ? 1 : 0,
              transition: 'max-width 0.1s ease, opacity 0.1s ease',
            }}>
              <span style={{ ...letterStyle, color }}>{char}</span>
            </div>
          )
        })}
      </div>

      {/* Tagline */}
      <p style={{
        marginTop: '1.75rem',
        fontFamily: 'var(--font-fraunces)',
        fontStyle: 'italic',
        fontWeight: 300,
        fontSize: 'clamp(0.7rem, 1.4vw, 0.9rem)',
        color: '#C19A6B',
        letterSpacing: '0.18em',
        whiteSpace: 'nowrap',
        opacity: phase >= 4 && !exiting ? 0.7 : 0,
        transform: phase >= 4 && !exiting ? 'translateY(0)' : 'translateY(6px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>
        The spirit behind every brand.
      </p>

      {/* Progress bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0,
        height: '1px',
        background: 'linear-gradient(90deg, #C19A6B, rgba(193,154,107,0.2))',
        width: phase >= 1 ? '100%' : '0%',
        opacity: phase >= 1 && !exiting ? 0.45 : 0,
        transition: 'width 2.8s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease',
      }} />
    </div>
  )
}
