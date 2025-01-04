import config from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next'
import Image from 'next/image'
import BackLink from '@/components/shared-components/BackLink'
import ShareMenu from '@/components/blog/ShareMenu'
import { RichText } from '@payloadcms/richtext-lexical/react'

import { cache } from 'react'
import PostCard from '@/components/blog/PostCard'
import { Post } from '@/payload-types'
import Container from '@/components/shared-components/Container'
import { Language } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'

export default async function PostFeed({ slug, locale }: { slug: string; locale: Language }) {
  // const { slug, locale } = await props.params
  const post = await queryPostBySlug({ slug, locale })
  const relatedPosts = post?.relatedPosts || []

  if (!post) {
    return <p>Post not found</p>
  }

  type PostImage = Exclude<typeof post.image, string> // Removes string from the union type

  const mediaImage = post.image as PostImage // Explicitly cast

  return (
    <section className="flex flex-col gap-2 xl:gap-10 justify-center items-center">
      <Container className="flex flex-col gap-10 mb-0 pb-0 max-w-[1150px]">
        <BackLink />
        <h1 className="text-4xl text-secondary  font-medium sm:text-5xl lg:text-7xl   ">
          {post.title}
        </h1>
        {/* meta data */}
        <div className="w-full  flex items-center justify-between">
          <div className="flex gap-4 items-center px-5">
            <time dateTime={post.publishedAt} className=" text-secondary">
              {formatDate(post.publishedAt, locale)}
            </time>
            <span>
              <em className="text-secondary">Written by:&nbsp;&nbsp;</em>
              {post.authors && post.authors?.length > 0
                ? post.authors
                    .map((author) =>
                      typeof author === 'object' && author.name ? author.name : author,
                    )
                    .join(' and ')
                : 'momtan'}
            </span>
          </div>
          <div className="flex justify-end w-1/2">
            <ShareMenu />
          </div>
        </div>
        <div className="relative w-full h-96  overflow-hidden  rounded-3xl">
          <Image
            src={mediaImage.url || ''}
            alt={mediaImage.alt}
            fill
            sizes="100vw"
            className="w-full h-full object-fill absolute inset-0 -z-10"
          />
        </div>
      </Container>

      <Container className="mt-0 pt-0 max-w-[1150px]">
        <RichText
          className="text-xl md:text-2xl p-5 text-grey !leading-relaxed tracking-normal"
          data={post.content}
        />
      </Container>
      <Container className="mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:gap-10">
        {relatedPosts &&
          relatedPosts.length > 0 &&
          relatedPosts
            .filter((post): post is Post => typeof post !== 'string') // Type guard
            .map((post) => <PostCard locale={locale} key={post.id} {...post} />)}
      </Container>
    </section>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: Language }>
}): Promise<Metadata> {
  const { slug, locale } = await props.params
  const post = await queryPostBySlug({ slug, locale })
  return {
    title: post?.title,
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

const queryPostBySlug = cache(async ({ slug, locale }: { slug: string; locale: Language }) => {
  const payload = await getPayload({ config })
  // if (locale === 'ar') {
  //   const decodedSlug = decodeURIComponent(slug)
  // }
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
})
