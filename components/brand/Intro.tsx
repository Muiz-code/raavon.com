'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Logo from '@/components/brand/Logo'

/**
 * First-visit intro for the home page (about 2.5 seconds).
 *
 * 1. The official rosette is revealed through a widening circular mask
 *    while it turns into place. The asset itself is never redrawn.
 * 2. The RaaVon logo wipes in beneath it, followed by the signature.
 * 3. The rosette travels to its cropped position in the hero, and the
 *    overlay dissolves into the page.
 *
 * An inline script in app/layout.tsx decides whether it plays: home page,
 * first visit this session, and no reduced-motion preference. It can be
 * skipped with a click, a key press or a scroll. A CSS failsafe removes
 * the overlay if this script never runs.
 */

const EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'
const QUART = 'cubic-bezier(0.76, 0, 0.24, 1)'

export default function Intro() {
  const [gone, setGone] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const markRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const html = document.documentElement
    // Not playing: the overlay stays hidden by CSS (display: none) and its
    // lazy image is never requested, so there is nothing to tear down.
    if (html.dataset.intro !== 'play' || html.dataset.introDone) return
    try {
      sessionStorage.setItem('rv-intro', '1')
    } catch {
      /* private mode: intro may replay, which is harmless */
    }

    const mark = markRef.current
    const veil = veilRef.current
    const text = textRef.current
    if (!mark || !veil || !text) return

    const running: Animation[] = []
    const timers: ReturnType<typeof setTimeout>[] = []
    let finished = false

    const finish = () => {
      if (finished) return
      finished = true
      timers.forEach(clearTimeout)
      running.forEach((a) => a.cancel())
      html.dataset.introDone = 'true'
      setGone(true)
      // Once the hero copy has finished rising, drop the intro markers so a
      // later client-side visit to "/" renders the hero without the delay.
      setTimeout(() => {
        delete html.dataset.intro
        delete html.dataset.introDone
      }, 4200)
    }

    // 1. Mask reveal + turn
    running.push(
      mark.animate(
        [
          { clipPath: 'circle(0% at 50% 50%)', transform: 'rotate(-70deg) scale(0.86)' },
          { clipPath: 'circle(50% at 50% 50%)', transform: 'rotate(0deg) scale(1)' },
        ],
        { duration: 1300, easing: EXPO, fill: 'both' },
      ),
    )

    // 2. Logo wipes in from the left, then the signature
    const logo = text.querySelector<HTMLElement>('[data-logo]')
    if (logo) {
      running.push(
        logo.animate(
          [
            { clipPath: 'inset(0 100% 0 0)', transform: 'translateY(6px)' },
            { clipPath: 'inset(0 0% 0 0)', transform: 'none' },
          ],
          { duration: 900, delay: 380, easing: EXPO, fill: 'both' },
        ),
      )
    }
    const sig = text.querySelector<HTMLElement>('[data-signature]')
    if (sig) {
      running.push(
        sig.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 700,
          delay: 820,
          easing: 'ease-out',
          fill: 'both',
        }),
      )
    }

    // 3. Hand-off to the hero
    timers.push(
      setTimeout(() => {
        running.push(
          text.animate([{ opacity: 1 }, { opacity: 0, transform: 'translateY(-8px)' }], {
            duration: 350,
            easing: 'ease-in',
            fill: 'forwards',
          }),
        )

        const target = document.querySelector('[data-hero-rosette]')?.getBoundingClientRect()
        const box = mark.getBoundingClientRect()
        const visible = target && target.width > 0 && target.top < window.innerHeight * 0.92

        if (target && visible) {
          const dx = target.left + target.width / 2 - (box.left + box.width / 2)
          const dy = target.top + target.height / 2 - (box.top + box.height / 2)
          const scale = target.width / box.width
          running.push(
            mark.animate(
              [
                { transform: 'translate(0, 0) scale(1)' },
                { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
              ],
              { duration: 950, easing: QUART, fill: 'forwards' },
            ),
          )
        } else {
          running.push(mark.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 600, fill: 'forwards' }))
        }

        running.push(
          veil.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: 800,
            delay: 150,
            easing: 'ease-in-out',
            fill: 'forwards',
          }),
        )
      }, 1550),
    )

    timers.push(setTimeout(finish, 2520))

    const skip = () => finish()
    window.addEventListener('keydown', skip, { once: true })
    window.addEventListener('wheel', skip, { once: true, passive: true })
    window.addEventListener('touchmove', skip, { once: true, passive: true })

    return () => {
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
      timers.forEach(clearTimeout)
      running.forEach((a) => a.cancel())
    }
  }, [])

  if (gone) return null

  return (
    <div
      ref={rootRef}
      className="intro fixed inset-0 z-[70] flex-col items-center justify-center"
      aria-hidden="true"
      onClick={() => {
        document.documentElement.dataset.introDone = 'true'
        setGone(true)
      }}
    >
      <div ref={veilRef} className="absolute inset-0 bg-noir" />

      <div ref={markRef} className="relative aspect-square w-[min(56vmin,32rem)]" style={{ clipPath: 'circle(0% at 50% 50%)' }}>
        <Image
          src="/brand/rosette.png"
          alt=""
          width={2000}
          height={2000}
          loading="lazy"
          sizes="(min-width: 1024px) 70vw, (min-width: 768px) 74vw, 118vw"
          className="h-full w-full"
        />
      </div>

      <div ref={textRef} className="absolute inset-x-0 bottom-[10vh] flex flex-col items-center gap-3 text-cream">
        <span data-logo className="block" style={{ clipPath: 'inset(0 100% 0 0)' }}>
          <Logo height={44} className="w-[min(70vw,15.5rem)]" />
        </span>
        <span data-signature className="text-sm font-semibold uppercase tracking-[0.14em] text-gold" style={{ opacity: 0 }}>
          The spirit behind every brand.
        </span>
      </div>
    </div>
  )
}
