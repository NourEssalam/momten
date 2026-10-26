'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import type { Media } from '@/payload-types'
import { cn } from '@/lib/cn'

export type PartenrItemsProps = {
  logo: Media
  url: string
  id?: string | null
}

export default function PartnerItems({
  partners,
}: {
  partners: PartenrItemsProps[]
}) {
  const t = useTranslations('Partner')
  const tNav = useTranslations('NextPrev')
  const isAr = useLocale() === 'ar'

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 'auto',
    direction: 'ltr',
  })
  const [selected, setSelected] = useState(0)
  const [snapCount, setSnapCount] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const sync = () => {
      setSnapCount(emblaApi.scrollSnapList().length)
      setSelected(emblaApi.selectedScrollSnap())
    }
    sync()
    emblaApi.on('select', sync).on('reInit', sync)
    return () => {
      emblaApi.off('select', sync).off('reInit', sync)
    }
  }, [emblaApi])

  const items = partners.filter((p) => p?.logo?.url)
  if (!items.length) return null

  const showControls = snapCount > 1

  return (
    <section className="bg-tint-tint-lighter">
      <div className="container flex flex-col items-center py-8 md:py-10">
        <h2
          className={cn(
            'mb-6 text-sm font-semibold uppercase text-primary',
            // letter-spacing breaks Arabic letter joining
            !isAr && 'tracking-[0.2em]',
          )}
        >
          {t('title')}
        </h2>

        <div
          dir="ltr"
          className="flex w-full max-w-6xl items-center gap-2 sm:gap-4"
        >
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            aria-label={tNav('prev')}
            className={cn(
              'shrink-0 rounded-full p-2 text-shade transition hover:bg-white',
              !showControls && 'invisible',
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>

          <div className="min-w-0 flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {items.map((item, i) => (
                <div
                  key={item.id ?? i}
                  className="min-w-0 shrink-0 grow-0 basis-1/3 sm:basis-1/4 lg:basis-1/6 xl:basis-[14.2857%]"
                >
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-16 items-center justify-center px-3"
                  >
                    <Image
                      src={item.logo.url as string}
                      alt={item.logo.alt || 'Partner logo'}
                      width={160}
                      height={64}
                      className="h-10 w-auto max-w-full object-contain opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-12"
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            aria-label={tNav('next')}
            className={cn(
              'shrink-0 rounded-full p-2 text-shade transition hover:bg-white',
              !showControls && 'invisible',
            )}
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>

        {showControls && (
          <div className="mt-4 flex items-center gap-2">
            {Array.from({ length: snapCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={String(i + 1)}
                aria-current={i === selected}
                className={cn(
                  'h-2 rounded-full transition-all',
                  i === selected ? 'w-6 bg-primary' : 'w-2 bg-tint-tint-strong',
                )}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
