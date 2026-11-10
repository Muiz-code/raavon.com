/**
 * Published projects, in display order.
 *
 * To add a project: create `content/projects/<slug>.ts` exporting a
 * `Project` (see types.ts), then add it to this list. Files that are not
 * imported here are never published or shipped to the browser, so drafts
 * can live in this folder until they are approved.
 *
 * Never add work covered by an NDA (see docs/OUTSTANDING.md).
 */
import { klario } from './klario'
import { sync } from './sync'
import { bejewelled, dineAtNight, itanItan, lagosWellnessClub, orneli, pni, skoa, twelve, wowSignatures } from './clients'
import type { Project, Screen } from './types'

export const projects: Project[] = [
  klario,
  sync,
  orneli,
  dineAtNight,
  itanItan,
  wowSignatures,
  skoa,
  bejewelled,
  lagosWellnessClub,
  pni,
  twelve,
]

export { kindLabel } from './types'
export type { Project, Screen, Surface } from './types'

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}

export const ownedVentures = projects.filter((p) => p.kind === 'owned-venture')
export const clientWork = projects.filter((p) => p.kind === 'client-work')

function allScreens(project: Project) {
  return project.surfaces.flatMap((s) => s.screens)
}

/** First desktop screen if there is one, otherwise the first screen. */
export function coverScreen(project: Project): Screen | undefined {
  const all = allScreens(project)
  return all.find((s) => s.device === 'desktop') ?? all[0]
}

/** First phone screen, used beside the desktop cover. */
export function phoneScreen(project: Project): Screen | undefined {
  return allScreens(project).find((s) => s.device === 'phone')
}

/** One entry per featured project, for the home page work track. */
export type TrackItem = { project: Project; desktop?: Screen; phone?: Screen }

export function featuredTrack(): TrackItem[] {
  return projects
    .filter((p) => p.featured && allScreens(p).length > 0)
    .map((project) => {
      const desktop = allScreens(project).find((s) => s.device === 'desktop')
      return { project, desktop, phone: phoneScreen(project) }
    })
}
