<script setup lang="ts">
import { blocks } from './blocks'
import type { Page } from '#payload-types'
export type PageBlock = NonNullable<Page['layout']>[number]

const props = defineProps<{
  block: PageBlock
}>()

const component = computed(() => {
  return blocks[props.block.blockType as keyof typeof blocks]
})
</script>

<template>
  <component v-if="component" :is="component" :block="block as any" />
  <div v-else class="text-red-500">Unknown block: {{ block.blockType }}</div>
</template>
