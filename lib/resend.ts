import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY)

export const FROM_EMAIL = 'Raavon Group <contact@raavon.com>'
export const CONTACT_EMAIL = 'contact@raavon.com'
