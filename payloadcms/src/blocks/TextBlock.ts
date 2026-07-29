import type { Block } from 'payload'
import { richTextField } from '@/fields/richText'

export const TextBlock: Block = {
  slug: 'text',
  interfaceName: 'TextBlock',

  fields: [richTextField],
}
