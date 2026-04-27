import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  /** 'auto' uses CSS dark-class detection (default).
   *  'light' forces the light icon (for dark backgrounds).
   *  'dark'  forces the dark icon  (for light backgrounds). */
  variant?: 'auto' | 'light' | 'dark'
}

const px = { sm: 28, md: 36, lg: 52 }

export default function Logo({ size = 'md', className, variant = 'auto' }: LogoProps) {
  const dim = px[size]

  if (variant === 'light') {
    return (
      <span className={cn('inline-flex items-center', className)}>
        <Image src="/raavon-icon-light.svg" alt="Raavon" width={dim} height={dim} priority unoptimized />
      </span>
    )
  }

  if (variant === 'dark') {
    return (
      <span className={cn('inline-flex items-center', className)}>
        <Image src="/raavon-icon-dark.svg" alt="Raavon" width={dim} height={dim} priority unoptimized />
      </span>
    )
  }

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* Light icon — shown when dark mode active */}
      <Image src="/raavon-icon-light.svg" alt="Raavon" width={dim} height={dim} priority unoptimized className="hidden dark:block" />
      {/* Dark icon — shown when light mode active */}
      <Image src="/raavon-icon-dark.svg" alt="Raavon" width={dim} height={dim} priority unoptimized className="block dark:hidden" />
    </span>
  )
}
