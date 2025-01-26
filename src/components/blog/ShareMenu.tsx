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
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
} from 'react-share'

type tagsType = (string | Tag)[] | undefined | null

import { useTranslations } from 'next-intl'
export default function ShareMenu({
  title,
  excerpt,
  tags,
  locale,
}: {
  title: string
  excerpt: string
  tags: tagsType
  locale: Language
}) {
  const t = useTranslations('Blog')
  const pathname = usePathname()
  // CHANGE THE BASE url LATER
  const baseUrl = 'https://9e28-197-244-54-172.ngrok-free.app'

  const postLink = `${baseUrl}${pathname}`

  const tagGenerator = (tag: tagsType, socialMedia?: string) => {
    const tagsString = tag
      ?.map((tag) => {
        if (typeof tag === 'object') {
          if (socialMedia === 'twitter') {
            return `${tag.title.replace(' ', '_').replace("'", '')}\n`
          } else {
            return `#${tag.title.replace(' ', '_').replace("'", '')}`
          }
        }
      })
      .filter((tag) => tag !== undefined)
    return tagsString
  }

  const twitterHashtags = tagGenerator(tags, 'twitter')
  const normalHashtags = tagGenerator(tags)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="flex gap-2">
        <span className="flex gap-2 items-center text-accent cursor-pointer">
          {t('share')}
          <CiShare1 className=" text-black font-bold stroke-[0.5] w-5 text-xl cursor-pointer" />
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 ">
        <DropdownMenuLabel className={`${locale === 'ar' ? 'text-right' : ''}`}>
          {t('shareToSocial')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/* Facebook */}
          <DropdownMenuItem>
            <FacebookShareButton
              url={postLink}
              hashtag={`${normalHashtags?.join('\n')}`}
              windowHeight={800}
              windowWidth={800}
            >
              Facebook
            </FacebookShareButton>
          </DropdownMenuItem>
          {/* Twitter */}
          <DropdownMenuItem>
            <TwitterShareButton
              url={postLink}
              hashtags={twitterHashtags}
              title={title}
              related={['@momten', '@NourEssalam1', '@tunguz']}
              windowHeight={600}
              windowWidth={600}
            >
              Twitter
            </TwitterShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LinkedinShareButton
              url={postLink}
              title={title}
              summary={excerpt}
              source={baseUrl}
            >
              Linkedin
            </LinkedinShareButton>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <RedditShareButton url={postLink} title={title}>
              Reddit
            </RedditShareButton>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/* */
