import { NextRequest, NextResponse } from 'next/server'
import { getMailer, sendEmail, FROM_EMAIL, TEAM_EMAIL } from '@/lib/email/client'
import { enquiryConfirmationEmail, enquiryNotificationEmail } from '@/lib/email/templates'
import { enquiryLabel, validateContact } from '@/lib/validation/contact'
import { clientIp, rateLimit } from '@/lib/security/rate-limit'
import { storage } from '@/lib/storage'

/**
 * Contact form endpoint.
 *
 * Success is only returned once the team notification email has been
 * accepted by Resend. That email is the system of record. Storage and the
 * visitor's confirmation email are best-effort extras.
 *
 * Response codes the form relies on:
 *   200 { ok: true }
 *   422 { code: 'invalid', errors }
 *   429 { code: 'rate_limited' }
 *   503 { code: 'not_configured' }   email service has no API key
 *   502 { code: 'send_failed' }      email service rejected the message
 */
export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ code: 'invalid', errors: {} }, { status: 400 })
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.website === 'string' && body.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  if (!rateLimit(`contact:${clientIp(req.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ code: 'rate_limited' }, { status: 429 })
  }

  const { data, errors } = validateContact(body)
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ code: 'invalid', errors }, { status: 422 })
  }

  if (!getMailer()) {
    console.error('[contact] RESEND_API_KEY is not set. Enquiry was not delivered.')
    return NextResponse.json({ code: 'not_configured' }, { status: 503 })
  }

  const enquiry = enquiryLabel(data.enquiryType)

  const notified = await sendEmail({
    from: FROM_EMAIL,
    to: TEAM_EMAIL,
    replyTo: data.email,
    subject: `New enquiry: ${enquiry} from ${data.name}${data.company ? ` (${data.company})` : ''}`,
    html: enquiryNotificationEmail({ ...data, enquiry }),
  })

  if (!notified.ok) {
    console.error('[contact] Team notification failed:', notified.error)
    return NextResponse.json({ code: 'send_failed' }, { status: 502 })
  }

  try {
    storage.contacts.add({
      name: data.name,
      email: data.email,
      company: data.company,
      subject: enquiry,
      message: data.message,
      budget: data.budget,
      timeline: data.timeline,
    })
  } catch (err) {
    console.error('[contact] Storage write failed (email was delivered):', err)
  }

  const confirmed = await sendEmail({
    from: FROM_EMAIL,
    to: data.email,
    replyTo: TEAM_EMAIL,
    subject: 'We have received your enquiry',
    html: enquiryConfirmationEmail(data.name),
  })
  if (!confirmed.ok) console.warn('[contact] Confirmation email failed:', confirmed.error)

  return NextResponse.json({ ok: true })
}
