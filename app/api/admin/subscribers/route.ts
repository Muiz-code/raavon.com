import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/security/admin-session'
import { storage } from '@/lib/storage'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  return NextResponse.json(storage.subscribers.list())
}

export async function DELETE(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  const { email } = await req.json().catch(() => ({ email: null }))
  if (!email) return NextResponse.json({ error: 'Email required.' }, { status: 400 })
  storage.subscribers.remove(String(email))
  return NextResponse.json({ success: true })
}
