'use client'
import type { Tag } from '@/payload-types'
import { useCategoryStore } from '@/state-store/category-store'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Container from '../shared-components/Container'
import { Language } from '@/i18n/routing'

export default function Category({
  result,
  locale,
}: {
  result: Tag[]
  locale: Language
}) {
  const t = useTranslations('Blog')
  // fetch category
  const category = result.map((cat: Tag) => cat.title)
  category.unshift('All')
  // handle states
  const setCategory = useCategoryStore((state) => state.setCategory)
  const activeCategory = useCategoryStore((state) => state.category)
  const title = useSearchParams().get('title')
  const router = useRouter()

  // if (!title) setCategory('All')

  useEffect(() => {
    if (!title) setCategory('All')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  useEffect(() => {
    router.push(`?title=${activeCategory}`)
  }, [activeCategory, router])

  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // User is scrolling down
        setIsVisible(false)
      } else {
        // User is scrolling up
        setIsVisible(true)
      }
      setLastScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  return (
    <Container
      className={`bg-gray-100 sticky top-16 lg:top-16 z-10 flex justify-center border-y border-gray-200 
        mb-10 w-full md:max-w-2xl lg:max-w-4xl xl:max-w-7xl rounded-full px-14 md:px-4 py-5 transition-transform duration-400 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
    >
      <Carousel dir="ltr" className="w-full lg:w-[90%] ">
        <CarouselContent className="flex -ml-1">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center items-center pl-1"
            >
              <button
                className={`text-xs lg:text-sm font-thin  cursor-pointer ${
                  activeCategory === cat
                    ? 'text-black border-b-2   border-black font-semibold' // Active category styles
                    : 'text-gray-900  hover:text-black'
                }`}
                onClick={() => setCategory(cat)} // Update active category on click
              >
                {cat === 'All' ? t('all') : cat}
              </button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="  bg-primary"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        />
        <CarouselNext
          className="  bg-primary"
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
        />
      </Carousel>
    </Container>
  )
}
