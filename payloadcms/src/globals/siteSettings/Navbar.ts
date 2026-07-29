import type { Tab } from 'payload'

import { linkField } from '@/fields/link'
import { colorPickerField } from '@/fields/colorPicker'

import { Button } from '@/blocks/ui/Button'

export const Navbar: Tab = {
  label: 'Navbar',
  fields: [
    {
      name: 'navbar',
      type: 'group',
      fields: [
        colorPickerField({
          name: 'textColor',
          overrides: (field) => ({
            ...field,
            defaultValue: '#ffffff',
          }),
        }),
        colorPickerField({
          name: 'backgroundColor',
          overrides: (field) => ({
            ...field,
            defaultValue: '#000000',
          }),
        }),
        colorPickerField({
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
