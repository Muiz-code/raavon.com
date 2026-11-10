'use client'

import { useRef } from 'react'
import { gsap, MOTION, useGSAP } from '@/lib/gsap'

/**
 * Custom cursor for the landing page.
 *
 *   default  small dot with a ring that trails behind
 *   link     ring grows over links and buttons
 *   label    gold disc with a word, from [data-cursor="View"]
 *   lens     large inverting lens over the hero headline
 *   text     hidden over text fields, which keep the native caret
 *
 * Only for precise pointers with motion allowed. Keyboard focus styles are
 * unaffected, and touch devices keep their normal behaviour.
 */
export default function CustomCursor() {
  const root = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(MOTION.finePointer, () => {
      const html = document.documentElement
      const el = root.current
      if (!el || !ring.current || !dot.current) return
      html.classList.add('has-custom-cursor')

      const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3.out' })
      const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3.out' })
      const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power2.out' })
      const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power2.out' })

      const setState = (state: string, text = '') => {
        if (el.dataset.state === state && (label.current?.textContent ?? '') === text) return
        el.dataset.state = state
        if (label.current) label.current.textContent = text
      }

      const onMove = (e: PointerEvent) => {
        el.dataset.visible = 'true'
        rx(e.clientX)
        ry(e.clientY)
        dx(e.clientX)
        dy(e.clientY)
      }
      const onOver = (e: PointerEvent) => {
        const t = e.target as Element | null
        if (!t?.closest) return
        if (t.closest('input, textarea, select, [contenteditable="true"]')) return setState('text')
        const labelled = t.closest<HTMLElement>('[data-cursor]')
        if (labelled) return setState('label', labelled.dataset.cursor ?? '')
        if (t.closest('#hero-title')) return setState('lens')
        if (t.closest('a, button, [role="button"], label, summary')) return setState('link')
        setState('default')
      }
      const onLeave = () => {
        el.dataset.visible = 'false'
      }
      const onDown = () => gsap.to(ring.current, { scale: 0.82, duration: 0.15 })
      const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.35, ease: 'back.out(3)' })

      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerover', onOver)
      document.documentElement.addEventListener('pointerleave', onLeave)
      window.addEventListener('pointerdown', onDown)
      window.addEventListener('pointerup', onUp)

      return () => {
        html.classList.remove('has-custom-cursor')
        window.removeEventListener('pointermove', onMove)
        document.removeEventListener('pointerover', onOver)
        document.documentElement.removeEventListener('pointerleave', onLeave)
        window.removeEventListener('pointerdown', onDown)
        window.removeEventListener('pointerup', onUp)
      }
    })
  })

  return (
    <div ref={root} className="custom-cursor" data-state="default" data-visible="false" aria-hidden="true">
      <div ref={ring} className="custom-cursor-ring">
        <span ref={label} className="custom-cursor-label" />
      </div>
      <div ref={dot} className="custom-cursor-dot" />
    </div>
  )
}
