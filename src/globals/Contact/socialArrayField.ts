import type { Field } from 'payload'
export const SocialArrayField: Field = {
  name: 'social',
  type: 'array',
  required: true,

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
      type: 'text',
      required: true,
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
