'use client'

import { ArrowRight } from 'lucide-react'
import { AboutPage } from '@/payload-types'
import { Language, Link } from '@/i18n/routing'
import { formatDate } from '@/lib/formatDate'
import { pickTheme } from './aboutTheme'

export default function AboutCards({
  props,
  locale,
}: {
  props: AboutPage[]
  locale: Language
}) {
  return (
    <section className="container pt-0 md:pt-0">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {props.map((item, index) => {
          if (!item.title) return null
          const { Icon, card, icon } = pickTheme(item.slug, index)
          return (
            <Link
              href={`/about/${item.slug}`}
              key={item.id}
              className={`group flex items-center gap-4 rounded-xl border p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${card}`}
            >
              <span
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${icon}`}
              >
                <Icon className="h-7 w-7" aria-hidden />
              </span>

              <div className="min-w-0">
                <time className="block text-xs text-grey-light">
                  {formatDate(item.publishedAt as string, locale)}
                </time>
                <h3 className="mt-0.5 text-lg font-semibold text-shade-strong">{item.title}</h3>
              </div>

              <span className="ms-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-sm transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5">
                <ArrowRight className="h-4 w-4 rtl:rotate-180" aria-hidden />
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
