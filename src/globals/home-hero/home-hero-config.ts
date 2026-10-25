import { adminsAndSuperAdmins } from '@/access-control/globals/adminsAndSuperAdmins'
import { GlobalConfig } from 'payload'

const hint = {
  en: 'Landscape photo (4:3 works best), at least 1200px wide.',
  ar: 'صورة أفقية (النسبة 4:3 هي الأفضل) وبعرض 1200 بكسل على الأقل.',
  fr: 'Photo en format paysage (4:3 idéal), au moins 1200 px de large.',
}

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: {
    en: 'Home Hero Photos',
    ar: 'صور الواجهة الرئيسية',
    fr: "Photos de l'accueil",
  },
  access: {
    read: adminsAndSuperAdmins,
    update: adminsAndSuperAdmins,
  },
  fields: [
    {
      name: 'photo1',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Photo 1 (top)', ar: 'الصورة 1 (أعلى)', fr: 'Photo 1 (haut)' },
      admin: { description: hint },
    },
    {
      name: 'photo2',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Photo 2 (right)', ar: 'الصورة 2 (جانب)', fr: 'Photo 2 (droite)' },
      admin: { description: hint },
    },
    {
      name: 'photo3',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: { en: 'Photo 3 (bottom)', ar: 'الصورة 3 (أسفل)', fr: 'Photo 3 (bas)' },
      admin: { description: hint },
    },
  ],
}
