import type { Block } from 'payload'
import { TextBlock } from '../TextBlock'

const allowedChildBlocks = [TextBlock]

export const GridBlock: Block = {
  slug: 'grid',
  interfaceName: 'GridBlock',
  labels: {
    singular: 'Grid Layout',
    plural: 'Grid Layouts',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'columns',
          type: 'select',
          defaultValue: 'cols4',
          options: [
            { label: '1 Column', value: 'cols1' },
            { label: '2 Columns', value: 'cols2' },
            { label: '3 Columns', value: 'cols3' },
            { label: '4 Columns', value: 'cols4' },
          ],
          //   admin: { width: '50%' },
        },
        {
          name: 'gap',
          type: 'select',
          defaultValue: 'md',
          options: [
            { label: 'Small (8px)', value: 'sm' },
            { label: 'Medium (16px)', value: 'md' },
            { label: 'Large (32px)', value: 'lg' },
          ],
          //   admin: { width: '50%' },
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Columns',
      minRows: 1,
      fields: [
        {
          name: 'blocks',
          label: 'Items',
          type: 'blocks',
          blocks: allowedChildBlocks,
        },
      ],
    },
  ],
}
