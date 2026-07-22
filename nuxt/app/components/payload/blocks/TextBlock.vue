<script lang="ts" setup>
import type { TextBlock } from '#payload-types'
import { renderRichText } from '~/utils/richtext'
const props = defineProps<{
  block: TextBlock
}>()

// const htmlContent = computed(() => {
//   if (!props.block?.content) return ''
//   return renderRichText(props.block.content)
// })
</script>

<template>
  <section
    :id="block.anchorId ?? undefined"
    class="mx-auto max-w-4xl px-6 py-16"
  >
    <!-- <div class="prose max-w-4xl" v-html="htmlContent" /> -->
    <div class="prose max-w-none">
      <PayloadRichText v-if="block.content" :content="block.content" />
    </div>
  </section>
</template>
