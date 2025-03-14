import axios from 'axios'
import { EmailAdapter, SendEmailOptions } from 'payload'

const brevoAdapter = (): EmailAdapter => {
  const adapter = () => ({
    name: 'brevo',
    defaultFromName: process.env.BREVO_SENDER_NAME as string,
    defaultFromAddress: process.env.BREVO_SENDER_EMAIL as string,
    sendEmail: async (message: SendEmailOptions) => {
      if (!process.env.BREVO_EMAILS_ACTIVE) {
        console.log(
          'the email service is not active please activate it in the .env file',
        )
        console.log(message)
        return
      }
      try {
        const res = await axios({
          method: 'POST',
          url: 'https://api.brevo.com/v3/smtp/email',
          headers: {
            'api-key': process.env.BREVO_API_KEY,
            'content-type': 'application/json',
            Accept: 'application/json',
          },
          data: {
            sender: {
              name: process.env.BREVO_SENDER_NAME,
              email: process.env.BREVO_SENDER_EMAIL,
            },
            to: [
              {
                email: message.to,
              },
            ],
            subject: message.subject,
            htmlContent: message.html,
          },
        })
        return res.data
      } catch (error) {
        console.error('Error sending email with Brevo:', error)
      }
    },
  })
  return adapter
}

export default brevoAdapter
