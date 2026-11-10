import 'server-only'
import type { NextRequest, NextResponse } from 'next/server'
import { safeEqual, sign, verify } from './signing'

const COOKIE = 'raavon_admin'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7

/** Constant-time password check. */
export function checkPassword(candidate: unknown): boolean {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || typeof candidate !== 'string') return false
  return safeEqual(candidate, expected)
}

/**
 * The cookie holds `expiry.signature`, never the password itself.
 */
export function setSessionCookie(res: NextResponse) {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000
  const payload = `admin:${expires}`
  const signature = sign(payload)
  if (!signature) throw new Error('No signing secret configured')
  res.cookies.set(COOKIE, `${expires}.${signature}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: MAX_AGE_SECONDS,
    path: '/',
  })
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(COOKIE, '', { maxAge: 0, path: '/' })
}

export function isAdmin(req: NextRequest): boolean {
  const raw = req.cookies.get(COOKIE)?.value
  if (!raw) return false
  const [expires, signature] = raw.split('.')
  if (!expires || !signature || Number(expires) < Date.now()) return false
  return verify(`admin:${expires}`, signature)
}
