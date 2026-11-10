import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { site } from '@/content/site'

/* Brand guide: Bricolage Grotesque throughout. 800 display, 600 labels, 400 body. */
const bricolage = Bricolage_Grotesque({
  variable: '--font-bricolage',
  subsets: ['latin'],
  display: 'swap',
  // Width axis powers the interactive hero type; optical size keeps large type crisp.
  axes: ['wdth', 'opsz'],
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Ambitious ideas. Thoughtfully built.`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_GB',
    url: site.url,
    title: `${site.name} | Ambitious ideas. Thoughtfully built.`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#0b0b0e',
  colorScheme: 'dark light',
}

/* Only verified facts belong in structured data. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  ...(site.legalName ? { legalName: site.legalName } : {}),
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.signature,
}

/**
 * Runs before paint:
 * - marks the document as JS-capable so reveal animations can hide content
 *   (content stays visible without JS)
 * - decides whether the intro plays: home page, first visit this session,
 *   and no reduced-motion preference
 */
const bootScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var m=window.matchMedia('(prefers-reduced-motion: reduce)').matches;var seen=false;try{seen=!!sessionStorage.getItem('rv-intro')}catch(e){}if(location.pathname==='/'&&!m&&!seen){d.setAttribute('data-intro','play')}}catch(e){}})();`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={bricolage.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
