import { hashFilename } from '@/hooks/hashFilename'
import { normaliseSvg } from './hooks/normaliseSvg'

import type { CollectionConfig } from 'payload'

export const SVGs: CollectionConfig = {
  slug: 'svgs',
  labels: {
    singular: 'SVG',
    plural: 'SVGs',
  },
  graphQL: {
    singularName: 'SVG',
    pluralName: 'SVGs',
  },
  typescript: {
    interface: 'SVG',
  },
  access: {
    read: () => true,
  },
  admin: {
    group: '📷 Media',
    useAsTitle: 'filename',
    defaultColumns: ['filename', 'updatedAt'],
    enableRichTextRelationship: false,
  },
  upload: {
    staticDir: 'uploads/svgs',
    mimeTypes: ['image/svg+xml'],
  },
  hooks: {
    beforeOperation: [hashFilename, normaliseSvg],
  },
  fields: [],
}
