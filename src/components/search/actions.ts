'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const getSearchResults = async (query: string) => {
  const payload = await getPayload({ config })

  const results = await payload.find({
    collection: 'search-results',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      image: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,
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
