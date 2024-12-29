import Categories from '@/components/blog/Categories'
import PostCard from '@/components/blog/PostCard'
import Container from '@/components/shared-components/Container'
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import { cache } from 'react'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from '@/components/ui/pagination'

// export const dynamic = 'force-static'
export const revalidate = 0

export function generateMetadata(): Metadata {
  return {
    title: `Momtan sdg sustainable development goals blog Posts`,
  }
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParamsObj = await searchParams

  const title = searchParamsObj.title
  const page = typeof searchParamsObj.page === 'string' ? Number(searchParamsObj.page) : 1

  const categories = await getCategories()
  const catObj = categories.map((cat) => ({ id: cat.id, title: cat.title }))
  const findIdByTitle = catObj.find((cat) => cat.title === title)

  const activeCategoryId = findIdByTitle ? findIdByTitle.id : 'All'
  const posts = await getPosts(activeCategoryId, page)
  const postDocs = posts.docs || []
  const totalPages = posts.totalPages

  const iterableTotalPages = [page - 1, page, page + 1]

  return (
    <>
      <Container className="mt-0 grid grid-cols-1 xl:grid-cols-[40%_60%] gap-10">
        <div className="flex flex-col ">
          <h1 className="text-4xl font-medium text-shade-strong leading-6 mb-8">Blog</h1>
          <p
            className="text-lg xl:text-xl font-base text-gray-900
          sm:text-lg
          "
          >
            Stay Informed on the Latest Initiatives, Success Stories, and Thought Leadership in
            Sustainability and Active Citizenship
          </p>
        </div>
        <Categories result={categories} />
      </Container>

      {/* Blog posts */}
      <Container className="mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:gap-10">
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
            categories={[]}
            createdAt={''}
            updatedAt={''}
            key={post.id}
            {...post}
          />
        ))}
      </Container>
      {totalPages > 1 && (
        <Container>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={{
                    pathname: '/blog',
                    query: { ...(title ? { title } : {}), page: page > 1 ? page - 1 : 1 },
                  }}
                  className={`${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                />
              </PaginationItem>
              {iterableTotalPages.map(
                (item) =>
                  item > 0 &&
                  item <= totalPages && (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href={{
                          pathname: '/blog',
                          query: {
                            ...(title ? { title } : {}),
                            page: item === 1 ? page - 1 : item,
                          },
                        }}
                        className={`${page === item ? 'bg-primary text-white' : ''}`}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ),
              )}

              {posts.totalPages - page > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href={{
                    pathname: '/blog',
                    query: {
                      ...(title ? { title } : {}),
                      page: page < totalPages ? page + 1 : page,
                    },
                  }}
                  className={`${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Container>
      )}
    </>
  )
}

const getPosts = async (catId: string, page: number) => {
  const payload = await getPayload({ config })
  if (catId === 'All') {
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 9,
      select: {
        title: true,
        image: true,
        publishedAt: true,
        authors: true,
        slug: true,
      },
      page: page,
    })
    return posts
  } else {
    const posts = await payload.find({
      collection: 'posts',
      depth: 1,
      limit: 9,
      where: {
        categories: {
          equals: catId,
        },
      },
      select: {
        title: true,
        image: true,
        publishedAt: true,
        authors: true,
        slug: true,
      },
      page: page,
    })

    return posts
  }
}

const getCategories = cache(async () => {
  const payload = await getPayload({ config })
  const categories = await payload.find({
    collection: 'categories',
    depth: 1,
    limit: 5,
  })
  return categories.docs || null
})
