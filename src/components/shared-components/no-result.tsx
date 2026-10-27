import { SearchX } from 'lucide-react'
import BackLink from './BackLink'
import { useTranslations } from 'next-intl'

export default function NoResult({ backLink = false }: { backLink?: boolean }) {
  const t = useTranslations('Error')
  return (
    <section className="flex min-h-[300px] w-full flex-col items-center justify-center gap-4 text-center">
      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-section text-primary">
        <SearchX className="h-10 w-10" aria-hidden />
      </span>
      <h2 className="text-xl font-semibold text-shade-strong">{t('no-result')}</h2>
      {backLink && <BackLink toPage="blog" />}
    </section>
  )
}
