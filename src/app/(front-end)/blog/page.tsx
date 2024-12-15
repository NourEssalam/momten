import Categories from '@/components/blog/Categories'
import PostCard from '@/components/blog/PostCard'
import Container from '@/components/shared-components/Container'
// import { blogPosts } from "@/lib/data-placeholders";
import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
export const dynamic = 'force-static'
export const revalidate = 600

export function generateMetadata(): Metadata {
  return {
    title: `Momtan sdg sustainable development goals blog Posts`,
  }
}

export default async function Page() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    // overrideAccess: false,
    select: {
      title: true,
      image: true,
      publishedAt: true,
      authors: true,
      slug: true,
    },
  })

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

        <Categories />
      </Container>

      {/* Blog posts */}
      <Container className="mt-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  xl:gap-10">
        {posts.docs.map((post) => (
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
            createdAt={''}
            updatedAt={''}
            key={post.id}
            {...post}
          />
        ))}
      </Container>
    </>
  )
}
