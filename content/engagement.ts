/** Ways to work together, and the delivery process. */

export type Engagement = {
  slug: string
  title: string
  description: string
  youBring: string
  weDo: string
  enquiry: EnquiryType
}

export const enquiryTypes = [
  { value: 'new-product', label: 'Build a new product' },
  { value: 'improve-platform', label: 'Improve an existing platform' },
  { value: 'technical-partnership', label: 'Explore a technical partnership' },
  { value: 'general', label: 'Something else' },
] as const

export type EnquiryType = (typeof enquiryTypes)[number]['value']

export const engagements: Engagement[] = [
  {
    slug: 'new-product',
    title: 'Build a new product',
    description:
      'You have an idea, a defined problem or an early prototype. We help shape it into a product people can use.',
    youBring: 'The problem, the users and the ambition.',
    weDo: 'Scope, design, build and launch the first version.',
    enquiry: 'new-product',
  },
  {
    slug: 'improve-platform',
    title: 'Improve an existing platform',
    description:
      'Your product works but has become slow to change, hard to use or difficult to maintain.',
    youBring: 'The current platform and what is holding it back.',
    weDo: 'Review, prioritise and improve it in focused stages.',
    enquiry: 'improve-platform',
  },
  {
    slug: 'technical-partnership',
    title: 'Explore a technical partnership',
    description:
      'You are a founder who wants a long-term technical partner rather than a supplier.',
    youBring: 'A venture with a clear market and commitment.',
    weDo: 'Contribute product and engineering capability over time.',
    enquiry: 'technical-partnership',
  },
]

export const partnershipTerms =
  'Technical partnerships are assessed individually. Each one needs agreed responsibilities, scope and commercial terms before work begins. We do not offer automatic equity arrangements or guaranteed investment.'

export const process = [
  {
    step: '01',
    title: 'Understand the problem and users',
    body: 'We start with the people the product serves and the outcome the business needs, before any design or code.',
  },
  {
    step: '02',
    title: 'Define scope and design',
    body: 'We agree what the first version must do, then design the flows and interface around it.',
  },
  {
    step: '03',
    title: 'Build and validate',
    body: 'We build in short cycles and test with real users and real data as early as possible.',
  },
  {
    step: '04',
    title: 'Launch and improve',
    body: 'We release, measure what happens and keep improving the product with you.',
  },
]

export const timelineNote =
  'Timelines depend on scope. We agree delivery dates once the scope is defined, not before.'

export const budgetRanges = [
  'Under ₦1m',
  '₦1m to ₦5m',
  '₦5m to ₦15m',
  '₦15m to ₦50m',
  'Over ₦50m',
  'Not sure yet',
] as const

export const timelines = [
  'As soon as possible',
  'Within 3 months',
  '3 to 6 months',
  'Later this year',
  'Flexible',
] as const
