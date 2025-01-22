import { superAdminField } from '@/access-control/fields/superAdminField'
import { adminsAndSuperAdmins } from '@/access-control/globals/adminsAndSuperAdmins'
import { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: {
    en: 'Header',
    ar: 'رأس الصفحة',
    fr: 'en-tête',
  },
  access: {
    read: adminsAndSuperAdmins,
    update: adminsAndSuperAdmins,
  },
  fields: [
    {
      name: 'items',
      type: 'array',
      required: true,
      maxRows: 6,

      labels: {
        singular: {
          en: 'Item',
          ar: 'عنصر',
          fr: 'Élément',
        },
        plural: {
          en: 'Items',
          ar: 'عناصر',
          fr: 'Éléments',
        },
      },
      fields: [
        {
          name: 'pageName',
          type: 'text',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          access: {
            create: superAdminField,
            update: superAdminField,
          },
        },
      ],
    },
  ],
}
