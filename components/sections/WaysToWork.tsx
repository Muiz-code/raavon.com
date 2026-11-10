import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SectionIntro from '@/components/ui/SectionIntro'
import { engagements, partnershipTerms } from '@/content/engagement'

export default function WaysToWork({ headingLevel = 'h2' }: { headingLevel?: 'h2' }) {
  return (
    <section id="work-with-us" aria-labelledby="ways-title" className="surface-cream section">
      <div className="container-site">
        <SectionIntro
          as={headingLevel}
          id="ways-title"
          eyebrow="Ways to work together"
          title="Three ways to start."
          lead="Choose the one closest to where you are. We will shape the details with you."
        />

        <ol className="mt-16 grid border-t border-(--line-strong) md:mt-20 md:grid-cols-3">
          {engagements.map((e, i) => (
            <li
              key={e.slug}
              className="reveal flex flex-col border-b border-(--line-strong) py-10 md:border-b-0 md:px-8 md:py-12 md:first:pl-0 md:last:pr-0 md:not-first:border-l"
              style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
            >
              <span className="tabular text-sm font-semibold text-burgundy">0{i + 1}</span>
              <h3 className="display-m mt-4">{e.title}</h3>
              <p className="mt-4 text-soft">{e.description}</p>
              <dl className="mt-8 space-y-4 border-t border-(--line) pt-6 text-[0.9375rem]">
                <div>
                  <dt className="font-semibold">You bring</dt>
                  <dd className="text-soft">{e.youBring}</dd>
                </div>
                <div>
                  <dt className="font-semibold">We do</dt>
                  <dd className="text-soft">{e.weDo}</dd>
                </div>
              </dl>
              <Link href={`/contact?type=${e.enquiry}`} className="arrow-link mt-auto pt-8">
                Start this conversation
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>

        <aside
          aria-label="About technical partnerships"
          className="reveal mt-14 grid gap-4 rounded-xl bg-noir p-7 text-cream sm:p-10 md:grid-cols-12 md:items-center"
        >
          <p className="eyebrow text-gold md:col-span-3">On partnerships</p>
          <p className="md:col-span-9 md:text-lg">{partnershipTerms}</p>
        </aside>
      </div>
    </section>
  )
}
