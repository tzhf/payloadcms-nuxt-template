import type { Tab } from 'payload'
import { link } from '~/fields'

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
          fields: link,
        },
      ],
    },
  ],
}
