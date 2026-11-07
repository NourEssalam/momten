import config from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'
import { cache } from 'react'

export const queryContact = cache(async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config })
  return payload.findGlobal({
    slug: 'contact',
    depth: 2,
    locale: locale as TypedLocale,
    overrideAccess: true,
    showHiddenFields: true,
  })
})
