/**
 * Client work, published with the owner's approval (9 November 2026).
 * Copy is drawn from each project's own documentation and the owner's
 * portfolio. `result` is the owner's description of what changed; it is
 * not a measured outcome.
 */
import type { Project } from './types'
import { adminConsole, desktop, mobile } from './helpers'

const client = (p: Omit<Project, 'kind' | 'role' | 'outcomes'> & { role?: string }): Project => ({
  kind: 'client-work',
  role: 'Design, engineering and admin console by RaaVon',
  outcomes: [],
  ...p,
})

export const orneli = client({
  slug: 'orneli',
  name: 'Orneli',
  client: 'Orneli',
  featured: true,
  year: '2026',
  sector: 'Luxury rental',
  tagline: 'Luxury jewellery to rent, for the moments that call for it.',
  summary:
    'A rental storefront and an owner console that runs the whole rental business, from request to return.',
  stage: 'Live',
  stageDetail: 'Live since October 2026.',
  platforms: ['Website', 'Customer accounts', 'Admin console'],
  problem:
    'Renting high-value jewellery needs trust on both sides: the customer wants a smooth request, and the owner needs identity checks, clear availability and paperwork for every rental.',
  approach:
    'Each piece has its own request flow that hands off to WhatsApp with a reference number. Customers verify their identity in their account, and the owner manages inventory, rentals and documents from one console.',
  delivered: [
    'Collection and piece pages with rental requests',
    'Customer accounts with identity checks',
    'Rentals in list, calendar and board views',
    'PDF invoices and customer documents',
  ],
  stack: ['Next.js', 'TypeScript', 'Supabase', 'React PDF'],
  surfaces: [
    {
      id: 'website',
      name: 'Website',
      audience: 'For customers',
      summary: 'A collection to browse, a request flow for each piece, and an account for identity checks.',
      features: ['Collection browsing by set and type', 'Rental requests with reference numbers', 'WhatsApp hand-off', 'Customer identity verification'],
      screens: [
        desktop('orneli', 'home-desktop.jpg', 'Orneli home page with an editorial photograph and the line For Your Grand Entrance.', 'The Orneli home page'),
        mobile('orneli', 'home-mobile.jpg', 'The Orneli home page on a phone.', 'Orneli on a phone'),
      ],
    },
    adminConsole(['Inventory and pieces', 'Rentals by list, calendar and board', 'Customers and documents', 'PDF invoices and chats']),
  ],
})

export const skoa = client({
  slug: 'skoa',
  name: 'SKOA Homes',
  client: 'SKOA Homes',
  featured: false,
  year: '2026',
  sector: 'Interior design',
  tagline: 'Interior design for the way you live.',
  summary: 'A studio website and content system for an interior design practice.',
  stage: 'Built',
  stageDetail: 'Built and handed over with a content system the studio runs itself.',
  platforms: ['Website', 'Admin console'],
  problem:
    'An interior design studio needed a site that showed its work properly and turned visitors into consultations, without relying on a developer for every update.',
  delivered: ['Studio website with projects and services', 'Consultation booking', 'Content system for every section of the site', 'Consultation inbox'],
  stack: ['Next.js', 'TypeScript', 'Supabase', 'Redux Toolkit', 'Resend'],
  surfaces: [
    {
      id: 'website',
      name: 'Website',
      audience: 'For homeowners',
      summary: 'A calm, photography-led site that leads to a free consultation.',
      features: ['Hero slides and services', 'Projects by room type', 'Consultation booking', 'Team and process'],
      screens: [
        desktop('skoa', 'home-desktop.jpg', 'SKOA Homes home page with a modern house beside a pool and the line Your space, designed for your life.', 'The SKOA Homes home page'),
        mobile('skoa', 'home-mobile.jpg', 'The SKOA Homes home page on a phone.', 'SKOA Homes on a phone'),
      ],
    },
    adminConsole(['Hero slides, projects and services', 'Team and testimonials', 'Consultation inbox', 'Site settings']),
  ],
})

