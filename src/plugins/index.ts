import { beforeSyncWithSearch } from '@/search/beforeSync'
import { searchFields } from '@/search/fieldOverrides'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'

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
  payloadCloudPlugin(),
]
