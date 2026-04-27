import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/lib/metadata'
import Providers from '@/context/ThemeContext'
import Loader from '@/components/ui/Loader'
import Cursor from '@/components/ui/Cursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import NewsletterPopup from '@/components/ui/NewsletterPopup'

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  display: 'swap',
})

const dm = DM_Sans({
  variable: '--font-dm',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['300'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.url),
  title: {
    default: siteMetadata.title,
    template: siteMetadata.titleTemplate,
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: 'Raavon Group', url: siteMetadata.url }],
  creator: 'Raavon Group',
  publisher: 'Raavon Group',
  applicationName: 'Raavon',
  category: 'Technology',
  openGraph: {
    type: 'website',
    url: siteMetadata.url,
    siteName: 'Raavon',
    locale: siteMetadata.locale,
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  twitter: {
    card: 'summary_large_image',
    site: siteMetadata.twitterHandle,
    creator: siteMetadata.twitterHandle,
    title: siteMetadata.title,
    description: siteMetadata.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteMetadata.url,
  },
}

/* ── Structured data ─────────────────────────────────────────────── */

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteMetadata.url}/#organization`,
  name: 'Raavon Group',
  legalName: 'Raavon Group',
  url: siteMetadata.url,
  logo: {
    '@type': 'ImageObject',
    url: `${siteMetadata.url}/raavon-icon-dark.svg`,
    width: 512,
    height: 512,
  },
  description: siteMetadata.description,
  foundingDate: '2026',
  foundingLocation: {
    '@type': 'Place',
    name: 'Lagos, Nigeria',
    addressCountry: 'NG',
  },
  areaServed: 'Worldwide',
  knowsAbout: [
    'Software Development',
    'Product Design',
    'Financial Technology',
    'Artificial Intelligence',
    'Mobile Applications',
    'Web Platforms',
    'Digital Ventures',
    'Technology Consulting',
  ],
  sameAs: [],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteMetadata.url}/#website`,
  url: siteMetadata.url,
  name: 'Raavon',
  description: siteMetadata.description,
  publisher: { '@id': `${siteMetadata.url}/#organization` },
  inLanguage: 'en-US',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${dm.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema]),
          }}
        />
      </head>
      <body>
        <Providers>
          <Loader />
          <Cursor />
          <ScrollProgress />
          <NewsletterPopup />
          {children}
        </Providers>
      </body>
    </html>
  )
}
