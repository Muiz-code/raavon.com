import type { Project } from './types'

/**
 * Klario. Only confirmed features are listed. Money movement, bill payments
 * and savings wallets stay off the site until their live status and partner
 * arrangements are confirmed (see docs/OUTSTANDING.md).
 */

const phone = { width: 591, height: 1280, device: 'phone' as const }
const web = { device: 'desktop' as const }

export const klario: Project = {
  slug: 'klario',
  name: 'Klario',
  kind: 'owned-venture',
  featured: true,
  year: 'In private beta',
  sector: 'Financial technology',
  tagline: 'Financial intelligence for individuals and businesses.',
  summary:
    'Klario brings a person’s or a business’s accounts into one clear view, helps them plan what comes in and goes out, and gives developers an API to build on it.',
  stage: 'Private beta',
  stageDetail:
    'Klario is in private testing on Android and iOS, with a web dashboard for businesses and a developer platform. Bank account linking is live for testers. Other features are being released in stages.',
  role: 'Founded and built by RaaVon',
  platforms: ['Android', 'iOS', 'Business web dashboard', 'Developer API', 'Website'],
  problem:
    'People and small businesses often keep money across several banks and apps. That makes it hard to see the full picture, plan ahead, or keep business and personal spending apart.',
  approach:
    'Klario sits on top of a person’s or business’s bank accounts rather than in the payment path. Linked accounts feed one picture, and budgets, bookkeeping and an assistant build on that. The business dashboard is for reading and managing, and money moves only in the Klario app.',
  delivered: [
    'Mobile app for Android and iOS',
    'Web dashboard for businesses and their teams',
    'Developer platform with API keys, usage billing and webhooks',
    'Bank account linking through a licensed open-banking provider',
    'An in-app assistant that answers questions about the user’s own money',
    'Marketing website, admin console and private beta programme',
  ],
  outcomes: [],
  stack: ['React Native', 'Expo', 'Next.js', 'TypeScript', 'Supabase', 'Claude API'],
  url: 'https://www.klario.finance',
  logo: {
    onDark: '/projects/klario/klario-logo-on-dark.png',
    onLight: '/projects/klario/klario-logo-on-light.png',
    width: 867,
    height: 251,
  },
  surfaces: [
    {
      id: 'mobile-app',
      name: 'Mobile app',
      audience: 'For individuals',
      summary:
        'One view of every linked account, budgets built around real paydays, and an assistant that explains money in plain language.',
      features: [
        'Linked bank accounts in one view',
        'Plans that become spendable as income lands',
        'Plain-language transaction descriptions',
        'Request a human financial manager',
      ],
      screens: [
        {
          src: '/projects/klario/dashboard-home.jpg',
          ...phone,
          alt: 'Klario home screen showing total net worth across linked accounts, quick actions and an AI insight card.',
          caption: 'Home: net worth across linked accounts',
        },
        {
          src: '/projects/klario/budgets.jpg',
          ...phone,
          alt: 'Klario budget planning screen where a user names a plan and selects which income it draws on.',
          caption: 'Planning: a budget built on real income dates',
        },
        {
          src: '/projects/klario/manager.jpg',
          ...phone,
          alt: 'Klario form for requesting a financial manager, asking about income, goals and challenges.',
          caption: 'Support: requesting a human financial manager',
        },
      ],
    },
    {
      id: 'business-dashboard',
      name: 'Business dashboard',
      audience: 'For business owners and their teams',
      summary:
        'A web dashboard for reading and managing a business’s finances. Money moves only in the Klario app; the dashboard is for reading and managing.',
      features: [
        'Linked business bank accounts, checked against the books',
        'Revenue, expenses and an income statement',
        'Budgets and bookkeeping',
        'Invoices and receipts',
        'Business and personal spending flagged when mixed',
        'Members, roles and attendance',
        'Statement exports to PDF and Excel',
      ],
      screens: [
        {
          src: '/projects/klario/business-overview.png',
          ...web,
          width: 2768,
          height: 1702,
          exampleData: true,
          alt: 'Klario Business overview with total balance across three banks, revenue and expenses chart, and an income statement, shown with example data.',
          caption: 'Overview: balances, revenue, expenses and the income statement',
        },
        {
          src: '/projects/klario/business-accounts.png',
          ...web,
          width: 2765,
          height: 1705,
          exampleData: true,
          alt: 'Klario Business accounts page listing three business banks that match the books, with a transaction table, shown with example data.',
          caption: 'Accounts: every bank matched against the books',
        },
      ],
    },
    {
      id: 'developer-platform',
      name: 'Developer platform',
      audience: 'For developers building on Klario',
      summary:
        'A workspace for teams integrating with Klario: keys, client businesses, usage and request history in one place, with separate live and test environments.',
      features: [
        'API keys with live and test environments',
        'Client businesses managed from one workspace',
        'Prepaid usage credits; reads and failed calls are free',
        'Free test environment with sample data',
        'Signed webhooks for invoices, receipts and bank status',
        'Request logs, quickstart and documentation',
      ],
      screens: [
        {
          src: '/projects/klario/developer-overview.png',
          ...web,
          width: 2771,
          height: 1707,
          alt: 'Klario developer workspace overview showing total requests, success rate, average response time, credits used, a request activity chart and available balance.',
          caption: 'Developer workspace: requests, reliability and credit at a glance',
        },
      ],
    },
    {
      id: 'website',
      name: 'Website',
      audience: 'For people discovering Klario',
      summary: 'The public site at klario.finance: what Klario does, how it keeps data safe, pricing and the private beta sign-up.',
      features: ['Product story and features', 'Security and pricing pages', 'Private beta and ambassador sign-up', 'Admin for the beta list and email'],
      screens: [
        {
          src: '/projects/klario/website-desktop.jpg',
          ...web,
          width: 2160,
          height: 1350,
          alt: 'The Klario website hero reading Connect, Track, Understand, with sculpted gold and black forms.',
          caption: 'klario.finance',
        },
        {
          src: '/projects/klario/website-mobile.jpg',
          ...phone,
          width: 780,
          height: 1688,
          alt: 'The Klario website on a phone.',
          caption: 'klario.finance on a phone',
        },
      ],
    },
    {
      id: 'admin-console',
      name: 'Admin console',
      audience: 'For the Klario team',
      summary: 'An internal console for running the private beta: users, verifications, the ledger, assistant usage and broadcasts.',
      features: ['User and business records', 'Identity verification review', 'Ledger and AI usage monitoring', 'Broadcasts, crash reports and scheduled jobs'],
      screens: [],
    },
  ],
}
