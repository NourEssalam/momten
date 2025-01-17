import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import type { Where } from 'payload'
import { dynamicExcerpt } from './hooks/dynamicExcerpt'
import { User } from '@/payload-types'

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
      hooks: {
        afterRead: [
          async ({ value, req }) => {
            if (!Array.isArray(value)) return value // Ensure value is an array

            // Map the array to promises and resolve them using Promise.all
            const filteredAuthors = await Promise.all(
              value.map(async (authorId: string) => {
                try {
                  // Attempt to find the user by ID
                  const result = await req.payload.findByID({
                    id: authorId,
                    collection: 'users',
                    depth: 1,
                  })
                  return result // Keep the valid result
                } catch (error) {
                  if ((error as any).status === 404) {
                    return null // Handle not found case by returning null
                  }
                  throw error // Re-throw other errors
                }
              }),
            )

            // Remove null values (invalid or deleted users)
            return filteredAuthors.filter((author) => author !== null)
          },
        ],
      },
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
    afterChange: [dynamicExcerpt],
    // afterDelete: [revalidateDelete],
  },
  disableDuplicate: false,
}
