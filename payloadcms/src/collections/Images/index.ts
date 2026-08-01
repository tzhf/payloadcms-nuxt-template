import type { CollectionConfig, ImageSize } from 'payload'
import type { Image } from 'payload-types'
import { hashFilename } from '@/hooks/hashFilename'

const sizes = {
  xs: 320,
  sm: 640,
  md: 960,
  lg: 1200,
  xl: 1600,
  xxl: 2000,
  xxxl: 2400,
}

export const Images: CollectionConfig = {
  slug: 'images',
  access: {
    read: () => true,
  },
  admin: {
    group: '📷 Media',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'updatedAt'],
  },
  upload: {
    staticDir: 'uploads/images',
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    adminThumbnail: ({ doc }) =>
      (doc as unknown as Image).sizes?.xs?.url || null,
    imageSizes: [
      ...Object.entries(sizes).map<ImageSize>(([name, width]) => {
        return {
          name,
          width,
          formatOptions: {
            format: 'webp',
          },
        }
      }),
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
