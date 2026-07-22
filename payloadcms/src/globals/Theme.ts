import type { Tab } from 'payload'

import { colorField } from '~/fields'

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
        colorField({
          name: 'background',
          overrides: (f) => ({ ...f, defaultValue: '#ffffff' }),
        }),
        colorField({
          name: 'foreground',
          overrides: (f) => ({ ...f, defaultValue: '#111111' }),
        }),
        colorField({
          name: 'primary',
          overrides: (f) => ({ ...f, defaultValue: '#000000' }),
        }),
        colorField({
          name: 'primaryForeground',
          overrides: (f) => ({ ...f, defaultValue: '#ffffff' }),
        }),
        colorField({
          name: 'secondary',
          overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
        }),
        colorField({
          name: 'secondaryForeground',
          overrides: (f) => ({ ...f, defaultValue: '#111111' }),
        }),
        colorField({
          name: 'muted',
          overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
        }),
        colorField({
          name: 'mutedForeground',
          overrides: (f) => ({ ...f, defaultValue: '#71717a' }),
        }),
        colorField({
          name: 'border',
          overrides: (f) => ({ ...f, defaultValue: '#e4e4e7' }),
        }),
        colorField({
          name: 'accent',
          overrides: (f) => ({ ...f, defaultValue: '#f4f4f5' }),
        }),
        colorField({
          name: 'accentForeground',
          overrides: (f) => ({ ...f, defaultValue: '#111111' }),
        }),
      ],
    },
  ],
}
