import { User } from '@/payload-types'
import { useTranslations } from 'next-intl'
type Authors = {
  authors?: (string | User)[] | null
}
export default function MetaInfo({ authors }: Authors) {
  const t = useTranslations('PostCard')
  return (
    <span>
      <em className="text-secondary">{t('writtenBy')}&nbsp;&nbsp;</em>
      {authors && authors?.length > 0
        ? authors
            .map((author) =>
              typeof author === 'object' && author.name ? author.name : author,
            )
            .join(` ${t('and')} `)
        : 'momtan'}
    </span>
  )
}
