import { cache } from 'react'
import { getTranslations } from 'next-intl/server'
import config from '@payload-config'
import { getPayload, type TypedLocale } from 'payload'

import Container from '@/components/shared-components/Container'
import ContactInfo from '@/components/contact/contactInfo'
import ContactForm from '@/components/contact/contactForm'
import { cn } from '@/lib/cn'

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const [t, contact] = await Promise.all([
    getTranslations({ locale, namespace: 'ContactPage' }),
    queryContact({ locale }),
  ])
  const isAr = locale === 'ar'

  return (
    <>
      <div className="relative isolate overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -end-20 -top-24 -z-10 h-72 w-72 rounded-full bg-section"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute end-10 top-24 -z-10 hidden h-40 w-56 md:block [background-image:radial-gradient(hsl(var(--stronger-tint))_1.5px,transparent_1.5px)] [background-size:22px_22px]"
        />
        <Container className="pb-8">
          <p
            className={cn(
              'mb-3 text-sm font-semibold uppercase text-primary',
              !isAr && 'tracking-[0.18em]',
            )}
          >
            {t('eyebrow')}
          </p>
          <h1
            className={cn(
              'max-w-3xl text-4xl font-bold text-shade-strong md:text-5xl',
              isAr ? 'leading-normal' : 'leading-tight',
            )}
          >
            {t('title')}
          </h1>
          <p className="mt-5 max-w-2xl text-base text-grey-medium md:text-lg">
            {t('subTitle')}
          </p>
        </Container>
      </div>

      <Container className="pt-0">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-5 lg:gap-12">
          <div className="lg:col-span-2">
            <ContactInfo contact={contact} />
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </Container>
    </>
  )
}

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
