<script setup lang="ts">
import { computed } from 'vue'
import type { SiteSettings } from '#payload-types'

const props = defineProps<{
  item: NonNullable<NonNullable<SiteSettings['navbar']>['links']>[number]
}>()

const route = useRoute()
const { activeHash } = useScrollSpy()

// 1. Resolve Label
const displayLabel = computed(() => {
  if (props.item.label && props.item.label.trim() !== '') {
    return props.item.label
  }

  if (
    props.item.type === 'page' &&
    typeof props.item.page === 'object' &&
    props.item.page !== null
  ) {
    return props.item.page.title || 'Untitled'
  }

  return 'Link'
})

// 2. Resolve Path / Target
const resolvedTo = computed(() => {
  if (props.item.type === 'page') {
    if (typeof props.item.page === 'object' && props.item.page !== null) {
      const slug = props.item.page.slug
      const basePath = slug === 'home' || slug === 'index' ? '/' : `/${slug}`

      if (props.item.anchor && props.item.anchor.trim() !== '') {
        const cleanAnchor = props.item.anchor.replace(/^#/, '')
        return basePath === '/'
          ? `/#${cleanAnchor}`
          : `${basePath}#${cleanAnchor}`
      }

      return basePath
    }
    return '#'
  }

  if (props.item.type === 'custom') {
    return props.item.url || '#'
  }

  return '#'
})

const resolvedTarget = computed(() => {
  return props.item.type === 'custom' && props.item.openInNewTab
    ? '_blank'
    : undefined
})

const resolvedRel = computed(() => {
  return resolvedTarget.value === '_blank' ? 'noopener noreferrer' : undefined
})

// 3. Computed Active State
const isLinkActive = computed(() => {
  const link = resolvedTo.value
  if (!link || link === '#') return false

  const [linkPath, hash] = link.split('#')
  const targetPath = linkPath
    ? linkPath.startsWith('/')
      ? linkPath
      : `/${linkPath}`
    : '/'

  // 1. Route path must match
  if (route.path !== targetPath) return false

  // 2. Match anchor hash
  if (hash) {
    return activeHash.value === `#${hash}`
  }

  // 3. Standard page link (deactivate when scrolled into a section)
  return !activeHash.value
})
</script>

<template>
  <NuxtLink
    :to="resolvedTo"
    :target="resolvedTarget"
    :rel="resolvedRel"
    class="relative flex h-full cursor-pointer items-center border-y transition-colors duration-500 ease-in-out"
    :class="
      isLinkActive
        ? 'border-t-transparent border-b-stone-900'
        : 'border-transparent'
    "
  >
    {{ displayLabel }}
  </NuxtLink>
</template>
