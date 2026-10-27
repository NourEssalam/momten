import { SearchX } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function BlogEmpty() {
  const t = useTranslations('Blog')
  const tErr = useTranslations('Error')

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-3xl border border-tint bg-section px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-shade shadow-sm">
        <SearchX className="h-7 w-7" aria-hidden />
      </span>
      <h2 className="text-xl font-semibold text-shade-strong">{tErr('no-result')}</h2>
      <Link
        href="/blog"
        className="inline-flex items-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/30 transition-colors hover:bg-shade"
      >
        {t('viewAll')}
      </Link>
    </div>
  )
}
