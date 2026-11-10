'use client'

import { useId, useState } from 'react'
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { site } from '@/content/site'

type State =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'done' }
  | { status: 'error'; message: string }

const MESSAGES: Record<string, string> = {
  invalid: 'Enter a valid email address.',
  rate_limited: 'Too many attempts. Please try again in a few minutes.',
  not_configured: `Sign-up is not available right now. Email ${site.email} and we will add you.`,
  send_failed: `We could not complete your sign-up. Please try again, or email ${site.email}.`,
}

export default function NewsletterForm() {
  const id = useId()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>({ status: 'idle' })

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      setState({ status: 'error', message: MESSAGES.invalid })
      return
    }
    setState({ status: 'sending' })
    try {
      const website = (new FormData(e.currentTarget).get('website') as string) ?? ''
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website }),
      })
      if (res.ok) {
        setState({ status: 'done' })
        setEmail('')
        return
      }
      const data = await res.json().catch(() => ({}))
      setState({ status: 'error', message: MESSAGES[data.code] ?? MESSAGES.send_failed })
    } catch {
      setState({ status: 'error', message: 'You appear to be offline. Check your connection and try again.' })
    }
  }

  if (state.status === 'done') {
    return (
      <p role="status" className="flex items-start gap-2 font-semibold text-cream">
        <CircleCheck size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
        You are subscribed. Check your inbox for a welcome email.
      </p>
    )
  }

  const errorId = `${id}-error`

  return (
    <form onSubmit={onSubmit} noValidate className="w-full">
      <label htmlFor={`${id}-email`} className="field-label">
        Updates from RaaVon
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          className="field sm:flex-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={state.status === 'error' || undefined}
          aria-describedby={state.status === 'error' ? errorId : undefined}
        />
        {/* Honeypot for bots. Hidden from people and assistive technology. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <button type="submit" className="btn btn-secondary" disabled={state.status === 'sending'}>
          {state.status === 'sending' ? (
            <>
              <LoaderCircle size={17} className="animate-spin" aria-hidden="true" />
              Subscribing
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight size={17} aria-hidden="true" />
            </>
          )}
        </button>
      </div>
      <div aria-live="polite">
        {state.status === 'error' && (
          <p id={errorId} className="field-error">
            <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            {state.message}
          </p>
        )}
      </div>
    </form>
  )
}
