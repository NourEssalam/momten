import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ originalDoc, searchDoc }) => {
  const modifiedDoc: DocToSync = {
    ...searchDoc,

    slug: originalDoc?.slug || 'this a slug field !',
    image: originalDoc?.image || 'this an image field !',
  }

  return modifiedDoc
}
