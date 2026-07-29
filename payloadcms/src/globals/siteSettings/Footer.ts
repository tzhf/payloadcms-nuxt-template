import type { Tab } from 'payload'
import { linkField } from '@/fields/link'

export const Footer: Tab = {
  label: 'Footer',
  fields: [
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: linkField,
        },
      ],
    },
  ],
}
