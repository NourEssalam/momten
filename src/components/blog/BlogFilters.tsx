import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import type { Tag } from '@/payload-types'

const chipBase =
  'inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200'
const chipActive =
  'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30'
const chipIdle =
  'border-tint bg-white text-shade hover:border-tint-tint-strong hover:bg-section'

/**
 * Plain links, no client JS: the URL (?tag=<id>) is the single source of truth.
 * Replaces the old Categories.tsx + Zustand store + router.push effect.
 */
export default function BlogFilters({
  tags,
  activeTagId,
}: {
  tags: Tag[]
  activeTagId?: string
}) {
  const t = useTranslations('Blog')

  return (
    <nav aria-label={t('filterLabel')}>
      <ul className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        <li>
          <Link
            href="/blog"
            scroll={false}
            aria-current={!activeTagId ? 'page' : undefined}
            className={cn(chipBase, !activeTagId ? chipActive : chipIdle)}
          >
            {t('all')}
          </Link>
        </li>
        {tags.map((tag) => {
          const isActive = tag.id === activeTagId
          return (
            <li key={tag.id}>
              <Link
                href={{ pathname: '/blog', query: { tag: tag.id } }}
                scroll={false}
                aria-current={isActive ? 'page' : undefined}
                className={cn(chipBase, isActive ? chipActive : chipIdle)}
              >
                {tag.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
