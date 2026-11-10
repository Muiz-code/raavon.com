import PageHero from '@/components/ui/PageHero'
import ContactSection from '@/components/sections/ContactSection'
import { enquiryTypes, type EnquiryType } from '@/content/engagement'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Contact',
  description:
    'Start a project or discuss a technical partnership with RaaVon. Tell us what you are ready to build.',
  path: '/contact',
})

export default async function ContactPage({ searchParams }: PageProps<'/contact'>) {
  const { type, brief } = await searchParams
  const defaultEnquiry = enquiryTypes.find((t) => t.value === type)?.value as EnquiryType | undefined
  // A brief sent from /studio. Plain text only, trimmed to a sensible length.
  const defaultMessage = typeof brief === 'string' ? brief.replace(/[<>]/g, '').slice(0, 800) : undefined

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="What are you ready to build?"
        lead="Tell us about the product, platform or partnership you have in mind."
      />
      <ContactSection withHeading={false} defaultEnquiry={defaultEnquiry} defaultMessage={defaultMessage} />
    </>
  )
}
