import type { Tab } from 'payload'

import { colorPickerField } from '@/fields/colorPicker'

export const Theme: Tab = {
  label: 'Theme',
  fields: [
    {
      name: 'typography',
      type: 'group',
      fields: [
        {
          name: 'fontBody',
          type: 'text',
          required: true,
          defaultValue: 'Inter',
          admin: {
            description:
              'Enter a Google Font name (e.g. Inter, Roboto, etc.) from https://fonts.google.com',
          },
        },
        {
          name: 'fontHeading',
          type: 'text',
          required: true,
          defaultValue: 'Inter',
          admin: {
            description:
              'Enter a Google Font name (e.g. Inter, Roboto, etc.) from https://fonts.google.com',
          },
        },
        {
          name: 'fontSize',
          type: 'number',
          required: true,
          defaultValue: 14,
        },
      ],
    },
    {
      name: 'colors',
      type: 'group',
      fields: [
        colorPickerField({
          name: 'background',
          overrides: (f) => ({ ...f, defaultValue: '#ffffff' }),
        }),
        colorPickerField({
          name: 'foreground',
          overrides: (f) => ({ ...f, defaultValue: '#111111' }),
        }),
        colorPickerField({
          name: 'primary',
          overrides: (f) => ({ ...f, defaultValue: '#000000' }),
        }),
        colorPickerField({
          name: 'primaryForeground',
          overrides: (f) => ({ ...f, defaultValue: '#ffffff' }),
        }),
        colorPickerField({
          name: 'secondary',
          overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
        }),
        colorPickerField({
          name: 'secondaryForeground',
          overrides: (f) => ({ ...f, defaultValue: '#111111' }),
        }),
        colorPickerField({
          name: 'muted',
          overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
        }),
        colorPickerField({
          name: 'mutedForeground',
          overrides: (f) => ({ ...f, defaultValue: '#71717a' }),
        }),
        colorPickerField({
          name: 'border',
          overrides: (f) => ({ ...f, defaultValue: '#e4e4e7' }),
        }),
        colorPickerField({
          name: 'accent',
          overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
        }),
        colorPickerField({
          name: 'accentForeground',
          overrides: (f) => ({ ...f, defaultValue: '#111111' }),
        }),
      ],
    },
  ],
}
