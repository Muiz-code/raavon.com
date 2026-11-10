/**
 * Service areas. Written around what a client needs and what they receive.
 * `evidence` links only to real, published work.
 */
export type Capability = {
  slug: string
  index: string
  title: string
  summary: string
  forWhom: string
  deliverables: string[]
  evidence?: { label: string; href: string }
}

export const capabilities: Capability[] = [
  {
    slug: 'digital-products',
    index: '01',
    title: 'Digital product development',
    summary:
      'Websites, web applications, mobile applications, dashboards and portals, designed and engineered as one piece of work.',
    forWhom:
      'For teams with a product to launch, or a customer experience that has outgrown its current tools.',
    deliverables: [
      'Product and interface design',
      'iOS and Android applications',
      'Web applications and customer portals',
      'Marketing websites and content systems',
      'Dashboards for customers and staff',
      'An admin console with every site, so your team can update it without a developer',
    ],
    evidence: { label: 'See the work', href: '/work' },
  },
  {
    slug: 'business-systems',
    index: '02',
    title: 'Business systems and automation',
    summary:
      'Internal tools, reporting and operational workflows that replace spreadsheets, manual hand-offs and repeated admin.',
    forWhom:
      'For operators who spend too much time moving information between people, sheets and inboxes.',
    deliverables: [
      'Internal tools and admin consoles',
      'Reporting and operational dashboards',
      'Workflow automation and notifications',
      'Role-based access for teams',
    ],
    evidence: { label: 'See the Klario business dashboard', href: '/work/klario#business-dashboard' },
  },
  {
    slug: 'integrations-ai',
    index: '03',
    title: 'Integrations and AI features',
    summary:
      'APIs, connected systems and scoped AI assistants that do a specific job well, with clear limits on what they can do.',
    forWhom:
      'For products that need to talk to other services, or would benefit from an assistant that understands their data.',
    deliverables: [
      'API design and third-party integrations',
      'Data sync between connected systems',
      'Scoped AI assistants with guardrails',
      'Webhooks and event-driven processes',
    ],
    evidence: { label: 'See Klario’s developer platform', href: '/work/klario#developer-platform' },
  },
  {
    slug: 'technical-partnerships',
    index: '04',
    title: 'Technical venture partnerships',
    summary:
      'Product planning, engineering and ongoing technical contribution for founders building something new.',
    forWhom:
      'For founders who need a technical partner to plan, build and keep improving the product with them.',
    deliverables: [
      'Product planning and technical scoping',
      'Architecture and engineering',
      'Launch support and iteration',
      'Ongoing technical contribution on agreed terms',
    ],
  },
]

/**
 * Standing commitment, shown on the home page and the capabilities page.
 * Confirmed by the owner on 9 November 2026.
 */
export const adminPromise = {
  title: 'Every site comes with its own admin console.',
  body: 'Your team updates content, products and bookings themselves, and tracks what is happening on the site. You only need a developer when something technical needs fixing.',
}
