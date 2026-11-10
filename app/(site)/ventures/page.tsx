import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/ui/PageHero'
import Device from '@/components/projects/Device'
import CtaBand from '@/components/sections/CtaBand'
import { partnershipTerms } from '@/content/engagement'
import { coverScreen, ownedVentures, phoneScreen } from '@/content/projects'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Ventures',
  description:
    'The products RaaVon owns and builds: Klario, financial intelligence for individuals and businesses, and Sync, a verified marketplace for campus life.',
  path: '/ventures',
})

export default function VenturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Ventures"
        title="Products we own and build."
        lead="RaaVon creates and runs its own ventures. Each one keeps its own name and identity, with RaaVon behind it."
      />

      <section aria-label="Our ventures" className="surface-noir">
        {ownedVentures.map((v, i) => {
          const cover = coverScreen(v)
          const phone = phoneScreen(v)
          return (
            <article
              key={v.slug}
              aria-labelledby={`${v.slug}-name`}
              className="border-t border-(--line) py-20 md:py-32"
            >
              <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <p className="eyebrow reveal flex gap-3">
                    <span className="tabular text-soft">{String(i + 1).padStart(2, '0')}</span>
                    {v.sector} · {v.stage}
                  </p>
                  <h2 id={`${v.slug}-name`} className="reveal mt-6">
                    {v.logo ? (
                      <Image src={v.logo.onDark} alt={v.name} width={v.logo.width} height={v.logo.height} sizes="300px" className="h-auto w-56 sm:w-72" />
                    ) : (
                      <span className="display-l block">{v.name}</span>
                    )}
                  </h2>
                  <p className="reveal mt-8 text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] font-extrabold leading-tight tracking-[-0.015em]">
                    {v.tagline}
                  </p>
                  <p className="reveal mt-5 text-soft">{v.summary}</p>

                  <ul className="mt-10 border-t border-(--line)">
                    {v.surfaces.map((s) => (
                      <li key={s.id} className="reveal border-b border-(--line) py-4">
                        <Link href={`/work/${v.slug}#${s.id}`} className="group flex items-baseline justify-between gap-4">
                          <span>
                            <span className="block font-semibold group-hover:text-gold">{s.name}</span>
                            <span className="text-sm text-soft">{s.audience}</span>
                          </span>
                          <ArrowRight size={18} aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link href={`/work/${v.slug}`} className="btn btn-secondary reveal mt-10" data-cursor="View">
                    Read the {v.name} story
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>

                <div className="relative lg:col-span-7 lg:pt-10">
                  {cover && (
                    <div className="reveal" data-parallax="8">
                      <Device screen={cover} sizes="(min-width: 1024px) 55vw, 92vw" decorative className="lg:mr-[10%]" />
                    </div>
                  )}
                  {phone && phone !== cover && (
                    <div className="absolute -bottom-10 right-0 w-[26%] max-w-56" data-parallax="18">
                      <Device screen={phone} sizes="14rem" decorative />
                    </div>
                  )}
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section aria-labelledby="partner-title" className="surface-cream section">
        <div className="container-site grid gap-8 md:grid-cols-12">
          <h2 id="partner-title" className="display-m reveal md:col-span-5">
            Building a venture of your own?
          </h2>
          <div className="md:col-span-6 md:col-start-7">
            <p className="reveal text-lg">
              We work with selected founders as a technical partner, contributing product and engineering capability over
              time.
            </p>
            <p className="reveal mt-4 text-soft">{partnershipTerms}</p>
            <Link href="/contact?type=technical-partnership" className="arrow-link reveal mt-6">
              Explore a technical partnership
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  )
}
