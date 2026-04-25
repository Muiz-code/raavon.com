import MarqueeTrack from '@/components/ui/MarqueeTrack'

export default function Marquee() {
  return (
    <section
      aria-label="Marquee phrases"
      className="py-5 overflow-hidden"
      style={{
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <MarqueeTrack />
    </section>
  )
}
