import type { Metadata } from 'next'
import { site } from '@/content/site'

/** Per-page metadata with canonical URL and social cards. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string
  description: string
  path: string
}): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`
  const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | Ambitious ideas. Thoughtfully built.`
  return {
    title: title ?? { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      siteName: site.name,
      title: fullTitle,
      description,
      locale: 'en_GB',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
  }
}
