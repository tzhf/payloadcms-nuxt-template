import { livePreviewBreakpoints } from '@/utils'
import { isSuperAdmin } from '@/access'

import type { CollectionConfig } from 'payload'
import { slugField } from '@/fields/slug'
import { layoutField } from '@/fields/layout'

const Pages: CollectionConfig = {
  slug: 'pages',

  // Define which fields to select when populating this document from relationships
  defaultPopulate: {
    title: true,
    slug: true,
  },

  labels: {
    singular: '📄 Page',
    plural: '📄 Pages',
  },

  defaultSort: 'title',

  admin: {
    useAsTitle: 'title',
    group: '📄 Content',
    defaultColumns: ['title', 'slug'],
    livePreview: {
      url: ({ data }) => {
        const url = new URL(process.env.SITE_URL)
        url.searchParams.append('preview', 'true')
        url.pathname = data.slug === 'home' ? '/' : `/${data.slug}`
        return url.toString()
      },
      breakpoints: livePreviewBreakpoints,
    },
  },

  access: {
    create: isSuperAdmin,
    read: () => true,
    delete: isSuperAdmin,
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    layoutField,
  ],
}

export default Pages
