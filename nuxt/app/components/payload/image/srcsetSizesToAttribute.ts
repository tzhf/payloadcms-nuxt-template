import { breakpointsTailwind } from '@vueuse/core'
import type { SrcsetSizes } from './types'

type BreakpointLabel = keyof typeof breakpointsTailwind

export function srcsetSizesToAttribute(sizes: SrcsetSizes) {
  return Object.entries(sizes)
    .sort(
      ([keyA], [keyB]) =>
        (keyB === 'default'
          ? 0
          : breakpointsTailwind[keyB as BreakpointLabel]) -
        (keyA === 'default' ? 0 : breakpointsTailwind[keyA as BreakpointLabel]),
    )
    .map(([key, value]) => {
      return `${key === 'default' ? '' : `(min-width: ${breakpointsTailwind[key as BreakpointLabel]}px) `}${value}`
    })
    .join(', ')
}
