import Team from '@/components/about/Team'
import { Language } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import { useTranslations } from 'next-intl'

export default function TeamWrapper({ locale }: { locale: Language }) {
  const t = useTranslations('Team')
  const isAr = locale === 'ar'

  return (
    <section className="container">
      <div className="mx-auto mb-10 flex max-w-3xl flex-col items-center text-center">
        <span
          className={cn(
            'mb-3 text-xs font-semibold uppercase text-primary',
            // letter-spacing breaks Arabic letter joining
            !isAr && 'tracking-[0.2em]',
          )}
        >
          {t('eyebrow')}
        </span>
        <h2 className="text-3xl font-bold text-shade-strong sm:text-4xl">
          {t('headingStart')} <span className="text-primary">{t('headingHighlight')}</span>
        </h2>
        <span aria-hidden className="mt-3 h-1 w-14 rounded-full bg-primary" />
        <p className="mt-5 text-base leading-relaxed text-grey-medium">{t('desc')}</p>
      </div>
      <Team locale={locale} />
    </section>
  )
}
