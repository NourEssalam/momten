'use client'

import { useState, useSyncExternalStore } from 'react'
import { Check, Link2, Share2 } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
} from 'react-share'
import { buttonVariants } from '@/components/ui/button'

const chip = buttonVariants({
  variant: 'outlinePrimary',
  size: 'sm',
  className: 'rounded-lg',
})

// Origin is only known in the browser: '' on the server, real origin on the client.
// These must live outside the component so their identity stays stable.
const subscribe = () => () => {}
const getOrigin = () => window.location.origin
const getServerOrigin = () => ''

export default function ShareBlock({ title }: { title: string }) {
  const t = useTranslations('Blog')
  const pathname = usePathname()
  const origin = useSyncExternalStore(subscribe, getOrigin, getServerOrigin)
  const url = `${origin}${pathname}`
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable (e.g. non-HTTPS): fail silently */
    }
  }

  return (
    <div className="mt-12 rounded-2xl border border-tint bg-section p-6">
      <p className="flex items-center gap-2 font-semibold text-shade-strong">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-shade">
          <Share2 className="h-4 w-4" aria-hidden />
        </span>
        {t('shareToSocial')}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <FacebookShareButton url={url} className={chip}>
          Facebook
        </FacebookShareButton>
        <TwitterShareButton url={url} title={title} className={chip}>
          X
        </TwitterShareButton>
        <LinkedinShareButton url={url} title={title} className={chip}>
          LinkedIn
        </LinkedinShareButton>
        <RedditShareButton url={url} title={title} className={chip}>
          Reddit
        </RedditShareButton>
        <button type="button" onClick={copy} className={`${chip} gap-2`}>
          {copied ? (
            <Check className="h-4 w-4" aria-hidden />
          ) : (
            <Link2 className="h-4 w-4" aria-hidden />
          )}
          {copied ? t('linkCopied') : t('copyLink')}
        </button>
      </div>
    </div>
  )
}
