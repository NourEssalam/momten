import type { Field } from 'payload'
export const SocialArrayField: Field = {
  name: 'social',
  type: 'array',
  required: true,
  maxRows: 4,
  labels: {
    singular: {
      en: 'Social Link',
      ar: 'رابط التواصل',
      fr: 'Lien social',
    },
    plural: {
      en: 'Social Links',
      ar: 'روابط التواصل',
      fr: 'Liens sociaux',
    },
  },
  fields: [
    {
      name: 'name',
      type: 'select',
      required: true,
      unique: true,
      options: [
        {
          label: 'Facebook',
          value: 'Facebook',
        },
        {
          label: 'Instagram',
          value: 'Instagram',
        },
        {
          label: 'Twitter',
          value: 'Twitter',
        },
        {
          label: 'Youtube',
          value: 'Youtube',
        },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        disabled: true,
        readOnly: true,
      },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        disabled: true,
        readOnly: true,
      },
    },
  ],
}
