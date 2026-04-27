import fs from 'fs'
import path from 'path'

const DATA_DIR = process.env.NODE_ENV === 'production'
  ? '/tmp/raavon-data'
  : path.join(process.cwd(), 'data')

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

function readJSON<T>(file: string): T[] {
  ensureDir()
  const filePath = path.join(DATA_DIR, file)
  if (!fs.existsSync(filePath)) return []
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {
    return []
  }
}

function writeJSON<T>(file: string, data: T[]) {
  ensureDir()
  fs.writeFileSync(path.join(DATA_DIR, file), JSON.stringify(data, null, 2))
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export interface Subscriber {
  id: string
  email: string
  createdAt: string
}

export const storage = {
  contacts: {
    list: (): ContactSubmission[] => readJSON('contacts.json'),
    add: (entry: Omit<ContactSubmission, 'id' | 'createdAt'>) => {
      const records = readJSON<ContactSubmission>('contacts.json')
      const newRecord: ContactSubmission = {
        ...entry,
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        createdAt: new Date().toISOString(),
      }
      records.unshift(newRecord)
      writeJSON('contacts.json', records)
      return newRecord
    },
  },
  subscribers: {
    list: (): Subscriber[] => readJSON('subscribers.json'),
    add: (email: string) => {
      const records = readJSON<Subscriber>('subscribers.json')
      if (records.some((r) => r.email === email)) return null
      const newRecord: Subscriber = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        email,
        createdAt: new Date().toISOString(),
      }
      records.unshift(newRecord)
      writeJSON('subscribers.json', records)
      return newRecord
    },
    remove: (email: string) => {
      const records = readJSON<Subscriber>('subscribers.json').filter((r) => r.email !== email)
      writeJSON('subscribers.json', records)
    },
  },
}
