'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { ArrowRight, CircleAlert, CircleCheck, LoaderCircle } from 'lucide-react'
import { budgetRanges, enquiryTypes, timelines, type EnquiryType } from '@/content/engagement'
import { site } from '@/content/site'
import {
  emptyContact,
  enquiryLabel,
  limits,
  validateContact,
  type ContactErrors,
  type ContactInput,
} from '@/lib/validation/contact'

type Status = 'idle' | 'sending' | 'sent' | 'unavailable' | 'failed' | 'rate_limited' | 'offline'

const FIELD_ORDER: (keyof ContactInput)[] = ['name', 'email', 'company', 'enquiryType', 'message', 'budget', 'timeline']

function mailtoFallback(data: ContactInput) {
  const subject = `${enquiryLabel(data.enquiryType)}${data.company ? ` for ${data.company}` : ''}`
  const body = [
    data.message,
    '',
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    data.budget && `Budget: ${data.budget}`,
    data.timeline && `Timeline: ${data.timeline}`,
  ]
    .filter((l): l is string => typeof l === 'string')
    .join('\n')
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

/** `defaultEnquiry` pre-selects the enquiry type, e.g. from /contact?type=new-product */
export default function ContactForm({
  defaultEnquiry,
  defaultMessage,
}: {
  defaultEnquiry?: EnquiryType
  /** Pre-filled description, e.g. a brief sent from the Studio builder */
  defaultMessage?: string
}) {
  const uid = useId()
  const fid = (name: string) => `${uid}-${name}`

  const [values, setValues] = useState<ContactInput>({
    ...emptyContact,
    enquiryType: defaultEnquiry ?? '',
    message: defaultMessage ?? '',
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [submittedOnce, setSubmittedOnce] = useState(false)
  const summaryRef = useRef<HTMLDivElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status !== 'idle' && status !== 'sending') resultRef.current?.focus()
  }, [status])

  function update(name: keyof ContactInput, value: string) {
    const next = { ...values, [name]: value }
    setValues(next)
    // After the first submit, re-validate as the visitor corrects fields
    if (submittedOnce) setErrors(validateContact(next).errors)
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmittedOnce(true)
    const { errors: found } = validateContact(values)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => summaryRef.current?.focus())
      return
    }

    setStatus('sending')
    const website = (new FormData(e.currentTarget).get('website') as string) ?? ''
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, website }),
      })
      if (res.ok) {
        setStatus('sent')
        return
      }
      const data = await res.json().catch(() => ({}))
      if (data.code === 'invalid' && data.errors) {
        setErrors(data.errors)
        setStatus('idle')
        requestAnimationFrame(() => summaryRef.current?.focus())
      } else if (data.code === 'not_configured') setStatus('unavailable')
      else if (data.code === 'rate_limited') setStatus('rate_limited')
      else setStatus('failed')
    } catch {
      setStatus('offline')
    }
  }

  /* ── Success ─────────────────────────────────────────────────────── */
  if (status === 'sent') {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="rounded-xl border border-(--line-strong) bg-(--surface-raised) p-8 md:p-10">
        <CircleCheck size={32} className="text-(--accent)" aria-hidden="true" />
        <h3 className="display-m mt-6">Thank you, {values.name.split(' ')[0]}.</h3>
        <p className="mt-4 max-w-prose text-soft">
          Your enquiry has reached our team. We have also sent a confirmation to {values.email}. If it is a good fit,
          we will reply to arrange a conversation about scope, timing and next steps.
        </p>
      </div>
    )
  }

  const errorList = FIELD_ORDER.filter((k) => errors[k])
  const describe = (name: keyof ContactInput, hint?: string) =>
    [hint && fid(`${name}-hint`), errors[name] && fid(`${name}-error`)].filter(Boolean).join(' ') || undefined

  const fieldError = (name: keyof ContactInput) =>
    errors[name] ? (
      <p id={fid(`${name}-error`)} className="field-error">
        <CircleAlert size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
        {errors[name]}
      </p>
    ) : null

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-7" aria-describedby={fid('required-note')}>
      <p id={fid('required-note')} className="text-sm text-soft">
        All fields are required unless marked optional.
      </p>

      {errorList.length > 0 && (
        <div
          ref={summaryRef}
          tabIndex={-1}
          role="alert"
          className="rounded-lg border-2 border-burgundy bg-(--surface-raised) p-5"
        >
          <p className="font-semibold">Please correct {errorList.length === 1 ? 'this field' : `these ${errorList.length} fields`}:</p>
          <ul className="mt-2 list-disc pl-5">
            {errorList.map((k) => (
              <li key={k}>
                <a href={`#${fid(k)}`} className="link">
                  {errors[k]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={fid('name')} className="field-label">
            Name
          </label>
          <input
            id={fid('name')}
            name="name"
            className="field"
            autoComplete="name"
            maxLength={limits.name}
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name || undefined}
            aria-describedby={describe('name')}
          />
          {fieldError('name')}
        </div>
        <div>
          <label htmlFor={fid('email')} className="field-label">
            Work email
          </label>
          <input
            id={fid('email')}
            name="email"
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            maxLength={limits.email}
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={!!errors.email || undefined}
            aria-describedby={describe('email')}
          />
          {fieldError('email')}
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={fid('company')} className="field-label">
            Company <span className="field-hint">(optional)</span>
          </label>
          <input
            id={fid('company')}
            name="company"
            className="field"
            autoComplete="organization"
            maxLength={limits.company}
            value={values.company}
            onChange={(e) => update('company', e.target.value)}
            aria-invalid={!!errors.company || undefined}
            aria-describedby={describe('company')}
          />
          {fieldError('company')}
        </div>
        <div>
          <label htmlFor={fid('enquiryType')} className="field-label">
            Enquiry type
          </label>
          <select
            id={fid('enquiryType')}
            name="enquiryType"
            className="field"
            value={values.enquiryType}
            onChange={(e) => update('enquiryType', e.target.value)}
            aria-invalid={!!errors.enquiryType || undefined}
            aria-describedby={describe('enquiryType')}
          >
            <option value="" disabled>
              Choose one
            </option>
            {enquiryTypes.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {fieldError('enquiryType')}
        </div>
      </div>

      <div>
        <label htmlFor={fid('message')} className="field-label">
          Project or partnership description
        </label>
        <p id={fid('message-hint')} className="mb-3 text-sm text-soft">
          What are you building or improving, who is it for, and where are you today?
        </p>
        <textarea
          id={fid('message')}
          name="message"
          rows={6}
          className="field min-h-40 resize-y"
          maxLength={limits.message}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={!!errors.message || undefined}
          aria-describedby={describe('message', 'hint')}
        />
        {fieldError('message')}
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={fid('budget')} className="field-label">
            Budget range <span className="field-hint">(optional)</span>
          </label>
          <select
            id={fid('budget')}
            name="budget"
            className="field"
            value={values.budget}
            onChange={(e) => update('budget', e.target.value)}
          >
            <option value="">Prefer not to say</option>
            {budgetRanges.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={fid('timeline')} className="field-label">
            Desired timeline <span className="field-hint">(optional)</span>
          </label>
          <select
            id={fid('timeline')}
            name="timeline"
            className="field"
            value={values.timeline}
            onChange={(e) => update('timeline', e.target.value)}
          >
            <option value="">Not sure yet</option>
            {timelines.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Honeypot for bots. Hidden from people and assistive technology. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div ref={resultRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status === 'unavailable' && (
          <Notice>
            Our enquiry form is not connected right now, so your message has not been sent.{' '}
            <a href={mailtoFallback(values)} className="link font-semibold">
              Email your enquiry to {site.email}
            </a>{' '}
            instead. We have prepared the message for you.
          </Notice>
        )}
        {status === 'failed' && (
          <Notice>
            Your message could not be sent. Please try again, or{' '}
            <a href={mailtoFallback(values)} className="link font-semibold">
              email it to {site.email}
            </a>
            .
          </Notice>
        )}
        {status === 'rate_limited' && (
          <Notice>
            We have received several messages from your connection in a short time. Please wait a few minutes, or{' '}
            <a href={mailtoFallback(values)} className="link font-semibold">
              email {site.email}
            </a>
            .
          </Notice>
        )}
        {status === 'offline' && (
          <Notice>You appear to be offline. Check your connection and try again. Your answers are still here.</Notice>
        )}
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
              Sending
            </>
          ) : (
            <>
              Send enquiry
              <ArrowRight size={18} aria-hidden="true" />
            </>
          )}
        </button>
        <p className="text-sm text-soft">
          Prefer email?{' '}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </p>
      </div>
    </form>
  )
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div role="alert" className="flex gap-3 rounded-lg border-2 border-burgundy bg-(--surface-raised) p-5">
      <CircleAlert size={20} className="mt-0.5 shrink-0 text-burgundy" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
