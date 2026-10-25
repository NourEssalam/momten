import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import type { Media } from '@/payload-types'

export type HeroPhoto = { url: string; alt: string }

// Returns the 3 hero photos in order, or [] if the global isn't filled in yet
// (the Hero component then falls back to the single /img/Hero.webp image).
export const queryHeroPhotos = cache(async (): Promise<HeroPhoto[]> => {
  const payload = await getPayload({ config })
  const data = await payload.findGlobal({
    slug: 'home-hero',
    depth: 1,
    overrideAccess: true,
  })

  return [data?.photo1, data?.photo2, data?.photo3]
    .filter((m): m is Media => typeof m === 'object' && m !== null && Boolean(m.url))
    .map((m) => ({ url: m.url as string, alt: m.alt || '' }))
})
