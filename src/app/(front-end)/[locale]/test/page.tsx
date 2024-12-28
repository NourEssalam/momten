import { getPayload, PaginatedDocs } from 'payload'
import config from '@payload-config'

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParamsObj = await searchParams
  const query = searchParamsObj.search
  let results: PaginatedDocs | null = null
  if (typeof query === 'string') {
    results = await getSearchResults(query)
  }
  console.log('results', results)
  return (
    <div>
      <h1>Product Listing</h1>
      <p>Search query: {typeof query}</p>
    </div>
  )
}

export const getSearchResults = async (query: string) => {
  const payload = await getPayload({ config })
  // const query = 'psycho'
  const results = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: false,

    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })

  return results
}
