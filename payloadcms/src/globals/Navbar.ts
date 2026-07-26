import type { Tab } from 'payload'

import { colorField, linkField } from '~/fields'
import { Button } from '~/blocks/ui/Button'

export const Navbar: Tab = {
  label: 'Navbar',
  fields: [
    {
      name: 'navbar',
      type: 'group',
      fields: [
        colorField({
          name: 'textColor',
          overrides: (field) => ({
            ...field,
            defaultValue: '#ffffff',
          }),
        }),
        colorField({
          name: 'backgroundColor',
          overrides: (field) => ({
            ...field,
            defaultValue: '#000000',
          }),
        }),
        colorField({
          name: 'backgroundColorScroll',
          overrides: (field) => ({
            ...field,
            defaultValue: '#000000',
          }),
        }),
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'svgs',
        },
        {
          name: 'links',
          type: 'array',
          fields: linkField,
        },
        {
          name: 'buttons',
          type: 'blocks',
          blocks: [Button],
        },
      ],
    },
  ],
}
