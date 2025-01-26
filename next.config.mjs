import createNextIntlPlugin from 'next-intl/plugin'
import { withPayload } from '@payloadcms/next/withPayload'

// Create the Next.js configuration plugins
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false, // Required for Payload compatibility
  },
  // Any other shared Next.js configurations
  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 15 * 60 * 1000, // 15 minutes
    // number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
}

// Wrap both plugins - order is flexible
// export default withPayload(withNextIntl(nextConfig))
export default withNextIntl(withPayload(nextConfig))
