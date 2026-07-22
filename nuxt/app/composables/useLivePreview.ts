import { subscribe, unsubscribe, ready } from '@payloadcms/live-preview'

export const useLivePreview = <T>(props: {
  depth?: number
  initialData: MaybeRef<T>
}): {
  data: Ref<T>
  isLoading: Ref<boolean>
} => {
  const route = useRoute()
  const runtimeConfig = useRuntimeConfig()
  // 1. Point this explicitly to your CMS domain in production,
  //    and fall back to whatever runtimeConfig has for local dev.
  // const serverURL =
  //   process.env.NODE_ENV === 'production'
  //     ? 'https://nuxt-payload-template-payloadcms.vercel.app' // Your live Payload Vercel domain
  //     : runtimeConfig.public.payloadUrl
  const serverURL = runtimeConfig.public.payloadUrl
  const apiRoute = runtimeConfig.public.payloadApiRoute

  const { depth = 0, initialData } = props
  const data = ref(unref(initialData)) as Ref<T>
  const isLoading = ref(true)
  const hasSentReadyMessage = ref(false)

  const onChange = (mergedData: Record<string, any>) => {
    data.value = mergedData as T
    isLoading.value = false
  }

  onMounted(() => {
    if (route.query.preview) {
      const subscription = subscribe({
        apiRoute,
        callback: onChange,
        depth,
        initialData: unref(initialData),
        serverURL,
      })

      if (!hasSentReadyMessage.value) {
        hasSentReadyMessage.value = true

        ready({ serverURL })
      }

      onUnmounted(() => {
        unsubscribe(subscription)
      })
    }
  })

  return { data, isLoading }
}
