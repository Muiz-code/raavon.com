import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import ProjectCard from '@/components/projects/ProjectCard'
import { ownedVentures } from '@/content/projects'

export default function VenturesSection() {
  return (
    <section id="ventures" aria-labelledby="ventures-title" className="surface-noir section relative overflow-hidden">
      <div className="container-site">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow reveal">Our ventures</p>
            <h2 id="ventures-title" className="display-l reveal mt-5">
              We build our own products, too.
            </h2>
            <p className="lead reveal mt-6 text-soft">
              RaaVon is the parent brand. Each venture keeps its own identity and is built with the same care we bring
              to client work.
            </p>
          </div>
          <Link href="/ventures" className="btn btn-secondary reveal shrink-0 self-start md:self-auto">
            All ventures
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-16 grid gap-x-10 gap-y-20 md:mt-20 md:grid-cols-2">
          {ownedVentures.map((v, i) => (
            <div key={v.slug} className="reveal" data-parallax={i % 2 ? '10' : undefined}>
              <ProjectCard project={v} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
