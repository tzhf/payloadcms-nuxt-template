<!-- ~/components/payload/RenderBlock.vue -->
<script setup lang="ts">
import { blocks } from './blocks'

const props = defineProps<{
  block: any
}>()

const component = computed(() => {
  return blocks[props.block.blockType as keyof typeof blocks]
})
</script>

<template>
  <component v-if="component" :is="component" :block="block" />
  <div v-else class="text-red-500">Unknown block: {{ block.blockType }}</div>
</template>
