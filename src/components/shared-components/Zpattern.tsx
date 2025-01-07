import Image from 'next/image'
import { Language, Link } from '@/i18n/routing'
import { Button } from '../ui/button'
import { Media } from '@/payload-types'

type aboutType = {
  title: string
  description: string
  image: Media
  links: {
    title: string
    link: string
    id?: string | null
  }[]
  id?: string | null
}

export default function Zpattern({
  index,
  item,
  locale,
}: {
  index: number
  item: aboutType
  locale: Language
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-20  bg-white">
      <div
        className={`${index % 2 === 0 ? ' md:order-last' : ''}  flex justify-center items-center `}
      >
        <Image
          src={item.image?.url || ''}
          alt={item.image.alt}
          width={1000}
          height={1000}
          className=" w-full h-2/3 object-fit rounded-3xl "
        />
      </div>
      <div
        className={`flex flex-col  justify-center items-start ${locale === 'ar' ? 'md:text-right' : 'md:text-left'} `}
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl leading-6 mb-8">{item.title}</h1>
        <p
          className="text-sm text-gray-600 
                      sm:text-lg
                      lg:text-2xl
                      "
        >
          {item.description}
        </p>
        <div className="flex gap-4 lg:gap-8 mt-10">
          {item.links.map((link, index) => (
            <Button key={link.id} asChild variant={`${index % 2 !== 0 ? 'secondary' : 'default'}`}>
              <Link href={`/about/${link.link}`}>{link.title}</Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
