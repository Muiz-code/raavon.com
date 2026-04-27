'use client'

const TILES = [
  // [type, content, colSpan, rowSpan, rotation]
  { type: 'word',   content: 'BUILD',       col: 2, row: 2, rotate: 0,    bg: 'transparent', color: 'rgba(193,154,107,0.12)', stroke: true },
  { type: 'color',  content: '#C19A6B',     col: 1, row: 1, rotate: -2,   bg: '#C19A6B',      color: '' },
  { type: 'quote',  content: 'Real problems.\nReal solutions.',  col: 1, row: 1, rotate: 1,  bg: 'var(--card)', color: 'var(--text)' },
  { type: 'tag',    content: 'EST. 2026',   col: 1, row: 1, rotate: -1,   bg: 'var(--surface)', color: '#C19A6B' },
  { type: 'color',  content: '#4E2C20',     col: 1, row: 2, rotate: 0,    bg: '#4E2C20',      color: '' },
  { type: 'quote',  content: 'We see it.\nWe build it.\nIt exists.',  col: 1, row: 2, rotate: 2,  bg: 'var(--card)', color: 'var(--text)' },
  { type: 'tag',    content: 'GLOBAL REACH', col: 1, row: 1, rotate: 0,   bg: '#0A0A0A', color: 'rgba(193,154,107,0.5)', border: true },
  { type: 'quote',  content: 'One studio.\nMany empires.',   col: 2, row: 1, rotate: -1,  bg: 'var(--surface)', color: 'var(--text)' },
  { type: 'color',  content: '#FAF7F2',     col: 1, row: 1, rotate: 1,    bg: '#FAF7F2',      color: '' },
  { type: 'word',   content: 'LEGACY',      col: 1, row: 1, rotate: -2,   bg: 'var(--card)', color: 'var(--text)', large: true },
  { type: 'quote',  content: 'We build what the world\nneeds next.',  col: 1, row: 1, rotate: 0,  bg: '#C19A6B', color: '#0A0A0A' },
  { type: 'tag',    content: 'RAAVON GROUP', col: 1, row: 1, rotate: 2,   bg: 'var(--card)', color: '#C19A6B' },
]

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative px-10 py-28 md:py-36 overflow-hidden"
      aria-label="Philosophy"
    >
      {/* Section label */}
      <p
        className="font-dm text-xs tracking-[0.25em] uppercase mb-10 text-center"
        style={{ color: '#C19A6B' }}
      >
        Moodboard
      </p>

      {/* Mosaic grid */}
      <div
        className="max-w-5xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '120px',
          gap: '10px',
        }}
      >
        {/* Tile 1 — big "BUILD" word */}
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            transform: 'rotate(0deg)',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <span
            className="font-jakarta font-extrabold select-none"
            style={{
              fontSize: 'clamp(4rem, 8vw, 7rem)',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(193,154,107,0.35)',
              letterSpacing: '-0.04em',
            }}
          >
            BUILD
          </span>
        </div>

        {/* Tile 2 — caramel swatch */}
        <div style={{ gridColumn: 'span 1', gridRow: 'span 1', background: '#C19A6B', borderRadius: '12px', transform: 'rotate(-1.5deg)' }} />

        {/* Tile 3 — quote */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            transform: 'rotate(1deg)',
          }}
        >
          <p className="font-fraunces italic text-sm leading-snug" style={{ color: 'var(--text)' }}>
            "Real problems.<br />Real solutions."
          </p>
        </div>

        {/* Tile 4 — mahogany swatch tall */}
        <div style={{ gridColumn: 'span 1', gridRow: 'span 2', background: '#4E2C20', borderRadius: '12px', transform: 'rotate(0.5deg)' }} />

        {/* Tile 5 — EST 2026 tag */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-1deg)',
          }}
        >
          <span className="font-dm text-xs tracking-[0.3em] uppercase" style={{ color: '#C19A6B' }}>
            Est. 2026
          </span>
        </div>

        {/* Tile 6 — "We see it. We build it." tall */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 2',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'flex-end',
            transform: 'rotate(2deg)',
          }}
        >
          <p className="font-fraunces italic text-base leading-snug" style={{ color: 'var(--text)' }}>
            "We see it.<br />We build it.<br />It exists."
          </p>
        </div>

        {/* Tile 7 — off-white swatch */}
        <div style={{ gridColumn: 'span 1', gridRow: 'span 1', background: '#FAF7F2', borderRadius: '12px', transform: 'rotate(1.5deg)' }} />

        {/* Tile 8 — "One studio. Many empires." wide */}
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 1',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            transform: 'rotate(-0.8deg)',
          }}
        >
          <p className="font-fraunces italic text-base leading-snug" style={{ color: 'var(--text)' }}>
            "One studio. Many empires."
          </p>
        </div>

        {/* Tile 9 — caramel quote */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: '#C19A6B',
            borderRadius: '12px',
            padding: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            transform: 'rotate(0deg)',
          }}
        >
          <p className="font-fraunces italic text-sm leading-snug" style={{ color: '#0A0A0A' }}>
            "We build what the world needs next."
          </p>
        </div>

        {/* Tile 10 — LEGACY word */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-2deg)',
          }}
        >
          <span
            className="font-jakarta font-extrabold"
            style={{ fontSize: '1.4rem', letterSpacing: '0.12em', color: 'rgba(193,154,107,0.6)' }}
          >
            LEGACY
          </span>
        </div>

        {/* Tile 11 — RAAVON GROUP tag */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--card)',
            border: '1px solid rgba(193,154,107,0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(1.5deg)',
          }}
        >
          <span className="font-dm text-xs tracking-[0.25em] uppercase" style={{ color: '#C19A6B' }}>
            Raavon Group
          </span>
        </div>

        {/* Tile 12 — dark accent */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-1deg)',
          }}
        >
          <span className="font-dm text-xs tracking-[0.2em] uppercase" style={{ color: 'var(--muted)' }}>
            Global Reach
          </span>
        </div>
      </div>
    </section>
  )
}
