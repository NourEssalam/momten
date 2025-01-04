import { GlobalConfig } from 'payload'

export const Partner: GlobalConfig = {
  slug: 'partner',
  label: {
    en: 'Partner',
    ar: 'موثوق من قبل',
    fr: 'Partenaire',
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 8,
      labels: {
        singular: {
          en: 'Item',
          ar: 'عنصر',
          fr: 'Élément',
        },
        plural: {
          en: 'Items',
          ar: 'عناصر',
          fr: 'Éléments',
        },
      },
      fields: [
        {
          name: 'logo',
          type: 'relationship',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
