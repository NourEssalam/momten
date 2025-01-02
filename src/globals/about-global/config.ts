import { GlobalConfig } from 'payload'

export const AboutGlobal: GlobalConfig = {
  slug: 'about-global',
  label: {
    en: 'About Global',
    ar: 'عام - من نحن',
    fr: 'A propos de nous - génerale',
  },
  fields: [
    {
      name: 'about',
      type: 'array',
      required: true,

      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Title',
            ar: 'عنوان',
            fr: 'Titre',
          },
        },
        {
          name: 'description',
          type: 'textarea',
          unique: true,
          required: true,
          localized: true,
          maxLength: 160,
          // validate: (value) => {
          //   return /^[A-Za-z]+$/.test(value as string) ? true : 'Only letters are allowed'
          // },
          label: {
            en: 'Description',
            ar: 'وصف',
            fr: 'Description',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: {
            en: 'Image',
            ar: 'صورة',
            fr: 'Image',
          },
        },
        {
          name: 'links',
          type: 'array',
          required: true,
          maxRows: 4,
          labels: {
            singular: {
              en: 'Link',
              ar: 'رابط',
              fr: 'Lien',
            },
            plural: {
              en: 'Links',
              ar: 'روابط',
              fr: 'Liens',
            },
          },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              localized: true,
              label: {
                en: 'Title',
                ar: 'عنوان',
                fr: 'Titre',
              },
            },
            {
              name: 'link',
              type: 'textarea',
              maxLength: 60,
              required: true,
              validate: (value) => {
                return /^[A-Za-z]+$/.test(value as string) ? true : 'Only letters are allowed'
              },
              label: {
                en: 'Link',
                ar: 'رابط',
                fr: 'Lien',
              },
            },
          ],
        },
      ],
    },
  ],
}
