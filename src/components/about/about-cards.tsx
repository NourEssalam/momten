'use client'

import { AboutPage } from '@/payload-types'
import Container from '../shared-components/Container'
import { Language, Link } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'

export default function AboutCards({
  props,
  locale,
}: {
  props: AboutPage[]
  locale: Language
}) {
  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 justify-center items-center gap-8">
      {props.map(
        (item) =>
          item.title && (
            <Link
              href={`/about/${item.slug}`}
              key={item.id}
              className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 
            shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] overflow-hidden"
            >
              <div className="rounded-[10px] bg-white p-4 !pt-14 ">
                <time className="block text-xs text-gray-500">
                  {formatDate(item.publishedAt as string, locale)}
                </time>

                <h3 className="mt-0.5 text-lg font-medium text-gray-900">
                  {item.title}
                </h3>
              </div>
            </Link>
          ),
      )}
    </Container>
  )
}
