import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL, CONTACT_EMAIL } from '@/lib/resend'
import { newsletterWelcomeEmail } from '@/lib/emails'
import { storage } from '@/lib/storage'

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required.' }, { status: 400 })
    }

    storage.subscribers.add(email)

    await Promise.all([
      /* 1. Welcome email to subscriber */
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'Welcome to the Raavon inside track',
        html: newsletterWelcomeEmail(email),
      }),
      /* 2. Notify team of new subscriber */
      resend.emails.send({
        from: FROM_EMAIL,
        to: CONTACT_EMAIL,
        subject: `New newsletter subscriber: ${email}`,
        html: `<p style="font-family:sans-serif;color:#333;">New subscriber: <strong>${email}</strong></p>`,
      }),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[newsletter]', err)
    return NextResponse.json({ error: 'Failed to subscribe. Please try again.' }, { status: 500 })
  }
}
