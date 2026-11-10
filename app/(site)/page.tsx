import Intro from '@/components/brand/Intro'
import CustomCursor from '@/components/motion/CustomCursor'
import Hero from '@/components/sections/Hero'
import WorkTrack from '@/components/sections/WorkTrack'
import CapabilitiesSection from '@/components/sections/CapabilitiesSection'
import AdminPromise from '@/components/sections/AdminPromise'
import VenturesSection from '@/components/sections/VenturesSection'
import WaysToWork from '@/components/sections/WaysToWork'
import ProcessSection from '@/components/sections/ProcessSection'
import AboutPreview from '@/components/sections/AboutPreview'
import ContactSection from '@/components/sections/ContactSection'
import { featuredTrack, getProject } from '@/content/projects'
import { pageMetadata } from '@/lib/metadata'
import { site } from '@/content/site'

export const metadata = pageMetadata({ description: site.description, path: '/' })

export default function HomePage() {
  const klario = getProject('klario')
  return (
    <>
      <Intro />
      <CustomCursor />
      <Hero now={klario && { label: `${klario.name}, ${klario.stage.toLowerCase()}`, href: `/work/${klario.slug}` }} />
      <WorkTrack items={featuredTrack()} />
      <CapabilitiesSection />
      <AdminPromise />
      <VenturesSection />
      <WaysToWork />
      <ProcessSection />
      <AboutPreview />
      <ContactSection />
    </>
  )
}
