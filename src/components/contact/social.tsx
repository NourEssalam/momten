import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Link } from '@/i18n/routing'
import { cn } from '@/lib/cn'
// Mapping of icon names to React components
const iconMapping: Record<string, IconType> = {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
}
import type { Social } from '@/lib/types/contact'

// Defaults keep the original look, so existing usages (e.g. the contact page) don't change.
export default function Social({
  social,
  className,
  linkClassName,
  iconClassName,
}: {
  social: Social[]
  className?: string
  linkClassName?: string
  iconClassName?: string
}) {
  return (
    <ul className={className}>
      {social.map((social) => {
        const IconComponent = social.icon ? iconMapping[social.icon] : null
        return (
          <li key={social.name}>
            <Link
              href={social.url}
              aria-label={social.name}
              className={cn(
                linkClassName ??
                  'h-20 w-20 hover:text-accent transition-colors duration-300',
              )}
              style={{ color: social.color ?? undefined }}
            >
              {IconComponent && (
                <IconComponent className={iconClassName ?? 'w-12 h-12'} />
              )}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
