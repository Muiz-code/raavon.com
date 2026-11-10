import 'server-only'
import { escapeHtml as e } from '@/lib/security/escape'
import { sign } from '@/lib/security/signing'
import { site } from '@/content/site'

/* Brand colours (RaaVon brand guide V1). Email clients need inline values. */
const C = {
  noir: '#0B0B0E',
  raised: '#141418',
  cream: '#ECE6D8',
  mist: '#B9B3A6',
  gold: '#E6C989',
  burgundy: '#6F1D1B',
  line: 'rgba(236,230,216,0.14)',
}
const FONT = "'Bricolage Grotesque', 'Helvetica Neue', Arial, sans-serif"

export function unsubscribeUrl(email: string): string {
  const token = sign(`unsubscribe:${email.toLowerCase()}`)
  const params = new URLSearchParams({ email })
  if (token) params.set('token', token)
  return `${site.url}/api/unsubscribe?${params.toString()}`
}

function layout(content: string, footer = ''): string {
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="dark"></head>
<body style="margin:0;padding:0;background:${C.noir};">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.noir};">
<tr><td align="center" style="padding:40px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:580px;">
  <tr><td style="padding:0 0 28px;"><img src="${site.url}/brand/raavon-logo-on-dark.png" width="156" height="28" alt="${site.name}" style="display:block;border:0;width:156px;height:auto;"></td></tr>
  <tr><td style="background:${C.raised};border:1px solid ${C.line};border-radius:12px;padding:36px 32px;font-family:${FONT};color:${C.cream};">
    ${content}
  </td></tr>
  <tr><td style="padding:28px 4px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.mist};">
    ${site.signature}<br>
    <a href="${site.url}" style="color:${C.mist};">raavon.com</a>
    ${footer}
  </td></tr>
</table>
</td></tr>
</table>
</body>
</html>`
}

const eyebrow = (text: string) =>
  `<p style="margin:0 0 14px;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:${C.gold};">${text}</p>`

const heading = (text: string) =>
  `<h1 style="margin:0 0 18px;font-size:26px;line-height:1.15;font-weight:800;color:${C.cream};">${text}</h1>`

const para = (html: string) =>
  `<p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:${C.mist};">${html}</p>`

const button = (href: string, label: string) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:8px;"><tr><td style="background:${C.burgundy};border-radius:8px;">
    <a href="${href}" style="display:inline-block;padding:14px 24px;font-family:${FONT};font-size:15px;font-weight:600;color:#ffffff;text-decoration:none;">${label}</a>
  </td></tr></table>`

const row = (label: string, value: string) =>
  `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-size:13px;color:${C.mist};width:130px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.line};font-size:15px;color:${C.cream};">${value}</td>
  </tr>`

const plain = (text: string) => e(text).replace(/\n/g, '<br>')

/* ── Contact ────────────────────────────────────────────────────────── */

export type EnquiryEmailData = {
  name: string
  email: string
  company: string
  enquiry: string
  message: string
  budget: string
  timeline: string
}

export function enquiryNotificationEmail(d: EnquiryEmailData): string {
  const rows = [
    row('Name', e(d.name)),
    row('Email', `<a href="mailto:${e(d.email)}" style="color:${C.gold};">${e(d.email)}</a>`),
    d.company ? row('Company', e(d.company)) : '',
    row('Enquiry', e(d.enquiry)),
    row('Budget', e(d.budget || 'Not given')),
    row('Timeline', e(d.timeline || 'Not given')),
  ].join('')

  return layout(`
    ${eyebrow('New enquiry from raavon.com')}
    ${heading(e(d.enquiry))}
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;font-family:${FONT};">${rows}</table>
    <p style="margin:0 0 8px;font-size:13px;color:${C.mist};">Description</p>
    <p style="margin:0 0 28px;font-size:15px;line-height:1.65;color:${C.cream};">${plain(d.message)}</p>
    ${para('Reply to this email to respond directly.')}
  `)
}

export function enquiryConfirmationEmail(name: string): string {
  return layout(`
    ${eyebrow('Enquiry received')}
    ${heading(`Thank you, ${e(name)}.`)}
    ${para('We have received your enquiry and will read it carefully. If it is a good fit, we will reply to arrange a conversation about scope, timing and next steps.')}
    ${para(`If anything changes in the meantime, reply to this email or write to <a href="mailto:${site.email}" style="color:${C.gold};">${site.email}</a>.`)}
    ${button(`${site.url}/ventures`, 'See our ventures')}
  `)
}

/* ── Newsletter ─────────────────────────────────────────────────────── */

function unsubscribeFooter(email: string) {
  return `<br><br>You are receiving this because ${e(email)} subscribed to updates from ${site.name}.
    <a href="${e(unsubscribeUrl(email))}" style="color:${C.mist};">Unsubscribe</a>`
}

export function newsletterWelcomeEmail(email: string): string {
  return layout(
    `
    ${eyebrow('You are subscribed')}
    ${heading('Updates from RaaVon.')}
    ${para('We will write when there is something worth sharing: new ventures, product releases and what we learn while building them. No filler.')}
    ${button(`${site.url}/ventures`, 'See what we are building')}
  `,
    unsubscribeFooter(email),
  )
}

export function newsletterBroadcastEmail(subject: string, body: string, email: string): string {
  return layout(
    `
    ${eyebrow('From RaaVon')}
    ${heading(e(subject))}
    <p style="margin:0 0 24px;font-size:16px;line-height:1.65;color:${C.cream};">${plain(body)}</p>
    ${button(site.url, 'Visit raavon.com')}
  `,
    unsubscribeFooter(email),
  )
}

export function adminReplyEmail(subject: string, body: string): string {
  return layout(`
    ${eyebrow('From the RaaVon team')}
    ${heading(e(subject))}
    <p style="margin:0;font-size:16px;line-height:1.65;color:${C.cream};">${plain(body)}</p>
  `)
}
