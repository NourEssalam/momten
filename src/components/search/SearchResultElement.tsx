'use client'
import { SearchResult } from '@/payload-types'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { useClickedSearchElement } from '@/state-store/search'
import { useRouter } from 'next/navigation'
export default function SearchResultElement({
  title,
  image,
  slug,
}: SearchResult) {
  type PostImage = Exclude<typeof image, string> // Removes string from the union type

  const mediaImage = image as PostImage // Explicitly cast
  const link = slug ? `/blog/${slug}` : `${title}`
  const setOpen = useClickedSearchElement((state) => state.setOpen)
  const router = useRouter()

  const handleClick = () => {
    setOpen(false)
    router.push(link)
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="grid grid-cols-[20fr_80fr] gap-4 p-1 items-center cursor-pointer "
      >
        <div className="max-w-[150px]  rounded overflow-hidden">
          {typeof mediaImage !== 'string' && mediaImage && (
            <Image
              src={mediaImage?.url || ''}
              alt={mediaImage?.alt || ''}
              width={500}
              height={500}
              className="w-full object-cover"
            />
          )}
        </div>
        <div>
          <p className="text-md font-medium hover:underline text-gray-900">
            {title}
          </p>
        </div>
      </div>
      <Separator />
    </>
  )
}
