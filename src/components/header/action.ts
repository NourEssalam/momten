import { Language } from '@/i18n/routing'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const queryHeaderNav = cache(
  async ({ locale }: { locale: Language }) => {
    const payload = await getPayload({ config })
    const result = await payload.findGlobal({
      slug: 'header', // required
      depth: 2,
      locale: locale,
      // fallbackLocale: false,
      overrideAccess: true,
      showHiddenFields: true,
    })

    return result
  },
)
