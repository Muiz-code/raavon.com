'use client'

import { useRef } from 'react'
import { MARQUEE_PHRASES } from '@/lib/constants'

export default function MarqueeTrack() {
  const trackRef = useRef<HTMLDivElement>(null)

  const doubled = [...MARQUEE_PHRASES, ...MARQUEE_PHRASES]

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = 'paused'
      }}
      onMouseLeave={() => {
        if (trackRef.current) trackRef.current.style.animationPlayState = 'running'
      }}
    >
      <div
        ref={trackRef}
        className="flex whitespace-nowrap font-fraunces italic"
        style={{
          animation: 'marquee 28s linear infinite',
          color: '#D2B48C',
          fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
        }}
      >
        {doubled.map((phrase, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{phrase}</span>
            <span style={{ color: '#C19A6B' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
