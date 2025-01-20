import { adminAndSuperAdmin } from '../access-control/collections/adminAndSuperAdmin'
import { anyone } from '@/access-control/collections/anyone'
import type { CollectionConfig } from 'payload'

export const Tag: CollectionConfig = {
  slug: 'tag',
  labels: {
    singular: {
      en: 'Post Category', // More specific context for posts
      ar: 'فئة المنشور', // "Post Category" in Arabic
      fr: 'Catégorie de publication', // "Post Category" in French
    },
    plural: {
      en: 'Post category', // More specific for plural form
      ar: 'فئات المنشورات', // "Post category" in Arabic (plural form)
      fr: 'Catégories de publication', // "Post category" in French
    },
  },
  access: {
    create: adminAndSuperAdmin,
    read: anyone,
    update: adminAndSuperAdmin,
    delete: adminAndSuperAdmin,
  },

  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      // index: true,
      label: {
        en: 'Title',
        ar: 'عنوان',
        fr: 'Titre',
      },
      localized: true,
    },
  ],
}
