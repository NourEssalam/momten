import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      en: 'User',
      ar: 'مستخدم', // "User" in Arabic
      fr: 'Utilisateur', // "User" in French
    },
    plural: {
      en: 'Users',
      ar: 'مستخدمون', // "Users" in Arabic (plural form)
      fr: 'Utilisateurs', // "Users" in French
    },
  },

  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'name',
      type: 'text',
      label: {
        ar: 'الاسم',
        en: 'Name',
        fr: 'Nom',
      },
    },
  ],
}
