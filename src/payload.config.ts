import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { searchPlugin } from '@payloadcms/plugin-search'

import { Users } from './collections/Users'
import { Media } from './collections/media'
import { Posts } from './collections/posts'
import { Categories } from './collections/Categories'
import { fr } from '@payloadcms/translations/languages/fr'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'

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
      en: {
        custom: {
          // namespace can be anything you want
          key1: 'Translation with {{variable}}', // translation
        },
        // override existing translation keys
        general: {
          dashboard: 'Home',
        },
      },
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
    payloadCloudPlugin(),
    searchPlugin({
      collections: ['posts', 'categories'],
      defaultPriorities: {
        posts: 20,
        categories: 10,
      },
      searchOverrides: {
        slug: 'search-results',
        fields: ({ defaultFields }) => [
          ...defaultFields,
          {
            name: 'slug',
            type: 'text',
            index: true,
            admin: {
              readOnly: true,
            },
          },
          {
            name: 'image',
            type: 'relationship',
            relationTo: 'media',
            index: true,
          },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        slug: originalDoc?.slug || 'this a slug field !',
        image: originalDoc?.image || 'this an image field !',
      }),
    }),
  ],
})
