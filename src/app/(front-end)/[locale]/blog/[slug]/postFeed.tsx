import { Post } from '@/payload-types'
import PostCard from '@/components/blog/PostCard'
import Container from '@/components/shared-components/Container'
import { Language } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'
import Image from 'next/image'
import BackLink from '@/components/shared-components/BackLink'
import ShareMenu from '@/components/blog/ShareMenu'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { queryPostBySlug } from './page'
import NoResult from '@/components/shared-components/no-result'
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default async function PostFeed({ slug, locale }: { slug: string; locale: Language }) {
  await delay(2500) // 2.5 seconds delay
  const post = await queryPostBySlug({ slug, locale })

  const relatedPosts = post?.relatedPosts || []

  type PostImage = Exclude<typeof post.image, string> // Removes string from the union type

  const mediaImage = post.image as PostImage // Explicitly cast

  return post ? (
    <section className="flex flex-col gap-2 xl:gap-10 justify-center items-center">
      <Container className="flex flex-col gap-10 mb-0 pb-0 max-w-[1150px]">
        <BackLink toPage="blog" />
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
          <div className="rounded  gap-4 flex items-center justify-between">
            {post.tag && post.tag?.length > 0
              ? post.tag.map((tag) =>
                  typeof tag === 'object' ? (
                    <div
                      key={tag.id}
                      className="text-secondary  rounded p-1 bg-gray-200 hover:bg-gray-300"
                    >{`#${tag.title.split(' ').join('_')}`}</div>
                  ) : (
                    ''
                  ),
                )
              : 'No tags'}
          </div>
          <div className="flex justify-end ">
            <ShareMenu excerpt={post.excerpt as string} tags={post?.tag} locale={locale} />
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
  ) : (
    <NoResult backLink={true} />
  )
}
