import { GlobalConfig } from 'payload'
import { quicklinkcolumns } from './fields'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: {
    en: 'Footer',
    ar: 'أسفل الموقع',
    fr: 'pied de page',
  },
  fields: [quicklinkcolumns],
}
