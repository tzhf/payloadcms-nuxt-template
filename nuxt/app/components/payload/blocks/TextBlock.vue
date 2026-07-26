<script lang="ts" setup>
import type { TextBlock } from '#payload-types'

const props = defineProps<{
  block: TextBlock
}>()
</script>

<template>
  <!-- <section
    :id="block.anchorId ?? undefined"
    class="mx-auto max-w-4xl px-6 py-16"
  > -->
  <div class="prose max-w-none">
    <PayloadRichText v-if="block.content" :content="block.content" />
  </div>
  <!-- </section> -->
</template>
