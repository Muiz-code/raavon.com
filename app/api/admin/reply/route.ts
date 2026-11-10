import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/security/admin-session'
import { sendEmail, FROM_EMAIL, TEAM_EMAIL } from '@/lib/email/client'
import { adminReplyEmail } from '@/lib/email/templates'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })

  const { to, subject, body } = await req.json().catch(() => ({}))
  if (!to || !subject || !body || !EMAIL_RE.test(String(to))) {
    return NextResponse.json({ error: 'A valid recipient, subject and message are required.' }, { status: 400 })
  }

  const result = await sendEmail({
    from: FROM_EMAIL,
    to: String(to),
    replyTo: TEAM_EMAIL,
    subject: String(subject),
    html: adminReplyEmail(String(subject), String(body)),
  })

  if (!result.ok) {
    const status = result.error === 'not_configured' ? 503 : 502
    return NextResponse.json({ error: `Email was not sent: ${result.error}` }, { status })
  }
  return NextResponse.json({ success: true })
}
