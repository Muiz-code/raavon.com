import type { Screen, Surface } from './types'

/** Screenshot sizes produced by the capture script (1440 × 900 @1.5x, 390 × 844 @2x). */
const DESKTOP = { width: 2160, height: 1350, device: 'desktop' as const }
const MOBILE = { width: 780, height: 1688, device: 'phone' as const }

export function desktop(slug: string, file: string, alt: string, caption: string): Screen {
  return { src: `/projects/${slug}/${file}`, ...DESKTOP, alt, caption }
}

export function mobile(slug: string, file: string, alt: string, caption: string): Screen {
  return { src: `/projects/${slug}/${file}`, ...MOBILE, alt, caption }
}

/**
 * Every client build ships with an admin console, so the business can update
 * its own site and only needs a developer for technical issues.
 */
export function adminConsole(features: string[]): Surface {
  return {
    id: 'admin-console',
    name: 'Admin console',
    audience: 'For the client’s own team',
    summary:
      'The team updates the site and runs day-to-day operations themselves. A developer is only needed for technical issues.',
    features,
    screens: [],
  }
}
