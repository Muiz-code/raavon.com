import { NextRequest, NextResponse } from 'next/server'
import { storage } from '@/lib/storage'

function isAuthed(req: NextRequest) {
  return req.cookies.get('raavon_admin')?.value === process.env.ADMIN_PASSWORD
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorised.' }, { status: 401 })
  return NextResponse.json(storage.contacts.list())
}
