import { useWindowScroll } from '@vueuse/core'

// 1. Shared state created ONCE outside the function scope
const activeHash = ref<string | null>(null)
let isInitialized = false

export function useScrollSpy(
  selector = 'section[id]',
  anchor = 0.35, // 35% down viewport
) {
  // 2. Only register listeners once globally
  if (!isInitialized && import.meta.client) {
    const { y } = useWindowScroll()

    const update = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>(selector),
      )

      const anchorY = window.innerHeight * anchor

      const current = sections.find((section) => {
        const rect = section.getBoundingClientRect()
        return rect.top <= anchorY && rect.bottom >= anchorY
      })

      activeHash.value = current ? `#${current.id}` : null
    }

    onMounted(() => {
      update()
      watch(y, update)
    })

    isInitialized = true
  }

  // 3. Return the reactive shared state
  return { activeHash }
}
