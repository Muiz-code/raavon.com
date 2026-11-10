import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'

/**
 * HMAC helpers for admin sessions and unsubscribe links.
 * Secret: SESSION_SECRET (preferred). Falls back to ADMIN_PASSWORD so an
 * existing deployment keeps working, but set SESSION_SECRET in production.
 */
function secret(): string | null {
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || null
}

export function sign(value: string): string | null {
  const key = secret()
  if (!key) return null
  return createHmac('sha256', key).update(value).digest('base64url')
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a)
  const bb = Buffer.from(b)
  if (ab.length !== bb.length) return false
  return timingSafeEqual(ab, bb)
}

export function verify(value: string, signature: string | null | undefined): boolean {
  if (!signature) return false
  const expected = sign(value)
  if (!expected) return false
  return safeEqual(expected, signature)
}
