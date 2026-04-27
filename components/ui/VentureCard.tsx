import { ArrowRight } from 'lucide-react'

interface VentureCardProps {
  name: string
  description: string
  status: string
  active: boolean
  icon: React.ElementType
}

export default function VentureCard({ name, description, status, active, icon: Icon }: VentureCardProps) {
  return (
    /* Outer wrapper gives room for the floating icon above the card */
    <div className="relative mt-10 h-full">

      {/* Floating icon badge */}
      <div className="absolute -top-9 left-1/2 -translate-x-1/2 z-10">
        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '1rem',
            padding: '1rem',
            boxShadow: '0 12px 32px rgba(0,0,0,0.35)',
          }}
        >
          <Icon size={28} style={{ color: '#C19A6B' }} aria-hidden="true" />
        </div>
      </div>

      {/* Card */}
      <article
        className="flex flex-col items-center text-center h-full"
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: '1.25rem',
          padding: '4rem 2rem 2rem',
          opacity: active ? 1 : 0.55,
        }}
        data-cursor-grow
      >
        <h3
          className="font-jakarta font-bold text-xl mb-5"
          style={{ color: 'var(--text)' }}
        >
          {name}
        </h3>

        <p
          className="font-dm text-sm leading-relaxed flex-1 mb-8"
          style={{ color: 'var(--muted)', textAlign: 'justify' }}
        >
          {description}
        </p>

        {/* Status row */}
        <div className="flex items-center gap-2 mb-6">
          {active ? (
            <span className="pulse-dot" aria-hidden="true" />
          ) : (
            <span
              className="w-2 h-2 rounded-full border shrink-0"
              style={{ borderColor: 'var(--muted)' }}
              aria-hidden="true"
            />
          )}
          <span className="font-dm text-xs tracking-wide" style={{ color: 'var(--muted)' }}>
            {status}
          </span>
        </div>

        {/* Arrow button */}
        <div
          style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowRight size={16} style={{ color: '#C19A6B' }} aria-hidden="true" />
        </div>
      </article>
    </div>
  )
}
