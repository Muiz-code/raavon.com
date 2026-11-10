'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from '@/components/brand/Logo'
import { primaryNav, site } from '@/content/site'

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Slide the header away once the footer reaches the top 30% of the screen,
  // so the header logo never sits on top of the footer's own logo.
  const [atFooter, setAtFooter] = useState(false)
  useEffect(() => {
    const footer = document.getElementById('site-footer')
    if (!footer) return
    const io = new IntersectionObserver(([entry]) => setAtFooter(entry.isIntersecting), {
      rootMargin: '0px 0px -70% 0px',
    })
    io.observe(footer)
    return () => io.disconnect()
  }, [pathname])

  // Close the menu whenever the route changes (adjusting state during render)
  const [prevPath, setPrevPath] = useState(pathname)
  if (pathname !== prevPath) {
    setPrevPath(pathname)
    setOpen(false)
  }

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  // Mobile menu: lock background scroll, trap focus, close on Escape
  useEffect(() => {
    if (!open) return
    const menu = menuRef.current
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    menu?.querySelector<HTMLElement>('a, button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key !== 'Tab' || !menu) return
      const focusable = Array.from(menu.querySelectorAll<HTMLElement>('a, button'))
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close])

  return (
    <>
      <header
        className="site-header surface-noir fixed inset-x-0 top-0 z-50 border-b border-transparent"
        data-scrolled={scrolled || open}
        data-hidden={atFooter && !open}
      >
        <div className="container-site flex h-18 items-center justify-between gap-6 md:h-20">
          <Link href="/" className="inline-flex min-h-12 items-center" aria-label={`${site.name}, home`}>
            <Logo height={26} priority />
          </Link>

          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn btn-primary hidden md:inline-flex">
              Build with us
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-12 items-center justify-center rounded-lg text-cream md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => (open ? close() : setOpen(true))}
            >
              {open ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          className="surface-noir fixed inset-0 z-40 flex flex-col overflow-y-auto pt-18 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
        >
          <nav aria-label="Mobile" className="container-site flex flex-1 flex-col py-10">
            <ul className="flex flex-col border-t border-(--line)">
              {[...primaryNav, { label: 'Contact', href: '/contact' }].map((item, i) => (
                <li key={item.href} className="border-b border-(--line)">
                  <Link
                    href={item.href}
                    className="flex min-h-16 items-center justify-between py-4 text-[2rem] font-extrabold tracking-[-0.02em]"
                    aria-current={isActive(pathname, item.href) ? 'page' : undefined}
                  >
                    <span className={isActive(pathname, item.href) ? 'text-gold' : undefined}>{item.label}</span>
                    <span className="text-sm font-semibold text-mist tabular">0{i + 1}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-6 pt-12">
              <Link href="/contact" className="btn btn-primary w-full">
                Build with us
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
              <a href={`mailto:${site.email}`} className="link text-mist">
                {site.email}
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  )
}
