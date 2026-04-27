import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) {
    return NextResponse.redirect(new URL('/unsubscribe?status=invalid', req.url))
  }
  storage.subscribers.remove(email)
  return NextResponse.redirect(new URL(`/unsubscribe?status=done&email=${encodeURIComponent(email)}`, req.url))
}
