import type { Image } from '#payload-types'

export default function ({ sizes }: Image): string {
  return sizes
    ? Object.entries(sizes)
        .filter(([_, { url }]) => url) // Cleaned up filtering logic
        .map(([_, { url, width }]) => `${encodeURI(url!)} ${width}w`)
        .join()
    : ''
}
