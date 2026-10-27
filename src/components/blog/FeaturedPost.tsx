import Image from 'next/image'
import { ArrowRight, CalendarDays, Leaf } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link, type Language } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { formatDate } from '@/lib/formatDate'
import type { BlogPost } from '@/lib/blog/queries'
import { getCover, getFirstTag } from './utils'

// Same lavender rounded panel as the "About us" card on the home page
export default function FeaturedPost({
  post,
  locale,
}: {
  post: BlogPost
  locale: Language
}) {
  const t = useTranslations('Blog')
  const tCard = useTranslations('PostCard')
  if (!post.title || !post.slug) return null

  const isAr = locale === 'ar'
  const cover = getCover(post.image)
  const tag = getFirstTag(post.tag)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid items-center gap-6 rounded-3xl border border-tint bg-section p-4 transition-shadow duration-300 hover:shadow-xl hover:shadow-primary/10 md:gap-8 md:p-6 lg:grid-cols-2"
    >
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-white shadow-lg">
        {cover ? (
          <Image
            src={cover.url}
            alt={cover.alt || post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Image src="/logo.png" alt="" width={96} height={96} className="opacity-60" />
          </div>
        )}
        <span className="absolute start-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white text-shade shadow-sm">
          <Leaf className="h-5 w-5" aria-hidden />
        </span>
      </div>

      <div className="flex flex-col items-start gap-4 lg:pe-4">
        <span
          className={cn(
            'text-xs font-semibold uppercase text-primary',
            !isAr && 'tracking-[0.2em]',
          )}
        >
          {t('featured')}
          {tag ? ` · ${tag}` : ''}
        </span>

        <h2 className="text-2xl font-bold leading-snug text-shade-strong lg:text-3xl">
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="line-clamp-4 text-base leading-relaxed text-grey-medium">
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center gap-2 text-sm text-grey-medium">
          <CalendarDays className="h-4 w-4 text-primary" aria-hidden />
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
        </div>

        {/* A span, not a nested link: the whole card is already the link */}
        <span className="mt-2 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-colors group-hover:bg-shade">
          {tCard('readMore')}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
        </span>
      </div>
    </Link>
  )
}
