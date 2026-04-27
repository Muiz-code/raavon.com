import Logo from '@/components/ui/Logo'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Ventures', href: '#ventures' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer
      style={{ background: '#080806' }}
    >
      {/* Caramel gradient rule */}
      <div
        aria-hidden="true"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #C19A6B, transparent)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">

        {/* Left — logo + tagline */}
        <div className="flex flex-col gap-4">
          <Logo size="md" />
          <p
            className="font-fraunces italic text-sm leading-relaxed"
            style={{ color: '#D2B48C' }}
          >
            The spirit behind every brand.
          </p>
        </div>

        {/* Center — nav links */}
        <nav aria-label="Footer navigation" className="flex flex-col gap-3 md:items-center">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-dm text-sm hover:text-caramel transition-colors duration-200"
              style={{ color: 'var(--muted)' }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right — copyright */}
        <div className="flex flex-col gap-3 md:items-end">
          <p className="font-dm text-xs" style={{ color: 'var(--muted)' }}>
            © 2026 Raavon Group. All rights reserved.
          </p>
          <p className="font-dm text-xs" style={{ color: 'rgba(250,247,242,0.2)' }}>
            raavon.com
          </p>
        </div>

      </div>
    </footer>
  )
}
