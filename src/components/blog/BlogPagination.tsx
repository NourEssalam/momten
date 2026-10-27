import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'

type PageItem = number | 'gap'

// 1 … 4 5 6 … 12  (a gap that hides a single page just shows that page)
function getPageList(page: number, total: number): PageItem[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = Array.from(new Set([1, total, page - 1, page, page + 1]))
    .filter((p) => p >= 1 && p <= total)
    .sort((a, b) => a - b)

  const out: PageItem[] = []
  pages.forEach((p, i) => {
    if (i > 0) {
      const diff = p - pages[i - 1]
      if (diff === 2) out.push(p - 1)
      else if (diff > 2) out.push('gap')
    }
    out.push(p)
  })
  return out
}

const itemBase =
  'flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-medium transition-colors duration-200'
const itemIdle =
  'border-tint bg-white text-shade hover:border-tint-tint-strong hover:bg-section'
const itemActive =
  'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/30'
const itemDisabled = 'cursor-not-allowed border-tint bg-white text-grey-light opacity-50'

export default function BlogPagination({
  page,
  totalPages,
  tagId,
}: {
  page: number
  totalPages: number
  tagId?: string
}) {
  const t = useTranslations('NextPrev')

  const hrefFor = (n: number) => ({
    pathname: '/blog' as const,
    query: { ...(tagId ? { tag: tagId } : {}), ...(n > 1 ? { page: n } : {}) },
  })

  const hasPrev = page > 1
  const hasNext = page < totalPages

  return (
    <nav aria-label="pagination" className="flex justify-center">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {hasPrev ? (
            <Link href={hrefFor(page - 1)} className={cn(itemBase, itemIdle, 'gap-1')}>
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
              <span className="hidden sm:inline">{t('prev')}</span>
              <span className="sr-only sm:hidden">{t('prev')}</span>
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(itemBase, itemDisabled, 'gap-1')}>
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" aria-hidden />
              <span className="hidden sm:inline">{t('prev')}</span>
            </span>
          )}
        </li>

        {getPageList(page, totalPages).map((item, i) =>
          item === 'gap' ? (
            <li key={`gap-${i}`} aria-hidden className="px-1 text-grey-light">
              …
            </li>
          ) : (
            <li key={item}>
              <Link
                href={hrefFor(item)}
                aria-current={item === page ? 'page' : undefined}
                className={cn(itemBase, item === page ? itemActive : itemIdle)}
              >
                {item}
              </Link>
            </li>
          ),
        )}

        <li>
          {hasNext ? (
            <Link href={hrefFor(page + 1)} className={cn(itemBase, itemIdle, 'gap-1')}>
              <span className="hidden sm:inline">{t('next')}</span>
              <span className="sr-only sm:hidden">{t('next')}</span>
              <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
          ) : (
            <span aria-disabled="true" className={cn(itemBase, itemDisabled, 'gap-1')}>
              <span className="hidden sm:inline">{t('next')}</span>
              <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </span>
          )}
        </li>
      </ul>
    </nav>
  )
}
