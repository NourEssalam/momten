import Image from 'next/image'
import { Users } from 'lucide-react'
import { getLocale, getTranslations } from 'next-intl/server'
import { cn } from '@/lib/cn'
import { queryAboutPageImage } from '../home/queryHeroPhotos'

// organic "blob" outline used for the photo and the shape behind it
const blob = 'rounded-[58%_42%_52%_48%/52%_48%_52%_48%]'

export default async function AboutHero() {
  const t = await getTranslations('AboutPage')
  const isAr = (await getLocale()) === 'ar'
  const image = await queryAboutPageImage()

  return (
    <section className="container">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <div>
          <span
            className={cn(
              'mb-4 block text-xs font-semibold uppercase text-primary',
              // letter-spacing breaks Arabic letter joining
              !isAr && 'tracking-[0.2em]',
            )}
          >
            {t('eyebrow')}
          </span>
          <h1 className="mb-6 text-3xl font-bold leading-tight text-shade-strong sm:text-4xl lg:text-5xl">
            {t('headingStart')} <span className="text-primary">{t('headingHighlight')}</span>
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-grey-medium sm:text-lg">
            {t('desc')}
          </p>
        </div>

        {/* Photo in a blob shape + floating badge */}
        <div className="relative isolate mx-auto w-full max-w-xl">
          <div
            aria-hidden
            className={cn('absolute inset-0 -z-10 translate-x-4 translate-y-4 rotate-3 bg-section', blob)}
          />
          <div className={cn('relative aspect-[4/3] overflow-hidden bg-section shadow-lg', blob)}>
            {image ? (
              <Image
                src={image.url}
                alt={image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-primary">
                <Users className="h-20 w-20" aria-hidden />
              </div>
            )}
          </div>
          <div className="absolute end-0 top-6 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg sm:end-4">
            <Users className="h-6 w-6 text-primary" aria-hidden />
            <span className="max-w-[7rem] text-sm font-medium leading-tight text-shade-strong">
              {t('badge')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
