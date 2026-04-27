import { NextRequest, NextResponse } from 'next/server'
import { resend, FROM_EMAIL, CONTACT_EMAIL } from '@/lib/resend'
import { contactConfirmationEmail, contactNotificationEmail, newsletterWelcomeEmail } from '@/lib/emails'
import { storage } from '@/lib/storage'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, newsletter } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    storage.contacts.add({ name, email, subject: subject || 'General Inquiry', message })
    if (newsletter) storage.subscribers.add(email)

    /* Send emails in parallel */
    await Promise.all([
      /* 1. Notify Raavon team */
      resend.emails.send({
        from: FROM_EMAIL,
        to: CONTACT_EMAIL,
        subject: `New enquiry: ${subject || 'Contact form'}`,
        html: contactNotificationEmail({ name, email, subject, message }),
        replyTo: email,
      }),
      /* 2. Confirm to the sender */
      resend.emails.send({
        from: FROM_EMAIL,
        to: email,
        subject: 'We received your message — Raavon Group',
        html: contactConfirmationEmail(name),
      }),
      /* 3. Newsletter welcome if opted in */
      ...(newsletter
        ? [resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: 'Welcome to the Raavon inside track',
            html: newsletterWelcomeEmail(email),
          })]
        : []),
    ])

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[contact]', err)
    return NextResponse.json({ error: 'Failed to send. Please try again.' }, { status: 500 })
  }
}
