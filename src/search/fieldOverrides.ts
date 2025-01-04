import { Field } from 'payload'

export const searchFields: Field[] = [
  {
    name: 'slug',
    type: 'text',
    index: true,
    admin: {
      readOnly: true,
    },
    label: {
      en: 'Slug',
      ar: 'الرابط',
      fr: 'Lien',
    },
    localized: true,
  },
  {
    name: 'image',
    type: 'relationship',
    relationTo: 'media',
    index: true,
    label: {
      en: 'Image',
      ar: 'صورة',
      fr: 'Image',
    },
  },
]
