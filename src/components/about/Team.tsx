import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Member from './Member'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { Language } from '@/i18n/routing'
import { Media } from '@/payload-types'

export default async function Team({ locale }: { locale: Language }) {
  const result = await queryTeam({ locale })
  return (
    <div className="w-[75%] sm:w-[80%] lg:w-full mx-auto  rounded-full p-6 sm:p-12">
      <Carousel dir="ltr">
        <CarouselContent>
          {result.map((item) => (
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3" key={item.id}>
              <Member team={{ ...item, image: item.image as Media }} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

const queryTeam = cache(async ({ locale }: { locale: Language }) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'team',
    pagination: false,
    locale: locale,
  })

  return result.docs
})
