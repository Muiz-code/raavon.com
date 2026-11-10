import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Screen } from '@/content/projects'

type Props = {
  screen: Screen
  sizes: string
  className?: string
  priority?: boolean
  /** Hide the alt text when the same screen is described elsewhere. */
  decorative?: boolean
}

/** A screenshot in a phone or browser frame, chosen by `screen.device`. */
export default function Device({ screen, sizes, className, priority, decorative }: Props) {
  const img = (
    <Image
      src={screen.src}
      alt={decorative ? '' : screen.alt}
      width={screen.width}
      height={screen.height}
      sizes={sizes}
      priority={priority}
      className="block h-auto w-full"
    />
  )

  if (screen.device === 'phone') {
    return (
      <div className={cn('phone', className)}>
        <div className="phone-screen">{img}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-[rgb(236_230_216/0.14)] bg-[#141418] shadow-[0_40px_90px_-40px_rgb(0_0_0/0.8)]',
        className,
      )}
    >
      <div aria-hidden="true" className="flex items-center gap-1.5 border-b border-[rgb(236_230_216/0.1)] px-3.5 py-2.5">
        <span className="size-2.5 rounded-full bg-[rgb(236_230_216/0.18)]" />
        <span className="size-2.5 rounded-full bg-[rgb(236_230_216/0.18)]" />
        <span className="size-2.5 rounded-full bg-[rgb(236_230_216/0.18)]" />
      </div>
      {img}
    </div>
  )
}

/** Small label shown under screenshots that use sample data. */
export function ExampleDataNote({ screen }: { screen: Screen }) {
  if (!screen.exampleData) return null
  return <span className="text-xs font-semibold uppercase tracking-[0.12em] text-soft">Shown with example data</span>
}
