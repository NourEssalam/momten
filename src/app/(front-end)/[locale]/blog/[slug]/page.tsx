import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { Language } from '@/i18n/routing'
import PostFeed from './postFeed'
import { queryPostBySlug } from './query'

type Props = { params: Promise<{ slug: string; locale: Language }> }

export default async function Page({ params }: Props) {
  const { slug, locale } = await params
  const post = await queryPostBySlug({ slug, locale })
  if (!post) notFound()
  return <PostFeed post={post} locale={locale} />
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params
  const post = await queryPostBySlug({ slug, locale })
  if (!post) return {}

  const cover = typeof post.image === 'object' ? post.image : null
  const imageUrl = cover?.url
    ? cover.url.startsWith('http')
      ? cover.url
      : `${process.env.NEXT_PUBLIC_BASE_URL ?? ''}${cover.url}`
    : null

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: cover?.width ?? undefined,
              height: cover?.height ?? undefined,
              alt: cover?.alt,
            },
          ]
        : [],
    },
    twitter: { card: 'summary_large_image' },
  }
}
