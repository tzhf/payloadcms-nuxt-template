<template>
  <div class="flex min-h-screen flex-col">
    <Header class="sticky top-0 mx-auto w-full max-w-screen-2xl px-4 sm:px-6" />
    <main class="mx-auto w-full max-w-screen-2xl flex-1 bg-amber-50">
      <slot />
    </main>
    <footer
      class="bg-accent-foreground mx-auto flex h-36 w-full max-w-screen-2xl items-center justify-center text-sm text-gray-300"
    >
      Copyright 2026 - all rights reserved
    </footer>
  </div>
</template>
