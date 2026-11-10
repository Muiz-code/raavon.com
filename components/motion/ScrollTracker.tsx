'use client'

import { useRef } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'

/**
 * Reading progress at the very top of the page. Replaces the hidden
 * scrollbar as the visual cue for position. Decorative, so it is hidden
 * from assistive technology (native scrolling is unchanged).
 */
export default function ScrollTracker() {
  const bar = useRef<HTMLDivElement>(null)
  const pathname = usePathname()

  useGSAP(
    () => {
      gsap.set(bar.current, { scaleX: 0 })
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
      })
    },
    { dependencies: [pathname], revertOnUpdate: true },
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-gold" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
