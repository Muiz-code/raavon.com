import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer
      className="relative px-6 md:px-12 py-10"
      style={{
        borderTop: '1px solid',
        borderImageSource: 'linear-gradient(90deg, transparent, #C19A6B, transparent)',
        borderImageSlice: 1,
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <Logo size="md" />

        <p className="font-fraunces italic text-sm" style={{ color: '#D2B48C' }}>
          The spirit behind every brand.
        </p>

        <p className="font-dm text-xs" style={{ color: 'var(--muted)' }}>
          © 2025 Raavon Group. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
