import Image from 'next/image'
import { ArrowLeft, CalendarDays, User } from 'lucide-react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { useTranslations } from 'next-intl'
import Container from '@/components/shared-components/Container'
import ShareBlock from '@/components/blog/ShareBlock'
import { getAuthorNames, getCover } from '@/components/blog/utils'
import { Link, type Language } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'
import type { Post, Tag } from '@/payload-types'
import RelatedPosts from './relatedPosts'

export default function PostFeed({
  post,
  locale,
}: {
  post: Post
  locale: Language
}) {
  const tBack = useTranslations('BackLinks')
  const tCard = useTranslations('PostCard')

  const isAr = locale === 'ar'
  const cover = getCover(post.image)
  const authors = getAuthorNames(post.authors)
  const tags = (post.tag ?? []).filter(
    (t): t is Tag => typeof t === 'object' && Boolean(t?.title),
  )

  return (
    <>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -end-32 h-80 w-80 rounded-full bg-section"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute start-0 top-0 h-48 w-64 opacity-60 [background-image:radial-gradient(hsl(var(--stronger-tint))_1.5px,transparent_1.5px)] [background-size:22px_22px]"
        />

        <Container className="relative pb-0">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1 rtl:rotate-180 rtl:group-hover:translate-x-1"
              aria-hidden
            />
            {tBack('blog')}
          </Link>

          {tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag.id}
                  className={`rounded-full bg-section px-3 py-1 text-xs font-semibold uppercase text-primary ${
                    isAr ? '' : 'tracking-wider'
                  }`}
                >
                  {tag.title}
                </li>
              ))}
            </ul>
          )}

          <h1
            className={`mt-4 max-w-4xl text-3xl font-bold text-shade-strong sm:text-4xl lg:text-5xl ${
              isAr ? 'leading-normal' : 'leading-tight'
            }`}
          >
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-grey-medium">
              {post.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-grey-medium">
            <span className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-section text-shade">
                <CalendarDays className="h-4 w-4" aria-hidden />
              </span>
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt, locale)}
              </time>
            </span>
            {authors.length > 0 && (
              <span className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-section text-shade">
                  <User className="h-4 w-4" aria-hidden />
                </span>
                {tCard('writtenBy')} {authors.join(` ${tCard('and')} `)}
              </span>
            )}
          </div>

          {cover && (
            <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl bg-section shadow-xl shadow-primary/10">
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1344px"
                className="object-cover"
              />
            </div>
          )}
        </Container>
      </header>

      <Container className="pt-10">
        <div className="mx-auto max-w-3xl">
          <article
            className="prose prose-lg max-w-none text-start
              prose-headings:font-bold prose-headings:text-shade-strong
              prose-p:text-grey-medium prose-li:text-grey-medium
              prose-strong:text-shade-strong
              prose-a:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-primary prose-blockquote:text-shade
              prose-img:rounded-2xl prose-img:shadow-md"
          >
            <RichText data={post.content} />
          </article>

          <ShareBlock title={post.title} />
        </div>
      </Container>

      <RelatedPosts relatedPosts={post.relatedPosts} locale={locale} />
    </>
  )
}
