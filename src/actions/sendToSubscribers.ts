'use server'

import axios from 'axios'
import { Language } from '@/i18n/routing'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { Post } from '@/payload-types'
import { formatDate } from '@/lib/formatDate'

export type ActionState = {
  success: boolean
}

export const sendToSubscribers = async (
  id: string,
  locale: Language,
): Promise<ActionState> => {
  try {
    const post = await postData({ id, locale })
    const subscribersList = await subscribers()

    if (subscribersList && post) {
      // Check for required post fields
      const requiredFields = ['title', 'slug', 'excerpt', 'publishedAt']
      const missingFields = requiredFields.filter(
        (field) => !post[field as keyof typeof post],
      )

      if (missingFields.length > 0) {
        return {
          success: false,
        }
      }
      const sendResult = await sendNewPostNotification({
        locale,
        post,
        subscribers: subscribersList.docs,
      })

      const hasError = sendResult.some((result) => 'error' in result)
      if (hasError) {
        return {
          success: false,
        }
      }
    }

    return {
      success: true,
    }
  } catch (error) {
    console.error('Error sending newsletter:', error)
    return {
      success: false,
    }
  }
}

export async function sendNewPostNotification({
  locale,
  post,
  subscribers,
}: {
  locale: Language
  post: Partial<Post>
  subscribers: Array<{ email: string; name: string }>
}) {
  const apiKey = process.env.BREVO_API_KEY
  if (!apiKey) {
    throw new Error('BREVO_API_KEY environment variable is missing')
  }

  // refining data
  const postUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}/blog/${post.slug}`
  let isValidUrl = false
  let imageEl = ''
  if (post.image && typeof post.image === 'object' && 'url' in post.image) {
    isValidUrl = true
    imageEl = `<img src="${process.env.NEXT_PUBLIC_WEBSITE_URL}/${post.image.url}" alt="Post Cover" style="width: 400px; max-width: 90%; height: auto; border-radius: 8px; margin: 0 auto; display: block;">`
  }

  // Email template translations
  const translations = {
    readMore: {
      en: 'Read more',
      ar: 'اقرأ المزيد',
      fr: 'Lire plus',
    },
    publishedOn: {
      en: 'Published on',
      ar: 'نُشر في',
      fr: 'Publié le',
    },
    newPost: {
      en: 'New Blog Post',
      ar: 'منشور مدونة جديد',
      fr: 'Nouvel article de blog',
    },
  }

  const htmlContent = `
  <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; border-radius: 10px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #eaeaea;">
      <h4 style="color: #666; margin: 0; ${locale === 'ar' ? 'direction: rtl;' : ''}">${translations.newPost[locale as keyof typeof translations.newPost]}</h4>
    </div>
    
    <!-- Post Title -->
    <h2 style="color: #333; text-align: center; margin-top: 0; margin-bottom: 20px; ${locale === 'ar' ? 'direction: rtl;' : ''}">
      ${post.title}
    </h2>
    
    <!-- Post Image (if available) -->
    ${isValidUrl ? `<div style="text-align: center; margin-bottom: 20px;">${imageEl}</div>` : ''}
    
    <!-- Post Excerpt -->
    <div style="background-color: #fff; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <p style="font-size: 16px; line-height: 1.6; margin: 0; ${locale === 'ar' ? 'direction: rtl; text-align: right;' : ''}">
        ${post.excerpt}
      </p>
    </div>

    <!-- Read More Button -->
    <div style="text-align: center; margin: 25px 0;">
      <a href="${postUrl}" style="display: inline-block; padding: 8px 20px; font-size: 14px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; border: none; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        ${translations.readMore[locale as keyof typeof translations.newPost]}
      </a>
    </div>

    <!-- Footer with Published Date -->
    <div style="text-align: center; padding-top: 15px; border-top: 1px solid #eaeaea;">
      <p style="font-size: 12px; color: #666; margin: 0; ${locale === 'ar' ? 'direction: rtl;' : ''}">
        ${translations.publishedOn[locale as keyof typeof translations.newPost]} ${formatDate(post?.publishedAt as string, locale)}
      </p>
    </div>
    
  </div>
  `

  // Brevo has a limit on the number of recipients per batch
  const BATCH_SIZE = 100
  const batches = []
  for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
    batches.push(subscribers.slice(i, i + BATCH_SIZE))
  }

  const results = [] // Define results array at the top

  for (const batch of batches) {
    try {
      const to = batch.map((subscriber) => ({
        email: subscriber.email,
        name: subscriber.name,
      }))

      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        {
          to,
          sender: {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
          },
          subject: `${post.title}`,
          htmlContent: htmlContent,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey,
          },
        },
      )
      results.push(response.data)
    } catch (error) {
      console.error('Error sending email batch:', error)
      results.push({ error })
      results.push('error')
    }
  }

  return results // Return the results array
}

// fetch the subscribers
export const subscribers = cache(async () => {
  const payload = await getPayload({ config })
  try {
    const subscribers = await payload.find({
      collection: 'newsletter-subscribers',
      select: {
        email: true,
        name: true,
      },
      pagination: false,
    })
    return subscribers
  } catch (error) {
    console.log('error', error)
    return null
  }
})

export const postData = cache(
  async ({ id, locale }: { id: string; locale: Language }) => {
    const payload = await getPayload({ config })
    try {
      const result = await payload.findByID({
        collection: 'posts',
        id: id,
        locale: locale,
        select: {
          title: true,
          image: true,
          publishedAt: true,
          authors: true,
          slug: true,
          excerpt: true,
        },
      })
      return result
    } catch (error) {
      console.log('error', error)
      return null
    }
  },
)
