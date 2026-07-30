import path from 'path'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { buildConfig } from 'payload'
import { mongooseAdapter } from '@payloadcms/db-mongodb'

import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { s3Storage } from '@payloadcms/storage-s3'
import { seoPlugin } from '@payloadcms/plugin-seo'

import SiteSettings from '@/globals/SiteSettings'
// import * as collections from './collections'

import Pages from '@/collections/Pages'
import SVGs from '@/collections/SVGs'
import Staff from '@/collections/Staff'
import SeoImages from '@/collections/SeoImages'
import Media from '@/collections/Media'
import Images from '@/collections/Images'
import Videos from '@/collections/Videos'
import VideoThumbnails from '@/collections/VideoThumbnails'

const globals = [SiteSettings]
const collections = [
  Pages,
  Images,
  Media,
  SVGs,
  Videos,
  VideoThumbnails,
  SeoImages,
  Staff,
]

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.PAYLOAD_URL || 'http://localhost:3001',

  // Keep your CORS and CSRF configurations aligned
  cors: [process.env.SITE_URL || 'http://localhost:3000'].filter(Boolean),
  csrf: [process.env.SITE_URL || 'http://localhost:3000'].filter(Boolean),

  secret: process.env.PAYLOAD_SECRET,
  debug: process.env.NODE_ENV !== 'production',
  admin: {
    avatar: 'default',
    components: {
      graphics: {
        Icon: {
          path: '~/graphics/Icon.tsx',
        },
        Logo: {
          path: '~/graphics/Logo.tsx',
        },
      },
    },
    meta: {
      // favicon: '/favicon/safari-pinned-tab.svg',
      titleSuffix: `| ${process.env.SITE_NAME}`,
    },
    user: Staff.slug,
  },
  db: mongooseAdapter({
    url:
      process.env.DATABASE_URL ||
      `mongodb://0.0.0.0/${process.env.DATABASE_NAME}`,
  }),
  editor: lexicalEditor({}),
  collections: collections,
  globals: globals,
  routes: {
    api: process.env.PAYLOAD_API_ROUTE,
  },
  sharp,
  typescript: {
    outputFile: path.resolve(__dirname, '../payload-types.d.ts'),
  },
  upload: {
    limits: {
      fileSize: 50000000,
    },
  },
  plugins: [
    s3Storage({
      enabled: false,
      collections: {
        images: {
          disablePayloadAccessControl: true,
          prefix: 'images',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
        svgs: {
          disablePayloadAccessControl: true,
          prefix: 'svgs',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
        videos: {
          disablePayloadAccessControl: true,
          prefix: 'videos',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
        'video-thumbnails': {
          disablePayloadAccessControl: true,
          prefix: 'video-thumbnails',
          generateFileURL: ({ filename, prefix }) => {
            return `https://${process.env.CLOUDFRONT_DOMAIN}/${prefix}/${filename}`
          },
        },
      },
      bucket: process.env.S3_BUCKET,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
        region: process.env.S3_REGION,
      },
    }),
    seoPlugin({
      collections: ['pages'],
      globals: ['site-settings'],
      uploadsCollection: 'seo-images',
      // generateTitle: ({ doc }) => `${doc?.title?.value} | ${process.env.SITE_NAME}`,
      tabbedUI: true,
    }),
  ],
})
