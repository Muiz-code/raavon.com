import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CtaBand({
  title = 'What are you ready to build?',
  body = 'Tell us about the product, platform or partnership you have in mind.',
}: {
  title?: string
  body?: string
}) {
  return (
    <section aria-labelledby="cta-title" className="surface-noir section">
      <div className="container-site flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-3xl">
          <h2 id="cta-title" className="display-l reveal">
            {title}
          </h2>
          <p className="lead reveal mt-6 text-soft" style={{ '--reveal-delay': '100ms' } as React.CSSProperties}>
            {body}
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary reveal shrink-0 self-start md:self-auto" style={{ '--reveal-delay': '180ms' } as React.CSSProperties}>
          Build with us
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}
