import type { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import type { IconType } from 'react-icons'
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

import formatPhoneNumber from '@/globals/Contact/formatPhone'
import type { Contact } from '@/payload-types'

const socialIcons: Record<string, IconType> = {
  Facebook: FaFacebook,
  Instagram: FaInstagram,
  Twitter: FaTwitter,
  Youtube: FaYoutube,
}

const linkClass =
  'rounded transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40'

function displayPhone(phone: number) {
  try {
    return formatPhoneNumber(phone)
  } catch {
    return `+216 ${phone}`
  }
}

function InfoCard({
  icon: Icon,
  label,
  children,
}: {
  icon: LucideIcon
  label: string
  children: ReactNode
}) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-tint bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-section text-shade">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-shade-strong">{label}</p>
        <div className="mt-1 text-base text-grey-medium">{children}</div>
      </div>
    </div>
  )
}

export default function ContactInfo({ contact }: { contact: Contact }) {
  const { social, email, phones, address } = contact
  const t = useTranslations('ContactPage')

  return (
    <div className="flex flex-col gap-4">
      <InfoCard icon={MapPin} label={t('info.address')}>
        <address className="not-italic">{address}</address>
      </InfoCard>

      <InfoCard icon={Phone} label={t('info.phone')}>
        <ul className="flex flex-col gap-1">
          {phones.map((item) => (
            <li key={item.id ?? item.phone}>
              <a
                href={`tel:+216${item.phone}`}
                dir="ltr"
                className={`inline-block ${linkClass}`}
              >
                {displayPhone(item.phone)}
              </a>
            </li>
          ))}
        </ul>
      </InfoCard>

      <InfoCard icon={Mail} label={t('info.email')}>
        <a href={`mailto:${email}`} className={`break-words ${linkClass}`}>
          {email}
        </a>
      </InfoCard>

      {social?.length > 0 && (
        <div className="rounded-2xl border border-tint bg-white p-5 shadow-sm">
          <p className="mb-3 text-sm font-semibold text-shade-strong">
            {t('info.social')}
          </p>
          <ul className="flex flex-wrap gap-3">
            {social.map((item) => {
              const Icon = socialIcons[item.name]
              return (
                <li key={item.id ?? item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-section text-shade transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
