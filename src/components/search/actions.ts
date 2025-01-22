'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Language } from '@/i18n/routing'

export const getSearchResults = async (query: string, locale: Language) => {
  const payload = await getPayload({ config })

  const results = await payload.find({
    collection: 'search-results',
    locale: locale,
    depth: 1,
    limit: 24,
    select: {
      title: true,
      slug: true,
      image: true,
    },

    pagination: false, // false reduces overhead if you don't need totalDocs
    ...(query
      ? {
          where: {
            title: {
              contains: query,
            },
          },
        }
      : {}),
  })
  // console.log('Search results:', results) // Debugging

  return results
}
