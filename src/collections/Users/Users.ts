import type { CollectionConfig } from 'payload'
import { setFirstUserAsSuperAdmin } from './hooks/setFirstUserAsSuperAdmin'

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
    defaultColumns: ['username', 'email'],
    useAsTitle: 'username',
  },
  auth: {
    loginWithUsername: {
      allowEmailLogin: true, // default: false
      requireEmail: true, // default: false
    },
  },
  // Access Control
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: 'username', // requiredname',
      required: true,
      type: 'text',
      label: {
        ar: 'الاسم',
        en: 'Name',
        fr: 'Nom',
      },
    },
    {
      name: 'role',
      type: 'select',
      hooks: {
        beforeChange: [setFirstUserAsSuperAdmin],
      },

      options: [
        {
          label: {
            en: 'Super Admin',
            ar: ' مسؤول عام',
            fr: 'Super Administrateur',
          },
          value: 'super-admin',
        },
        {
          label: {
            en: 'Admin',
            ar: 'مسؤول',
            fr: 'Administrateur',
          },
          value: 'admin',
        },
        {
          value: 'editor',
          label: {
            en: 'Editor',
            ar: 'محرر',
            fr: 'Editeur',
          },
        },
      ],
    },
  ],
}
