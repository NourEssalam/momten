import { Media } from '@/payload-types'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IconType } from 'react-icons'

export type TeamMember = {
  id: string
  name: string
  position: string
  image: Media
  socials?:
    | {
        name: string
        url: string
        icon?: string | null
        color?: string | null
        id?: string | null
      }[]
    | null
}

const iconMapping: Record<string, IconType> = {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
}

export default function Member({ team }: { team: TeamMember }) {
  const { name, position, image, socials } = team

  return (
    <article className="flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md ring-1 ring-tint">
      {/* photo with a lavender shape peeking out behind it */}
      <div className="relative mb-4 h-24 w-24">
        <span aria-hidden className="absolute -bottom-1 -start-3 h-full w-full rounded-full bg-section" />
        <div className="relative h-full w-full overflow-hidden rounded-full shadow ring-4 ring-white">
          <Image
            src={image?.url || '/logo.png'}
            alt={image?.alt || name}
            fill
            sizes="96px"
            className="object-cover"
          />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-shade-strong">{name}</h3>
      <p className="mt-1 text-sm text-grey-medium">{position}</p>

      {socials && socials.length > 0 && (
        <ul className="mt-4 flex justify-center gap-3">
          {socials.map((social) => {
            const IconComponent = social.icon ? iconMapping[social.icon] : null
            return (
              <li key={social.id ?? social.name}>
                <Link
                  href={social.url}
                  aria-label={`${name} - ${social.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ color: social.color ?? undefined }}
                >
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </article>
  )
}
