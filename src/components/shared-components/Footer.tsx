import Image from 'next/image'
import Container from '../shared-components/Container'
import { Separator } from '@/components/ui/separator'
import formatPhoneNumber from '@/globals/Contact/formatPhone'
import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import CopyRight from './copyRight'
import { queryContact } from '@/app/(front-end)/[locale]/contact/page'
import Social from '../contact/social'
import { FaPhoneVolume } from 'react-icons/fa6'
import { IoIosMailUnread } from 'react-icons/io'
import { FaMapLocationDot } from 'react-icons/fa6'
import { Link } from '@/i18n/routing'

export default async function Footer({ locale }: { locale: string }) {
  const footer = await queryQuickLinks({ locale })
  const footerMenu = footer.quicklinkcolumns
  const contact = await queryContact({ locale })
  const { social, email, phones, address } = contact
  const date = new Date()
  const year = date.getFullYear()

  //items must be in the center

  return (
    <footer className="my-24">
      {/* main section */}

      <Separator className="max-w-[1200px] mx-auto  px-6    lg:px-24" />
      <Container variant="default">
        <main
          className=" grid grid-cols-1 gap-x-6 gap-y-12 
      sm:gap-x-12 sm:grid-cols-2 lg:grid-cols-3 mb-24"
        >
          {/* logo and social */}
          <Link href="/" className=" w-20 mb-4 md:w-28 ">
            <Image
              src="/img/logos/momtan-logo-footer.png"
              alt="logo of the header"
              width="150"
              height="150"
              // fill={true}
              sizes="(max-width: 1200px) 50vw, 33vw"
              className=" object-contain"
              priority={true}
            />
          </Link>
          {/* socials */}

          <Social social={social} className="grid grid-cols-2 gap-4" />
          {/* contact */}
          <div className="">
            {/* <h3 className="text-lg text-grey  font-semibold mb-4">Contact Us</h3> */}
            <address className="contacts flex flex-col gap-4 ">
              <span className="font-normal text-lg inline-block text-grey  transition-colors duration-300">
                <div className="flex items-center gap-4">
                  <FaMapLocationDot className="w-6 h-6 text-green-500" />
                  {address}
                </div>
              </span>

              <div className="flex flex-col gap-4">
                {phones.map((phone) => (
                  <Link
                    key={phone.id}
                    href={`tel: +216 ${phone.phone}`}
                    className="font-normal  text-lg inline-block text-grey hover:text-accent transition-colors duration-300"
                  >
                    <div className="flex items-center gap-4 ">
                      <FaPhoneVolume className="w-6 h-6 text-sky-300" />
                      <span dir="ltr">{formatPhoneNumber(phone.phone)}</span>
                    </div>
                  </Link>
                ))}
              </div>
              <Link
                href={`mailto:${email}`}
                className="font-normal hover:text-accent text-sm md:text-base inline-block text-grey  transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <IoIosMailUnread className="w-6 h-6 text-red-600" />
                  {email}
                </div>
              </Link>
            </address>
          </div>
          {/* quick links */}
          {footerMenu &&
            footerMenu.map((col) => (
              <div key={col.id} className=" ">
                <h3 className="text-lg text-grey font-semibold mb-4">{col.column}</h3>
                <ul>
                  {col.links.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        className="text-sm lg:text-base text-grey hover:text-accent transition-colors duration-300"
                      >
                        {item.pageName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </main>
        <CopyRight year={year} />
      </Container>
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
