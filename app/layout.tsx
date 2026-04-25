import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, DM_Sans, Fraunces } from 'next/font/google'
import './globals.css'
import { siteMetadata } from '@/lib/metadata'
import Providers from '@/context/ThemeContext'
import Loader from '@/components/ui/Loader'
import Cursor from '@/components/ui/Cursor'
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
  title: siteMetadata.title,
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,
  authors: [{ name: 'Raavon Group' }],
  creator: 'Raavon Group',
  metadataBase: new URL(siteMetadata.url),
  openGraph: {
    type: 'website',
    url: siteMetadata.url,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [{ url: siteMetadata.ogImage, width: 1200, height: 630, alt: 'Raavon Group' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteMetadata.url },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Raavon Group',
  url: 'https://raavon.com',
  logo: 'https://raavon.com/logo.svg',
  description: siteMetadata.description,
  foundingDate: '2025',
  foundingLocation: 'Lagos, Nigeria',
  sameAs: [],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <Providers>
          <Loader />
          <Cursor />
          <NewsletterPopup />
          {children}
        </Providers>
      </body>
    </html>
  )
}
