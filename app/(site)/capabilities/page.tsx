import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import WaysToWork from '@/components/sections/WaysToWork'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaBand from '@/components/sections/CtaBand'
import AdminPromise from '@/components/sections/AdminPromise'
import { capabilities } from '@/content/capabilities'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Capabilities',
  description:
    'Digital product development, business systems and automation, integrations and AI features, and technical venture partnerships.',
  path: '/capabilities',
})

export default function CapabilitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Capabilities"
        title="Products and systems, designed and built with care."
        lead="We work on four kinds of problem. Each one is defined by what you need and what you will have at the end."
      >
        <nav aria-label="Capabilities on this page">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {capabilities.map((c) => (
              <li key={c.slug}>
                <a href={`#${c.slug}`} className="link inline-flex min-h-11 items-center text-soft hover:text-cream">
                  {c.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="surface-cream">
        {capabilities.map((c, i) => (
          <section
            key={c.slug}
            id={c.slug}
            aria-labelledby={`${c.slug}-title`}
            className={i % 2 === 1 ? 'bg-cream-raised' : undefined}
          >
            <div className="container-site grid gap-10 py-20 md:grid-cols-12 md:gap-10 md:py-28">
              <div className="md:col-span-5">
                <div className="md:sticky md:top-32">
                  <p className="tabular reveal text-[clamp(4rem,2rem+8vw,9rem)] font-extrabold leading-none tracking-[-0.04em] text-burgundy">
                    {c.index}
                  </p>
                  <h2 id={`${c.slug}-title`} className="display-m reveal mt-6 max-w-sm" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
                    {c.title}
                  </h2>
                </div>
              </div>

              <div className="md:col-span-6 md:col-start-7 md:pt-4">
                <p className="lead reveal">{c.summary}</p>
                <p className="reveal mt-6 text-soft" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
                  {c.forWhom}
                </p>

                <h3 className="eyebrow reveal mt-12">What you receive</h3>
                <ul className="mt-5 border-t border-(--line-strong)">
                  {c.deliverables.map((d, j) => (
                    <li
                      key={d}
                      className="reveal flex items-baseline gap-5 border-b border-(--line-strong) py-4 text-lg font-semibold"
                      style={{ '--reveal-delay': `${j * 50}ms` } as React.CSSProperties}
                    >
                      <span className="tabular text-sm text-soft">{String(j + 1).padStart(2, '0')}</span>
                      {d}
                    </li>
                  ))}
                </ul>

                <div className="reveal mt-10 flex flex-wrap gap-x-8 gap-y-2">
                  {c.evidence && (
                    <Link href={c.evidence.href} className="arrow-link">
                      {c.evidence.label}
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                  )}
                  <Link href="/contact" className="arrow-link">
                    Discuss a project
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <div className="surface-cream pt-4">
        <AdminPromise />
      </div>
      <WaysToWork />
      <ProcessSection />
      <CtaBand />
    </>
  )
}
