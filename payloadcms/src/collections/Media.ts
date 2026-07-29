// collections/Media.ts
import { hashFilename } from '@/hooks'

import type { CollectionConfig, ImageSize } from 'payload'

const sizes = {
  xs: 320,
  sm: 640,
  md: 960,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
  xxxl: 2400,
}

const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: 'Media',
    plural: 'Media',
  },
  graphQL: {
    singularName: 'Media',
    pluralName: 'Media',
  },
  typescript: {
    interface: 'Media',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: '📷 Media',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'mimeType', 'updatedAt'],
  },
  upload: {
    staticDir: 'uploads/media',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'],
    adminThumbnail: ({ doc }) => {
      // Pas d'import circulaire : on cast directement
      if (doc?.mimeType === 'image/svg+xml') {
        return (doc?.url as string) || null
      }
      return (doc?.sizes as Record<string, { url?: string }>)?.xs?.url || null
    },
    imageSizes: [
      ...Object.entries(sizes).map<ImageSize>(([name, width]) => ({
        name,
        width,
        formatOptions: {
          format: 'webp',
        },
      })),
    ],
  },
  hooks: {
    beforeOperation: [hashFilename],
  },
  fields: [
    {
      name: 'description',
      type: 'text',
      admin: {
        description:
          'For vision-impaired users with screen readers, this is more descriptive than a caption.',
      },
    },
  ],
}

export default Media
