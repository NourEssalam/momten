import { APIError, type CollectionConfig } from 'payload'
import { setFirstUserAsSuperAdmin } from './hooks/setFirstUserAsSuperAdmin'
import { anyone } from '@/access-control/collections/anyone'
import { adminAndSuperAdmin } from '@/access-control/collections/adminAndSuperAdmin'
import { adminAndSuperAdminField } from '@/access-control/fields/adminAndSuperAdminField'
import { hierarchicalPermissions } from '@/access-control/collections/hierarchicalPermissions'

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
  access: {
    create: adminAndSuperAdmin,
    read: anyone,
    update: hierarchicalPermissions,
    delete: hierarchicalPermissions,
  },

  hooks: {
    beforeDelete: [
      async ({ req }) => {
        const userCount = await req.payload.count({
          collection: 'users',
        })

        if (userCount.totalDocs === 1) {
          throw new Error('Cannot delete the only remaining super-user.')
        }
      },
    ],
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
      required: true,
      access: {
        // also ensure that only a super-admin can change his role even another super-admin can't change his role
        create: adminAndSuperAdminField,
        update: adminAndSuperAdminField,
      },
      admin: {
        position: 'sidebar',
      },

      hooks: {
        // only super user can set the super admin-role
        afterChange: [
          ({ value, req }) => {
            // Check if the user is not a super-admin
            if (
              req.user?.role !== 'super-admin' &&
              !req.url?.includes('forgot-password') &&
              (value === 'super-admin' || value === 'admin')
            ) {
              console.log('req.url :', req.url)
              throw new APIError(
                "Only super-admins can assign 'admin' or 'super-admin' roles.",
                400,
                undefined,
                true,
              )
            }

            return value
          },
        ],

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
