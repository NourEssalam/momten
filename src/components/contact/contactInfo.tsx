import { Link } from '@/i18n/routing'

import Social from '@/components/contact/social'
import formatPhoneNumber from '@/globals/Contact/formatPhone'
import { Contact } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { FaPhoneVolume } from 'react-icons/fa6'
import { IoIosMailUnread } from 'react-icons/io'
import { FaMapLocationDot } from 'react-icons/fa6'
export default function ContactInfo({ contact }: { contact: Contact }) {
  const { social, email, phones, address } = contact
  const t = useTranslations('ContactPage')

  return (
    <div className="flex flex-col gap-10 justify-between md:p-5">
      <div className="flex flex-col mb-4">
        <h1 className="text-4xl font-medium text-shade-strong leading-6 mb-8">
          {t('title')}
        </h1>
        <p className="text-base max-w-xl  font-light text-secondary">
          {t('subTitle')}
        </p>
      </div>
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
                <FaPhoneVolume className="w-4 h-4 text-sky-300" />
                <span dir="ltr">{formatPhoneNumber(phone.phone)}</span>
              </div>
            </Link>
          ))}
        </div>
        <Link
          href={`mailto:${email}`}
          className="font-normal hover:text-accent text-lg inline-block text-grey  transition-colors duration-300"
        >
          <div className="flex items-center gap-2">
            <IoIosMailUnread className="w-5 h-5 text-red-600" />
            {email}
          </div>
        </Link>
      </address>

      <Social social={social} className="flex gap-8" />
    </div>
  )
}
