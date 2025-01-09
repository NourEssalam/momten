import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'

export const AboutPages: CollectionConfig = {
  slug: 'about-pages',
  labels: {
    singular: {
      en: 'About Page',
      ar: 'صفحة عن',
      fr: 'Page à propos',
    },
    plural: {
      en: 'About Pages',
      ar: 'صفحات عن',
      fr: 'Pages à propos',
    },
  },

  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        ar: 'عنوان',
        fr: 'Titre',
      },
      localized: true,
    },

    {
      name: 'slug',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
      required: true,
      unique: true,
    },
    {
      name: 'tag',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'about-tag',
      required: true,
      localized: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ value, operation }) => {
            if (operation === 'create' || operation === 'update') {
              return new Date()
            }
            return value
          },
        ],
      },
    },

    {
      name: 'accordions',
      type: 'array',
      required: true,
      labels: {
        singular: {
          en: 'Accordion',
          ar: 'قائمة',
          fr: 'Liste',
        },
        plural: {
          en: 'Accordions',
          ar: 'قوائم',
          fr: 'Listes',
        },
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
        },

        {
          name: 'content',
          type: 'richText',
          required: true,
          localized: true,

          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, EXPERIMENTAL_TableFeature()]
            },
          }),
        },
      ],
    },
  ],
}
