'use server'

import axios from 'axios'
import { contactSchema } from '@/lib/form-schema'

export type ContactField = 'name' | 'email' | 'message'

export type ContactState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      reason: 'invalid' | 'unavailable' | 'failed'
      fields?: Partial<Record<ContactField, string>>
    }

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')

export async function onSubmitAction(data: FormData): Promise<ContactState> {
  const read = (key: string) => String(data.get(key) ?? '')

  // Honeypot: pretend success so bots learn nothing.
  if (read('website').trim() !== '') {
    return { status: 'success' }
  }

  const parsed = contactSchema.safeParse({
    name: read('name'),
    email: read('email'),
    message: read('message'),
  })

  if (!parsed.success) {
    const fields: Partial<Record<ContactField, string>> = {}
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as ContactField
      fields[key] ??= issue.message
    }
    return { status: 'error', reason: 'invalid', fields }
  }

  const flag = process.env.BREVO_EMAILS_ACTIVE
  const apiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL
  if (!flag || flag === 'false' || flag === '0' || !apiKey || !senderEmail) {
    return { status: 'error', reason: 'unavailable' }
  }

  const { name, email, message } = parsed.data
  const recipient = process.env.BREVO_CONTACT_RECIPIENT || senderEmail
  const preview = message.replace(/\s+/g, ' ')
  const subject = `Contact Form: ${preview.slice(0, 50)}${preview.length > 50 ? '...' : ''}`

  try {
    await axios({
      method: 'POST',
      url: 'https://api.brevo.com/v3/smtp/email',
      timeout: 10_000,
      headers: {
        'api-key': apiKey,
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'Website Contact Form',
          email: senderEmail,
        },
        to: [{ email: recipient }],
        replyTo: { name, email },
        subject,
        htmlContent: `
          <html>
            <body>
              <h3>New contact form submission</h3>
              <p><strong>From:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
              <p><strong>Message:</strong></p>
              <div style="background-color:#f9f9f9;padding:15px;border-radius:5px;margin-top:10px;">
                ${escapeHtml(message).replace(/\n/g, '<br>')}
              </div>
            </body>
          </html>
        `,
      },
    })
    return { status: 'success' }
  } catch (error) {
    console.error(
      'Error sending contact email with Brevo:',
      axios.isAxiosError(error)
        ? (error.response?.data ?? error.message)
        : error,
    )
    return { status: 'error', reason: 'failed' }
  }
}
