import Image from 'next/image'
import { ArrowRight, CalendarDays, User } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, type Language } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'
import type { BlogPost } from '@/lib/blog/queries'
import { getAuthorNames, getCover, getFirstTag } from './utils'

// Server component: the hover effects are pure CSS (group-hover), no state needed.
export default function BlogCard({
  post,
  locale,
}: {
  post: BlogPost
  locale: Language
}) {
  const t = useTranslations('PostCard')
  if (!post.title || !post.slug) return null

  const cover = getCover(post.image)
  const tag = getFirstTag(post.tag)
  const authors = getAuthorNames(post.authors)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-tint bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-section">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || post.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image src="/logo.png" alt="" width={72} height={72} className="opacity-60" />
          </div>
        )}
        {tag && (
          <span className="absolute start-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-shade shadow-sm">
            {tag}
          </span>
        )}
      </div>

      <div className="flex grow flex-col gap-3 p-5">
        <div className="flex items-center gap-2 text-xs text-grey-light">
          <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-shade-strong transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="line-clamp-3 text-sm leading-relaxed text-grey-medium">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-tint pt-4">
          {authors.length > 0 ? (
            <span className="flex min-w-0 items-center gap-2 text-xs text-grey-medium">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-section text-shade">
                <User className="h-4 w-4" aria-hidden />
              </span>
              <span className="truncate">
                {t('writtenBy')} {authors.join(` ${t('and')} `)}
              </span>
            </span>
          ) : (
            <span />
          )}
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary">
            {t('readMore')}
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
