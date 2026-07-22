<template>
  <img
    v-if="image"
    ref="root"
    v-bind="imageAttrs"
    :alt="image.description || image.filename || ''"
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
import type { PayloadImageProps } from './types'
import { useSrcset } from './useSrcset'
import { srcsetSizesToAttribute } from './srcsetSizesToAttribute'

const props = withDefaults(defineProps<PayloadImageProps>(), {
  lazy: false,
  priority: false,
  sizes: () => ({ default: '100vw' }),
})

const emit = defineEmits(['load'])

const image = useRelationshipField(toRef(props, 'image'))
const srcset = useSrcset(image)
const sizes = srcsetSizesToAttribute(props.sizes)
const root = ref<HTMLImageElement | null>(null)

// Vérification si c'est un SVG
const isSvg = computed(() => {
  if (!image.value) return false
  return (
    image.value.mimeType === 'image/svg+xml' ||
    image.value.filename?.endsWith('.svg') ||
    image.value.url?.endsWith('.svg')
  )
})

// Attributs dynamiques pour SVG vs Images Matricielles (Raster)
const imageAttrs = computed(() => {
  if (!image.value) return {}

  if (isSvg.value) {
    return {
      src: image.value.url ?? undefined,
    }
  }

  // Type explicite 'high' | undefined pour satisfaire Vue & TypeScript
  const fetchpriority: 'high' | undefined = props.priority ? 'high' : undefined

  return {
    srcset: srcset.value || undefined,
    sizes: sizes || undefined,
    width: image.value.width ?? undefined,
    height: image.value.height ?? undefined,
    fetchpriority,
  }
})

// Gestion du lazy loading
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
