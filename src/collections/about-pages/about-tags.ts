import type { CollectionConfig } from 'payload'

export const AboutTag: CollectionConfig = {
  slug: 'about-tag',

  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      // index: true,
      label: {
        en: 'Title',
        ar: 'عنوان',
        fr: 'Titre',
      },
      localized: true,
    },
  ],
}
