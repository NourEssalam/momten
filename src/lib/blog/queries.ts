import { cache } from 'react'
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '@payload-config'
import type { Post, Tag } from '@/payload-types'
import type { Language } from '@/i18n/routing'

export const PAGE_SIZE = 6

// Only the fields the blog listing actually needs
export type BlogPost = Pick<
  Post,
  'id' | 'title' | 'image' | 'excerpt' | 'publishedAt' | 'authors' | 'slug' | 'tag'
>

const POST_SELECT = {
  title: true,
  image: true,
  publishedAt: true,
  authors: true,
  slug: true,
  excerpt: true,
  tag: true,
} as const

// Positional args so React's cache() can memoize per locale
export const getBlogTags = cache(async (locale: Language): Promise<Tag[]> => {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'tag',
    depth: 0,
    pagination: false,
    locale,
    fallbackLocale: false,
  })
  // Hide tags that have no translation in the current locale
  return res.docs.filter((tag) => Boolean(tag.title))
})

/** Latest post, used for the featured card on the unfiltered listing */
export async function getFeaturedPost(locale: Language): Promise<BlogPost | null> {
  const payload = await getPayload({ config })
  const res = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 1,
    sort: '-publishedAt',
    select: POST_SELECT,
    locale,
    fallbackLocale: false,
  })
  const post = (res.docs[0] as unknown as BlogPost | undefined) ?? null
  return post?.title && post.slug ? post : null
}

export async function getBlogPosts({
  locale,
  tagId,
  page,
  excludeId,
}: {
  locale: Language
  tagId?: string
  page: number
  excludeId?: string
}): Promise<{ docs: BlogPost[]; totalPages: number }> {
  const payload = await getPayload({ config })

  const and: Where[] = []
  if (tagId) and.push({ tag: { equals: tagId } })
  // The featured post lives on page 1 only, so it is excluded from the list everywhere
  if (excludeId) and.push({ id: { not_equals: excludeId } })

  const res = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: PAGE_SIZE,
    page,
    sort: '-publishedAt',
    select: POST_SELECT,
    where: and.length ? { and } : undefined,
    locale,
    fallbackLocale: false,
  })

  return {
    docs: res.docs as unknown as BlogPost[],
    totalPages: res.totalPages,
  }
}
