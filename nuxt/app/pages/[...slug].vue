<template>
  <div>
    <PayloadRenderBlock
      v-for="(block, index) in layout"
      :key="block.id ?? `${block.blockType}-${index}`"
      :block="block"
    />
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()

const slug = computed(() => {
  const segments = route.params.slug as string[] | undefined
  return segments?.length ? segments.join('/') : 'home'
})

const initialData = await usePayloadPage(slug).catch((err) => {
  throw createError({
    statusCode: err.statusCode || 404,
    message: err.message,
    fatal: true,
  })
})

const { data: doc } = useLivePreview({ initialData, depth: 1 })

const page = computed(() => doc.value ?? initialData)

const layout = computed(() => page.value?.layout || [])

usePayloadSeo(page)
</script>
