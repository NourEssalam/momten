import Category from '@/components/blog/Categories'
import PostCard from '@/components/blog/PostCard'
import Container from '@/components/shared-components/Container'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

import { Language } from '@/i18n/routing'
import BlogPagination from './blog-pagination'
import NoResult from '@/components/shared-components/no-result'

// export const dynamic = 'force-static'
export const revalidate = 0

export function generateMetadata(): Metadata {
  return {
    title: `Momtan sdg sustainable development goals blog Posts`,
  }
}

export default async function Page({
  params,
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  params: Promise<{ locale: Language }>
}) {
  const searchParamsObj = await searchParams
  const { locale } = await params
  const title = searchParamsObj.title
  const page = typeof searchParamsObj.page === 'string' ? Number(searchParamsObj.page) : 1

  const category = await getcategory({ locale })
  const catObj = category.map((cat) => ({ id: cat.id, title: cat.title }))
  const findIdByTitle = catObj.find((cat) => cat.title === title)

  const activeCategoryId = findIdByTitle ? findIdByTitle.id : 'All'
  const posts = await getPosts(activeCategoryId, page, { locale })
  const postDocs = posts.docs || []
  const totalPages = posts.totalPages

  return (
    <>
      <section className="h-full">
        {/* Blog posts */}
        <Category result={category} locale={locale} />
        {/* Don't remove this div because Container don't have dir */}
        {postDocs.length > 0 ? (
          <Container className="mt-0 grid gap-4 grid-cols-1 sm:gap-10 sm:grid-cols-2 xl:grid-cols-3 justify-items-center  ">
            {postDocs.map((post) => (
              <PostCard
                content={{
                  root: {
                    type: '',
                    children: [],
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    version: 0,
                  },
                }}
                tag={[]}
                createdAt={''}
                updatedAt={''}
                key={post.id}
                locale={locale}
                {...post}
              />
            ))}
          </Container>
        ) : (
          <NoResult backLink={true} />
        )}
      </section>
      {totalPages > 1 && (
        <BlogPagination title={title} page={page} totalPages={posts.totalPages} locale={locale} />
      )}
    </>
  )
}

const getPosts = async (catId: string, page: number, { locale }: { locale: Language }) => {
  const payload = await getPayload({ config })
  if (catId === 'All') {
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 10,
      select: {
        title: true,
        image: true,
        publishedAt: true,
        authors: true,
        slug: true,
        excerpt: true,
      },
      locale: locale,
      fallbackLocale: false,
      page: page,
    })
    // console.log('post 1 ', posts.docs[0])
    return posts
  } else {
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 9,
      where: {
        tag: {
          equals: catId,
        },
      },
      select: {
        title: true,
        image: true,
        publishedAt: true,
        authors: true,
        slug: true,
        excerpt: true,
      },
      page: page,
      locale: locale,
      fallbackLocale: false,
    })

    return posts
  }
}

const getcategory = cache(async ({ locale }: { locale: Language }) => {
  const payload = await getPayload({ config })
  const tags = await payload.find({
    collection: 'tag',
    depth: 1,
    pagination: false,
    locale: locale,
    fallbackLocale: false,
  })
  return tags.docs || null
})
