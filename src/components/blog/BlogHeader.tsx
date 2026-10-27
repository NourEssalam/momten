import { useTranslations } from 'next-intl'
import type { Language } from '@/i18n/routing'
import { cn } from '@/lib/cn'

export default function BlogHeader({ locale }: { locale: Language }) {
  const t = useTranslations('Blog')
  const isAr = locale === 'ar'

  return (
    <section className="relative isolate overflow-hidden bg-white">
      {/* Decorative shapes (start/end are logical, so they mirror in RTL) */}
      <div
        aria-hidden
        className="absolute -end-24 -top-24 -z-10 h-72 w-72 rounded-full bg-section md:h-96 md:w-96"
      />
      <div
        aria-hidden
        className="absolute end-[8%] top-10 -z-10 hidden h-24 w-40 opacity-70 md:block [background-image:radial-gradient(hsl(var(--stronger-tint))_1.5px,transparent_1.5px)] [background-size:12px_12px]"
      />

      <div className="container pb-6 pt-12 md:pt-16">
        <span
          className={cn(
            'mb-4 block text-xs font-semibold uppercase text-primary',
            // letter-spacing breaks Arabic letter joining
            !isAr && 'tracking-[0.2em]',
          )}
        >
          {t('eyebrow')}
        </span>

        <h1
          className={cn(
            'mb-5 max-w-2xl font-bold text-shade-strong',
            isAr
              ? 'text-3xl leading-normal 2xs:text-4xl sm:text-5xl'
              : 'text-3xl leading-tight sm:text-4xl lg:text-5xl',
          )}
        >
          {t('title')} <span className="text-primary">{t('titleHighlight')}</span>
        </h1>

        <p className="max-w-xl text-lg text-grey-medium lg:text-base">{t('desc')}</p>
      </div>
    </section>
  )
}
