import config from '@payload-config'
import { getPayload } from 'payload'
import Header from './Header'
import { cache } from 'react'
import { Language } from '@/i18n/routing'
import { queryHeaderNav } from './action'

export default async function HeaderWrap({ locale }: { locale: Language }) {
  const headerObj = await queryHeaderNav({ locale })
  const englishHeader = await queryHeaderNav({ locale: 'en' })

  return (
    <>
      <Header
        englishHeader={englishHeader}
        headerObj={headerObj}
        locale={locale}
      />
    </>
  )
}
