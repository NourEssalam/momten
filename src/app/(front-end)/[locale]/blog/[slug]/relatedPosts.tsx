import PostCard from '@/components/blog/PostCard'
import Container from '@/components/shared-components/Container'
import { Language } from '@/i18n/routing'
import { Post } from '@/payload-types'
import { useTranslations } from 'next-intl'
type RelatedPosts = (string | Post)[] | null

export default function RelatedPosts({
  relatedPosts,
  locale,
}: {
  relatedPosts: RelatedPosts
  locale: Language
}) {
  const t = useTranslations('Blog')
  return (
    <Container
      className=" mt-0 px-0 pt-2 pb-4 max-w-full"
      variant="rounded-primary"
    >
      <h1 className="text-2xl text-secondary  font-medium sm:text-2xl lg:text-5xl leading-relaxed lg:leading-normal  mb-5">
        {t('relatedPosts')}
      </h1>
      <div
        className=" flex justify-evenly grow lg:scrollbar-thumb-rounded-full lg:scrollbar-track-rounded-full lg:scrollbar
       lg:scrollbar-thumb-slate-700 lg:scrollbar-track-slate-300 overflow-x-auto gap-2 lg:gap-8 py-2 px-0"
      >
        {relatedPosts &&
          relatedPosts.length > 0 &&
          relatedPosts
            .filter((post): post is Post => typeof post !== 'string') // Type guard
            .map((post) => (
              <PostCard locale={locale} key={post.id} {...post} />
            ))}
      </div>
    </Container>
  )
}
