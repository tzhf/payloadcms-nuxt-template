<script setup lang="ts">
import type { SectionBlock } from '#payload-types'

const props = defineProps<{
  block: SectionBlock
}>()

const paddingClass = computed(() => {
  switch (props.block.paddingY) {
    case 'none':
      return 'py-0'
    case 'sm':
      return 'py-8'
    case 'lg':
      return 'py-24'
    default:
      return 'py-16' // 'md'
  }
})

const widthClass = computed(() => {
  switch (props.block.width) {
    case 'narrow':
      return 'max-w-4xl'
    case 'full':
      return 'max-w-full px-0'
    default:
      return 'max-w-7xl' // 'standard'
  }
})
</script>

<template>
  <section :id="block.anchorId || undefined" :class="['w-full', paddingClass]">
    <div :class="['mx-auto px-6', widthClass]">
      <PayloadRenderBlock
        v-for="(childBlock, index) in block.blocks"
        :key="childBlock.id || index"
        :block="childBlock"
      />
    </div>
  </section>
</template>
