import config from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'

import { cache, Suspense } from 'react'

import { Language } from '@/i18n/routing'

import Loading from './loading'
import PostFeed from './postFeed'

export default async function Page(props: { params: Promise<{ slug: string; locale: Language }> }) {
  const { slug, locale } = await props.params

  return (
    <Suspense fallback={<Loading />}>
      <PostFeed locale={locale} slug={slug} />
    </Suspense>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: Language }>
}): Promise<Metadata> {
  const { slug, locale } = await props.params

  const post = await queryPostBySlug({ slug, locale })
  const baseUrl = 'https://50ab-197-238-145-248.ngrok-free.app'
  console.log(`${baseUrl}/${locale}${typeof post.image === 'object' ? post.image.url : ''}`)
  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images:
        post?.image && typeof post.image === 'object' && post.image.url
          ? [{ url: `${baseUrl}${post.image.url}`, width: 400, height: 800 }]
          : [],
    },
  }
}

export async function generateStaticParams(props: { params: Promise<{ locale: Language }> }) {
  const { locale } = await props.params
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
    locale: locale,
    pagination: false,
    // overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return locale === 'ar' ? decodeURIComponent(slug ?? '') : { slug }
  })

  return params
}

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
