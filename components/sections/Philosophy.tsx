import ScrollReveal from '@/components/ui/ScrollReveal'

export default function Philosophy() {
  return (
    <section
      id="philosophy"
      className="relative px-6 md:px-12 py-36 md:py-48 flex items-center justify-center overflow-hidden text-center"
      aria-label="Philosophy"
    >
      {/* Ghost watermark */}
      <span
        aria-hidden="true"
        className="absolute font-jakarta font-extrabold select-none pointer-events-none"
        style={{
          fontSize: 'clamp(6rem, 22vw, 20rem)',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(193,154,107,0.08)',
          letterSpacing: '-0.04em',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          zIndex: 0,
        }}
      >
        RAAVON
      </span>

      <div className="relative z-10 max-w-3xl">
        <ScrollReveal>
          <blockquote>
            <p
              className="font-fraunces italic font-light leading-snug mb-8"
              style={{
                fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)',
                color: 'var(--text)',
                lineHeight: 1.35,
              }}
            >
              &ldquo;The greatest ideas are not invented —<br />
              they are revealed.<br />
              We reveal them.&rdquo;
            </p>
            <footer>
              <cite
                className="font-dm text-sm tracking-widest uppercase not-italic"
                style={{ color: '#C19A6B' }}
              >
                — Raavon Group
              </cite>
            </footer>
          </blockquote>
        </ScrollReveal>
      </div>
    </section>
  )
}
