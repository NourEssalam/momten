import Container from '@/components/shared-components/Container'
import config from '@payload-config'
import type { Metadata } from 'next'
import Image from 'next/image'
import BackLink from '@/components/shared-components/BackLink'
import { getPayload } from 'payload'
import ShareMenu from '@/components/blog/ShareMenu'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { formatDate } from '@/lib/formatDate'
import { cache } from 'react'

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params

  const post = await queryPostBySlug({ slug: params.slug })

  if (!post) {
    return <p>Post not found</p>
  }

  type PostImage = Exclude<typeof post.image, string> // Removes string from the union type

  const mediaImage = post.image as PostImage // Explicitly cast

  return (
    <section className="flex flex-col gap-2 xl:gap-10 justify-center items-center">
      <Container className="flex flex-col gap-10 mb-0 pb-0 ">
        <BackLink />
        <h1 className="text-4xl text-secondary  font-medium sm:text-5xl lg:text-7xl   ">
          {post.title}
        </h1>
        {/* meta data */}
        <div className="w-full  flex items-center justify-between">
          <div className="flex gap-4 items-center px-5">
            <time dateTime={post.publishedAt} className=" text-secondary">
              {formatDate(post.publishedAt)}
            </time>
            <span>
              <em className="text-secondary">Written by:&nbsp;&nbsp;</em>
              {Array.isArray(post.authors) &&
                post.authors
                  .map((author) => (typeof author === 'object' && author.name ? author.name : ''))
                  .join(' and ')}
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

      <Container className="mt-0 pt-0">
        <RichText
          className="text-xl md:text-2xl p-5 text-grey !leading-relaxed tracking-normal"
          data={post.content}
        />
      </Container>
    </section>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const post = await queryPostBySlug({ slug: params.slug })
  return {
    title: post.title,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })
  const posts = await payload.find({
    collection: 'posts',
    limit: 1000,
    pagination: false,
    // overrideAccess: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
