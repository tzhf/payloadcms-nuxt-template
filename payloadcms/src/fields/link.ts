import type { Field } from 'payload'

export const link: Field[] = [
  {
    name: 'label',
    type: 'text',
    // required: true,
    admin: {
      description:
        'Text displayed on the link. If blank for pages, page title can be used as fallback on the frontend.',
    },
  },
  {
    name: 'type',
    type: 'select',
    defaultValue: 'page',
    options: [
      { label: 'Internal Page', value: 'page' },
      { label: 'Custom URL', value: 'custom' },
    ],
  },
  {
    name: 'page',
    type: 'relationship',
    relationTo: 'pages',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'page',
    },
  },
  {
    name: 'anchor',
    type: 'text',
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'page',
      description:
        'Optional section anchor (e.g. "first-section" or "#first-section").',
    },
    hooks: {
      beforeChange: [
        ({ siblingData, value }) =>
          siblingData?.type === 'page' ? value : null,
      ],
    },
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'custom',
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    defaultValue: false,
    admin: {
      condition: (_, siblingData) => siblingData?.type === 'custom',
    },
  },
]

export default link
