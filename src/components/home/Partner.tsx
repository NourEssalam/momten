import { partnersLogos } from '@/lib/menus'
import Image from 'next/image'
import Container from '../shared-components/Container'
import { useTranslations } from 'next-intl'

export default function Partner() {
  const t = useTranslations('Partner')
  return (
    <Container>
      <h1 className="text-sm text-center font-medium uppercase tracking-widest mb-10 text-gray-500">
        {t('title')}
      </h1>
      <div className="grid grid-cols-3 items-center justify-center justify-items-center sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {partnersLogos.map((logo) => (
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24"
            key={logo.name}
          >
            <Image
              src={`/img/logos/${logo.name}.png`}
              alt={logo.alt}
              width={100}
              height={100}
              className="w-full h-full object-contain opacity-60 brightness-0 text-gray-200 "
            />
          </div>
        ))}
      </div>
    </Container>
  )
}
