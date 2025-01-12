'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CiShare1 } from 'react-icons/ci'
import { usePathname } from 'next/navigation'

import { Tag } from '@/payload-types'
import { Language } from '@/i18n/routing'

import { EmailShareButton, FacebookShareButton } from 'react-share'
import { useTranslations } from 'next-intl'
export default function ShareMenu({
  excerpt,
  tags,
  locale,
}: {
  excerpt: string
  tags: (string | Tag)[] | undefined | null
  locale: Language
}) {
  const t = useTranslations('Blog')
  const pathname = usePathname()
  // CHANGE THE BASE url LATER
  const baseUrl = 'https://50ab-197-238-145-248.ngrok-free.app'
  const postLink = `${baseUrl}${pathname}`
  const tagsString = tags?.map((tag) => {
    if (typeof tag === 'object') {
      return '#' + tag.title.split(' ').join('_')
    }
  })
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex gap-2">
        <span className="flex gap-2 items-center underline cursor-pointer">
          {t('share')}
          <CiShare1 className=" text-black font-bold stroke-[0.5] w-5 text-xl cursor-pointer" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel>Share To Social Media</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FacebookShareButton url={postLink}>Facebook</FacebookShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>Twitter</DropdownMenuItem>
          <DropdownMenuItem>Instagram </DropdownMenuItem>
          <DropdownMenuItem>LinkedIn</DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* */
