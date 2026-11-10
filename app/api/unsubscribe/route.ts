import { NextRequest, NextResponse } from 'next/server'
import { verify } from '@/lib/security/signing'
import { storage } from '@/lib/storage'

/**
 * Unsubscribe links carry an HMAC token so nobody can remove someone else
 * from the list by guessing the URL.
 */
export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')?.trim().toLowerCase()
  const token = req.nextUrl.searchParams.get('token')

  if (!email || !verify(`unsubscribe:${email}`, token)) {
    return NextResponse.redirect(new URL('/unsubscribe?status=invalid', req.url))
  }

  try {
    storage.subscribers.remove(email)
  } catch (err) {
    console.error('[unsubscribe] Storage write failed:', err)
    return NextResponse.redirect(new URL('/unsubscribe?status=error', req.url))
  }
  return NextResponse.redirect(new URL('/unsubscribe?status=done', req.url))
}
