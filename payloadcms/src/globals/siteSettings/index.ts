import type { GlobalConfig } from 'payload'
import { livePreviewBreakpoints } from '@/utils/livePreviewBreakpoints'

import { Theme } from './Theme'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

const SiteSettings: GlobalConfig = {
  admin: {
    group: '🌏 Globals',
    livePreview: {
      url: `${process.env.SITE_URL}?preview=true`,
      breakpoints: livePreviewBreakpoints,
    },
  },

  access: {
    read: () => true,
  },

  slug: 'site-settings',

  graphQL: {
    name: 'SiteSettings',
  },

  typescript: {
    interface: 'SiteSettings',
  },

  fields: [
    {
      type: 'tabs',
      tabs: [Theme, Navbar, Footer],
    },
  ],
}

export default SiteSettings
