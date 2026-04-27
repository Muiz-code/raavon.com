'use client'

import { useState } from 'react'
import { ArrowRight, Send } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'
import { useToast } from '@/context/ToastContext'

const EMAIL = 'contact@raavon.com'

const QUICK_LINKS = [
  { label: 'contact@raavon.com', href: `mailto:${EMAIL}` },
  { label: 'Partnerships', href: `mailto:${EMAIL}?subject=Partnership%20Enquiry` },
  { label: 'Investments', href: `mailto:${EMAIL}?subject=Investment%20Enquiry` },
  { label: 'General enquiries', href: `mailto:${EMAIL}?subject=General%20Enquiry` },
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
  padding: '0.85rem 1rem',
  fontSize: '0.9rem',
  fontFamily: 'var(--font-dm), sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s ease',
}

type Status = 'idle' | 'sending' | 'sent'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', newsletter: false })
  const [status, setStatus] = useState<Status>('idle')
  const toast = useToast()

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '', newsletter: false })
    } catch {
      setStatus('idle')
      toast('Something went wrong. Email us at contact@raavon.com', 'error')
    }
  }

  return (
    <section
      id="contact"
      className="px-10 py-28 md:py-36"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-start">

        {/* Left */}
        <div>
          <ScrollReveal>
            <p className="font-dm text-xs tracking-[0.25em] uppercase mb-6" style={{ color: '#C19A6B' }}>
              Contact
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2
              id="contact-heading"
              className="font-jakarta font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--text)' }}
            >
              Have an idea?
              <br />
              <span className="font-fraunces italic font-light" style={{ color: '#C19A6B' }}>
                Let&apos;s make it
              </span>
              <br />
              real.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-dm leading-relaxed mb-10" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
              Whether you are a potential partner, investor, or someone with
              an idea that deserves to exist in the world — we want to hear
              from you.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-4">
            {QUICK_LINKS.map((link, i) => (
              <ScrollReveal key={link.label} delay={0.25 + i * 0.07}>
                <a
                  href={link.href}
                  className="group flex items-center gap-3 font-dm text-sm py-2 border-b transition-colors duration-200"
                  style={{ borderColor: 'var(--border)', color: 'var(--muted)' }}
                >
                  <ArrowRight
                    size={13}
                    aria-hidden="true"
                    style={{ color: '#C19A6B', flexShrink: 0 }}
                    className="group-hover:translate-x-1 transition-transform duration-200"
                  />
                  <span className="group-hover:text-caramel transition-colors duration-200">
                    {link.label}
                  </span>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <ScrollReveal delay={0.15}>
          {status === 'sent' ? (
            <div
              className="flex flex-col items-center justify-center gap-4 py-20 text-center"
              style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  border: '1px solid #C19A6B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Send size={18} style={{ color: '#C19A6B' }} />
              </div>
              <h3 className="font-jakarta font-bold text-lg" style={{ color: 'var(--text)' }}>
                Message sent.
              </h3>
              <p className="font-dm text-sm" style={{ color: 'var(--muted)' }}>
                We&apos;ll be in touch shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="font-dm text-xs tracking-widest uppercase mt-2"
                style={{ color: '#C19A6B' }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-dm text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your name"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-dm text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-dm text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Investment">Investment</option>
                  <option value="Project Inquiry">Project Inquiry</option>
                  <option value="General Inquiry">General Inquiry</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-dm text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Tell us about your idea or enquiry..."
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

              {/* Newsletter opt-in */}
              <label
                style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', flexShrink: 0, marginTop: '2px' }}>
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={form.newsletter}
                    onChange={handleChange}
                    style={{ position: 'absolute', opacity: 0, width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      border: `1px solid ${form.newsletter ? '#C19A6B' : 'rgba(193,154,107,0.3)'}`,
                      background: form.newsletter ? 'rgba(193,154,107,0.12)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {form.newsletter && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="#C19A6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="font-dm text-xs leading-relaxed" style={{ color: 'rgba(250,247,242,0.45)' }}>
                  Keep me updated — subscribe to the Raavon newsletter
                </span>
              </label>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn-primary font-dm mt-2 self-start"
                style={{ opacity: status === 'sending' ? 0.6 : 1 }}
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
                <Send size={14} aria-hidden="true" />
              </button>

            </form>
          )}
        </ScrollReveal>

      </div>
    </section>
  )
}
