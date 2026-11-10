import PageHero from '@/components/ui/PageHero'
import WorkIndex from '@/components/projects/WorkIndex'
import CtaBand from '@/components/sections/CtaBand'
import { projects } from '@/content/projects'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Work',
  description:
    'Products, platforms and websites designed and built by RaaVon, including our own ventures Klario and Sync, and work for clients.',
  path: '/work',
})

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Work"
        title="Products, platforms and sites we have built."
        lead="Our own ventures and the work we do for clients. Every client site comes with an admin console, so the team can run it without a developer."
      />
      <section aria-label="Projects" className="surface-cream section">
        <div className="container-site">
          <WorkIndex projects={projects} />
        </div>
      </section>
      <CtaBand />
    </>
  )
}
