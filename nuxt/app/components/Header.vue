<script setup lang="ts">
const { siteSettings } = await useSiteSettings()

const headerScrollClass = ref('')
onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      headerScrollClass.value = 'scroll'
    } else {
      headerScrollClass.value = ''
    }
  })
})

const menuOpen = ref<boolean>(false)
const hasToggled = ref(false)
function toggle() {
  menuOpen.value = !menuOpen.value
  hasToggled.value = true
}
</script>

<template>
  <header
    class="z-50 flex h-16 border-b transition-colors duration-500"
    :class="[headerScrollClass]"
  >
    <NuxtLink
      to="/"
      class="flex shrink-0 items-center gap-2"
      aria-label="Return to homepage"
    >
      <img
        v-if="siteSettings?.navbar?.logo?.url"
        :src="siteSettings?.navbar.logo.url"
        :alt="siteSettings?.meta?.title || 'Logo'"
        class="max-h-8"
      />
      <span class="text-2xl font-extrabold">{{
        siteSettings?.meta?.title
      }}</span>
    </NuxtLink>

    <nav aria-label="Main navigation" class="ml-auto flex shrink-0">
      <button
        class="cursor-pointer md:hidden"
        :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="menuOpen"
        aria-controls="mobile-nav"
        @click="toggle()"
      >
        <Icon
          :key="!hasToggled ? 'initial' : menuOpen ? 'open' : 'closed'"
          :name="
            !hasToggled
              ? 'icons:menu'
              : menuOpen
                ? 'icons:menu-to-close-alt-transition'
                : 'icons:close-to-menu-alt-transition'
          "
          mode="svg"
          aria-hidden="true"
        />
      </button>

      <ul class="hidden h-full items-center gap-4 md:flex" role="list">
        <li
          v-for="item in siteSettings?.navbar?.links"
          :key="item.label"
          class="h-full"
        >
          <NavItem :item="item" />
        </li>

        <li v-for="button in siteSettings?.navbar?.buttons" :key="button.label">
          <Button :button="button" />
        </li>
      </ul>
    </nav>

    <!-- Mobile Nav overlay  -->
    <ClientOnly>
      <Teleport to="body">
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          :aria-hidden="!menuOpen"
          class="fixed inset-0 z-40 flex flex-col px-4 pt-28 transition-transform duration-300 ease-in-out md:hidden"
          :class="[menuOpen ? 'translate-x-0' : 'translate-x-full']"
        >
          <ul class="space-y-12" role="list">
            <li
              v-for="item in siteSettings?.navbar?.links"
              :key="item.label"
              class="flex"
            >
              <NavItem :item="item" @click="menuOpen = false" />
            </li>

            <li
              v-for="button in siteSettings?.navbar?.buttons"
              :key="button.label"
            >
              <Button :button="button" @click="menuOpen = false" />
            </li>
          </ul>
        </nav>
      </Teleport>
    </ClientOnly>
  </header>
</template>

<style>
header {
  color: var(--nav-text-color);
  background-color: var(--nav-background-color);
}
#mobile-nav {
  color: var(--nav-text-color);
  background-color: color-mix(
    in srgb,
    var(--nav-background-color) 80%,
    transparent
  );
  backdrop-filter: blur(4px);
}
header.scroll {
  background-color: var(--nav-background-color-scroll);
}

section[id] {
  scroll-margin-top: 64px; /* match your header height */
}
</style>
