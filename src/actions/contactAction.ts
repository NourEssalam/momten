'use server'
import { contactSchema } from '@/lib/form-schema'
import axios from 'axios'

export type FormState = {
  message: string
  fields?: Record<string, string>
  issues?: string[]
}

export async function onSubmitAction(
  prevState: FormState,
  data: FormData,
): Promise<FormState> {
  // Get the form data
  const formData = Object.fromEntries(data)
  const parsed = contactSchema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString()
    }
    return {
      message: 'Invalid form data',
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
    }
  }

  if (!process.env.BREVO_EMAILS_ACTIVE) {
    // console.log(
    //   'the email service is not active please activate it in the .env file',
    // )
    return {
      message: 'please try again later',
    }
  }

  try {
    // THIS IS THE KEY CHANGE: Using the correct sender configuration
    await axios({
      method: 'POST',
      url: 'https://api.brevo.com/v3/smtp/email',
      headers: {
        'api-key': process.env.BREVO_API_KEY,
        'content-type': 'application/json',
        Accept: 'application/json',
      },
      data: {
        sender: {
          name: process.env.BREVO_SENDER_NAME || 'Website Contact Form',
          email: process.env.BREVO_SENDER_EMAIL,
        },
        to: [
          {
            email: process.env.BREVO_SENDER_EMAIL,
          },
        ],
        replyTo: {
          name: parsed.data.name,
          email: parsed.data.email,
        },
        subject: `Contact Form: ${parsed.data.message.substring(0, 50)}...`,
        htmlContent: `
          <html>
            <body>
              <h3>New contact form submission</h3>
              <p><strong>From:</strong> ${parsed.data.name} (${parsed.data.email})</p>
              <p><strong>Message:</strong></p>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px;">
                ${parsed.data.message.replace(/\n/g, '<br>')}
              </div>
            </body>
          </html>
        `,
      },
    })

    return {
      message: 'Your message has been sent successfully',
    }
  } catch (error) {
    console.error('Error sending email with Brevo:', error)
    return {
      message: 'Error while sending the email',
    }
  }
}
