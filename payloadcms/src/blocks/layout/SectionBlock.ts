import type { Block } from 'payload'
import { GridBlock } from './GridBlock'
import { TextBlock } from '../TextBlock'

const allowedChildBlocks = [GridBlock, TextBlock]

export const SectionBlock: Block = {
  slug: 'section',
  interfaceName: 'SectionBlock',

  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'anchorId',
          type: 'text',
          label: 'Anchor ID (e.g. "about-us")',
          admin: {
            description: 'Used for smooth scrolling / hash links (#about-us)',
          },
        },
        {
          name: 'paddingY',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'None', value: 'none' },
            { label: 'Small (32px)', value: 'sm' },
            { label: 'Medium (64px)', value: 'md' },
            { label: 'Large (96px)', value: 'lg' },
          ],
        },
        {
          name: 'width',
          type: 'select',
          defaultValue: 'standard',
          options: [
            { label: 'Narrow (max-w-4xl)', value: 'narrow' },
            { label: 'Standard (max-w-7xl)', value: 'standard' },
            { label: 'Full Width', value: 'full' },
          ],
        },
      ],
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: allowedChildBlocks,
    },
  ],
}
