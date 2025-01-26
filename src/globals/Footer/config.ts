import { GlobalConfig } from 'payload'
import { quicklinkcolumns } from './fields'
import { adminsAndSuperAdmins } from '@/access-control/globals/adminsAndSuperAdmins'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    ar: 'أسفل الموقع',
    fr: 'pied de page',
  },
  access: {
    read: adminsAndSuperAdmins,
    update: adminsAndSuperAdmins,
  },
  fields: [quicklinkcolumns],
}
