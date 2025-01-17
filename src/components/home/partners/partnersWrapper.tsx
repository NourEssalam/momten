import PartnerItems from './PartnerItems'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { PartenrItemsProps } from './PartnerItems'

export default async function PartnersWrapper() {
  const result = await queryPartners()
  const partners = result.items
  return (
    <>
      <PartnerItems partners={partners as PartenrItemsProps[]} />
    </>
  )
}

const queryPartners = cache(async () => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'partner', // required
    depth: 2,
    // fallbackLocale: false,
    overrideAccess: true,
    showHiddenFields: true,
  })

  return result
})
