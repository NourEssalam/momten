import { Suspense } from 'react'
import Loading from './loading'
import PostFeed from './postFeed'
import { Language } from '@/i18n/routing'

export default async function Page(props: { params: Promise<{ slug: string; locale: Language }> }) {
  const { slug, locale } = await props.params
  return (
    <Suspense fallback={<Loading />}>
      <PostFeed locale={locale} slug={slug} />
    </Suspense>
  )
}
