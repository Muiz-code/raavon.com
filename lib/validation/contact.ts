import { budgetRanges, enquiryTypes, timelines } from '@/content/engagement'

/**
 * Shared by the contact form (client) and /api/contact (server) so both
 * apply the same rules and messages.
 */
export type ContactInput = {
  name: string
  email: string
  company: string
  enquiryType: string
  message: string
  budget: string
  timeline: string
}

export type ContactErrors = Partial<Record<keyof ContactInput, string>>

export const emptyContact: ContactInput = {
  name: '',
  email: '',
  company: '',
  enquiryType: '',
  message: '',
  budget: '',
  timeline: '',
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export const limits = { name: 100, email: 200, company: 150, message: 5000 }

export function validateContact(input: Partial<ContactInput>): {
  data: ContactInput
  errors: ContactErrors
} {
  const data: ContactInput = {
    name: String(input.name ?? '').trim(),
    email: String(input.email ?? '').trim(),
    company: String(input.company ?? '').trim(),
    enquiryType: String(input.enquiryType ?? '').trim(),
    message: String(input.message ?? '').trim(),
    budget: String(input.budget ?? '').trim(),
    timeline: String(input.timeline ?? '').trim(),
  }
  const errors: ContactErrors = {}

  if (!data.name) errors.name = 'Enter your name.'
  else if (data.name.length > limits.name) errors.name = `Keep your name under ${limits.name} characters.`

  if (!data.email) errors.email = 'Enter your work email.'
  else if (!EMAIL_RE.test(data.email) || data.email.length > limits.email)
    errors.email = 'Enter an email address in the format name@company.com.'

  if (data.company.length > limits.company)
    errors.company = `Keep the company name under ${limits.company} characters.`

  if (!enquiryTypes.some((t) => t.value === data.enquiryType))
    errors.enquiryType = 'Choose what you would like to discuss.'

  if (data.message.length < 20)
    errors.message = 'Tell us a little more. A few sentences about the project or partnership is enough.'
  else if (data.message.length > limits.message)
    errors.message = `Keep the description under ${limits.message} characters.`

  if (data.budget && !(budgetRanges as readonly string[]).includes(data.budget)) data.budget = ''
  if (data.timeline && !(timelines as readonly string[]).includes(data.timeline)) data.timeline = ''

  return { data, errors }
}

export function enquiryLabel(value: string): string {
  return enquiryTypes.find((t) => t.value === value)?.label ?? 'General enquiry'
}
