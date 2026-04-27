import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL } from '@/lib/resend'
import { wrapper } from '@/lib/emails'

function isAuthed(req: NextRequest) {
  return req.cookies.get('raavon_admin')?.value === process.env.ADMIN_PASSWORD
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })

  const { to, toName, subject, body } = await req.json()
  if (!to || !subject || !body) {
    return NextResponse.json({ error: 'Missing fields.' }, { status: 400 })
  }

  const html = wrapper(`
    <tr><td style="background:#0A0A08; border:1px solid rgba(193,154,107,0.15); padding:36px;">
      <p style="font-family:Arial,sans-serif; font-size:11px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; margin:0 0 20px;">
        From the Raavon team
      </p>
      <h1 style="font-family:Georgia,serif; font-size:22px; font-weight:400; color:#FAF7F2; margin:0 0 24px; font-style:italic;">
        ${subject}
      </h1>
      <div style="font-family:Arial,sans-serif; font-size:15px; color:rgba(250,247,242,0.65); line-height:1.8; white-space:pre-wrap; margin-bottom:32px;">
        ${body}
      </div>
      <table cellpadding="0" cellspacing="0" border="0">
        <tr><td style="border:1px solid rgba(193,154,107,0.45);">
          <a href="https://raavon.com" style="display:block; padding:12px 28px; font-family:Arial,sans-serif; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#C19A6B; text-decoration:none;">
            Visit Raavon &rarr;
          </a>
        </td></tr>
      </table>
    </td></tr>
  `)

  await resend.emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
    replyTo: 'contact@raavon.com',
  })

  return NextResponse.json({ success: true })
}
