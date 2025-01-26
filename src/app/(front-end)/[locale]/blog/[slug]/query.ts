import { Language } from '@/i18n/routing'
import { cache } from 'react'
import config from '@payload-config'
import { getPayload } from 'payload'

export const queryPostBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: Language }) => {
    const payload = await getPayload({ config })

    const result = await payload.find({
      collection: 'posts',
      limit: 1,
      locale: locale,
      pagination: false,
      where: {
        slug: {
          equals: locale === 'ar' ? decodeURIComponent(slug) : slug,
        },
      },
    })

    return result.docs?.[0] || null
  },
)

export const queryPostsSlugs = cache(async () => {
  const payload = await getPayload({ config })
  // Locale exists
  const result = await payload.find({
    collection: 'posts',
    limit: 1000,
    locale: 'all',
    pagination: false,
    select: {
      slug: true,
    },
  })

  return result.docs || null
})
