import Image from 'next/image'
import { ArrowRight, Leaf, ShieldCheck, Users } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { buttonVariants } from '../ui/button'
import { Language, Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'
import type { HeroPhoto } from './queryHeroPhotos'

// start-/end- are logical, so the collage mirrors automatically in Arabic (RTL)
const SLOTS = [
  'start-[12%] top-0 w-[55%] z-10',
  'end-0 top-[26%] w-[55%] z-20',
  'start-0 bottom-0 w-[60%] z-30',
]

const CHIPS = [
  { key: 'chipCommunities', Icon: Leaf },
  { key: 'chipDevelopment', Icon: Users },
  { key: 'chipFuture', Icon: ShieldCheck },
]

export default function Hero({
  locale,
  photos = [],
}: {
  locale: Language
  photos?: HeroPhoto[]
}) {
  const t = useTranslations('Hero')
  const isAr = locale === 'ar'

  return (
    <section className="w-full bg-white">
      <div className="container flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Text */}
        <div
          className={cn(
            'flex flex-col items-center text-center lg:w-1/2 lg:items-start',
            isAr ? 'lg:text-right' : 'lg:text-left',
          )}
        >
          <span
            className={cn(
              'mb-4 text-xs font-semibold uppercase text-primary',
              // letter-spacing breaks Arabic letter joining
              !isAr && 'tracking-[0.2em]',
            )}
          >
            {t('eyebrow')}
          </span>

          <h1
            className={cn(
              'mb-6 font-bold text-shade-strong',
              isAr
                ? 'text-3xl leading-normal 2xs:text-4xl sm:text-5xl'
                : 'text-3xl leading-tight sm:text-4xl lg:text-5xl',
            )}
          >
            {t('title')}
          </h1>

          <p className="max-w-xl text-lg text-grey-medium lg:text-base">
            {t('desc')}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link
              href="#sign-up"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'gap-2 text-base font-semibold shadow-md shadow-primary/30',
              )}
            >
              {t('subscribeButton')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
            <Link
              href="/about"
              className={cn(
                buttonVariants({ variant: 'outlinePrimary', size: 'lg' }),
                'gap-2 text-base font-semibold',
              )}
            >
              {t('learnMoreButton')}
              <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
            </Link>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 lg:justify-start">
            {CHIPS.map(({ key, Icon }) => (
              <li
                key={key}
                className="flex items-center gap-3 text-sm text-grey-medium"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-section text-shade">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <span className="max-w-[7rem] text-start leading-tight">
                  {t(key)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Photo collage (3 photos from the "Home Hero Photos" global) */}
        <div className="w-full md:w-3/4 lg:w-1/2">
          {photos.length >= 3 ? (
            <div className="relative isolate aspect-[1/0.95] w-full">
              <HeroBlob />
              <div
                aria-hidden
                className="absolute end-[2%] top-[3%] -z-10 h-[14%] w-[22%] opacity-70 [background-image:radial-gradient(hsl(var(--stronger-tint))_1.5px,transparent_1.5px)] [background-size:12px_12px]"
              />
              <div
                aria-hidden
                className="absolute bottom-[5%] end-[3%] -z-10 h-[20%] w-[20%] rounded-full bg-section"
              />
              {photos.slice(0, 3).map((photo, i) => (
                <div
                  key={`${i}-${photo.url}`}
                  className={cn(
                    'absolute aspect-[4/3] overflow-hidden rounded-2xl bg-white shadow-xl ring-4 ring-white',
                    SLOTS[i],
                  )}
                >
                  <Image
                    src={photo.url}
                    alt={photo.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 60vw, 30vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            // Fallback until the 3 photos are uploaded in the admin
            <div className="relative isolate">
              <div
                aria-hidden
                className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2.5rem] bg-section"
              />
              <Image
                src="/img/Hero.webp"
                alt="hero image"
                width="250"
                height="250"
                priority
                sizes="(max-width: 1024px) 90vw, 50vw"
                className="h-auto w-full rounded-2xl object-cover drop-shadow-xl"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Soft organic shape behind the photo collage
function HeroBlob() {
  return (
    <svg
      aria-hidden
      viewBox="-4 -4 108 108"
      preserveAspectRatio="none"
      className="absolute start-[4%] top-[2%] -z-10 h-[96%] w-[92%]"
    >
      <defs>
        <linearGradient id="hero-blob" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--medium-tint))' }} />
          <stop
            offset="100%"
            style={{ stopColor: 'hsl(var(--stronger-tint))', stopOpacity: 0.6 }}
          />
        </linearGradient>
      </defs>
      <path
        d="M 50 4 C 72 2, 94 16, 96 40 C 98 62, 86 80, 64 92 C 44 102, 18 94, 8 72 C -2 50, 8 26, 26 14 C 34 8, 42 5, 50 4 Z"
        fill="url(#hero-blob)"
      />
    </svg>
  )
}
