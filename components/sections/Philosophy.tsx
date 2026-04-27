'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const QUOTES = [
  'Real problems. Real solutions. Raavon.',
  "Ideas don't build themselves. We do.",
  'We build what the world needs next.',
  'The world changes. We build what changes it.',
  'Every great product started here.',
  'We build. Full stop.',
  'One studio. Many empires.',
  'Built by Raavon. Used by the world.',
  'We turn ideas into industries.',
  'We see it. We build it. It exists.',
]

const INTERVAL = 3200

export default function Philosophy() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % QUOTES.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="philosophy"
      className="relative px-10 py-36 md:py-48 flex items-center justify-center overflow-hidden text-center"
      aria-label="Philosophy"
    >
      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className="absolute font-jakarta font-extrabold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 22vw, 20rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(193,154,107,0.08)',
          letterSpacing: '-0.04em',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        RAAVON
      </span>

      <div className="relative z-10 max-w-3xl w-full">
        {/* Quote carousel */}
        <div className="relative" style={{ minHeight: 'clamp(6rem, 12vw, 10rem)' }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              className="font-fraunces italic font-light leading-snug absolute inset-0 flex items-center justify-center"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                color: 'var(--text)',
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
          style={{ color: '#C19A6B' }}
        >
          — Raavon Group
        </p>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Quote ${i + 1}`}
              style={{
                width: i === index ? '20px' : '6px',
                height: '6px',
                borderRadius: '999px',
                background: i === index ? '#C19A6B' : 'rgba(193,154,107,0.25)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
