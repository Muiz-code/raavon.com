'use client'

import { useState, useEffect, useCallback } from 'react'
import { LogOut, Mail, Users, Send, RefreshCw, X, ChevronDown, ChevronUp, Trash2 } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

/* ── Types ───────────────────────────────────────────────────────── */
interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

interface Subscriber {
  id: string
  email: string
  createdAt: string
}

type Tab = 'contacts' | 'subscribers' | 'broadcast'

/* ── Shared styles ────────────────────────────────────────────────── */
const s = {
  page: { background: '#050503', minHeight: '100vh', color: '#FAF7F2', fontFamily: 'system-ui, sans-serif' } as React.CSSProperties,
  panel: { background: '#0A0A08', border: '1px solid rgba(193,154,107,0.15)', padding: '24px' } as React.CSSProperties,
  label: { fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase' as const, color: '#C19A6B', marginBottom: '8px' },
  input: {
    width: '100%', background: 'rgba(193,154,107,0.05)', border: '1px solid rgba(193,154,107,0.2)',
    color: '#FAF7F2', padding: '10px 14px', fontSize: '14px', fontFamily: 'inherit', outline: 'none',
  } as React.CSSProperties,
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
    border: '1px solid rgba(193,154,107,0.45)', color: '#C19A6B', background: 'transparent',
    fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const,
    cursor: 'pointer', fontFamily: 'inherit',
  } as React.CSSProperties,
  btnSolid: {
    display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px',
    border: '1px solid rgba(193,154,107,0.6)', color: '#FAF7F2', background: 'rgba(193,154,107,0.12)',
    fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' as const,
    cursor: 'pointer', fontFamily: 'inherit',
  } as React.CSSProperties,
  muted: { color: 'rgba(250,247,242,0.4)', fontSize: '13px' },
}

/* ── Login screen ─────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (res.ok) {
      onLogin()
    } else {
      setError('Incorrect password.')
      setPassword('')
    }
  }

  return (
    <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '24px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '6px', color: '#FAF7F2' }}>RAA</span>
          <span style={{ fontWeight: 800, fontSize: '22px', letterSpacing: '6px', color: '#7A4A35' }}>VON</span>
          <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: '#C19A6B', marginTop: '8px' }}>
            Admin
          </p>
        </div>

        <div style={s.panel}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <p style={s.label}>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={s.input}
                autoFocus
              />
            </div>
            {error && <p style={{ color: '#C87474', fontSize: '13px', margin: 0 }}>{error}</p>}
            <button type="submit" disabled={loading} style={s.btnSolid}>
              {loading ? 'Checking…' : 'Enter'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ── Contacts tab ─────────────────────────────────────────────────── */
