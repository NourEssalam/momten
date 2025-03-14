import { Suspense } from 'react'
import { Language } from '@/i18n/routing'
import Loading from './loading'
import PostFeed from './postFeed'
import { queryPostBySlug } from './query'
import { Metadata } from 'next'

export default async function Page(props: {
  params: Promise<{ slug: string; locale: Language }>
}) {
  const { slug, locale } = await props.params

  return (
    <Suspense fallback={<Loading />}>
      <PostFeed locale={locale} slug={slug} />
    </Suspense>
  )
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; locale: Language }>
}): Promise<Metadata> {
  const { slug, locale } = await props.params

  const post = await queryPostBySlug({ slug, locale })
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

  return {
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images:
        post?.image && typeof post.image === 'object' && post.image.url
          ? [{ url: `${baseUrl}${post.image.url}`, width: 400, height: 800 }]
          : [],
    },
  }
}

// export async function generateStaticParams() {
//   const result = await queryPostsSlugs()

//   const params = result.flatMap((item) =>
//     item.slug
//       ? Object.values(item.slug).map((orgSlug) => {
//           const slug = decodeURIComponent(orgSlug)
//           return { slug }
//         })
//       : [],
//   )

//   // console.log('params', params)
//   // console.log('params length', params.length)

//   return params
// }
