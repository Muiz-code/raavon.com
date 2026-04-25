import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface VentureCardProps {
  tag: string
  name: string
  description: string
  status: string
  active: boolean
}

export default function VentureCard({ tag, name, description, status, active }: VentureCardProps) {
  return (
    <article
      className={cn(
        'venture-card p-8 rounded-none flex flex-col gap-5 transition-all duration-300',
        !active && 'opacity-50'
      )}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
      }}
      data-cursor-grow
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-dm text-xs tracking-widest uppercase" style={{ color: '#C19A6B' }}>
          {tag}
        </p>
        {active && (
          <ArrowUpRight
            size={18}
            style={{ color: '#C19A6B', flexShrink: 0 }}
            aria-hidden="true"
          />
        )}
      </div>

      <h3 className="font-jakarta font-bold text-2xl" style={{ color: 'var(--text)' }}>
        {name}
      </h3>

      <p className="font-dm text-sm leading-relaxed flex-1" style={{ color: 'var(--muted)' }}>
        {description}
      </p>

      <div className="flex items-center gap-2 pt-2">
        {active ? (
          <span className="pulse-dot" aria-hidden="true" />
        ) : (
          <span
            className="w-2 h-2 rounded-full border flex-shrink-0"
            style={{ borderColor: 'var(--muted)' }}
            aria-hidden="true"
          />
        )}
        <span className="font-dm text-xs tracking-wide" style={{ color: 'var(--muted)' }}>
          {status}
        </span>
      </div>
    </article>
  )
}
