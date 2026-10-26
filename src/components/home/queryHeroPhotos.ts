import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Media } from '@/payload-types'

export type HeroPhoto = { url: string; alt: string }

// One cached read of the "Home Hero Photos" global per request
const getHomeHero = cache(async () => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'home-hero',
    depth: 1,
    overrideAccess: true,
  })
})

const isMedia = (m: unknown): m is Media =>
  typeof m === 'object' && m !== null && Boolean((m as Media).url)

const toPhoto = (m: Media): HeroPhoto => ({
  url: m.url as string,
  alt: m.alt || '',
})

// The 3 hero photos in order, or [] if not filled in yet
// (Hero then falls back to the single /img/Hero.webp image).
export const queryHeroPhotos = async (): Promise<HeroPhoto[]> => {
  const data = await getHomeHero()
  return [data?.photo1, data?.photo2, data?.photo3].filter(isMedia).map(toPhoto)
}

// Photo for the About card, or null if not uploaded yet
export const queryAboutImage = async (): Promise<HeroPhoto | null> => {
  const data = await getHomeHero()
  return isMedia(data?.aboutImage) ? toPhoto(data.aboutImage) : null
}
