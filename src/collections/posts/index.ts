import { EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { populateAuthors } from './hooks/populatedAuthors'
import { slugField } from '@/fields/slug'
import type { Where } from 'payload'

export const Posts: CollectionConfig<'posts'> = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'image',
      type: 'relationship',
      relationTo: 'media',
      required: true,
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
              categories: { in: data.categories },
            },
          ],
        }

        return query
      },

      hasMany: true,
      relationTo: 'posts',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, EXPERIMENTAL_TableFeature()]
        },
      }),
    },

    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'd MMMM y',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          // ({ value }) => formatDate(value),
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
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
      required: true,
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
      name: 'categories',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'categories',
      required: true,
    },
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
  },
  disableDuplicate: true,
}
