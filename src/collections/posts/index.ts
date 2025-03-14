import {
  EXPERIMENTAL_TableFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import type { Where } from 'payload'
import { anyone } from '@/access-control/collections/anyone'
import { adminsOrTheEditor } from '@/access-control/collections/adminsOrTheEditor'

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
  access: {
    create: anyone,
    read: anyone,
    update: adminsOrTheEditor,
    delete: adminsOrTheEditor,
  },

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      label: {
        en: 'Title',
        ar: 'عنوان',
        fr: 'Titre',
      },
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'image',
      label: {
        en: 'Image',
        ar: 'صورة',
        fr: 'Image',
      },
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      localized: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
      validate: (value) =>
        Boolean(value && value.length > 100 && value.length < 300) ||
        'This field must be at least 150 characters long.',
    },
    {
      name: 'tag',
      type: 'relationship',
      admin: {
        position: 'sidebar',
      },
      hasMany: true,
      relationTo: 'tag',
      required: true,
      localized: true,
      filterOptions: () => {
        return {
          title: {
            exists: true,
          },
        }
      },
    },
    {
      name: 'relatedPosts',
      type: 'relationship',
      relationTo: 'posts',
      admin: {
        position: 'sidebar',
        condition: (siblingData) => {
          return Boolean(siblingData.tag.length > 0)
        },
      },
      filterOptions: ({ id, data }) => {
        const query: Where = {
          and: [
            { id: { not_equals: id } },
            {
              tag: { in: data.tag },
            },
          ],
        }

        return query
      },
      localized: true,
      hasMany: true,
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
        },
        position: 'sidebar',
      },

      required: true,
    },
    {
      name: 'authors',
      type: 'relationship',
      required: true,
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      name: 'newsletter',
      type: 'ui',

      label: {
        en: 'Send as Newsletter',
        ar: 'إرسال كنشرة بريدية',
        fr: 'Envoyer comme newsletter',
      },
      admin: {
        position: 'sidebar',
        components: {
          Field: {
            path: '@/components/payload-fileds-view/newsletterButton',
            exportName: 'NewsletterButton',
          },
        },
        condition: (data, siblingData) => {
          // Required fields - all of these must be present
          const requiredFields = [
            'title',
            'excerpt',
            'publishedAt',
            'tag',
            'image',
            'authors',
            'slug',
            'content',
          ]
          // Check required fields
          const hasRequiredFields = requiredFields.every(
            (field) =>
              siblingData[field] &&
              (typeof siblingData[field] === 'object'
                ? Object.keys(siblingData[field]).length > 0
                : true),
          )

          return hasRequiredFields
        },
      },
    },

    ...slugField(),
  ],
  hooks: {
    // afterChange: [dynamicExcerpt],
  },
  disableDuplicate: false,
}
