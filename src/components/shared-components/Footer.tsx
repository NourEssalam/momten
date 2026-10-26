import Image from 'next/image'
import { Mail, MapPin, Phone } from 'lucide-react'
import formatPhoneNumber from '@/globals/Contact/formatPhone'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import CopyRight from './copyRight'
import { queryContact } from '@/app/(front-end)/[locale]/contact/page'
import Social from '../contact/social'
import { Link } from '@/i18n/routing'

const iconBox =
  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-section text-shade'

export default async function Footer({ locale }: { locale: string }) {
  const footer = await queryQuickLinks({ locale })
  const footerMenu = footer.quicklinkcolumns
  const contact = await queryContact({ locale })
  const { social, email, phones, address } = contact
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-tint bg-tint-tint-lighter">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[7rem_1fr_minmax(0,22rem)] lg:gap-12">
          {/* logo */}
          <Link href="/" className="block w-24 lg:w-28">
            <Image
              src="/img/logos/momtan-logo-footer.png"
              alt="logo of the footer"
              width="150"
              height="150"
              sizes="112px"
              className="object-contain"
            />
          </Link>

          {/* quick links */}
          {footerMenu && (
            <nav className="grid grid-cols-2 gap-8 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
              {footerMenu.map((col) => (
                <div key={col.id}>
                  <h3 className="mb-4 text-sm font-semibold text-shade-strong">
                    {col.column}
                  </h3>
                  <ul className="space-y-2">
                    {col.links.map((item) => (
                      <li key={item.id}>
                        <Link
                          href={item.url}
                          className="text-sm text-grey-medium transition-colors duration-300 hover:text-primary"
                        >
                          {item.pageName}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          )}

          {/* socials + contact */}
          <div className="flex flex-col gap-6 lg:border-s lg:border-tint lg:ps-10">
            <Social
              social={social}
              className="flex flex-wrap gap-3"
              linkClassName="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 hover:-translate-y-0.5"
              iconClassName="h-5 w-5"
            />

            <address className="flex flex-col gap-4 not-italic">
              <div className="flex items-start gap-3 text-sm text-grey-medium">
                <span className={iconBox}>
                  <MapPin className="h-4 w-4" aria-hidden />
                </span>
                <span className="pt-2">{address}</span>
              </div>

              {phones.map((phone) => (
                <a
                  key={phone.id}
                  href={`tel:+216${phone.phone}`}
                  className="flex items-center gap-3 text-sm text-grey-medium transition-colors duration-300 hover:text-primary"
                >
                  <span className={iconBox}>
                    <Phone className="h-4 w-4" aria-hidden />
                  </span>
                  <span dir="ltr">{formatPhoneNumber(phone.phone)}</span>
                </a>
              ))}

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 text-sm text-grey-medium transition-colors duration-300 hover:text-primary"
              >
                <span className={iconBox}>
                  <Mail className="h-4 w-4" aria-hidden />
                </span>
                {email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-10 border-t border-tint pt-6">
          <CopyRight year={year} />
        </div>
      </div>
    </footer>
  )
}

const queryQuickLinks = cache(async ({ locale }: { locale: string }) => {
  const payload = await getPayload({ config })
  const result = await payload.findGlobal({
    slug: 'footer', // required
    depth: 2,
    locale: locale as 'en' | 'ar',
    // fallbackLocale: false,
    overrideAccess: true,
    showHiddenFields: true,
  })

  return result
})
