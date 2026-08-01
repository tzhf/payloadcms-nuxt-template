<template>
  <img
    v-if="resolvedImage"
    ref="root"
    v-bind="imageAttrs"
    :alt="resolvedImage.description || resolvedImage.filename || ''"
    :loading="props.lazy ? 'lazy' : undefined"
    :class="[
      props.lazy
        ? hasLoaded
          ? 'opacity-100 transition-opacity duration-500'
          : 'opacity-0'
        : '',
    ]"
    @load="onLoad"
  />
</template>

<script setup lang="ts">
import { ref, computed, toRef, onMounted } from 'vue'
import type { PayloadImageProps } from './types'
import { useSrcset } from './useSrcset'
import { srcsetSizesToAttribute } from './srcsetSizesToAttribute'

const props = withDefaults(defineProps<PayloadImageProps>(), {
  lazy: false,
  priority: false,
  sizes: () => ({ default: '100vw' }),
})

const emit = defineEmits(['load'])

const rawImage = useRelationshipField(toRef(props, 'image'))

// Is it an SVG collection item?
const isSvg = computed(() => {
  return (
    typeof rawImage.value === 'object' && rawImage.value?.relationTo === 'svgs'
  )
})

// Extract the document (Media or Svg)
const resolvedImage = computed(() => {
  if (!rawImage.value) return null
  if (
    typeof rawImage.value === 'object' &&
    'value' in rawImage.value &&
    rawImage.value.value
  ) {
    return rawImage.value.value
  }
  return rawImage.value
})

const srcset = useSrcset(resolvedImage)
const sizes = srcsetSizesToAttribute(props.sizes)
const root = ref<HTMLImageElement | null>(null)

const imageAttrs = computed(() => {
  const img = resolvedImage.value
  if (!img) return {}

  // 1. SVGs: Only need basic src
  if (isSvg.value) {
    return {
      src: img.url ?? undefined,
    }
  }

  // 2. Media: Full responsive raster image attributes
  const fetchpriority: 'high' | undefined = props.priority ? 'high' : undefined

  return {
    src: img.url ?? undefined,
    srcset: srcset.value || undefined,
    sizes: sizes || undefined,
    width: img.width ?? undefined,
    height: img.height ?? undefined,
    fetchpriority,
  }
})

const hasLoaded = ref(!props.lazy)

const onLoad = () => {
  hasLoaded.value = true
  emit('load')
}

onMounted(() => {
  if (root.value?.complete) {
    onLoad()
  }
})
</script>
