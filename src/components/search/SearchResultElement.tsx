import { SearchResult } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
export default function SearchResultElement({ title, image, slug }: SearchResult) {
  type PostImage = Exclude<typeof image, string> // Removes string from the union type

  const mediaImage = image as PostImage // Explicitly cast
  const link = slug ? `/blog/${slug}` : `${title}`
  return (
    <Link href={`${link}`} className="flex gap-2 p-4">
      <div className="max-w-[150px] rounded overflow-hidden">
        {typeof mediaImage !== 'string' && mediaImage && (
          <Image
            src={mediaImage?.url || ''}
            alt={mediaImage?.alt || ''}
            width={100}
            height={100}
            className="w-full object-cover"
          />
        )}
      </div>
      <div>
        <p className="text-xs text-secondary">{title}</p>
      </div>
    </Link>
  )
}
