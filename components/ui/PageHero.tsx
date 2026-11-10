import Image from 'next/image'

type Props = {
  eyebrow: string
  title: React.ReactNode
  lead?: React.ReactNode
  children?: React.ReactNode
}

/**
 * Header for inner pages. Noir surface, with the official rosette cropped
 * at the lower right edge, clear of the copy.
 */
export default function PageHero({ eyebrow, title, lead, children }: Props) {
  return (
    <section className="surface-noir relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-48">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden aspect-square select-none md:-bottom-[22vw] md:-right-[16vw] md:block md:w-[44vw]"
      >
        <Image src="/brand/rosette.png" alt="" width={2000} height={2000} sizes="44vw" className="h-full w-full" />
      </div>
      <div className="container-site relative">
        <p className="eyebrow hero-rise">{eyebrow}</p>
        <h1 className="display-xl mt-6 max-w-4xl">
          <span className="hero-line">
            <span className="hero-rise block" style={{ '--d': '80ms' } as React.CSSProperties}>
              {title}
            </span>
          </span>
        </h1>
        {lead && (
          <p className="lead hero-rise mt-8 max-w-2xl text-soft" style={{ '--d': '200ms' } as React.CSSProperties}>
            {lead}
          </p>
        )}
        {children && (
          <div className="hero-rise mt-10" style={{ '--d': '300ms' } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  )
}
