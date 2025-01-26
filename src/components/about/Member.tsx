import { Media } from '@/payload-types'
import Image from 'next/image'
import { Link } from '@/i18n/routing'
type Team = {
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
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa'
import { IconType } from 'react-icons'
const iconMapping: Record<string, IconType> = {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
}

export default function Member({ team }: { team: Team }) {
  const { name, position, image, socials } = team
  // console.log('image', image)

  return (
    <div className="flex flex-col items-center justify-center text-center gap-1">
      <div className="w-28 h-28 rounded-full overflow-hidden">
        <Image
          src={image?.url || ''}
          alt={image?.alt || ''}
          width={500}
          height={500}
          className="object-cover w-full h-full"
        />
      </div>
      <h3 className="mb-1 text-2xl font-semi-bold tracking-tight text-shade-strong">{name}</h3>
      <p className="text-secondary">{position}</p>
      <ul className="flex justify-center gap-4 mt-4">
        {socials?.map((social) => {
          const IconComponent = social.icon ? iconMapping[social.icon] : null
          return (
            <li key={social.name}>
              <Link
                href={social.url}
                className="text-sm hover:text-accent transition-colors duration-300"
                style={{ color: social.color ?? undefined }}
              >
                {IconComponent && <IconComponent className="w-6 h-6" />}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
