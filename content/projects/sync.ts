import type { Project } from './types'
import { desktop, mobile } from './helpers'

const s = 'sync'

export const sync: Project = {
  slug: s,
  name: 'Sync',
  kind: 'owned-venture',
  featured: true,
  year: 'In development',
  sector: 'Marketplace',
  tagline: 'Your campus, in one place.',
  summary:
    'A verified marketplace for student life: hostels, food, events, beauty, trades, laundry and the places around campus, with payments held until the student confirms delivery.',
  stage: 'In development',
  stageDetail: 'Sync is in active development and will launch first at one university before expanding campus by campus.',
  role: 'Founded and built by RaaVon',
  platforms: ['Web app', 'Vendor and landlord dashboards', 'Admin console'],
  problem:
    'Campus life runs on group chats, word of mouth and cash paid in advance. Listings cannot be trusted, everything lives in a different place, and students pay first for rooms and services they have not seen.',
  approach:
    'Verification is a visit, not a checkbox: landlords and vendors are identity-checked and visited before they can take payment. Money is held rather than handed over, and released when the student confirms, with an admin route for disputes.',
  delivered: [
    'Student web app with a local “around you” feed',
    'Hostels, food, events, beauty, trades and laundry modules',
    'Wallet and checkout with held payments',
    'Vendor and landlord onboarding with verification',
    'Admin tools for verification visits and disputes',
  ],
  outcomes: [],
  stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Paystack', 'Google Maps'],
  surfaces: [
    {
      id: 'student-app',
      name: 'Student app',
      audience: 'For students',
      summary: 'One local view of rooms, food, events and services near campus, personalised once a student signs in.',
      features: ['“Around you” feed of nearby listings', 'Verified hostels with held rent payments', 'Food, events, beauty, trades and laundry', 'Bookings, saved items and messages'],
      screens: [
        desktop(s, 'home-desktop.jpg', 'Sync home page reading Connect, Search, Sync, with verified hostel cards over a campus aerial photograph.', 'The Sync home page'),
        mobile(s, 'home-mobile.jpg', 'The Sync home page on a phone.', 'Sync on a phone'),
      ],
    },
    {
      id: 'partner-dashboards',
      name: 'Vendor and landlord dashboards',
      audience: 'For verified sellers and landlords',
      summary: 'Onboarding, listings, orders, earnings and documents for the people who sell and let through Sync.',
      features: ['Verification wizard', 'Listings and orders', 'Earnings and payouts', 'Tenancy documents'],
      screens: [],
    },
  ],
}
