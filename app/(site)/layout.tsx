import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'
import ScrollTracker from '@/components/motion/ScrollTracker'
import ScrollEffects from '@/components/motion/ScrollEffects'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link btn btn-primary">
        Skip to content
      </a>
      <ScrollTracker />
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter />
      <ScrollEffects />
    </>
  )
}
