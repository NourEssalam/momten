import Container from '@/components/shared-components/Container'
import { Language } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'
import Image from 'next/image'
import BackLink from '@/components/shared-components/BackLink'
import ShareMenu from '@/components/blog/ShareMenu'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { queryPostBySlug } from './query'
import NoResult from '@/components/shared-components/no-result'

import Authors from './authors'
import RelatedPosts from './relatedPosts'
// import { delay } from '@/lib/timers'

export default async function PostFeed({
  slug,
  locale,
}: {
  slug: string
  locale: Language
}) {
  // await delay(2500) // 2.5 seconds delay
  const post = await queryPostBySlug({ slug, locale })

  const relatedPosts = post?.relatedPosts || []

  type PostImage = Exclude<typeof post.image, string> // Removes string from the union type

  const mediaImage = post.image as PostImage // Explicitly cast

  return post ? (
    <section className="flex flex-col gap-2 xl:gap-10 justify-center items-center">
      <Container className="flex flex-col gap-10 mb-0 pb-0 max-w-[1150px]">
        <BackLink toPage="blog" />
        <h1 className="text-3xl text-secondary  font-medium sm:text-4xl lg:text-6xl lg:leading-tight  ">
          {post.title}
        </h1>
        {/* meta data */}
        <div className="w-full  flex items-center justify-between">
          <div className="flex gap-4 items-center px-5">
            <time dateTime={post.publishedAt} className=" text-secondary">
              {formatDate(post.publishedAt, locale)}
            </time>
            {post.authors && post.authors.length > 0 && (
              <Authors authors={post.authors} />
            )}
          </div>

          <div className="flex justify-end ">
            <ShareMenu
              title={post.title}
              excerpt={post.excerpt as string}
              tags={post?.tag}
              locale={locale}
            />
          </div>
        </div>
        <div className="relative w-full h-96  overflow-hidden  rounded-3xl">
          <Image
            src={mediaImage.url || '/logo.png'}
            alt={mediaImage.alt || 'post image'}
            fill
            sizes="100vw"
            className="w-full h-full object-fill absolute inset-0 -z-10"
          />
        </div>
      </Container>
      {/* Content */}
      <Container className="mt-0 pt-0 max-w-[1150px]">
        <article className="prose prose-stone md:prose-lg lg:prose-xl prose-p:text-black">
          <RichText data={post.content} />
        </article>
        <div
          className="rounded  grid grid-cols-auto md:grid-cols-2 lg:grid-cols-3 max-w-[250px] 
          md:max-w-full gap-4  items-center justify-between"
        >
          {post.tag && post.tag?.length > 0
            ? post.tag.map((tag) =>
                typeof tag === 'object' ? (
                  <div
                    key={tag.id}
                    className="text-secondary   rounded p-1 bg-gray-200 hover:bg-gray-300"
                  >{`#${tag.title.split(' ').join('_')}`}</div>
                ) : (
                  ''
                ),
              )
            : 'No tags'}
        </div>
      </Container>
      <RelatedPosts relatedPosts={relatedPosts} locale={locale} />
    </section>
  ) : (
    <NoResult backLink={true} />
  )
}
