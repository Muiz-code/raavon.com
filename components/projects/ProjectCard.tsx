import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { coverScreen, kindLabel, phoneScreen, type Project } from '@/content/projects'

type Props = { project: Project; size?: 'large' | 'regular'; headingLevel?: 'h2' | 'h3'; className?: string }

/**
 * Project card: cropped desktop cover with the phone view overlapping,
 * then the facts. The whole card is one link.
 */
export default function ProjectCard({ project, size = 'regular', headingLevel: H = 'h3', className }: Props) {
  const cover = coverScreen(project)
  const phone = phoneScreen(project)
  const large = size === 'large'

  return (
    <article className={cn('group relative', className)} data-project-card>
      <div className="relative">
        <div
          className={cn(
            'relative overflow-hidden rounded-2xl border border-(--line) bg-noir-raised',
            large ? 'aspect-[16/9]' : 'aspect-[16/10]',
          )}
        >
          {cover && (
            <Image
              src={cover.src}
              alt=""
              fill
              sizes={large ? '(min-width: 768px) 90vw, 100vw' : '(min-width: 768px) 45vw, 100vw'}
              className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]"
            />
          )}
        </div>
        {phone && cover !== phone && (
          <div
            aria-hidden="true"
            className={cn(
              'phone absolute -bottom-6 right-5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2',
              large ? 'w-[15%] min-w-24' : 'w-[22%] min-w-20',
            )}
          >
            <div className="phone-screen">
              <Image src={phone.src} alt="" width={phone.width} height={phone.height} sizes="12vw" />
            </div>
          </div>
        )}
      </div>

      <div className={cn('mt-8 grid gap-3', large && 'md:grid-cols-12 md:gap-8')}>
        <div className={cn(large && 'md:col-span-5')}>
          <p className="eyebrow flex flex-wrap gap-x-3">
            {kindLabel[project.kind]}
            <span className="text-soft">· {project.sector}</span>
          </p>
          <H className={cn('mt-3', large ? 'display-m md:text-[clamp(2rem,1.2rem+2vw,3.5rem)]' : 'display-m')}>
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0" data-cursor="View">
              {project.name}
            </Link>
          </H>
        </div>
        <div className={cn(large && 'md:col-span-6 md:col-start-7 md:pt-8')}>
          <p className="text-lg font-semibold">{project.tagline}</p>
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-soft">
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.surfaces.map((s) => s.name).join(', ')}</span>
            <ArrowUpRight
              size={20}
              aria-hidden="true"
              className="ml-auto text-(--accent) transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            />
          </p>
        </div>
      </div>
    </article>
  )
}
