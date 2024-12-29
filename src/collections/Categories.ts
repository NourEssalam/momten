import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: {
      en: 'Post Category', // More specific context for posts
      ar: 'فئة المنشور', // "Post Category" in Arabic
      fr: 'Catégorie de publication', // "Post Category" in French
    },
    plural: {
      en: 'Post Categories', // More specific for plural form
      ar: 'فئات المنشورات', // "Post Categories" in Arabic (plural form)
      fr: 'Catégories de publication', // "Post Categories" in French
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
      index: true,
      label: 'Title',
    },
  ],
  defaultPopulate: {
    title: true,
  },
}
