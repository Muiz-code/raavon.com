import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/security/admin-session'
import { getMailer, sendEmail, FROM_EMAIL } from '@/lib/email/client'
import { newsletterBroadcastEmail } from '@/lib/email/templates'
import { storage } from '@/lib/storage'

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })

  const { subject, body } = await req.json().catch(() => ({}))
  if (!subject || !body) {
    return NextResponse.json({ error: 'Subject and body required.' }, { status: 400 })
  }
  if (!getMailer()) {
    return NextResponse.json({ error: 'Email is not configured (RESEND_API_KEY missing).' }, { status: 503 })
  }

  const subscribers = storage.subscribers.list()
  if (subscribers.length === 0) {
    return NextResponse.json({ error: 'No subscribers.' }, { status: 400 })
  }

  const results = { sent: 0, failed: 0 }
  for (const sub of subscribers) {
    const result = await sendEmail({
      from: FROM_EMAIL,
      to: sub.email,
      subject: String(subject),
      html: newsletterBroadcastEmail(String(subject), String(body), sub.email),
    })
    if (result.ok) results.sent++
    else results.failed++
  }

  return NextResponse.json({ success: results.failed === 0, ...results })
}
