import Image from 'next/image'

/**
 * The official rosette, displayed exactly as supplied (public/brand/rosette.png,
 * 2000 × 2000, transparent). Never recolour, redraw, stretch or add glow.
 * Positioning and the half crop live in globals.css (.hero-rosette).
 *
 * Nested wrappers keep each motion independent:
 *   [data-rosette-pointer]  drift towards the cursor (Hero, GSAP)
 *   [data-rosette-scroll]   turn with scroll (Hero, GSAP ScrollTrigger)
 *   .hero-rosette-spin      very slow idle rotation (CSS)
 */
export default function HeroRosette() {
  return (
    <div className="hero-rosette" data-hero-rosette aria-hidden="true">
      <div data-rosette-pointer className="h-full w-full">
        <div data-rosette-scroll className="h-full w-full">
          <div className="hero-rosette-spin">
            <Image
              src="/brand/rosette.png"
              alt=""
              width={2000}
              height={2000}
              priority
              sizes="(min-width: 1024px) 70vw, (min-width: 768px) 74vw, 118vw"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
