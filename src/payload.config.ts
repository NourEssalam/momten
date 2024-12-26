import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users'
import { Media } from './collections/media'
import { Posts } from './collections/posts'
import { Categories } from './collections/Categories'
import { fr } from '@payloadcms/translations/languages/fr'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import { arabicTranslation } from './i18n/arabicExtend'
import { plugins } from './plugins'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { en, fr, ar },
    translations: {
      ...arabicTranslation,
    },
  },
  collections: [Users, Media, Posts, Categories],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    ...plugins,
    // searchPlugin({
    //   collections: ['posts', 'categories'],
    //   defaultPriorities: {
    //     posts: 20,
    //     categories: 10,
    //   },
    //   searchOverrides: {
    //     slug: 'search-results',
    //     labels: {
    //       singular: {
    //         en: 'Search Result', // Singular form for a single result
    //         ar: 'نتيجة البحث', // "Search Result" in Arabic
    //         fr: 'Résultat de recherche', // "Search Result" in French
    //       },
    //       plural: {
    //         en: 'Search Results', // Plural form for multiple results
    //         ar: 'نتائج البحث', // "Search Results" in Arabic (plural form)
    //         fr: 'Résultats de recherche', // "Search Results" in French
    //       },
    //     },
    //     fields: ({ defaultFields }) => [
    //       ...defaultFields,
    //       {
    //         name: 'slug',
    //         type: 'text',
    //         index: true,
    //         admin: {
    //           readOnly: true,
    //         },
    //         label: {
    //           en: 'Slug',
    //           ar: 'الرابط',
    //           fr: 'Lien',
    //         },
    //       },
    //       {
    //         name: 'image',
    //         type: 'relationship',
    //         relationTo: 'media',
    //         index: true,
    //         label: {
    //           en: 'Image',
    //           ar: 'صورة',
    //           fr: 'Image',
    //         },
    //       },
    //     ],
    //   },
    //   beforeSync: ({ originalDoc, searchDoc }) => ({
    //     ...searchDoc,
    //     slug: originalDoc?.slug || 'this a slug field !',
    //     image: originalDoc?.image || 'this an image field !',
    //   }),
    // }),
  ],
})
