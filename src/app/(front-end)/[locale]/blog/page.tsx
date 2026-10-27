import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Language } from '@/i18n/routing'
import Container from '@/components/shared-components/Container'
import BlogHeader from '@/components/blog/BlogHeader'
import BlogFilters from '@/components/blog/BlogFilters'
import BlogCard from '@/components/blog/BlogCard'
import FeaturedPost from '@/components/blog/FeaturedPost'
import BlogPagination from '@/components/blog/BlogPagination'
import BlogEmpty from '@/components/blog/BlogEmpty'
import { getBlogPosts, getBlogTags, getFeaturedPost } from '@/lib/blog/queries'

// export const dynamic = 'force-static'
export const revalidate = 0

type SearchParams = { [key: string]: string | string[] | undefined }

const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? value[0] : value

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Language }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Blog' })
  return { title: t('metaTitle'), description: t('desc') }
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: Language }>
  searchParams: Promise<SearchParams>
}) {
  const { locale } = await params
  const sp = await searchParams

  // ?page=abc, ?page=-3 or ?page=0 all fall back to page 1
  const page = Math.max(1, Number.parseInt(first(sp.page) ?? '1', 10) || 1)

  const tags = await getBlogTags(locale)

  // ?tag=<id> is the new param; ?title=<tag title> is kept so old links still work
  const tagParam = first(sp.tag)
  const legacyTitle = first(sp.title)
  const activeTag =
    tags.find((tag) => tag.id === tagParam) ??
    (legacyTitle ? tags.find((tag) => tag.title === legacyTitle) : undefined)

  // Featured = latest post, only on the unfiltered listing
  const featured = activeTag ? null : await getFeaturedPost(locale)
  const showFeatured = Boolean(featured) && page === 1

  const { docs, totalPages } = await getBlogPosts({
    locale,
    tagId: activeTag?.id,
    page,
    excludeId: featured?.id,
  })

  return (
    <main>
      <BlogHeader locale={locale} />

      <Container className="pb-2 pt-4">
        <BlogFilters tags={tags} activeTagId={activeTag?.id} />
      </Container>

      {showFeatured && featured && (
        <Container className="pb-0 pt-6">
          <FeaturedPost post={featured} locale={locale} />
        </Container>
      )}

      <Container className="pt-8">
        {docs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
            {docs.map((post) => (
              <BlogCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        ) : (
          !showFeatured && <BlogEmpty />
        )}
      </Container>

      {totalPages > 1 && (
        <Container className="pt-0">
          <BlogPagination page={page} totalPages={totalPages} tagId={activeTag?.id} />
        </Container>
      )}
    </main>
  )
}