export const bejewelled = client({
  slug: 'bejewelled',
  name: 'Bejewelled by Bilsar',
  client: 'Bejewelled by Bilsar',
  featured: false,
  year: '2026',
  sector: 'Jewellery',
  tagline: 'Chosen preciously.',
  summary: 'A single-page site for a jewellery house, built around booking a private consultation.',
  stage: 'Built',
  stageDetail: 'Built in October 2026.',
  platforms: ['Website'],
  problem: 'The jewellery house sells through private consultations, so the site needed to set the tone and make booking one simple step.',
  delivered: ['Story-led single page', 'Consultation booking form with spam protection', 'Instagram section', 'Full-screen menu'],
  stack: ['Next.js', 'TypeScript', 'Resend', 'Lenis'],
  surfaces: [
    {
      id: 'website',
      name: 'Website',
      audience: 'For prospective clients',
      summary: 'A quiet, editorial page that leads to a private consultation.',
      features: ['Opening gate and story', 'Consultation booking', 'Instagram feed section'],
      screens: [
        desktop('bejewelled', 'home-desktop.jpg', 'Bejewelled by Bilsar home page in deep burgundy with the wordmark and Enter the store button.', 'The Bejewelled home page'),
        mobile('bejewelled', 'home-mobile.jpg', 'The Bejewelled home page on a phone.', 'Bejewelled on a phone'),
      ],
    },
  ],
})

export const dineAtNight = client({
  slug: 'dine-at-night',
  name: 'Dine At Night',
  client: 'Dine At Night',
  featured: true,
  year: '2025',
  sector: 'Events',
  tagline: 'Ticketing and vendors for a night food market.',
  summary: 'A ticketing and vendor platform for a night food market, with QR entry that works when the signal does not.',
  stage: 'Live',
  stageDetail: 'Live at dineatnight.com.',
  platforms: ['Website', 'Ticketing and gate scanner', 'Shop', 'Admin console'],
  problem:
    'An outdoor night market had been selling tickets by message and checking them by eye. Entry was slow, duplicate tickets got through, and nobody could tell a vendor how many people had come.',
  approach:
    'Tickets carry a QR code checked by a scanner at the gate, built to cope with a weak connection. Vendors, events, the shop and the gallery run from one admin, and takings export to a spreadsheet.',
  result:
    'Tickets are checked in seconds rather than by eye, duplicates stop getting through, and the organiser can tell vendors how many people came.',
  delivered: ['Event pages and ticket sales', 'QR tickets and gate check-in', 'Vendor directory and applications', 'Merchandise shop', 'Admin for events, tickets, orders and vendors'],
  stack: ['Next.js', 'TypeScript', 'Firebase', 'Paystack', 'Resend'],
  url: 'https://www.dineatnight.com',
  surfaces: [
    {
      id: 'website',
      name: 'Website and ticketing',
      audience: 'For guests and vendors',
      summary: 'Tickets, vendor applications, merchandise and the gallery in one place.',
      features: ['Ticket checkout with QR codes', 'Gate scanning for staff', 'Vendor applications', 'Merchandise shop'],
      screens: [
        desktop('dine-at-night', 'home-desktop.jpg', 'Dine At Night home page with a neon tiger mask and the line Nigeria’s first night food market.', 'The Dine At Night home page'),
        mobile('dine-at-night', 'home-mobile.jpg', 'The Dine At Night home page on a phone.', 'Dine At Night on a phone'),
      ],
    },
    adminConsole(['Events and tickets', 'Orders and vendors', 'Email templates and subscribers', 'Takings exported to a spreadsheet']),
  ],
})

