import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { Users } from './collections/Users/Users'
import { Media } from './collections/media'
import { fr } from '@payloadcms/translations/languages/fr'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import { arabicTranslation } from './i18n/arabicPayloadExtend'
import { plugins } from './plugins'
import { Header } from './globals/Header/config'
import { Footer } from './globals/Footer/config'
import { Contact } from './globals/Contact/config'

import { AboutPages } from './collections/about-pages'
import { Team } from './collections/team'
import { Tag } from './collections/Tags'
import { Posts } from './collections/posts'
import { Partner } from './globals/partners/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,

    meta: {
      title: "Momtan's Admin Panel",
      description: 'The best admin panel in the world',
      defaultOGImageType: 'dynamic',
      titleSuffix: '-momtan',
      icons: [
        {
          rel: 'icon',
          type: 'image/ico',
          url: '/favicon.ico',
        },
      ],
    },
    components: {
      graphics: {
        Logo: {
          path: '@/components/payload-root-view/graphics/logo#Logo',
          // exportName: 'Logo',
        },
        Icon: {
          path: '@/components/payload-root-view/graphics/icon#Icon',
          // exportName: 'Logo',
        },
        // Icon,
      },
    },
  },
  collections: [Users, Media, AboutPages, Team, Tag, Posts],
  globals: [Header, Footer, Contact, Partner],
  i18n: {
    supportedLanguages: { en, fr, ar },
    translations: {
      ...arabicTranslation,
    },
  },
  localization: {
    locales: [
      {
        label: 'English',
        code: 'en',
      },
      {
        label: 'Arabic',
        code: 'ar',
        rtl: true,
      },
    ],
    defaultLocale: 'en', // required
    // fallback: true, // defaults to true
  },

  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [...plugins],
  telemetry: false,
})
