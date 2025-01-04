import type { CollectionConfig } from 'payload'
import { iconPlusColor } from './hooks/iconPlusColor'

export const Team: CollectionConfig = {
  slug: 'team',

  labels: {
    singular: {
      en: 'Team Member',
      ar: 'عضو المنظمة',
      fr: "membres de l'organisation",
    },
    plural: {
      en: 'Team Members',
      ar: 'أعضاء المنظمة',
      fr: 'Utilisateurs', // "Users" in French
    },
  },
  admin: {
    useAsTitle: 'name',
  },

  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'socials',
      type: 'array',
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
    },
  ],
  hooks: {
    afterRead: [iconPlusColor],
  },
}
