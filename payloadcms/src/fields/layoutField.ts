import type { Field } from 'payload'
import { GridBlock, HeroBlock, TextBlock } from '../blocks'

export const layoutField: Field = {
  name: 'layout',
  type: 'blocks',
  label: 'Page Layout',
  blocks: [GridBlock, HeroBlock, TextBlock],
}
