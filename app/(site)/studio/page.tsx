import PageHero from '@/components/ui/PageHero'
import Studio from '@/components/studio/Studio'
import { studioFontVariables } from '@/components/studio/fonts'
import { pageMetadata } from '@/lib/metadata'

export const metadata = pageMetadata({
  title: 'Studio',
  description:
    'A playground for website ideas. Pick a starting point, change the look, preview it on any screen, then send it to RaaVon as a brief.',
  path: '/studio',
})

export default function StudioPage() {
  return (
    <>
      <PageHero
        eyebrow="Studio"
        title="Shape a website in minutes."
        lead="A playground for ideas. Pick a starting point, change the words and the look, see it on any screen, then send it to us as a brief."
      />
      <section aria-label="Website builder" className={`surface-cream py-12 md:py-16 ${studioFontVariables}`}>
        <div className="container-site">
          <Studio />
        </div>
      </section>
    </>
  )
}
