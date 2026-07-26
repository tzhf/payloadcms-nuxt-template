<template>
  <div :class="['grid w-full', gridColsClass, gapClass]">
    <div v-for="(col, i) in block.items" :key="i" class="flex flex-col">
      <PayloadRenderBlock
        v-for="(childBlock, i) in col.blocks"
        :key="childBlock.id ?? `${childBlock.blockType}-${i}`"
        :block="childBlock"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { GridBlock } from '#payload-types'

const props = defineProps<{
  block: GridBlock
}>()

// Dynamic CSS Grid class based on Payload field selection
console.log('🚀 ~ props.block.columns:', props.block.columns)
const gridColsClass = computed(() => {
  switch (props.block.columns) {
    case 'cols1':
      return 'grid-cols-1'
    case 'cols2':
      return 'grid-cols-1 md:grid-cols-2'
    case 'cols3':
      return 'grid-cols-1 md:grid-cols-3'
    case 'cols4':
      return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    default:
      return 'grid-cols-1 md:grid-cols-3'
  }
})

// Dynamic Gap class
const gapClass = computed(() => {
  switch (props.block.gap) {
    case 'sm':
      return 'gap-2'
    case 'lg':
      return 'gap-8'
    default:
      return 'gap-4'
  }
})
</script>
