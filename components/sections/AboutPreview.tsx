import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { site } from '@/content/site'

export default function AboutPreview() {
  return (
    <section id="about" aria-labelledby="about-title" className="surface-noir section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 hidden aspect-square -translate-y-1/2 select-none md:-left-[22vw] md:block md:w-[44vw]"
      >
        <Image src="/brand/rosette.png" alt="" width={2000} height={2000} sizes="60vw" className="h-full w-full" />
      </div>

      <div className="container-site relative">
        <div className="md:ml-[32%] md:max-w-3xl lg:ml-[38%]">
          <p className="eyebrow reveal">About RaaVon</p>
          <h2 id="about-title" className="display-l reveal mt-5" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
            One parent brand. Ventures with their own names.
          </h2>
          <div className="reveal mt-8 space-y-5 text-lg text-soft" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
            <p>
              RaaVon creates ventures and works with businesses on their products. Our ventures keep their own identities
              and may carry a discreet RaaVon endorsement.
            </p>
            <p>
              The same team, standards and process sit behind both: our own products and the work we do with clients.
            </p>
          </div>
          <p className="reveal mt-10 text-2xl font-semibold text-gold" style={{ '--reveal-delay': '220ms' } as React.CSSProperties}>
            {site.signature}
          </p>
          <Link href="/about" className="btn btn-secondary reveal mt-10" style={{ '--reveal-delay': '280ms' } as React.CSSProperties}>
            More about RaaVon
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
