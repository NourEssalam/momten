'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Post } from '@/payload-types'
import { formatDate } from '@/lib/formatDate'
import { Language } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
export default function PostCard({
  title,
  image,
  publishedAt,
  authors,
  slug,
  excerpt,
  locale,
}: Post & { locale: Language }) {
  const t = useTranslations('PostCard')
  const [onHover, setOnHover] = useState(false)
  type PostImage = Exclude<typeof image, string> // Removes string from the union type

  const mediaImage = image as PostImage // Explicitly cast
  const and = t('and')
  return (
    title && (
      <Link
        href={`/blog/${slug}/`}
        className="grid grid-cols-1 grid-rows-[128px_1fr] md:grid-rows-[192px_1fr]  bg-white border max-h-sm max-w-sm min-w-[300px]
         md:min-w-[350px]  border-gray-200 rounded-2xl overflow-hidden "
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className=" w-full h-32 md:h-48  relative inset-0 rounded-t-2xl overflow-hidden">
          <Image
            src={mediaImage.url ?? ''}
            alt={mediaImage.alt}
            width={500}
            height={500}
            className={`w-full h-full object-cover absolute inset-0  ${
              onHover
                ? 'scale-105 transition-all duration-300'
                : 'transition-all duration-300'
            }`}
          />
        </div>
        <div className="flex flex-col grow justify-evenly flex-nowrap gap-4  px-4 py-4 ">
          <h3
            className={`text-lg md:text-2xl font-medium md:w-[80%] text-black first-letter:uppercase  ${
              onHover && 'text-tint-tint-strong underline'
            }`}
          >
            {title}
          </h3>
          <p className="text-gray-600 overflow-hidden w-[95%] text-sm">
            {excerpt}
          </p>
          <div className="flex flex-col items-start gap-2 text-sm justify-self-end">
            <time dateTime={publishedAt}>
              {formatDate(publishedAt, locale)}
            </time>
            <span>
              {authors && authors?.length > 0 && (
                <div className="flex items-center">
                  <em>{t('writtenBy')} :</em>&nbsp;
                  <div>
                    {authors
                      .map((author) =>
                        typeof author === 'object' && author.username
                          ? author.username
                          : 'momtan',
                      )
                      .join(` ${and} `)}
                  </div>
                </div>
              )}
            </span>
          </div>
        </div>
      </Link>
    )
  )
}
