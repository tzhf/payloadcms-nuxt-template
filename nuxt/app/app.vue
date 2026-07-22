<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { SeoImage } from '#payload-types'

const config = useRuntimeConfig()

const { siteSettings } = await useSiteSettings()

const { data: liveData } = useLivePreview({
  initialData: siteSettings,
  depth: 1,
})

watchEffect(() => {
  if (liveData.value?.typography) {
    siteSettings.value = liveData.value
  }
})

const cssVariables = computed(() => {
  const c = siteSettings.value?.colors
  const fontBody = siteSettings.value?.typography?.fontBody || 'Inter'
  const fontHeading = siteSettings.value?.typography?.fontHeading || 'Inter'
  const fontSize = siteSettings.value?.typography?.fontSize || 14

  return `:root {
    --font-body: '${fontBody}';
    --font-heading: '${fontHeading}';
    --font-size: ${fontSize}px;
    --color-background: ${c?.background || '#ffffff'};
    --color-foreground: ${c?.foreground || '#111111'};
    --color-primary: ${c?.primary || '#000000'};
    --color-primary-foreground: ${c?.primaryForeground || '#ffffff'};
    --color-secondary: ${c?.secondary || '#f4f4f5'};
    --color-secondary-foreground: ${c?.secondaryForeground || '#111111'};
    --color-muted: ${c?.muted || '#f4f4f5'};
    --color-muted-foreground: ${c?.mutedForeground || '#71717a'};
    --color-border: ${c?.border || '#e4e4e7'};
    --color-accent: ${c?.accent || '#f4f4f5'};
    --color-accent-foreground: ${c?.accentForeground || '#111111'};
    --nav-background-color: ${siteSettings.value?.navbar?.backgroundColor || '#000000'};
    --nav-background-color-scroll: ${siteSettings.value?.navbar?.backgroundColorScroll || '#000000'};
    --nav-text-color: ${siteSettings.value?.navbar?.textColor || '#ffffff'};
  }`
})

const googleFontsUrl = computed(() => {
  const bodyFont = siteSettings.value?.typography?.fontBody?.trim() || 'Inter'
  const headingFont =
    siteSettings.value?.typography?.fontHeading?.trim() || bodyFont

  const params = new URLSearchParams()
  const weights = ':wght@200..800'

  // Use a Set to avoid duplicate font family parameters
  const uniqueFonts = Array.from(new Set([bodyFont, headingFont]))

  uniqueFonts.forEach((font) => {
    params.append('family', `${font}${weights}`)
  })

  params.append('display', 'swap')

  return `https://fonts.googleapis.com/css2?${params}`
})

useHead(() => ({
  style: [
    {
      innerHTML: cssVariables,
      type: 'text/css',
    },
  ],
  link:
    import.meta.dev && googleFontsUrl.value
      ? [
          { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
          {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossorigin: '',
          },
          { rel: 'stylesheet', href: googleFontsUrl.value },
        ]
      : [],
}))

/**
 * SEO / Meta
 */
const ogImageUrl = computed(() => {
  const seoImage = useRelationshipField(siteSettings.value?.meta?.image)
    ?.value as SeoImage | null
  return seoImage?.sizes?.opengraph?.url || seoImage?.url
})

useSeoMeta({
  titleTemplate: (title?: string) =>
    title
      ? `${title} | ${siteSettings.value?.meta?.title || config.public.siteName}`
      : siteSettings.value?.meta?.title || config.public.siteName,
  description: siteSettings.value?.meta?.description || undefined,
  ogSiteName: siteSettings.value?.meta?.title || config.public.siteName,
  ogDescription: siteSettings.value?.meta?.description || undefined,
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImage: ogImageUrl.value || undefined,
  twitterDescription: siteSettings.value?.meta?.description || undefined,
  twitterImage: ogImageUrl.value || undefined,
  twitterCard: 'summary_large_image',
})
</script>
