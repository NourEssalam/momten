import type { Field } from 'payload'
export const quicklinkcolumns: Field = {
  name: 'quicklinkcolumns',
  type: 'array',

  fields: [
    {
      name: 'column',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'links',
      type: 'array',
      required: true,
      localized: true,
      maxRows: 4,
      labels: {
        singular: {
          en: 'Link',
          ar: 'رابط',
          fr: 'Lien',
        },
        plural: {
          en: 'Links',
          ar: 'روابط',
          fr: 'Liens',
        },
      },
      fields: [
        {
          name: 'pageName',
          type: 'text',
          required: true,
          // localized: true,
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
