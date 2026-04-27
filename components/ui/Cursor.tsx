'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    /* Skip on touch/hover-none devices (phones, tablets) */
    if (window.matchMedia('(hover: none)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12
      ring.style.left = `${ringPos.current.x}px`
      ring.style.top = `${ringPos.current.y}px`
      rafRef.current = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(2.2)'
      ring.style.transform = 'translate(-50%, -50%) scale(1.6)'
      ring.style.opacity = '0.3'
    }

    const onLeave = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.transform = 'translate(-50%, -50%) scale(1)'
      ring.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)
    rafRef.current = requestAnimationFrame(animate)

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-grow]').forEach((el) => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    addListeners()

    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* 8px caramel dot — tracks mouse directly */}
      <div
        ref={dotRef}
        aria-hidden="true"
        data-cursor="dot"
        style={{
          position: 'fixed',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#C19A6B',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.15s ease',
          opacity: 0,
          left: 0,
          top: 0,
        }}
      />
      {/* 36px ring — lags behind via RAF lerp */}
      <div
        ref={ringRef}
        aria-hidden="true"
        data-cursor="ring"
        style={{
          position: 'fixed',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1px solid rgba(193,154,107,0.55)',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          opacity: 0,
          left: 0,
          top: 0,
        }}
      />
    </>
  )
}
