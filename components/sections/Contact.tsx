import { ArrowRight } from 'lucide-react'
import ScrollReveal from '@/components/ui/ScrollReveal'

const EMAIL = 'hello@raavon.com'

const CONTACT_OPTIONS = [
  {
    label: 'hello@raavon.com',
    href: `mailto:${EMAIL}`,
  },
  {
    label: 'Partnerships',
    href: `mailto:${EMAIL}?subject=Partnership%20Enquiry`,
  },
  {
    label: 'Investments',
    href: `mailto:${EMAIL}?subject=Investment%20Enquiry`,
  },
  {
    label: 'General enquiries',
    href: `mailto:${EMAIL}?subject=General%20Enquiry`,
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-12 py-28 md:py-36"
      style={{ background: 'var(--surface)' }}
      aria-labelledby="contact-heading"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 md:gap-20 items-start">

        {/* Left — heading + body */}
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
            <p className="font-dm leading-relaxed" style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>
              Whether you are a potential partner, investor, or someone with
              an idea that deserves to exist in the world — we want to hear
              from you.
            </p>
          </ScrollReveal>
        </div>

        {/* Right — email links */}
        <div className="flex flex-col gap-5 md:pt-16">
          {CONTACT_OPTIONS.map((opt, i) => (
            <ScrollReveal key={opt.label} delay={0.1 + i * 0.08}>
              <a
                href={opt.href}
                className="group flex items-center gap-3 font-dm text-base font-medium py-3 border-b transition-colors duration-200"
                style={{
                  borderColor: 'var(--border)',
                  color: 'var(--text)',
                }}
              >
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  style={{ color: '#C19A6B', flexShrink: 0, transition: 'transform 0.2s ease' }}
                  className="group-hover:translate-x-1"
                />
                <span className="group-hover:text-caramel transition-colors duration-200">
                  {opt.label}
                </span>
              </a>
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  )
}
