'use client'

import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const isGrowing = useRef(false)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let raf: number

    const onMove = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        dot.style.left = `${e.clientX}px`
        dot.style.top = `${e.clientY}px`
        dot.style.opacity = '1'
      })
    }

    const onEnter = () => {
      if (!isGrowing.current) {
        isGrowing.current = true
        dot.style.transform = 'translate(-50%, -50%) scale(2.8)'
        dot.style.opacity = '0.6'
      }
    }

    const onLeave = () => {
      isGrowing.current = false
      dot.style.transform = 'translate(-50%, -50%) scale(1)'
      dot.style.opacity = '1'
    }

    document.addEventListener('mousemove', onMove)

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
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: '#C19A6B',
        pointerEvents: 'none',
        zIndex: 99999,
        transform: 'translate(-50%, -50%) scale(1)',
        transition: 'transform 0.2s ease, opacity 0.2s ease',
        opacity: 0,
        mixBlendMode: 'difference',
      }}
    />
  )
}
