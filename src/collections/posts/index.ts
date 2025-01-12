import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import type { Where } from 'payload'
import { dynamicExcerpt } from './hooks/dynamicExcerpt'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: {
      en: 'Post',
      ar: 'مقالة',
      fr: 'Article',
    },
    plural: {
      en: 'Posts',
      ar: 'مقالات',
      fr: 'Articles',
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
      localized: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      filterOptions: ({ id, data }) => {
        const query: Where = {
          and: [
            { id: { not_in: [id] } },
            {
              tag: { in: data.tag },
            },
          ],
        }

        return query
      },
      localized: true,
      hasMany: true,
      relationTo: 'posts',
    },
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [...defaultFeatures, EXPERIMENTAL_TableFeature()]
        },
      }),
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'dd MMMM yyyy',
          // minDate: new Date(),
        },
        position: 'sidebar',
      },
      // hooks: {
      //   beforeChange: [
      //     ({ siblingData, value }) => {
      //       if (siblingData._status === 'published' && !value) {
      //         return new Date()
      //       }
      //       return value
      //     },
      //   ],
      // },
      required: true,
    },
    {
      name: 'authors',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'users',
      // required: true,
      defaultValue: 'momtan',
    },
    {
      name: 'populatedAuthors',
      type: 'array',
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: 'id',
          type: 'text',
        },
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'tag',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'tag',
      // required: true,
      localized: true,
    },
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePost],
    afterRead: [dynamicExcerpt],
    // afterDelete: [revalidateDelete],
  },
  disableDuplicate: false,
}
