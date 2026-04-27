import Image from 'next/image'

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative px-10 py-28 md:py-36 overflow-hidden"
      aria-label="Philosophy"
    >
      {/* Ghost RAAVON watermark */}
      <span
        aria-hidden="true"
        className="absolute font-jakarta font-extrabold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 22vw, 20rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(193,154,107,0.07)',
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

      {/* Section label */}
      <p
        className="relative z-10 font-dm text-xs tracking-[0.25em] uppercase mb-10 text-center"
        style={{ color: '#C19A6B' }}
      >
        Moodboard
      </p>

      {/* Mosaic grid */}
      <div
        className="relative z-10 max-w-5xl mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridAutoRows: '140px',
          gap: '10px',
        }}
      >

        {/* 1 — large image tile with quote overlay */}
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 2',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            transform: 'rotate(-0.5deg)',
          }}
        >
          <Image src="/herobg.jpg" alt="Raavon" fill style={{ objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.55)' }} />
          <p
            className="font-fraunces italic"
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: '#FAF7F2',
              lineHeight: 1.3,
            }}
          >
            "We build what the world needs next."
          </p>
        </div>

        {/* 2 — caramel swatch */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: '#C19A6B',
            borderRadius: '14px',
            transform: 'rotate(-1.5deg)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0.85rem',
          }}
        >
          <span className="font-dm text-xs tracking-[0.25em] uppercase" style={{ color: '#0A0A0A' }}>
            Caramel
          </span>
        </div>

        {/* 3 — image tile cropped top-right */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            transform: 'rotate(1deg)',
          }}
        >
          <Image src="/mood-1.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: 'top right' }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'var(--card)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Image src="/herobg.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: '80% 20%' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.45)' }} />
          </div>
        </div>

        {/* 4 — mahogany swatch tall */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 2',
            background: '#4E2C20',
            borderRadius: '14px',
            transform: 'rotate(0.5deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1rem',
          }}
        >
          <span className="font-dm text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(193,154,107,0.7)' }}>
            Mahogany
          </span>
          <span className="font-jakarta font-extrabold" style={{ fontSize: '1.6rem', color: 'rgba(193,154,107,0.3)', letterSpacing: '-0.02em' }}>
            DEEP
          </span>
        </div>

        {/* 5 — EST 2026 tag */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
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

        {/* 6 — quote card tall */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 2',
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            transform: 'rotate(2deg)',
          }}
        >
          <p className="font-fraunces italic text-base leading-snug" style={{ color: 'var(--text)' }}>
            "We see it.<br />We build it.<br />It exists."
          </p>
          <span className="font-dm text-xs mt-3 tracking-widest uppercase" style={{ color: '#C19A6B' }}>
            — Raavon
          </span>
        </div>

        {/* 7 — off-white swatch */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: '#FAF7F2',
            borderRadius: '14px',
            transform: 'rotate(1.5deg)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0.85rem',
          }}
        >
          <span className="font-dm text-xs tracking-[0.25em] uppercase" style={{ color: '#4E2C20' }}>
            Off White
          </span>
        </div>

        {/* 8 — wide image tile */}
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 1',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            transform: 'rotate(-0.8deg)',
          }}
        >
          <Image src="/herobg.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: '50% 70%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.5)' }} />
          <p
            className="font-fraunces italic text-sm"
            style={{ position: 'absolute', bottom: '1rem', left: '1rem', right: '1rem', color: '#FAF7F2', lineHeight: 1.3 }}
          >
            "One studio. Many empires."
          </p>
        </div>

        {/* 9 — image with caramel overlay */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: '#C19A6B',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            transform: 'rotate(0deg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <p className="font-fraunces italic text-sm text-center leading-snug" style={{ color: '#0A0A0A' }}>
            "Real problems.<br />Real solutions."
          </p>
        </div>

        {/* 10 — LEGACY word tile */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(-2deg)',
          }}
        >
          <span
            className="font-jakarta font-extrabold"
            style={{ fontSize: '1.3rem', letterSpacing: '0.1em', color: 'rgba(193,154,107,0.55)' }}
          >
            LEGACY
          </span>
        </div>

        {/* 11 — image tall (mood-2 slot) */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 2',
            borderRadius: '14px',
            overflow: 'hidden',
            position: 'relative',
            transform: 'rotate(1deg)',
          }}
        >
          <Image src="/herobg.jpg" alt="" fill style={{ objectFit: 'cover', objectPosition: '30% 40%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,8,6,0.45)' }} />
          <p
            className="font-fraunces italic text-sm"
            style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', color: '#FAF7F2', lineHeight: 1.3 }}
          >
            "We turn ideas into industries."
          </p>
        </div>

        {/* 12 — Raavon Group label */}
        <div
          style={{
            gridColumn: 'span 1',
            gridRow: 'span 1',
            background: 'var(--card)',
            border: '1px solid rgba(193,154,107,0.3)',
            borderRadius: '14px',
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

        {/* 13 — wide dark quote */}
        <div
          style={{
            gridColumn: 'span 2',
            gridRow: 'span 1',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '14px',
            padding: '1.25rem 1.75rem',
            display: 'flex',
            alignItems: 'center',
            transform: 'rotate(-0.5deg)',
          }}
        >
          <p className="font-fraunces italic text-base leading-snug" style={{ color: 'var(--text)' }}>
            "Built by Raavon. Used by the world."
          </p>
        </div>

      </div>
    </section>
  )
}
