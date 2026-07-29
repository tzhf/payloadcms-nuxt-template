import type { Field } from 'payload'
import { SectionBlock, GridBlock, HeroBlock, TextBlock } from '@/blocks'

export const layoutField: Field = {
  name: 'layout',
  type: 'blocks',
  label: 'Page Layout',
  blocks: [SectionBlock, GridBlock, HeroBlock, TextBlock],
}
