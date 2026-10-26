import Image from 'next/image'
import { ArrowRight, Building2, CalendarCheck, Leaf, Users } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'
import { queryAboutImage } from './queryHeroPhotos'

// Placeholder numbers from the mockup: replace with the organization's real figures.
// Labels come from messages/*.json (AboutNutshell.years / projects / beneficiaries).
const STATS = [
  { key: 'years', value: '10+', Icon: CalendarCheck },
  { key: 'projects', value: '50+', Icon: Building2 },
  { key: 'beneficiaries', value: '1000+', Icon: Users },
]

export default async function AboutNutshell() {
  const t = await getTranslations('AboutNutshell')
  const isAr = (await getLocale()) === 'ar'
  const image = await queryAboutImage()

  return (
    <section className="container">
      <div className="grid gap-8 rounded-3xl border border-tint bg-tint-tint-lighter p-6 md:p-8 lg:grid-cols-[18rem_1fr_auto] lg:items-center lg:gap-10">
        {/* Photo */}
        <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
          <div
            aria-hidden
            className="absolute inset-0 -translate-x-3 translate-y-3 rounded-3xl bg-section rtl:translate-x-3"
          />
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-section shadow-md">
            {image ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 1024px) 80vw, 18rem"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-primary">
                <Leaf className="h-16 w-16" aria-hidden />
              </div>
            )}
          </div>
          <span className="absolute start-3 top-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-md">
            <Leaf className="h-5 w-5" aria-hidden />
          </span>
        </div>

        {/* Text */}
        <div
          className={cn(
            'flex flex-col items-center text-center lg:items-start',
            isAr ? 'lg:text-right' : 'lg:text-left',
          )}
        >
          <span
            className={cn(
              'mb-3 text-xs font-semibold uppercase text-primary',
              // letter-spacing breaks Arabic letter joining
              !isAr && 'tracking-[0.2em]',
            )}
          >
            {t('title')}
          </span>
          <h2 className="mb-4 text-2xl font-bold leading-snug text-shade-strong md:text-3xl">
            {t('heading')}
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-grey-medium">
            {t('desc')}
          </p>
          <Link
            href="/about"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'mt-6 gap-2 text-base font-semibold',
            )}
          >
            {t('ReadMore')}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
          </Link>
        </div>

        {/* Stats */}
        <ul className="grid divide-y divide-tint border-t border-tint lg:min-w-[15rem] lg:border-s lg:border-t-0 lg:ps-10">
          {STATS.map(({ key, value, Icon }) => (
            <li key={key} className="flex items-center gap-4 py-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-section text-shade">
                <Icon className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-2xl font-bold leading-none text-shade-strong">
                  {value}
                </p>
                <p className="mt-1 text-sm text-grey-medium">{t(key)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
