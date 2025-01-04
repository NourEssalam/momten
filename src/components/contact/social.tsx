import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Link } from '@/i18n/routing'
// Mapping of icon names to React components
const iconMapping: Record<string, IconType> = {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
}
import type { Social } from '@/lib/types/contact'

export default function Social({ social, className }: { social: Social[]; className?: string }) {
  return (
    <ul className={className}>
      {social.map((social) => {
        const IconComponent = social.icon ? iconMapping[social.icon] : null
        return (
          <li key={social.name}>
            <Link
              href={social.url}
              className="h-20 w-20 hover:text-accent transition-colors duration-300"
              style={{ color: social.color ?? undefined }}
            >
              {IconComponent && <IconComponent className="w-12 h-12" />}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