export const itanItan = client({
  slug: 'itan-itan',
  name: 'Ìtàn Ìtàn Studio',
  client: 'Ìtàn Ìtàn Studio',
  featured: true,
  year: '2026',
  sector: 'Creative studio',
  tagline: 'An editorial site that behaves like a living archive.',
  summary: 'A site for a studio working across culture, strategy and visual identity, built to hold a growing body of work.',
  stage: 'Live',
  stageDetail: 'Live at itanitan.com.',
  platforms: ['Website', 'Admin console'],
  problem:
    'The studio needed a site that could hold a growing body of work without turning into a grid of thumbnails, and feel both clear and memorable.',
  approach:
    'The work lives on a shelf that reads like a book, with page turns and reveals built in CSS so nothing loads that is not needed. Enquiries and the archive run through a console the studio uses itself.',
  result: 'The studio fills its own archive without an engineer, and enquiries arrive in a console they run.',
  delivered: ['Editorial site with The Studio and The Shelf', 'Archive presented as a book', 'Story enquiry flow', 'Studio console for the archive and enquiries'],
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Lenis'],
  url: 'https://www.itanitan.com',
  surfaces: [
    {
      id: 'website',
      name: 'Website',
      audience: 'For brands and collaborators',
      summary: 'A slow, editorial site with an archive that reads like a book.',
      features: ['The Studio and What We Do', 'The Shelf archive with page turns', 'Begin a Story enquiries'],
      screens: [
        desktop('itan-itan', 'home-desktop.jpg', 'Ìtàn Ìtàn Studio home page in deep red reading Every brand has a story. We shape how it’s told.', 'The Ìtàn Ìtàn home page'),
        mobile('itan-itan', 'home-mobile.jpg', 'The Ìtàn Ìtàn home page on a phone.', 'Ìtàn Ìtàn on a phone'),
      ],
    },
    adminConsole(['Archive entries', 'Story enquiries', 'Studio login']),
  ],
})

export const lagosWellnessClub = client({
  slug: 'lagos-wellness-club',
  name: 'The Lagos Wellness Club',
  client: 'The Lagos Wellness Club',
  featured: false,
  year: '2025',
  sector: 'Wellness',
  tagline: 'Membership, events and a shop for a wellness community.',
  summary: 'One system for events, membership and the club’s shop, replacing bookings spread across messages and spreadsheets.',
  stage: 'Live',
  stageDetail: 'Live at thelagoswellnessclub.com.',
  platforms: ['Website', 'Shop', 'Admin console'],
  problem:
    'Bookings arrived through several channels that never agreed, classes were double booked, and nobody could say how many members were active.',
  approach:
    'Start with one trusted schedule and member record, then add bookings, events and the shop on top once the schedule is reliable.',
  result: 'The club runs its week from one place, and double bookings stopped.',
  delivered: ['Events and waitlist', 'Shop with collections and orders', 'Member directory and gallery', 'Admin for products, events, users and analytics'],
  stack: ['React', 'Vite', 'Supabase', 'Paystack'],
  url: 'https://www.thelagoswellnessclub.com',
  surfaces: [
    {
      id: 'website',
      name: 'Website and shop',
      audience: 'For members and guests',
      summary: 'Events, the shop and the community directory in one calm, photographic site.',
      features: ['Events and waitlist', 'Shop and orders', 'Directory and gallery'],
      screens: [
        desktop('lagos-wellness-club', 'home-desktop.jpg', 'The Lagos Wellness Club home page with a script wordmark over a Lagos skyline at dusk.', 'The Lagos Wellness Club home page'),
        desktop('lagos-wellness-club', 'shop-desktop.jpg', 'The Lagos Wellness Club shop reading Thoughtfully curated for intentional living.', 'The shop'),
        mobile('lagos-wellness-club', 'home-mobile.jpg', 'The Lagos Wellness Club home page on a phone.', 'On a phone'),
      ],
    },
    adminConsole(['Products and collections', 'Events', 'Users', 'Analytics']),
  ],
})

