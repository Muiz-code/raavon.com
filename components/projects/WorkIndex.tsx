'use client'

import { useRef, useState } from 'react'
import ProjectCard from '@/components/projects/ProjectCard'
import type { Project } from '@/content/projects'
import { gsap, MOTION, useGSAP } from '@/lib/gsap'

type Filter = 'all' | Project['kind']

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All work' },
  { value: 'owned-venture', label: 'Our ventures' },
  { value: 'client-work', label: 'Client work' },
]

/**
 * Filterable list of projects. The first project in view gets a large card,
 * the rest follow in an offset two-column grid. Cards animate in with GSAP
 * on load, on scroll and whenever the filter changes.
 */
export default function WorkIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>('all')
  const list = useRef<HTMLDivElement>(null)
  const shown = filter === 'all' ? projects : projects.filter((p) => p.kind === filter)
  const counts = {
    all: projects.length,
    'owned-venture': projects.filter((p) => p.kind === 'owned-venture').length,
    'client-work': projects.filter((p) => p.kind === 'client-work').length,
  }

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(MOTION.ok, () => {
        gsap.utils.toArray<HTMLElement>('[data-project-card]', list.current).forEach((card) => {
          gsap.from(card, {
            opacity: 0,
            y: 48,
            duration: 1,
            ease: 'expo.out',
            scrollTrigger: { trigger: card, start: 'top 92%', once: true },
          })
        })
      })
    },
    { scope: list, dependencies: [filter], revertOnUpdate: true },
  )

  const [first, ...rest] = shown

  return (
    <div>
      <div role="group" aria-label="Filter work" className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            aria-pressed={filter === f.value}
            onClick={() => setFilter(f.value)}
            className="inline-flex min-h-12 items-center gap-2 rounded-full border border-(--line-strong) px-5 font-semibold transition-colors hover:border-(--fg) aria-pressed:border-noir aria-pressed:bg-noir aria-pressed:text-cream"
          >
            {f.label}
            <span className="tabular text-sm opacity-70">{counts[f.value]}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? 'project' : 'projects'}
      </p>

      <div ref={list} className="mt-14 md:mt-20">
        {first && <ProjectCard key={first.slug} project={first} size="large" headingLevel="h2" />}
        <div className="mt-24 grid gap-x-10 gap-y-24 md:grid-cols-2">
          {rest.map((p, i) => (
            <ProjectCard key={p.slug} project={p} headingLevel="h2" className={i % 2 === 1 ? 'md:mt-32' : undefined} />
          ))}
        </div>
      </div>
    </div>
  )
}
