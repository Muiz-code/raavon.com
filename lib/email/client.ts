import 'server-only'
import { Resend } from 'resend'

/**
 * Resend is created lazily so a missing key never crashes a route at import
 * time. Routes call `getMailer()` and handle `null` as "not configured".
 */
let client: Resend | null = null

export function getMailer(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  client ??= new Resend(key)
  return client
}

export const FROM_EMAIL = process.env.RESEND_FROM ?? 'RaaVon <contact@raavon.com>'
export const TEAM_EMAIL = process.env.CONTACT_INBOX ?? 'contact@raavon.com'

type SendInput = Parameters<Resend['emails']['send']>[0]

/**
 * Resend v6 reports failures in the return value instead of throwing.
 * This wrapper normalises both cases into `{ ok, error }`.
 */
export async function sendEmail(input: SendInput): Promise<{ ok: boolean; error?: string }> {
  const mailer = getMailer()
  if (!mailer) return { ok: false, error: 'not_configured' }
  try {
    const { error } = await mailer.emails.send(input)
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'unknown_error' }
  }
}
