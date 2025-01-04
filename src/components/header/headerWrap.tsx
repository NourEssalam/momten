import config from '@payload-config'
import { getPayload } from 'payload'
import Header from './Header'
import { cache } from 'react'
import { Language } from '@/i18n/routing'

export default async function HeaderWrap({ locale }: { locale: Language }) {
  const headerObj = await queryHeaderNav({ locale })

  return (
    <>
      <Header headerObj={headerObj} locale={locale} />
    </>
  )
}

const queryHeaderNav = cache(async ({ locale }: { locale: Language }) => {
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
})
