import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import SectionIntro from '@/components/ui/SectionIntro'
import { capabilities } from '@/content/capabilities'

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className="surface-cream section">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionIntro
            id="capabilities-title"
            eyebrow="Capabilities"
            title="What you can engage us to build."
            lead="Four areas of work, each defined by what you need and what you receive at the end."
          />
          <Link href="/capabilities" className="arrow-link reveal shrink-0">
            All capabilities
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <ol className="mt-16 md:mt-24">
          {capabilities.map((c, i) => (
            <li key={c.slug} className="reveal relative" style={{ '--reveal-delay': `${i * 60}ms` } as React.CSSProperties}>
              <span aria-hidden="true" className="draw-x absolute inset-x-0 top-0 h-px bg-(--line-strong)" />
              <Link
                href={`/capabilities#${c.slug}`}
                className="group grid gap-4 py-10 transition-colors md:grid-cols-12 md:gap-8 md:py-12"
              >
                <span className="tabular text-sm font-semibold text-burgundy md:col-span-1 md:pt-3">{c.index}</span>
                <h3 className="display-m md:col-span-5 md:text-[clamp(1.75rem,1rem+1.8vw,2.75rem)]">
                  <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_2px]">
                    {c.title}
                  </span>
                </h3>
                <div className="md:col-span-5">
                  <p className="text-soft">{c.summary}</p>
                  <p className="mt-4 text-sm font-semibold">{c.deliverables.join('  /  ')}</p>
                </div>
                <ArrowUpRight
                  size={26}
                  aria-hidden="true"
                  className="hidden justify-self-end text-burgundy transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:col-span-1 md:block"
                />
              </Link>
            </li>
          ))}
        </ol>
        <span aria-hidden="true" className="draw-x reveal block h-px bg-(--line-strong)" />
      </div>
    </section>
  )
}
