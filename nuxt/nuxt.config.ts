import { resolve } from 'path'

import tailwindPlugin from '@tailwindcss/vite'

import possibleTypes from './graphql/possibleTypes.json'

const { NODE_ENV, SITE_NAME, SITE_URL, PAYLOAD_URL, PAYLOAD_API_ROUTE } =
  process.env

const isDev = NODE_ENV !== 'production'

export default defineNuxtConfig({
  compatibilityDate: '2025-11-10',

  devtools: {
    enabled: false,
    timeline: {
      enabled: true,
    },
  },

  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/apollo',
    '@nuxtjs/seo',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    'motion-v/nuxt',
  ],

  icon: {
    size: '1.5rem',
    customCollections: [
      {
        prefix: 'icons',
        dir: resolve('./app/assets/icons'),
      },
    ],
  },

  alias: {
    '#graphql-exports': resolve(__dirname, './graphql/index.js'),
    '#payload': resolve(__dirname, '../payloadcms/node_modules/payload'),
    '#payload-config': resolve(
      __dirname,
      '../payloadcms/src/payload.config.ts',
    ),
    '#payload-types': resolve(__dirname, '../payloadcms/payload-types.d.ts'),
    '#lexical': resolve(__dirname, '../payloadcms/node_modules/lexical'),
  },

  apollo: {
    clients: {
      default: {
        httpEndpoint: `${process.env.PAYLOAD_URL}${process.env.PAYLOAD_API_ROUTE}/graphql`, // Server side (SSR)
        browserHttpEndpoint: `${process.env.PAYLOAD_URL}${process.env.PAYLOAD_API_ROUTE}/graphql`, // Client side (Browser)
        inMemoryCacheOptions: { possibleTypes },
      },
    },
  },

  robots: {
    disallow: ['/admin', '/api', PAYLOAD_API_ROUTE],
  },

  site: {
    url: SITE_URL,
    name: SITE_NAME,
    defaultLocale: 'en',
  },

  sitemap: {
    exclude: [],
    sources: ['/api/__sitemap__/urls'],
  },

  runtimeConfig: {
    public: {
      siteName: SITE_NAME,
      payloadUrl: PAYLOAD_URL,
      payloadApiRoute: PAYLOAD_API_ROUTE,
      isDev,
    },
  },

  build: { transpile: [] },

  vite: {
    plugins: [tailwindPlugin()],
    // server: {
    //   origin: PAYLOAD_URL,
    //   // allowedHosts: ['example.test'],
    //   hmr: {
    //     protocol: 'wss',
    //     host: 'example.test',
    //     clientPort: 443,
    //   },
    // },
  },

  // hooks: {
  //   async 'build:before'() {
  //     try {
  //       const res = await fetch(
  //         `http://127.0.0.1:3001${PAYLOAD_API_ROUTE}/graphql`,
  //         {
  //           method: 'POST',
  //           headers: { 'Content-Type': 'application/json' },
  //           body: JSON.stringify({ query: `{ SiteSettings { font } }` }),
  //         },
  //       )
  //       const { data } = await res.json()
  //       const font = data?.SiteSettings?.font || 'Inter'
  //       writeFileSync('./assets/css/fonts-dynamic.css', `@import url('https://fonts.googleapis.com/css2?family=${font}:wght@400;500;600;700;800;900&display=swap');

  // :root {
  //   --font-body: '${font}', sans-serif;
  // }`)
  //       console.log(`Dynamic font "${font}" generated.`)
  //     } catch (err) {
  //       console.warn('Could not generate dynamic fonts, using fallback:', err)
  //       writeFileSync('./assets/css/fonts-dynamic.css', `:root { --font-body: 'Inter', sans-serif; }`)
  //     }
  //   },
  // },
})
