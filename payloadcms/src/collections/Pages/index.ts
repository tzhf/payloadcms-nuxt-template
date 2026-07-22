import { livePreviewBreakpoints } from '~/utils'
import { isSuperAdmin } from '~/access'

import { HeroBlock, TextBlock } from '../../blocks'
import type { CollectionConfig } from 'payload'
import { slug } from '~/fields'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: '📄 Page',
    plural: '📄 Pages',
  },
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
  defaultSort: 'title',
  versions: true,
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
      admin: {
        position: 'sidebar',
      },
    },
    slug('title'),
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, TextBlock],
    },
  ],
}

export default Pages
