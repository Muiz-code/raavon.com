import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Raavon Group — The Spirit Behind Every Brand'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: '700px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(193,154,107,0.12) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
          }}
        />

        {/* Top caramel rule */}
        <div
          style={{
            width: '480px',
            height: '1px',
            background: 'rgba(193,154,107,0.45)',
            marginBottom: '48px',
            display: 'flex',
          }}
        />

        {/* RAAVON wordmark */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '48px' }}>
          <span
            style={{
              fontSize: '112px',
              fontWeight: 800,
              color: '#FAF7F2',
              letterSpacing: '6px',
              lineHeight: 1,
              fontFamily: 'sans-serif',
            }}
          >
            RAA
          </span>
          <span
            style={{
              fontSize: '112px',
              fontWeight: 800,
              color: '#7A4A35',
              letterSpacing: '6px',
              lineHeight: 1,
              fontFamily: 'sans-serif',
            }}
          >
            VON
          </span>
        </div>

        {/* Bottom caramel rule */}
        <div
          style={{
            width: '480px',
            height: '1px',
            background: 'rgba(193,154,107,0.45)',
            marginBottom: '40px',
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: '18px',
            color: '#C19A6B',
            letterSpacing: '5px',
            textTransform: 'uppercase',
            fontFamily: 'serif',
            fontStyle: 'italic',
            marginBottom: '40px',
            display: 'flex',
          }}
        >
          The Spirit Behind Every Brand
        </div>

        {/* CTA pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(193,154,107,0.4)',
            padding: '10px 24px',
            borderRadius: '999px',
          }}
        >
          <span style={{ fontSize: '13px', color: '#C19A6B', letterSpacing: '3px', fontFamily: 'sans-serif', textTransform: 'uppercase' }}>
            Explore our ventures
          </span>
          <span style={{ fontSize: '13px', color: '#C19A6B', fontFamily: 'sans-serif' }}>→</span>
        </div>

        {/* Bottom domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '12px',
            color: 'rgba(250,247,242,0.2)',
            letterSpacing: '3px',
            fontFamily: 'sans-serif',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          raavon.com
        </div>
      </div>
    ),
    { ...size }
  )
}
