import Image from 'next/image'
import { cn } from '@/lib/utils'

/**
 * Approved RaaVon logos (source files: docs/brand/logos, see README.txt there).
 * Web versions in public/brand are trimmed and transparent. The on-dark
 * versions use the supplied Dark colours: Cream lettering, Burgundy V.
 */
const FILES = {
  full: { width: 2007, height: 360, src: 'raavon-logo' },
  wordmark: { width: 1969, height: 407, src: 'raavon-wordmark' },
  symbol: { width: 1028, height: 710, src: 'raavon-symbol' },
} as const

type Props = {
  kind?: keyof typeof FILES
  on?: 'dark' | 'light'
  /** Rendered height in px. Width follows the logo's proportions. */
  height?: number
  className?: string
  priority?: boolean
}

export default function Logo({ kind = 'full', on = 'dark', height = 28, className, priority }: Props) {
  const f = FILES[kind]
  const width = Math.round((f.width / f.height) * height)
  return (
    <Image
      src={`/brand/${f.src}-on-${on}.png`}
      alt="RaaVon"
      width={width}
      height={height}
      priority={priority}
      sizes={`${width}px`}
      quality={100}
      className={cn('block h-auto max-w-full', className)}
      style={{ width, height: 'auto' }}
    />
  )
}
