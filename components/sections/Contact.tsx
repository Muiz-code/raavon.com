'use client'

import { useState } from 'react'
import { ArrowRight, Send, CheckCircle } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const CONTACT_LINKS = [
  { label: 'contact@raavon.com', href: 'mailto:contact@raavon.com' },
  { label: 'Lagos, Nigeria', href: '#' },
]

type FormState = 'idle' | 'sending' | 'sent' | 'error'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<FormState>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    /* Send via mailto as a fallback — replace with API route when backend is ready */
    await new Promise((r) => setTimeout(r, 1000))
    const body = `Name: ${form.name}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    window.location.href = `mailto:contact@raavon.com?subject=${encodeURIComponent(form.subject || 'Enquiry from raavon.com')}&body=${encodeURIComponent(body)}`
    setStatus('sent')
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  const inputBase: React.CSSProperties = {
    background: 'var(--card)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    outline: 'none',
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-dm), sans-serif',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section
      id="contact"
      className="px-6 md:px-12 py-28 md:py-36"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-14 md:gap-20 items-start">

        {/* Left — info */}
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
              Have an idea?<br />
              <span style={{ color: '#C19A6B' }}>Let&apos;s make it real.</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p className="font-dm leading-relaxed mb-10" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
              Whether you are a partner, investor, or someone with an idea that
              deserves to exist — we want to hear from you.
            </p>
          </ScrollReveal>

          <div className="flex flex-col gap-5">
            {CONTACT_LINKS.map((link, i) => (
              <ScrollReveal key={link.label} delay={0.25 + i * 0.1}>
                <a
                  href={link.href}
                  className="contact-link font-dm text-base font-medium"
                  style={{ color: 'var(--text)' }}
                >
                  <ArrowRight size={15} style={{ color: '#C19A6B', flexShrink: 0 }} aria-hidden="true" />
                  {link.label}
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <ScrollReveal delay={0.15}>
          {status === 'sent' ? (
            <div
              className="flex flex-col items-center justify-center gap-5 py-20 text-center"
              style={{ border: '1px solid var(--border)', background: 'var(--card)' }}
            >
              <CheckCircle size={40} style={{ color: '#C19A6B' }} />
              <h3 className="font-jakarta font-bold text-xl" style={{ color: 'var(--text)' }}>
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
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
              noValidate
            >
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
                    style={inputBase}
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
                    style={inputBase}
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
                  style={{ ...inputBase, cursor: 'pointer' }}
                  onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                >
                  <option value="" disabled>Select a subject</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Investment">Investment</option>
                  <option value="Careers">Careers</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Other">Other</option>
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
                  placeholder="Tell us about your idea, project, or enquiry..."
                  style={{ ...inputBase, resize: 'vertical' }}
                  onFocus={(e) => (e.target.style.borderColor = '#C19A6B')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>

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
