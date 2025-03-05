import Container from '@/components/shared-components/Container'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { RichText } from '@payloadcms/richtext-lexical/react'

import type { Language } from '@/i18n/routing'

import type { Metadata } from 'next'
import BackLink from '@/components/shared-components/BackLink'
import { formatSlug } from '@/fields/slug/formatSlug'
import { queryAboutBySlug } from '../query'
import NotFoundPage from '../../not-found'

// export async function generateStaticParams() {
//   const result = await queryAboutSlugs({})

//   const params = result.map(({ slug }) => {
//     return {
//       slug,
//     }
//   })

//   return params
// }

type Args = {
  params: Promise<{
    locale: Language
    slug?: string
  }>
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const segments = await params
  const { locale, slug = '' } = segments
  const result = await queryAboutBySlug({ slug, locale })

  return {
    title: result?.title || '',
  }
}

export default async function Page({ params }: Args) {
  const segments = await params
  const { locale, slug = '' } = segments
  const result = await queryAboutBySlug({ slug, locale })

  if (!result || !result?.accordions || !result?.title) {
    return <NotFoundPage />
  }

  const accordions = result?.accordions

  return (
    <Container className="flex flex-col gap-10 ">
      <BackLink toPage="about" />
      <h1 className="text-2xl text-shade-strong font-medium sm:text-3xl lg:text-4xl max-w-screen-md">
        {result?.title}
      </h1>
      <div className="flex items-center justify-center bg">
        <Accordion type="single" collapsible className="w-full lg:w-[80%]  ">
          {accordions &&
            accordions.map((item, index) => (
              <AccordionItem
                value={`item-${index}`}
                key={item.id}
                id={formatSlug(item.title)}
              >
                <AccordionTrigger className="text-xl lg:text-2xl font-medium text-left ">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-lg text-secondary">
                  <article className="prose prose-stone md:prose-lg lg:prose-xl prose-p:text-black">
                    <RichText data={item.content} />
                  </article>
                </AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>
      </div>
    </Container>
  )
}
