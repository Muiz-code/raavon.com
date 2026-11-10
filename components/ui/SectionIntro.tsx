import { cn } from '@/lib/utils'

type Props = {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  id?: string
  as?: 'h1' | 'h2'
  size?: 'xl' | 'l'
  className?: string
}

/** Eyebrow, heading and optional lead used at the top of each section. */
export default function SectionIntro({ eyebrow, title, lead, id, as: Tag = 'h2', size = 'l', className }: Props) {
  return (
    <div className={cn('max-w-4xl', className)}>
      <p className="eyebrow reveal">{eyebrow}</p>
      <Tag id={id} className={cn('reveal mt-5', size === 'xl' ? 'display-xl' : 'display-l')} style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
        {title}
      </Tag>
      {lead && (
        <p className="lead reveal mt-6 max-w-2xl text-soft" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
          {lead}
        </p>
      )}
    </div>
  )
}
