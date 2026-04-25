'use client'

import { useEffect, useRef } from 'react'

export function useCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let raf: number

    const move = (e: MouseEvent) => {
      raf = requestAnimationFrame(() => {
        dot.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      })
    }

    const grow = () => dot.classList.add('cursor-grow')
    const shrink = () => dot.classList.remove('cursor-grow')

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button, [data-cursor-grow]').forEach((el) => {
      el.addEventListener('mouseenter', grow)
      el.addEventListener('mouseleave', shrink)
    })

    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return dotRef
}
