import Container from '@/components/shared-components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@payloadcms/richtext-lexical/react'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Language } from '@/i18n/routing'

import type { Metadata } from 'next'
import BackLink from '@/components/shared-components/BackLink'
import { formatSlug } from '@/fields/slug/formatSlug'

export async function generateMetadata(props: {
  params: Promise<{ locale: Language; slug: string }>
}): Promise<Metadata> {
  const segments = await props.params
  const { locale, slug } = segments
  const result = await queryAboutBySlug({ slug, locale })
  const { accordions } = result
  return {
    title: accordions.map((item) => item.title).join(', '),
  }
}

export async function generateStaticParams(props: { params: Promise<{ locale: Language }> }) {
  const segments = await props.params
  const { locale } = segments
  const result = await queryAbout({ locale })

  return result.docs.map((item) => ({
    title: item.slug,
  }))
}

export default async function Page(props: { params: Promise<{ locale: Language; slug: string }> }) {
  const segments = await props.params
  const { locale, slug } = segments
  const result = await queryAboutBySlug({ slug, locale })
  const { accordions } = result
  return (
    <Container className="flex flex-col gap-10 ">
      <BackLink toPage="about" />
      <h1 className="text-2xl text-shade-strong font-medium sm:text-3xl lg:text-4xl">
        {result.title}
      </h1>
      <div className="">
        <Accordion type="single" collapsible className="w-full lg:w-[80%]  ">
          {accordions.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={item.id} id={formatSlug(item.title)}>
              <AccordionTrigger className="text-xl font-medium text-left ">
                {item.title}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-secondary">
                <RichText
                  // className="text-xl md:text-2xl p-5 text-grey !leading-relaxed tracking-normal"
                  data={item.content}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  )
}

const queryAboutBySlug = cache(async ({ slug, locale }: { slug: string; locale: Language }) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'about-pages',
    limit: 1,
    locale: locale,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs[0] || null
})

const queryAbout = cache(async ({ locale }: { locale: Language }) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'about-pages',
    limit: 1,
    locale: locale,
    pagination: false,
  })

  return result || null
})
