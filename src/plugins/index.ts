import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchFields } from '@/search/fieldOverrides'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

export const plugins: Plugin[] = [
  searchPlugin({
    collections: ['posts'],
    defaultPriorities: {
      posts: 20,
    },
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      slug: 'search-results',
      labels: {
        singular: {
          en: 'Search Result', // Singular form for a single result
          ar: 'نتيجة البحث', // "Search Result" in Arabic
          fr: 'Résultat de recherche', // "Search Result" in French
        },
        plural: {
          en: 'Search Results', // Plural form for multiple results
          ar: 'نتائج البحث', // "Search Results" in Arabic (plural form)
          fr: 'Résultats de recherche', // "Search Results" in French
        },
      },

      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  // payloadCloudPlugin(),

  vercelBlobStorage({
    enabled: process.env.NODE_ENV === 'production' ? true : false,
    collections: {
      media: true,
    },
    // Token provided by Vercel once Blob storage is added to your Vercel project
    token: process.env.BLOB_READ_WRITE_TOKEN,
    addRandomSuffix: true,
  }),
]
