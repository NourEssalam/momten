'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Post } from '@/payload-types'
import { formatDate } from '@/lib/formatDate'
import { Language } from '@/i18n/routing'

export default function PostCard({
  title,
  image,
  publishedAt,
  authors,
  slug,
  locale,
}: Post & { locale: Language }) {
  const [onHover, setOnHover] = useState(false)
  type PostImage = Exclude<typeof image, string> // Removes string from the union type

  const mediaImage = image as PostImage // Explicitly cast

  return (
    title && (
      <Link
        href={`/blog/${slug}/`}
        className="flex flex-col gap-4 p-4 w-full sm:max-w-sm"
        onMouseEnter={() => setOnHover(true)}
        onMouseLeave={() => setOnHover(false)}
      >
        <div className="sm:w-80 sm:h-80 w-60  h-60  relative inset-0 rounded-3xl overflow-hidden">
          <Image
            src={mediaImage.url ?? ''}
            alt={mediaImage.alt}
            width={400}
            height={400}
            className={`w-full h-full object-cover absolute inset-0 -z-10 ${
              onHover ? 'scale-105 transition-all duration-300' : 'transition-all duration-300'
            }`}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <h3
            className={`text-2xl font-bold text-black first-letter:uppercase  ${
              onHover && 'text-tint-tint-strong underline'
            }`}
          >
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm">
            <time dateTime={publishedAt} className=" text-secondary">
              {formatDate(publishedAt, locale)}
            </time>
            <span>
              <em className="text-secondary">Written by:</em>&nbsp;
              {authors && authors?.length > 0
                ? authors
                    .map((author) =>
                      typeof author === 'object' && author.name ? author.name : author,
                    )
                    .join(' and ')
                : 'momtan'}
            </span>
          </div>
        </div>
      </Link>
    )
  )
}
