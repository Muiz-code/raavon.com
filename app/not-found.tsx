import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import SiteHeader from '@/components/layout/SiteHeader'
import SiteFooter from '@/components/layout/SiteFooter'

export const metadata: Metadata = { title: 'Page not found' }

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="surface-noir flex min-h-[80svh] items-center pb-20 pt-36">
        <div className="container-site">
          <p className="eyebrow">Page not found</p>
          <h1 className="display-xl mt-6 max-w-3xl">This page does not exist.</h1>
          <p className="lead mt-6 max-w-xl text-soft">
            The link may be out of date, or the page may have moved.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Go to the home page
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/ventures" className="btn btn-secondary">
              See our ventures
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
