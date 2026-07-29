<script setup lang="ts">
import type { HeroBlock } from '#payload-types'

const props = defineProps<{
  block: HeroBlock
}>()

const layout = computed(() => props.block.layout || 'split')

// 1. Min Height Styles
const minHeightClass = computed(() => {
  switch (props.block.minHeight) {
    case 'full':
      return 'min-h-[calc(100vh-4rem)]'
    case 'sub':
      return 'min-h-[50vh]'
    default:
      return ''
  }
})

// 2. Split Ratio Mapping
const splitGridClass = computed(() => {
  if (layout.value !== 'split') return ''

  switch (props.block.splitRatio) {
    case '30-70':
      return 'lg:grid-cols-[3fr_7fr]'
    case '40-60':
      return 'lg:grid-cols-[2fr_3fr]'
    case '60-40':
      return 'lg:grid-cols-[3fr_2fr]'
    case '70-30':
      return 'lg:grid-cols-[7fr_3fr]'
    case '50-50':
    default:
      return 'lg:grid-cols-2'
  }
})

// 3. Text Alignment & Flex Classes
const textAlignmentClass = computed(() => {
  switch (props.block.textAlignment) {
    case 'center':
      return 'text-center items-center mx-auto'
    case 'right':
      return 'text-right items-end ml-auto'
    case 'left':
    default:
      return 'text-left items-start'
  }
})

// 4. Overlay Opacity Styles
const overlayClass = computed(() => {
  switch (props.block.overlayOpacity) {
    case '20':
      return 'bg-black/20'
    case '60':
      return 'bg-black/60'
    case '80':
      return 'bg-black/80'
    case 'gradient-bottom':
      return 'bg-gradient-to-t from-black/90 via-black/40 to-transparent'
    case '40':
    default:
      return 'bg-black/40'
  }
})
</script>

<template>
  <div
    class="fslex fslex-col justifys-center ovesrflow-hidden relative bg-yellow-100"
    :class="[
      minHeightClass,
      layout === 'overlay' ? 'text-white' : 'text-neutral-900',
    ]"
  >
    <!-- ========================================== -->
    <!-- PRESET 1: OVERLAY LAYOUT                   -->
    <!-- ========================================== -->
    <template v-if="layout === 'overlay'">
      <div class="relative z-20">
        <div
          class="flex max-w-3xl flex-col justify-center px-6 py-12 lg:px-12 xl:px-16"
          :class="textAlignmentClass"
        >
          <h1
            v-if="block.title"
            class="mb-2 text-4xl leading-tight font-extrabold sm:text-6xl lg:text-7xl"
          >
            {{ block.title }}
          </h1>
          <p v-if="block.subtitle" class="mb-8 max-w-2xl text-lg md:text-xl">
            {{ block.subtitle }}
          </p>
          <PayloadBlocksTextBlock
            v-if="block.content"
            :content="block.content"
          />
          <div
            v-if="block.buttons?.length"
            class="flex flex-col gap-4 pt-8 sm:flex-row"
          >
            <Button
              v-for="button in block.buttons"
              :key="button.label"
              :button="button"
            />
          </div>
        </div>
      </div>

      <!-- Dark Overlay / Gradient -->
      <div
        class="pointer-events-none absolute inset-0 z-10 size-full"
        :class="overlayClass"
      />

      <!-- Full Bleed Image -->
      <PayloadImage
        v-if="block.image"
        :image="block.image"
        class="absolute inset-0 z-0 size-full object-cover"
        priority
      />
    </template>

    <!-- ========================================== -->
    <!-- PRESET 2: SPLIT LAYOUT (SIDE-BY-SIDE)      -->
    <!-- ========================================== -->

    <template v-else-if="layout === 'split'">
      <div
        class="grid w-full flex-1 grid-cols-1 items-stretch gap-0 lg:gap-0"
        :class="splitGridClass"
      >
        <!-- Text Content Column -->
        <div
          class="flex flex-col justify-center px-6 py-12 lg:px-12 xl:px-16"
          :class="[textAlignmentClass]"
        >
          <h1
            v-if="block.title"
            class="mb-2 text-4xl leading-tight font-extrabold sm:text-6xl lg:text-7xl"
          >
            {{ block.title }}
          </h1>
          <p v-if="block.subtitle" class="mb-8 max-w-2xl text-lg md:text-xl">
            {{ block.subtitle }}
          </p>
          <PayloadBlocksTextBlock
            v-if="block.content"
            :content="block.content"
          />

          <div
            v-if="block.buttons?.length"
            class="flex flex-col gap-4 pt-8 sm:flex-row"
          >
            <Button
              v-for="button in block.buttons"
              :key="button.label"
              :button="button"
            />
          </div>
        </div>

        <!-- Media Frame Column (Bleeds edge-to-edge & full height) -->
        <div
          v-if="block.image"
          class="relative h-full min-h-87.5 w-full overflow-hidden"
          :class="[block.mediaPosition === 'left' ? 'lg:order-first' : '']"
        >
          <PayloadImage
            :image="block.image"
            class="absolute inset-0 h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </template>

    <!-- ========================================== -->
    <!-- PRESET 3: STACKED LAYOUT (CENTERED/APP)    -->
    <!-- ========================================== -->
    <template v-else-if="layout === 'stacked'">
      <div class="flex flex-col">
        <!-- Text Content -->
        <div
          class="max-w-7xl px-6 py-12"
          :class="[
            textAlignmentClass,
            block.mediaOrder === 'above' ? 'order-2' : 'order-1',
          ]"
        >
          <h1
            v-if="block.title"
            class="text-4xl leading-tight font-extrabold sm:text-6xl lg:text-7xl"
          >
            {{ block.title }}
          </h1>
          <p v-if="block.subtitle" class="mb-8 max-w-2xl text-lg md:text-xl">
            {{ block.subtitle }}
          </p>
          <PayloadBlocksTextBlock
            v-if="block.content"
            :content="block.content"
          />

          <div
            v-if="block.buttons?.length"
            class="flex flex-col gap-4 pt-8 sm:flex-row"
          >
            <Button
              v-for="button in block.buttons"
              :key="button.label"
              :button="button"
            />
          </div>
        </div>

        <!-- Wide Centered Media -->
        <div
          v-if="block.image"
          class="w-full"
          :class="[block.mediaOrder === 'above' ? 'order-1' : 'order-2']"
        >
          <PayloadImage
            :image="block.image"
            class="h-auto max-h-162.5 w-full object-cover"
            priority
          />
        </div>
      </div>
    </template>
  </div>
</template>
