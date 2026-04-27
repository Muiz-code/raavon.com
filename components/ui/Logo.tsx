import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const px = { sm: 28, md: 36, lg: 52 }

export default function Logo({ size = 'md', className }: LogoProps) {
  const dim = px[size]

  return (
    <span className={cn('inline-flex items-center', className)}>
      {/* Light icon — shown when dark mode active */}
      <Image
        src="/raavon-icon-light.svg"
        alt="Raavon"
        width={dim}
        height={dim}
        priority
        unoptimized
        className="hidden dark:block"
      />
      {/* Dark icon — shown when light mode active */}
      <Image
        src="/raavon-icon-dark.svg"
        alt="Raavon"
        width={dim}
        height={dim}
        priority
        unoptimized
        className="block dark:hidden"
      />
    </span>
  )
}
