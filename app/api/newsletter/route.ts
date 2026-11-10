import { NextRequest, NextResponse } from 'next/server'
import { getMailer, sendEmail, FROM_EMAIL, TEAM_EMAIL } from '@/lib/email/client'
import { newsletterWelcomeEmail } from '@/lib/email/templates'
import { escapeHtml } from '@/lib/security/escape'
import { clientIp, rateLimit } from '@/lib/security/rate-limit'
import { storage } from '@/lib/storage'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/**
 * Newsletter sign-up. Success is returned only when the team notification
 * (the durable record of the subscription) is accepted.
 */
export async function POST(req: NextRequest) {
  let email = ''
  try {
    const body = await req.json()
    if (typeof body.website === 'string' && body.website) return NextResponse.json({ ok: true })
    email = String(body.email ?? '').trim().toLowerCase()
  } catch {
    /* handled below */
  }

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ code: 'invalid', error: 'Enter a valid email address.' }, { status: 422 })
  }

  if (!rateLimit(`newsletter:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ code: 'rate_limited' }, { status: 429 })
  }

  if (!getMailer()) {
    console.error('[newsletter] RESEND_API_KEY is not set.')
    return NextResponse.json({ code: 'not_configured' }, { status: 503 })
  }

  const notified = await sendEmail({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    subject: `New newsletter subscriber: ${email}`,
    html: `<p style="font-family:Arial,sans-serif">New subscriber: <strong>${escapeHtml(email)}</strong></p>`,
  })
  if (!notified.ok) {
    console.error('[newsletter] Team notification failed:', notified.error)
    return NextResponse.json({ code: 'send_failed' }, { status: 502 })
  }

  try {
    storage.subscribers.add(email)
  } catch (err) {
    console.error('[newsletter] Storage write failed:', err)
  }

  const welcomed = await sendEmail({
    from: FROM_EMAIL,
    to: email,
    subject: 'You are subscribed to RaaVon updates',
    html: newsletterWelcomeEmail(email),
  })
  if (!welcomed.ok) console.warn('[newsletter] Welcome email failed:', welcomed.error)

  return NextResponse.json({ ok: true })
}
