'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { useLocale, useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import Member, { type TeamMember } from './Member'

export default function TeamCarousel({ members }: { members: TeamMember[] }) {
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

  const showControls = snapCount > 1
  const arrow =
    'shrink-0 rounded-full border border-tint-tint-strong bg-white p-2 text-shade shadow-sm transition hover:bg-section'

  return (
    <div className="mx-auto max-w-6xl">
      <div dir="ltr" className="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label={tNav('prev')}
          className={cn(arrow, !showControls && 'invisible')}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden />
        </button>

        <div className="min-w-0 flex-1 overflow-hidden py-6" ref={emblaRef}>
          <div className="flex">
            {members.map((member) => (
              <div
                key={member.id}
                dir={isAr ? 'rtl' : 'ltr'}
                className="min-w-0 shrink-0 grow-0 basis-full px-3 sm:basis-1/2 lg:basis-1/3"
              >
                <Member team={member} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          aria-label={tNav('next')}
          className={cn(arrow, !showControls && 'invisible')}
        >
          <ChevronRight className="h-5 w-5" aria-hidden />
        </button>
      </div>

      {showControls && (
        <div className="mt-2 flex items-center justify-center gap-2">
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
  )
}
