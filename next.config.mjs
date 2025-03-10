import createNextIntlPlugin from 'next-intl/plugin'
import { withPayload } from '@payloadcms/next/withPayload'

// Create the Next.js configuration plugins
const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    reactCompiler: false, // Required for Payload compatibility
  },
}

// Wrap both plugins - order is flexible
// export default withPayload(withNextIntl(nextConfig))
export default withNextIntl(withPayload(nextConfig))
