import ContactForm from '@/components/forms/ContactForm'
import { site } from '@/content/site'
import type { EnquiryType } from '@/content/engagement'

const nextSteps = [
  'We read every enquiry and reply to those that are a good fit.',
  'A first conversation to understand the problem, users and constraints.',
  'A written scope with phases, responsibilities and terms.',
]

/**
 * `withHeading={false}` is used on /contact, where the page hero carries the h1.
 */
export default function ContactSection({
  withHeading = true,
  defaultEnquiry,
  defaultMessage,
}: {
  withHeading?: boolean
  defaultEnquiry?: EnquiryType
  defaultMessage?: string
}) {
  return (
    <section
      id="contact"
      aria-labelledby={withHeading ? 'contact-title' : undefined}
      aria-label={withHeading ? undefined : 'Enquiry form'}
      className="surface-cream section"
    >
      <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          {withHeading && (
            <>
              <p className="eyebrow reveal">Contact</p>
              <h2 id="contact-title" className="display-l reveal mt-5" style={{ '--reveal-delay': '80ms' } as React.CSSProperties}>
                What are you ready to build?
              </h2>
              <p className="lead reveal mt-6 text-soft" style={{ '--reveal-delay': '160ms' } as React.CSSProperties}>
                Tell us about the product, platform or partnership you have in mind.
              </p>
            </>
          )}

          <div className={`reveal ${withHeading ? 'mt-12' : ''}`} style={{ '--reveal-delay': '220ms' } as React.CSSProperties}>
            {withHeading ? <h3 className="font-semibold">What happens next</h3> : <h2 className="font-semibold">What happens next</h2>}
            <ol className="mt-4 space-y-3">
              {nextSteps.map((s, i) => (
                <li key={s} className="flex gap-4 text-soft">
                  <span className="tabular font-semibold text-burgundy">0{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <p className="reveal mt-12 text-soft">
            Or email us directly at{' '}
            <a href={`mailto:${site.email}`} className="link font-semibold text-noir">
              {site.email}
            </a>
          </p>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7" style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <ContactForm
            key={`${defaultEnquiry ?? 'none'}-${defaultMessage?.length ?? 0}`}
            defaultEnquiry={defaultEnquiry}
            defaultMessage={defaultMessage}
          />
        </div>
      </div>
    </section>
  )
}
