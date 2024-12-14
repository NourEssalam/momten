import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
  ],
}
