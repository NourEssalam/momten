'use server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { Language } from '@/i18n/routing'
import { permanentRedirect, redirect } from 'next/navigation'

export const getIdByCurrentSlug = async ({
  slug,
  locale,
  position,
}: {
  slug: string
  locale: Language
  position: Language
}) => {
  const decodedSlug = decodeURIComponent(slug)

  const payload = await getPayload({ config })

  const findId = await payload.find({
    collection: 'posts',
    limit: 1,
    pagination: false,
    locale: locale,
    where: {
      slug: {
        equals: decodedSlug,
      },
    },
  })

  const id = findId.docs[0]?.id
  if (!id) {
    console.error('No post found with the given slug')
    redirect(`/${position}/blog`)
    return
  }

  const result = await payload.findByID({
    id: id,
    collection: 'posts',
    locale: position,
    fallbackLocale: false,
    overrideAccess: true,
  })

  if (result) {
    const safeSlug = encodeURIComponent(result.slug as string)

    redirect(`/${position}/blog/${safeSlug}`)
  } else {
    redirect(`/${position}/blog`)
  }
}
