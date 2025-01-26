import { GlobalConfig } from 'payload'
import { SocialArrayField } from './socialArrayField'
import { iconPlusColor } from './hooks/iconPlusColor'
import { adminsAndSuperAdmins } from '@/access-control/globals/adminsAndSuperAdmins'
export const Contact: GlobalConfig = {
  slug: 'contact',
  label: {
    en: 'Contact',
    ar: 'اتصل بنا',
    fr: 'Contact',
  },
  access: {
    read: adminsAndSuperAdmins,
    update: adminsAndSuperAdmins,
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: {
            en: 'Social Media',
            ar: 'وسائل التواصل',
            fr: 'Liens sociaux',
          },

          fields: [SocialArrayField],
        },
        {
          label: {
            en: 'Contact Information',
            ar: 'معلومات التواصل',
            fr: 'Informations de contact',
          },

          fields: [
            {
              name: 'phones',
              type: 'array',
              required: true,
              maxRows: 2,
              fields: [
                {
                  name: 'phone',
                  type: 'number',
                  required: true,
                },
              ],
            },
            {
              name: 'email',
              type: 'email',
              required: true,
            },
            {
              name: 'address',
              type: 'text',
              required: true,
              localized: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterRead: [iconPlusColor],
  },
}
