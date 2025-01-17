import { Language } from '@/i18n/routing'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export const queryAboutMetaData = cache(
  async ({ locale }: { locale: Language }) => {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'about-pages',

      locale: locale,
      pagination: false,
    })

    return result.docs || null
  },
)
