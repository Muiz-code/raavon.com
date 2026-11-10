/**
 * Project model.
 *
 * A project is either one of RaaVon's own ventures or client work. Each
 * project has one or more surfaces (for example a mobile app, a business
 * dashboard and a developer platform), and each surface has its own
 * features and screenshots.
 */

export type Screen = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  /** Controls the frame: a phone for mobile screens, a browser for web. */
  device: 'phone' | 'desktop'
  /** Set when the screen shows sample data rather than a real account. */
  exampleData?: boolean
}

export type Surface = {
  id: string
  name: string
  audience: string
  summary: string
  features: string[]
  screens: Screen[]
}

export type Project = {
  slug: string
  name: string
  kind: 'owned-venture' | 'client-work'
  /** For client work, only once the client has approved being named. */
  client?: string
  /** Show in the home page work track. */
  featured: boolean
  year: string
  sector: string
  tagline: string
  summary: string
  stage: string
  stageDetail: string
  role: string
  platforms: string[]
  problem: string
  /** How the problem was approached. */
  approach?: string
  /** Qualitative change, in the owner's words. Not a measured result. */
  result?: string
  delivered: string[]
  /** Measured, verified results only. */
  outcomes: string[]
  stack: string[]
  logo?: { onDark: string; onLight: string; width: number; height: number }
  surfaces: Surface[]
  /** Public site. Leave undefined until the owner confirms the URL. */
  url?: string
}

export const kindLabel: Record<Project['kind'], string> = {
  'owned-venture': 'Owned venture',
  'client-work': 'Client work',
}
