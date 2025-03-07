'use server'
import { newsLetterSchema } from '@/lib/form-schema'
import config from '@payload-config'
import { getPayload } from 'payload'
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
  const formData = Object.fromEntries(data)
  const parsed = newsLetterSchema.safeParse(formData)

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

  try {
    // First, save to your Payload CMS collection
    const payload = await getPayload({ config })
    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        option: parsed.data.option,
      },
    })

    // Then, add to Brevo contact list
    try {
      await addSubscriberToBrevo({
        email: parsed.data.email,
        name: parsed.data.name,
        listId: process.env.BREVO_NEWSLETTER_LIST_ID || '1', // Your Brevo list ID
        option: parsed.data.option,
      })
    } catch (error) {
      console.error('Brevo API error:', error)
      // Continue with success since we already saved to Payload CMS
      // You might want to log this for manual syncing later
    }

    return { message: 'Subscription successful! Welcome to our newsletter.' }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log('stringified error', JSON.stringify(error))

    // Check for Payload CMS duplicate email error
    if (
      error?.data?.errors &&
      Array.isArray(error.data.errors) &&
      error.data.errors.length > 0
    ) {
      const emailError = error.data.errors.find(
        (err: { path: string; message: string | string[] }) =>
          err.path === 'email' && err.message.includes('unique'),
      )

      if (emailError) {
        return {
          message: 'This email is already subscribed to our newsletter.',
        }
      }
    }

    return { message: 'Subscription failed. Please try again later.' }
  }
}

// Helper function to add subscriber to Brevo
async function addSubscriberToBrevo({
  email,
  name,
  listId,
  option,
}: {
  email: string
  name: string
  listId: string
  option: string
}) {
  const apiKey = process.env.BREVO_API_KEY

  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is missing')
  }

  const response = await axios.post(
    'https://api.brevo.com/v3/contacts',
    {
      email,
      attributes: {
        FIRSTNAME: name.split(' ')[0],
        LASTNAME: name.split(' ').slice(1).join(' '),
        OPTION: option,
      },
      listIds: [parseInt(listId)],
      updateEnabled: true, // Update contact if it already exists
    },
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-key': apiKey,
      },
    },
  )

  return response.data
}
