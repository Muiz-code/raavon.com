import Image from 'next/image'
import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import NewsletterForm from '@/components/forms/NewsletterForm'
import { footerNav, site } from '@/content/site'

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer id="site-footer" className="surface-noir border-t border-(--line)">
      <div className="container-site grid gap-14 py-16 md:grid-cols-12 md:py-24">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex min-h-12 items-center" aria-label={`${site.name}, home`}>
            <Logo height={34} />
          </Link>
          <p className="mt-4 max-w-sm text-lg text-gold">{site.signature}</p>
          <p className="mt-6 max-w-sm text-soft">
            A venture builder and technology partner. We build our own ventures and work with selected businesses
            and founders.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="eyebrow mb-4">Explore</h2>
          <ul className="grid grid-cols-2 gap-x-6 md:grid-cols-1">
            {footerNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-soft transition-colors hover:text-cream">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="eyebrow mb-4">Contact</h2>
          <a href={`mailto:${site.email}`} className="link text-lg font-semibold">
            {site.email}
          </a>
          <div className="mt-10">
            <NewsletterForm />
          </div>
          {site.social.length > 0 && (
            <ul className="mt-8 flex gap-6">
              {site.social.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="link text-soft" rel="noopener noreferrer" target="_blank">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Oversized wordmark, low opacity, partly cropped by the bar below */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <div className="container-site">
          <div data-parallax="16" className="translate-y-[14%] opacity-[0.09]">
            <Image
              src="/brand/raavon-wordmark-on-dark.png"
              alt=""
              width={1969}
              height={407}
              sizes="(min-width: 1408px) 1280px, 100vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </div>

      <div className="container-site relative flex flex-col gap-2 border-t border-(--line) bg-noir py-6 text-sm text-soft sm:flex-row sm:justify-between">
        <p>
          © {year} {site.legalName ?? site.name}
        </p>
        <p>raavon.com</p>
      </div>
    </footer>
  )
}
