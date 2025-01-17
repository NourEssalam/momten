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
      {authors &&
        authors?.length &&
        authors
          .map((author) => typeof author === 'object' && author.username)
          .join(` ${t('and')} `)}
    </span>
  )
}
