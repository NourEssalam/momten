import Image from 'next/image'
import Container from '@/components/shared-components/Container'
import { useTranslations } from 'next-intl'
import type { Media } from '@/payload-types'
import Link from 'next/link'

export type PartenrItemsProps = {
  logo: Media
  url: string
  id?: string | null
}

export default function PartnerItems({ partners }: { partners: PartenrItemsProps[] }) {
  const t = useTranslations('Partner')
  return (
    <Container className="flex flex-col justify-center items-center pb-6">
      <h1 className="text-xl text-center font-medium uppercase tracking-widest mb-10 text-primary">
        {t('title')}
      </h1>

      <div
        dir="ltr"
        className="w-full sm:w-3/4 py-8 flex gap-8 items-center justify-start overflow-hidden relative
       [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]"
      >
        {/* First List */}
        <div className="flex gap-8 items-center animate-infinite-scroll">
          {partners.map((item, index) => (
            <Link
              target="_blank"
              href={item.url}
              className="block w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
              key={`first-${index}`}
            >
              <Image
                src={item.logo?.url || '/img/logos/adidas.png'}
                alt={item.logo?.alt || 'Partner logo'}
                width={100}
                height={100}
                className="w-full h-full  object-contain opacity-60 brightness-0 text-gray-200"
              />
            </Link>
          ))}
        </div>

        {/* Second List (for looping animation) */}
        <div className="flex gap-8 items-center animate-infinite-scroll" aria-hidden="true">
          {partners.map((item, index) => (
            <Link
              target="_blank"
              href={item.url}
              className="block w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
              key={`second-${index}`}
            >
              <Image
                src={item.logo?.url || '/img/logos/adidas.png'}
                alt={item.logo?.alt || 'Partner logo'}
                width={100}
                height={100}
                className="w-full h-full  object-contain opacity-60 brightness-0 text-gray-200"
              />
            </Link>
          ))}
        </div>
      </div>
    </Container>
  )
}
