import { Language } from '@/i18n/routing'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const queryAboutBySlug = cache(
  async ({ slug, locale }: { slug: string; locale: Language }) => {
    try {
      const payload = await getPayload({ config })
      const result = await payload.find({
        collection: 'about-pages',
        limit: 1,
        locale: locale,
        pagination: false,
        where: {
          slug: {
            equals: slug,
          },
        },
        fallbackLocale: false,
      })

      return result.docs?.[0] || null
    } catch (error) {
      console.log('error', error)
      return null
    }
  },
)

export const queryAboutSlugs = cache(async () => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'about-pages',
    pagination: false,
    locale: 'all', // Get all localized versions
    select: {
      slug: true, // Should return { slug: { en: 'about', fr: 'a-propos' } }
    },
  })

  return result.docs || []
})

export const queryAbout = cache(async ({ locale }: { locale?: Language }) => {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'about-pages',
    limit: 1000,
    locale: locale,
    pagination: false,
    fallbackLocale: false,
  })

  return result.docs || null
})
