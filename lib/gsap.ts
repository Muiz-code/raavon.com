'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP)
}

/** Media queries shared by every animation, so motion rules stay consistent. */
export const MOTION = {
  ok: '(prefers-reduced-motion: no-preference)',
  reduce: '(prefers-reduced-motion: reduce)',
  desktopOk: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
  finePointer: '(pointer: fine) and (prefers-reduced-motion: no-preference)',
}

export { gsap, ScrollTrigger, useGSAP }
