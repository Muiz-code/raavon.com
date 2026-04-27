import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { newsletterBroadcastEmail } from '@/lib/emails'
import { storage } from '@/lib/storage'

function isAuthed(req: NextRequest) {
  return req.cookies.get('raavon_admin')?.value === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })

  const { subject, body } = await req.json()
  if (!subject || !body) {
    return NextResponse.json({ error: 'Subject and body required.' }, { status: 400 })
  }

  const subscribers = storage.subscribers.list()
  if (subscribers.length === 0) {
    return NextResponse.json({ error: 'No subscribers.' }, { status: 400 })
  }

  /* Send in batches of 10 to avoid rate limits */
  const results = { sent: 0, failed: 0 }
  for (const sub of subscribers) {
    const html = newsletterBroadcastEmail(subject, body, sub.email)
    try {
      await resend.emails.send({ from: FROM_EMAIL, to: sub.email, subject, html })
      results.sent++
    } catch {
      results.failed++
    }
  }

  return NextResponse.json({ success: true, ...results })
}
