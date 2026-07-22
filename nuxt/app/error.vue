<template>
  <div class="flex min-h-screen items-center justify-center px-2">
    <div class="flex flex-col items-center gap-6">
      <SVG404 class="h-48 w-48 text-yellow-200" />
      <div class="flex flex-col items-center gap-2">
        <h1 class="text-6xl font-extrabold">Uh-oh!</h1>
        <h2 class="text-2xl font-bold">
          {{ errorData.code }}
        </h2>
        <p class="text-center text-stone-500">
          {{ errorData.message }}
        </p>
      </div>

      <Button
        :button="{ size: 'small', variant: 'outline', color: 'primary' }"
        @click="handleError"
        >Go back home</Button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const { error } = defineProps<{
  error: NuxtError
}>()

const isDev = import.meta.dev

const errorData = computed(() => {
  switch (error.status) {
    case 404:
      return {
        code: 404,
        message: 'We couldn’t find the page you’re looking for.',
      }

    case 500:
      return {
        code: 500,
        message: isDev
          ? error.message
          : "Something went wrong — we're working on it",
      }

    case 503:
      return {
        code: 503,
        message: isDev ? error.message : 'Service temporarily unavailable',
      }

    default:
      return {
        code: error.status || 'Error',
        message: isDev ? error.message : 'An unexpected error occurred',
      }
  }
})

useSeoMeta({
  title: `${errorData.value.code} — ${errorData.value.message}`,
})

const handleError = () => clearError({ redirect: '/' })
</script>
