import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    ar: 'رأس الصفحة',
    fr: 'en-tête',
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
          name: 'pageName',
          type: 'text',
          required: true,
          localized: true,
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
