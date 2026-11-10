import type { Metadata } from 'next'
import Link from 'next/link'
import Logo from '@/components/brand/Logo'
import { site } from '@/content/site'

export const metadata: Metadata = {
  title: 'Email preferences',
  robots: { index: false, follow: false },
}

const copy = {
  done: {
    title: 'You have been unsubscribed.',
    body: 'You will no longer receive updates from RaaVon.',
  },
  error: {
    title: 'We could not update your preferences.',
    body: `Please email ${site.email} and we will remove you by hand.`,
  },
  invalid: {
    title: 'This unsubscribe link is not valid.',
    body: `It may be incomplete or out of date. Email ${site.email} and we will remove you by hand.`,
  },
}

export default async function UnsubscribePage({ searchParams }: PageProps<'/unsubscribe'>) {
  const { status } = await searchParams
  const key = status === 'done' || status === 'error' ? status : 'invalid'
  const { title, body } = copy[key]

  return (
    <main className="surface-noir flex min-h-svh items-center">
      <div className="container-site max-w-xl">
        <Link href="/" className="inline-flex min-h-12 items-center" aria-label={`${site.name}, home`}>
          <Logo height={28} />
        </Link>
        <h1 className="display-m mt-12">{title}</h1>
        <p className="mt-4 text-soft">{body}</p>
        <Link href="/" className="btn btn-secondary mt-10">
          Back to raavon.com
        </Link>
      </div>
    </main>
  )
}
