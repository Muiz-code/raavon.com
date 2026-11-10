/**
 * Site-wide facts. Every value here is published, so only add what the
 * owner has confirmed. See docs/OUTSTANDING.md for what is still pending.
 */
export const site = {
  name: 'RaaVon',
  /** Registered legal name is unconfirmed. Leave null until confirmed. */
  legalName: null as string | null,
  url: 'https://raavon.com',
  email: 'contact@raavon.com',
  signature: 'The spirit behind every brand.',
  description:
    'RaaVon builds digital products, creates ventures, and works with businesses to turn complex challenges into useful technology.',
  /** Add only verified profiles. Each entry renders in the footer. */
  social: [] as { label: string; href: string }[],
} as const

export type NavItem = { label: string; href: string }

export const primaryNav: NavItem[] = [
  { label: 'Work', href: '/work' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Studio', href: '/studio' },
  { label: 'About', href: '/about' },
]

export const footerNav: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Capabilities', href: '/capabilities' },
  { label: 'Work', href: '/work' },
  { label: 'Ventures', href: '/ventures' },
  { label: 'Studio', href: '/studio' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]
