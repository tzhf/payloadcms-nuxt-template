import type { Page, SeoImage } from '#payload-types'

export const usePayloadSeo = (page: Ref<Page | null>) => {
  watchEffect(() => {
    if (!page.value) return

    const meta = page.value.meta ?? {}

    const seoImage = useRelationshipField(meta.image)?.value as SeoImage | null
    const imageUrl = seoImage?.sizes?.opengraph?.url || seoImage?.url

    useSeoMeta({
      title: meta.title || page.value.title || undefined,
      description: meta.description || undefined,
      ogDescription: meta.description || undefined,
      ogImage: imageUrl || undefined,
      twitterDescription: meta.description || undefined,
      twitterImage: imageUrl || undefined,
    })
  })
}
