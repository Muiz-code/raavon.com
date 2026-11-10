import { NextRequest, NextResponse } from 'next/server'
import { checkPassword, setSessionCookie } from '@/lib/security/admin-session'
import { clientIp, rateLimit } from '@/lib/security/rate-limit'

export async function POST(req: NextRequest) {
  if (!rateLimit(`admin-login:${clientIp(req.headers)}`, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 })
  }

  let password: unknown
  try {
    ;({ password } = await req.json())
  } catch {
    /* handled below */
  }

  if (!checkPassword(password)) {
    return NextResponse.json({ error: 'Invalid password.' }, { status: 401 })
  }

  const res = NextResponse.json({ success: true })
  setSessionCookie(res)
  return res
}
