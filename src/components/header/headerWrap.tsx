import config from '@payload-config'
import { getPayload } from 'payload'
import Header from './Header'
import { cache } from 'react'

export default async function HeaderWrap({ locale }: { locale: string }) {
  const headerObj = await queryHeaderNav({ locale })
  const nav = headerObj.items

  return (
    <>
      <Header nav={nav} />
    </>
  )
}

const queryHeaderNav = cache(async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'header', // required
    depth: 2,
    locale: locale as 'en' | 'ar',
    // fallbackLocale: false,
    overrideAccess: true,
    showHiddenFields: true,
  })

  return result
})
