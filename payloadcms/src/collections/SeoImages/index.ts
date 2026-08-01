import type { CollectionConfig } from 'payload'

export const SeoImages: CollectionConfig = {
  slug: 'seo-images',
  access: { read: () => true },
  admin: {
    group: '📷 Media',
    useAsTitle: 'filename',
  },
  upload: {
    staticDir: 'uploads/seo',
    mimeTypes: ['image/jpeg', 'image/png'],
    adminThumbnail: ({ doc }) => (doc as any).sizes?.opengraph?.url || null,
    imageSizes: [
      {
        name: 'opengraph',
        width: 1200,
        height: 630,
        withoutEnlargement: false,
        formatOptions: {
          format: 'jpeg',
          options: { quality: 90, force: true },
        },
      },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
