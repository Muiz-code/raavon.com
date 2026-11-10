import { NextRequest, NextResponse } from 'next/server'
import { isAdmin } from '@/lib/security/admin-session'
import { storage } from '@/lib/storage'

export async function GET(req: NextRequest) {
  if (!isAdmin(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  return NextResponse.json(storage.contacts.list())
}
