'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function UnsubscribeContent() {
  const params = useSearchParams()
  const status = params.get('status')
  const email = params.get('email')

  const done = status === 'done'

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#050503',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      <div style={{ width: '100%', maxWidth: '440px', textAlign: 'center' }}>
        {/* Wordmark */}
        <div style={{ marginBottom: '48px' }}>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '6px', color: '#FAF7F2' }}>RAA</span>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '6px', color: '#7A4A35' }}>VON</span>
        </div>

        {/* Top rule */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,#C19A6B,transparent)', marginBottom: '40px' }} />

        {done ? (
          <>
            <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C19A6B', margin: '0 0 16px' }}>
              Unsubscribed
            </p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 400, color: '#FAF7F2', fontStyle: 'italic', margin: '0 0 16px', lineHeight: 1.35 }}>
              You&rsquo;ve been removed.
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(250,247,242,0.45)', lineHeight: 1.7, margin: '0 0 32px' }}>
              {email
                ? <><strong style={{ color: 'rgba(250,247,242,0.65)' }}>{email}</strong> will no longer receive newsletters from Raavon Group.</>
                : 'You will no longer receive newsletters from Raavon Group.'}
            </p>
          </>
        ) : (
          <>
            <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C19A6B', margin: '0 0 16px' }}>
              Something went wrong
            </p>
            <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '26px', fontWeight: 400, color: '#FAF7F2', fontStyle: 'italic', margin: '0 0 16px', lineHeight: 1.35 }}>
              Invalid unsubscribe link.
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(250,247,242,0.45)', lineHeight: 1.7, margin: '0 0 32px' }}>
              Please reach out to{' '}
              <a href="mailto:contact@raavon.com" style={{ color: '#C19A6B', textDecoration: 'none' }}>
                contact@raavon.com
              </a>{' '}
              and we will remove you manually.
            </p>
          </>
        )}

        {/* Bottom rule */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg,transparent,rgba(193,154,107,0.3),transparent)', marginBottom: '32px' }} />

        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            border: '1px solid rgba(193,154,107,0.35)',
            color: '#C19A6B',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Back to Raavon
        </Link>
      </div>
    </main>
  )
}
