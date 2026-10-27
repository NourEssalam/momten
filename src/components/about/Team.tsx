import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { Language } from '@/i18n/routing'
import { Media } from '@/payload-types'
import TeamCarousel from './TeamCarousel'

export default async function Team({ locale }: { locale: Language }) {
  const result = await queryTeam({ locale })
  if (!result.length) return null

  const members = result.map((item) => ({ ...item, image: item.image as Media }))
  return <TeamCarousel members={members} />
}

const queryTeam = cache(async ({ locale }: { locale: Language }) => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'team',
    pagination: false,
    locale: locale,
  })

  return result.docs
})
