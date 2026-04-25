import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
         style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="mb-8 opacity-60">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="60" cy="60" r="58" stroke="#C19A6B" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5"/>
          <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle"
            fill="#C19A6B" fontSize="40" fontFamily="serif" fontWeight="300">?</text>
        </svg>
      </div>

      <p className="font-fraunces italic text-sm tracking-widest mb-4" style={{ color: '#C19A6B' }}>
        404
      </p>

      <h1 className="font-jakarta font-bold text-4xl md:text-5xl mb-4" style={{ color: 'var(--text)' }}>
        Lost in the void.
      </h1>

      <p className="font-dm mb-10 max-w-sm" style={{ color: 'var(--muted)' }}>
        This page doesn&apos;t exist — but your idea does.
      </p>

      <Link href="/" className="btn-primary font-dm">
        Take me home
        <ArrowRight size={16} />
      </Link>
    </div>
  )
}
