<script setup lang="ts">
import type { Button } from '#payload-types'
// export type ButtonProps = Omit<Button, 'id' | 'blockName' | 'blockType'>

const props = defineProps<{
  button: Button
  // button?: Partial<ButtonProps>
  // tag?: 'button' | 'a' | 'NuxtLink'
}>()

// const emit = defineEmits(['click'])

const base =
  'font-semibold inline-flex w-full sm:w-auto items-center justify-center tracking-wider cursor-pointer transition-all duration-300 rounded-sm'

type ButtonSize = 'small' | 'medium' | 'large'
const sizes: Record<ButtonSize, string> = {
  small: 'py-2 px-4 text-sm',
  medium: 'py-3 px-6 text-base',
  large: 'py-4 px-8 text-lg',
}

type ButtonVariant = 'solid' | 'ghost' | 'outline'
type ButtonColor = 'primary' | 'secondary'
const buttonClasses: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
  },
  ghost: {
    primary: 'bg-transparent text-primary hover:bg-accent',
    secondary: 'bg-transparent text-secondary hover:bg-accent',
  },
  outline: {
    primary:
      'bg-transparent ring-1 ring-primary text-primary hover:bg-primary hover:text-primary-foreground',
    secondary:
      'bg-transparent ring-1 ring-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground',
  },
}

const classes = computed(() => {
  const size = sizes[props.button?.size ?? 'medium']
  const variant = props.button?.variant ?? 'solid'
  const color = props.button?.color ?? 'primary'
  const style = buttonClasses[variant][color]
  return `${base} ${size} ${style}`
})

// const component = computed(() => {
//   if (props.tag) return props.tag
//   if (props.button?.url) return resolveComponent('NuxtLink')
//   return 'button'
// })
</script>

<template>
  <NuxtLink
    :to="button?.url"
    :target="button?.openInNewTab ? '_blank' : undefined"
    :rel="button?.openInNewTab ? 'noopener noreferrer' : undefined"
    :class="classes"
  >
    <slot>{{ button?.label }}</slot>
  </NuxtLink>
</template>
