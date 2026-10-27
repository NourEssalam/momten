import { useTranslations } from 'next-intl'
import BlogCard from '@/components/blog/BlogCard'
import Container from '@/components/shared-components/Container'
import type { Language } from '@/i18n/routing'
import type { Post } from '@/payload-types'

export default function RelatedPosts({
  relatedPosts,
  locale,
}: {
  relatedPosts?: (string | Post)[] | null
  locale: Language
}) {
  const t = useTranslations('Blog')

  // Only populated docs that have a translation in this locale
  const posts = (relatedPosts ?? [])
    .filter(
      (p): p is Post => typeof p === 'object' && Boolean(p?.title && p?.slug),
    )
    .slice(0, 3)

  if (posts.length === 0) return null

  return (
    <div className="bg-section">
      <Container>
        <h2 className="mb-8 text-2xl font-bold text-shade-strong sm:text-3xl">
          {t('relatedPosts')}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </Container>
    </div>
  )
}
