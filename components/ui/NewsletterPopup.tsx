'use client'

import { useState, useEffect } from 'react'
import { X, ArrowRight } from 'lucide-react'
import Logo from '@/components/ui/Logo'

const STORAGE_KEY = 'raavon_nl_dismissed'

export default function NewsletterPopup() {
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sent'>('idle')

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY)) return

    /* Show after loader completes (~2.5s) */
    const t = setTimeout(() => setVisible(true), 2600)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    /* Replace with real API call when backend is ready */
    localStorage.setItem(STORAGE_KEY, '1')
    setStatus('sent')
    setTimeout(() => setVisible(false), 2000)
  }

  if (!visible) return null

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-[9995] flex items-end sm:items-center justify-center sm:justify-end p-4 sm:p-8"
      style={{ background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
      role="dialog"
      aria-modal="true"
      aria-label="Newsletter sign-up"
    >
      {/* Panel */}
      <div
        className="relative w-full sm:max-w-sm flex flex-col gap-6 p-8"
        style={{
          background: '#111009',
          border: '1px solid rgba(193,154,107,0.18)',
          animation: 'slideUp 0.45s cubic-bezier(0.16,1,0.3,1) both',
        }}
      >
        {/* Close */}
        <button
          onClick={dismiss}
          aria-label="Close newsletter popup"
          className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 transition-opacity hover:opacity-70"
          style={{ color: 'rgba(250,247,242,0.4)' }}
        >
          <X size={16} />
        </button>

        {status === 'sent' ? (
          <div className="flex flex-col gap-3 py-4 text-center">
            <p className="font-jakarta font-bold text-xl" style={{ color: '#FAF7F2' }}>
              You&apos;re in. ✦
            </p>
            <p className="font-dm text-sm" style={{ color: 'rgba(250,247,242,0.5)' }}>
              Expect great things in your inbox.
            </p>
          </div>
        ) : (
          <>
            {/* Caramel top accent line */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, #C19A6B, transparent)' }}
              aria-hidden="true"
            />

            <div className="flex flex-col gap-2">
              <Logo size="sm" />
              <p className="font-dm text-xs tracking-[0.2em] uppercase" style={{ color: '#C19A6B' }}>
                The Inside Track
              </p>
            </div>

            <div>
              <p className="font-jakarta font-bold text-lg mb-2" style={{ color: '#FAF7F2' }}>
                Stay close to the building.
              </p>
              <p className="font-dm text-sm leading-relaxed" style={{ color: 'rgba(250,247,242,0.5)' }}>
                New ventures, insights, and ideas from the Raavon Group — delivered to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                aria-label="Email address"
                style={{
                  background: 'rgba(193,154,107,0.06)',
                  border: '1px solid rgba(193,154,107,0.2)',
                  color: '#FAF7F2',
                  padding: '0.75rem 1rem',
                  fontSize: '0.875rem',
                  fontFamily: 'var(--font-dm), sans-serif',
                  outline: 'none',
                  width: '100%',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(193,154,107,0.2)')}
              />
              <button type="submit" className="btn-primary font-dm justify-center">
                Subscribe
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </form>

            <p className="font-dm text-xs text-center" style={{ color: 'rgba(250,247,242,0.25)' }}>
              No spam. Unsubscribe any time.
            </p>
          </>
        )}
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
