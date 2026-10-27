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
import { formatDate } from '@/lib/formatDate'
import { pickTheme } from '@/components/about/aboutTheme'
import { queryAboutBySlug } from '../query'
import NotFoundPage from '../../not-found'

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

  const accordions = result.accordions
  // same color + icon as the card the visitor clicked on the About page
  const { Icon, card, icon } = pickTheme(result.slug, 0)

  return (
    <Container className="mx-auto flex max-w-4xl flex-col gap-8">
      <BackLink toPage="about" />

      <header className={`flex items-center gap-4 rounded-3xl border p-6 md:gap-6 md:p-8 ${card}`}>
        <span
          className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl md:h-20 md:w-20 ${icon}`}
        >
          <Icon className="h-8 w-8 md:h-10 md:w-10" aria-hidden />
        </span>
        <div>
          {result.publishedAt && (
            <time className="block text-sm text-grey-light">
              {formatDate(result.publishedAt as string, locale)}
            </time>
          )}
          <h1 className="mt-1 text-2xl font-bold text-shade-strong sm:text-3xl lg:text-4xl">
            {result.title}
          </h1>
        </div>
      </header>

      <Accordion type="single" collapsible defaultValue="item-0" className="flex flex-col gap-3">
        {accordions.map((item, index) => (
          <AccordionItem
            value={`item-${index}`}
            key={item.id}
            id={formatSlug(item.title)}
            className="rounded-xl border border-tint bg-white transition-colors data-[state=open]:border-primary data-[state=open]:bg-tint-tint-lighter"
          >
            <AccordionTrigger className="px-5 text-start text-lg font-semibold text-shade-strong hover:no-underline md:text-xl [&>svg]:h-8 [&>svg]:w-8 [&>svg]:rounded-full [&>svg]:bg-section [&>svg]:p-2 [&>svg]:text-shade">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="px-5 pb-5 text-base">
              <article className="prose prose-stone max-w-none md:prose-lg prose-p:text-grey-medium">
                <RichText data={item.content} />
              </article>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Container>
  )
}
