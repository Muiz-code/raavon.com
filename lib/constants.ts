export const NAV_LEFT = [
  { label: 'About', href: '#about' },
  { label: 'What We Do', href: '#ventures' },
]

export const NAV_RIGHT = [
  { label: 'Blog', href: '/blog' },
  { label: 'Developers', href: '/developers' },
  { label: 'Contact', href: '#contact' },
]

/** Kept for mobile overlay which renders all links flat */
export const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT]

export const MARQUEE_PHRASES = [
  'Ideas Made Real',
  'Built to Last',
  'We Ship Things That Matter',
  'Born in Nigeria',
  'Built for the World',
  'We Build Products',
  'Start With a Problem',
  'Ideas Made Real',
]

export const STAT_CARDS = [
  { label: 'Founded', value: '2025' },
  { label: 'Industries', value: 'Unlimited' },
  { label: 'Origin', value: 'Nigeria 🇳🇬' },
  { label: 'Reach', value: 'Global 🌍' },
]

export const VENTURES = [
  {
    tag: 'Fintech · AI · Personal Finance',
    name: 'Kairo',
    description:
      "Nigeria's first AI-powered Personal Finance Management app. Connect all your bank accounts, track spending with AI, automate savings, and pay bills — all in one place.",
    status: 'In Development',
    active: true,
  },
  {
    tag: 'Coming Soon',
    name: 'Coming Soon',
    description: 'Something is being built. We will tell you when it is ready.',
    status: 'In Conception',
    active: false,
  },
  {
    tag: 'Coming Soon',
    name: 'Coming Soon',
    description: 'Something is being built. We will tell you when it is ready.',
    status: 'In Conception',
    active: false,
  },
]

export const BLOG_POSTS = [
  {
    slug: 'nigeria-fintech-frontier',
    category: 'Fintech',
    title: 'Why Nigeria Is the Next Global Fintech Frontier',
    excerpt:
      'From mobile money to AI-powered banking — Nigeria\'s financial technology landscape is accelerating faster than anywhere on the continent.',
    date: 'April 15, 2025',
    readTime: '5 min read',
  },
  {
    slug: 'building-legacy-brands-in-africa',
    category: 'Culture',
    title: 'What It Means to Build a Legacy Brand in Africa',
    excerpt:
      'Legacy isn\'t built in quarters — it\'s built in decades. Here\'s how we think about brand-building in a continent primed for its greatest era.',
    date: 'March 28, 2025',
    readTime: '7 min read',
  },
  {
    slug: 'introducing-kairo',
    category: 'Ventures',
    title: 'Introducing Kairo: AI Meets Personal Finance',
    excerpt:
      'Kairo is our first venture — an AI-powered personal finance app built for Nigeria and the world. Here\'s the story behind why we built it.',
    date: 'March 5, 2025',
    readTime: '6 min read',
  },
]
