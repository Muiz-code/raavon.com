import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import ProcessSection from '@/components/sections/ProcessSection'
import CtaBand from '@/components/sections/CtaBand'
import { site } from '@/content/site'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'About',
  description:
    'RaaVon is a venture builder and technology partner. We create our own ventures and work with selected businesses and founders.',
  path: '/about',
})

const principles = [
  {
    title: 'Purpose',
    body: 'Turn ambitious ideas into useful products and enduring businesses.',
  },
  {
    title: 'Personality',
    body: 'Thoughtful, capable and ambitious. Confident in the work, precise in the claims.',
  },
  {
    title: 'Brand relationship',
    body: 'RaaVon is the parent brand. Ventures keep their own identities and may use a discreet RaaVon endorsement.',
  },
]

const rd = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as React.CSSProperties

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A venture builder and technology partner."
        lead={site.description}
      />

      <section aria-labelledby="model-title" className="surface-cream section">
        <div className="container-site grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow reveal">How RaaVon is structured</p>
            <h2 id="model-title" className="display-l reveal mt-5" style={rd(80)}>
              Two kinds of work. One standard.
            </h2>
          </div>
          <div className="grid gap-px overflow-hidden rounded-2xl bg-(--line-strong) sm:grid-cols-2 md:col-span-7">
            <div className="reveal bg-cream-raised p-8 md:p-10">
              <p className="text-sm font-semibold text-burgundy">Our ventures</p>
              <h3 className="display-m mt-4">We create and run our own products.</h3>
              <p className="mt-4 text-soft">
                Each venture has its own name, identity and customers. Klario is the first.
              </p>
              <Link href="/ventures" className="arrow-link mt-6">
                See our ventures
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="reveal bg-cream-raised p-8 md:p-10" style={rd(100)}>
              <p className="text-sm font-semibold text-burgundy">Client work</p>
              <h3 className="display-m mt-4">We build with selected businesses and founders.</h3>
              <p className="mt-4 text-soft">
                We design, develop and improve digital products, and act as a technical partner on agreed terms.
              </p>
              <Link href="/capabilities" className="arrow-link mt-6">
                See our capabilities
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="principles-title" className="surface-noir section">
        <div className="container-site">
          <p className="eyebrow reveal">What guides us</p>
          <h2 id="principles-title" className="sr-only">
            What guides us
          </h2>
          <ol className="mt-10 border-t border-(--line)">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal grid gap-4 border-b border-(--line) py-10 md:grid-cols-12 md:py-14" style={rd(i * 80)}>
                <span className="tabular text-sm font-semibold text-gold md:col-span-1 md:pt-2">0{i + 1}</span>
                <h3 className="display-m md:col-span-4">{p.title}</h3>
                <p className="lead text-soft md:col-span-6 md:col-start-7">{p.body}</p>
              </li>
            ))}
          </ol>
          <p className="reveal mt-16 text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-extrabold tracking-[-0.02em] text-gold">
            {site.signature}
          </p>
        </div>
      </section>

      <ProcessSection />
      <CtaBand />
    </>
  )
}
