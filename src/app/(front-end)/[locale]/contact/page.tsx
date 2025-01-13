import Container from '@/components/shared-components/Container'

import ContactInfo from '@/components/contact/contactInfo'
import ContactForm from '@/components/contact/contactForm'

import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const localePrams = await params
  const { locale } = localePrams
  const result = await queryContact({ locale })

  return (
    <>
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-5 lg:gap-10">
          <ContactInfo contact={result} />
          <ContactForm />
        </div>
      </Container>
    </>
  )
}

export const queryContact = cache(async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'contact', // required
    depth: 2,
    locale: locale as 'en' | 'ar',
    // fallbackLocale: false,
    overrideAccess: true,
    showHiddenFields: true,
  })

  return result
})
