'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'

export type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: string
  type: ToastType
  message: string
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

const ICONS = {
  success: <CheckCircle size={15} />,
  error: <AlertCircle size={15} />,
  info: <Info size={15} />,
}

const ACCENT = {
  success: '#C19A6B',
  error: '#C87474',
  info: 'rgba(250,247,242,0.4)',
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  const dismiss = useCallback((id: string) => {
    clearTimeout(timers.current[id])
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const toast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 5)
    setToasts((prev) => [...prev, { id, type, message }])
    timers.current[id] = setTimeout(() => dismiss(id), 4200)
  }, [dismiss])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}

      {/* Toast stack — fixed bottom-right */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              style={{
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                background: '#0A0A08',
                border: `1px solid ${ACCENT[t.type]}`,
                borderLeft: `3px solid ${ACCENT[t.type]}`,
                minWidth: '260px',
                maxWidth: '380px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
              }}
            >
              <span style={{ color: ACCENT[t.type], flexShrink: 0 }}>{ICONS[t.type]}</span>
              <span style={{ fontFamily: 'var(--font-dm), system-ui, sans-serif', fontSize: '13px', color: '#FAF7F2', flex: 1, lineHeight: 1.5 }}>
                {t.message}
              </span>
              <button
                onClick={() => dismiss(t.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(250,247,242,0.3)', padding: '2px', flexShrink: 0 }}
              >
                <X size={13} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside ToastProvider')
  return ctx.toast
}
