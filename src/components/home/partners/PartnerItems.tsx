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
    <Container>
      <h1 className="text-sm text-center font-medium uppercase tracking-widest mb-10 text-gray-500">
        {t('title')}
      </h1>

      <div className="grid grid-cols-3 items-center justify-center justify-items-center sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {partners.map((item) => (
          <Link
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
            href={item.url}
            key={item.id}
          >
            <Image
              src={item.logo?.url || ''}
              alt={item.logo?.alt}
              width={100}
              height={100}
              className="w-full h-full object-contain opacity-60 brightness-0 text-gray-200 "
            />
          </Link>
        ))}
      </div>
    </Container>
  )
}
