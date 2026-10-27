'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Language } from '@/i18n/routing'

// Finds the slug a blog post has in another language.
// Returns null when the post (or its translation) doesn't exist.
export const getPostSlugForLocale = async ({
  slug,
  from,
  to,
}: {
  slug: string
  from: Language
  to: Language
}): Promise<string | null> => {
  let decoded = slug
  try {
    decoded = decodeURIComponent(slug)
  } catch {
    // keep the slug as received
  }

  const payload = await getPayload({ config })

  const found = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    depth: 0,
    locale: from,
    where: { slug: { equals: decoded } },
  })

  const id = found.docs[0]?.id
  if (!id) return null

  const post = await payload.findByID({
    collection: 'posts',
    id,
    depth: 0,
    locale: to,
    fallbackLocale: false,
    overrideAccess: true,
  })

  return post?.slug || null
}
