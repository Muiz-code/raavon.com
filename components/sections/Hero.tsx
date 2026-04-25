import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Subtle left-side ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          width: 'clamp(300px, 40vw, 600px)',
          height: 'clamp(300px, 40vw, 600px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(78,44,32,0.18) 0%, transparent 70%)',
          bottom: '5%',
          left: '-10%',
          animation: 'drift-reverse 20s ease-in-out infinite alternate',
          filter: 'blur(70px)',
        }}
      />

      {/* Two-column grid */}
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_480px] lg:grid-cols-[1fr_560px] min-h-screen">

        {/* ── Left — text content ── */}
        <div className="flex flex-col justify-center px-6 md:pl-12 md:pr-10 pt-28 pb-20 relative z-10">
          <ScrollReveal>
            <p
              className="font-dm text-xs tracking-[0.25em] uppercase mb-10"
              style={{ color: '#C19A6B' }}
            >
              Raavon Group — Est. 2025
            </p>
          </ScrollReveal>

          <h1
            className="font-jakarta font-extrabold leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(3rem, 7vw, 7.5rem)', color: 'var(--text)' }}
          >
            <ScrollReveal delay={0.05}>
              <span className="block">We bring</span>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <span
                className="block font-fraunces italic font-light"
                style={{ color: '#C19A6B', fontSize: 'clamp(3.3rem, 7.8vw, 8.2rem)' }}
              >
                ideas
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <span className="block">to life.</span>
            </ScrollReveal>
          </h1>

          <ScrollReveal delay={0.35}>
            <p
              className="font-dm text-base md:text-lg max-w-md mb-12 leading-relaxed"
              style={{ color: 'var(--muted)' }}
            >
              A digital studio that builds products people need.
              <br />
              Born in Nigeria — built for everywhere.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.45}>
            <div className="flex flex-wrap items-center gap-6">
              <a href="#ventures" className="btn-primary font-dm">
                Our Ventures
                <ArrowRight size={15} aria-hidden="true" />
              </a>
              <a
                href="#contact"
                className="font-dm text-sm tracking-wide flex items-center gap-2"
                style={{ color: 'var(--muted)' }}
              >
                Get in Touch
                <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* ── Right — bulb image ── */}
        <div className="hidden md:flex items-start justify-center relative overflow-hidden pt-0">

          {/* Left-edge fade so image blends into page */}
          <div
            className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
            aria-hidden="true"
          />

          {/* Warm caramel glow behind the bulb */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: '5%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(193,154,107,0.14) 0%, transparent 70%)',
              filter: 'blur(30px)',
              animation: 'drift 12s ease-in-out infinite alternate',
            }}
            aria-hidden="true"
          />

          <Image
            src="https://i.pinimg.com/1200x/f5/35/bc/f535bc04811602bd6d8aa5917acb6ece.jpg"
            alt="A lit lightbulb hanging on a long wire — the symbol of an idea"
            width={560}
            height={900}
            priority
            className="w-full h-full"
            style={{
              objectFit: 'cover',
              objectPosition: 'top center',
              mixBlendMode: 'screen',
              opacity: 0.88,
            }}
          />
        </div>

      </div>
    </section>
  )
}
