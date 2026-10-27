import type { Media, Tag } from '@/payload-types'
import type { BlogPost } from '@/lib/blog/queries'

export function getCover(image: BlogPost['image']): { url: string; alt: string } | null {
  if (image && typeof image === 'object') {
    const media = image as Media
    if (media.url) return { url: media.url, alt: media.alt ?? '' }
  }
  return null
}

export function getFirstTag(tag: BlogPost['tag']): string | null {
  const found = (tag ?? []).find(
    (item): item is Tag => typeof item === 'object' && Boolean(item?.title),
  )
  return found?.title ?? null
}

export function getAuthorNames(authors: BlogPost['authors']): string[] {
  return (authors ?? [])
    .map((author) =>
      typeof author === 'object' && author?.username ? author.username : null,
    )
    .filter((name): name is string => Boolean(name))
}