export const wowSignatures = client({
  slug: 'wow-signatures',
  name: 'The WOW Signatures',
  client: 'The WOW Signatures',
  featured: true,
  year: '2025',
  sector: 'Corporate gifting',
  tagline: 'A gifting storefront where the biggest orders start as a request.',
  summary: 'A corporate gifting shop for standard ranges, plus a custom-request flow for bespoke packages, run from one console.',
  stage: 'Built',
  stageDetail: 'Built in 2025.',
  platforms: ['Website', 'Shop', 'Custom requests', 'Admin console'],
  problem:
    'Premium gifting does not fit a normal catalogue. The high-value orders are bespoke and negotiated, but the business still needed a shop for its standard ranges.',
  approach:
    'Two paths in one storefront. Standard ranges have a cart and card payment. Custom packages have their own request flow that captures the brief up front, so the first reply can be useful.',
  result: 'Custom enquiries arrive with the brief already captured, and the standard ranges sell without a conversation.',
  delivered: ['Shop with collections and checkout', 'Custom gifting request flow', 'Baby shower gifts range', 'Admin for orders, products, briefs and media'],
  stack: ['Next.js', 'TypeScript', 'Supabase', 'Paystack'],
  surfaces: [
    {
      id: 'website',
      name: 'Shop and custom requests',
      audience: 'For companies and gift buyers',
      summary: 'Browse ready collections or request a bespoke package.',
      features: ['Collections and product pages', 'Cart and card checkout', 'Custom package briefs'],
      screens: [
        desktop('wow-signatures', 'home-desktop.jpg', 'The WOW Signatures home page in deep red reading Gifting, Perfected for Impact.', 'The WOW Signatures home page'),
        desktop('wow-signatures', 'shop-desktop.jpg', 'The WOW Signatures collections page with gift sets.', 'Collections'),
        desktop('wow-signatures', 'custom-gifting-desktop.jpg', 'The WOW Signatures custom gift package request form.', 'Custom package request'),
        mobile('wow-signatures', 'home-mobile.jpg', 'The WOW Signatures home page on a phone.', 'On a phone'),
      ],
    },
    adminConsole(['Orders and products', 'Custom gifting briefs', 'Media and testimonials']),
  ],
})

export const pni = client({
  slug: 'pni-real-assets',
  name: 'PNI Real Assets',
  client: 'PNI Group',
  featured: false,
  year: '2025',
  sector: 'Real estate',
  tagline: 'A site for a real assets investment and development group.',
  summary: 'A corporate site for a group that invests in, develops and manages real assets.',
  stage: 'Live',
  stageDetail: 'Live at pnirealassets.com.',
  platforms: ['Website'],
  problem: 'The group needed a credible home for its businesses, developers and investor enquiries.',
  delivered: ['Corporate website', 'Business and developer sections', 'Investor and partnership enquiries'],
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  url: 'https://www.pnirealassets.com',
  surfaces: [
    {
      id: 'website',
      name: 'Website',
      audience: 'For investors and partners',
      summary: 'A corporate site with routes for partners and investment enquiries.',
      features: ['Group and business pages', 'Partner and investor enquiries'],
      screens: [
        { src: '/projects/pni-real-assets/home-desktop.jpg', width: 1600, height: 1000, device: 'desktop', alt: 'PNI Real Assets home page with a city skyline at night and the line Building enduring value through real estate investment and development.', caption: 'The PNI home page' },
        mobile('pni-real-assets', 'home-mobile.jpg', 'The PNI home page on a phone.', 'On a phone'),
      ],
    },
  ],
})

export const twelve = client({
  slug: 'twelve',
  name: 'Twelve',
  client: 'Twelve',
  featured: false,
  year: '2025',
  sector: 'Video production',
  tagline: 'Not more videos. The right videos.',
  summary: 'A site for a studio that makes thought-leadership videos for founders, coaches and creators.',
  stage: 'Live',
  stageDetail: 'Live at twelvevideos.com.',
  platforms: ['Website'],
  problem: 'The studio needed a confident site that explains its approach and turns visitors into calls.',
  delivered: ['Marketing website', 'Services and projects pages', 'Enquiry route'],
  stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
  url: 'https://www.twelvevideos.com',
  surfaces: [
    {
      id: 'website',
      name: 'Website',
      audience: 'For founders and creators',
      summary: 'A bold, direct site that leads to a first call.',
      features: ['Services and projects', 'Get started enquiries'],
      screens: [
        desktop('twelve', 'home-desktop.jpg', 'Twelve home page reading Not more videos, but the right videos.', 'The Twelve home page'),
        mobile('twelve', 'home-mobile.jpg', 'The Twelve home page on a phone.', 'On a phone'),
      ],
    },
  ],
})