function ContactsTab() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [replyState, setReplyState] = useState<{ id: string; subject: string; body: string } | null>(null)
  const [sending, setSending] = useState(false)
  const [sentIds, setSentIds] = useState<string[]>([])
  const toast = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/contacts')
    if (res.ok) setContacts(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function sendReply(contact: Contact) {
    if (!replyState) return
    setSending(true)
    const res = await fetch('/api/admin/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: contact.email, toName: contact.name, subject: replyState.subject, body: replyState.body }),
    })
    setSending(false)
    if (res.ok) {
      setSentIds((prev) => [...prev, contact.id])
      setReplyState(null)
      toast(`Reply sent to ${contact.name}`)
    } else {
      toast('Failed to send reply. Try again.', 'error')
    }
  }

  if (loading) return <p style={s.muted}>Loading…</p>

  if (contacts.length === 0) {
    return (
      <div style={{ ...s.panel, textAlign: 'center', padding: '48px' }}>
        <Mail size={32} style={{ color: '#C19A6B', marginBottom: '12px' }} />
        <p style={s.muted}>No contact submissions yet.</p>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {contacts.map((c) => (
        <div key={c.id} style={s.panel}>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            onClick={() => setExpanded(expanded === c.id ? null : c.id)}
          >
            <div>
              <p style={{ fontWeight: 600, fontSize: '15px', color: '#FAF7F2', margin: '0 0 4px' }}>{c.name}</p>
              <p style={{ ...s.muted, margin: 0 }}>{c.email} &nbsp;·&nbsp; {c.subject}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(250,247,242,0.25)' }}>
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
              {expanded === c.id ? <ChevronUp size={14} style={{ color: '#C19A6B' }} /> : <ChevronDown size={14} style={{ color: '#C19A6B' }} />}
            </div>
          </div>

          {expanded === c.id && (
            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(193,154,107,0.1)', paddingTop: '20px' }}>
              <p style={{ fontSize: '14px', color: 'rgba(250,247,242,0.65)', lineHeight: 1.8, whiteSpace: 'pre-wrap', margin: '0 0 20px' }}>
                {c.message}
              </p>

              {sentIds.includes(c.id) ? (
                <p style={{ fontSize: '12px', color: '#C19A6B', letterSpacing: '2px' }}>REPLY SENT ✦</p>
              ) : replyState?.id === c.id ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <p style={s.label}>Subject</p>
                    <input
                      value={replyState.subject}
                      onChange={(e) => setReplyState({ ...replyState, subject: e.target.value })}
                      style={s.input}
                    />
                  </div>
                  <div>
                    <p style={s.label}>Message</p>
                    <textarea
                      value={replyState.body}
                      onChange={(e) => setReplyState({ ...replyState, body: e.target.value })}
                      rows={5}
                      style={{ ...s.input, resize: 'vertical' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={s.btnSolid} onClick={() => sendReply(c)} disabled={sending}>
                      <Send size={12} />
                      {sending ? 'Sending…' : 'Send Reply'}
                    </button>
                    <button style={s.btn} onClick={() => setReplyState(null)}>
                      <X size={12} /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  style={s.btn}
                  onClick={() => setReplyState({ id: c.id, subject: `Re: ${c.subject}`, body: `Hi ${c.name},\n\n` })}
                >
                  <Mail size={12} /> Reply
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/* ── Subscribers tab ──────────────────────────────────────────────── */
function SubscribersTab() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [pendingRemove, setPendingRemove] = useState<string | null>(null)
  const toast = useToast()

  const load = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/subscribers')
    if (res.ok) setSubscribers(await res.json())
    setLoading(false)
  }, [])

  useEffect(() => { load() }, [load])

  async function remove(email: string) {
    setPendingRemove(null)
    await fetch('/api/admin/subscribers', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSubscribers((prev) => prev.filter((s) => s.email !== email))
    toast(`${email} removed from subscribers`, 'info')
  }

  if (loading) return <p style={s.muted}>Loading…</p>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <p style={{ ...s.muted, margin: 0 }}>
          <span style={{ color: '#C19A6B', fontWeight: 600 }}>{subscribers.length}</span> subscriber{subscribers.length !== 1 ? 's' : ''}
        </p>
        {subscribers.length > 0 && (
          <button
            style={{ ...s.btn, fontSize: '11px', padding: '6px 12px' }}
            onClick={() => {
              const csv = 'email,date\n' + subscribers.map((s) => `${s.email},${s.createdAt}`).join('\n')
              const a = document.createElement('a')
              a.href = 'data:text/csv,' + encodeURIComponent(csv)
              a.download = 'raavon-subscribers.csv'
              a.click()
            }}
          >
            Export CSV
          </button>
        )}
      </div>

      {subscribers.length === 0 ? (
        <div style={{ ...s.panel, textAlign: 'center', padding: '48px' }}>
          <Users size={32} style={{ color: '#C19A6B', marginBottom: '12px' }} />
          <p style={s.muted}>No subscribers yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {subscribers.map((sub) => (
            <div
              key={sub.id}
              style={{ ...s.panel, padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <div>
                <p style={{ color: '#FAF7F2', fontSize: '14px', margin: '0 0 2px' }}>{sub.email}</p>
                <p style={{ ...s.muted, margin: 0, fontSize: '11px' }}>{new Date(sub.createdAt).toLocaleDateString()}</p>
              </div>
              {pendingRemove === sub.email ? (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', color: 'rgba(250,247,242,0.4)' }}>Remove?</span>
                  <button onClick={() => remove(sub.email)}
                    style={{ background: 'none', border: '1px solid #C87474', cursor: 'pointer', color: '#C87474', padding: '3px 8px', fontSize: '11px', fontFamily: 'inherit' }}>
                    Yes
                  </button>
                  <button onClick={() => setPendingRemove(null)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(250,247,242,0.3)', padding: '3px', fontSize: '11px', fontFamily: 'inherit' }}>
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setPendingRemove(sub.email)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(250,247,242,0.2)', padding: '4px' }}
                  title="Remove subscriber"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Broadcast tab ────────────────────────────────────────────────── */
function BroadcastTab() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [sending, setSending] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const toast = useToast()

  async function handleSend(e: React.FormEvent) {
    e.preventDefault()
    if (!confirmed) { setConfirmed(true); return }
    setSending(true)
    setConfirmed(false)
    const res = await fetch('/api/admin/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ subject, body }),
    })
    const data = await res.json()
    setSending(false)
    if (res.ok) {
      toast(`Sent to ${data.sent} subscriber${data.sent !== 1 ? 's' : ''}${data.failed ? ` · ${data.failed} failed` : ''}`)
      setSubject('')
      setBody('')
    } else {
      toast(data.error || 'Failed to send. Check your subscriber list.', 'error')
    }
  }

  return (
    <div style={s.panel}>
      <p style={{ ...s.label, marginBottom: '24px' }}>Compose Newsletter</p>

      <form onSubmit={handleSend} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <p style={s.label}>Subject line</p>
          <input value={subject} onChange={(e) => { setSubject(e.target.value); setConfirmed(false) }} required style={s.input} placeholder="What's the subject?" />
        </div>
        <div>
          <p style={s.label}>Body (plain text or basic HTML)</p>
          <textarea
            value={body}
            onChange={(e) => { setBody(e.target.value); setConfirmed(false) }}
            required
            rows={10}
            style={{ ...s.input, resize: 'vertical' }}
            placeholder="Write your newsletter..."
          />
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button type="submit" disabled={sending} style={confirmed ? { ...s.btnSolid, background: 'rgba(200,116,116,0.15)', borderColor: '#C87474', color: '#FAF7F2' } : s.btnSolid}>
            <Send size={13} />
            {sending ? 'Sending…' : confirmed ? 'Confirm — send to everyone?' : 'Send to All Subscribers'}
          </button>
          {confirmed && (
            <button type="button" style={s.btn} onClick={() => setConfirmed(false)}>
              <RefreshCw size={12} /> Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

/* ── Main admin page ──────────────────────────────────────────────── */
export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [tab, setTab] = useState<Tab>('contacts')

  useEffect(() => {
    /* Quick auth probe */
    fetch('/api/admin/contacts').then((r) => {
      setAuthed(r.status !== 401)
    })
  }, [])

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    setAuthed(false)
  }

  if (authed === null) {
    return <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={s.muted}>Loading…</p>
    </div>
  }

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'contacts', label: 'Messages', icon: <Mail size={14} /> },
    { key: 'subscribers', label: 'Subscribers', icon: <Users size={14} /> },
    { key: 'broadcast', label: 'Newsletter', icon: <Send size={14} /> },
  ]

  return (
    <div style={s.page}>
      {/* Top bar */}
      <div style={{ borderBottom: '1px solid rgba(193,154,107,0.12)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '4px', color: '#FAF7F2' }}>RAA</span>
          <span style={{ fontWeight: 800, fontSize: '16px', letterSpacing: '4px', color: '#7A4A35' }}>VON</span>
          <span style={{ fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(250,247,242,0.25)', marginLeft: '4px' }}>Admin</span>
        </div>
        <button onClick={logout} style={{ ...s.btn, padding: '6px 14px', fontSize: '11px' }}>
          <LogOut size={12} /> Sign out
        </button>
      </div>

      {/* Tab nav */}
      <div style={{ borderBottom: '1px solid rgba(193,154,107,0.12)', padding: '0 32px', display: 'flex', gap: '4px' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase',
              color: tab === t.key ? '#C19A6B' : 'rgba(250,247,242,0.35)',
              borderBottom: tab === t.key ? '1px solid #C19A6B' : '1px solid transparent',
              marginBottom: '-1px', fontFamily: 'inherit',
            }}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '32px', maxWidth: '900px' }}>
        {tab === 'contacts' && <ContactsTab />}
        {tab === 'subscribers' && <SubscribersTab />}
        {tab === 'broadcast' && <BroadcastTab />}
      </div>
    </div>
  )
}
