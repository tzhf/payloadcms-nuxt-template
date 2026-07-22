import slugify from 'slugify'
import type { TextField } from 'payload'

const slugField = (field: string): TextField => ({
  name: 'slug',
  type: 'text',
  unique: true,
  required: true,
  admin: {
    position: 'sidebar',
    description:
      'URL path for this page, e.g. "about" or "blog/my-post". Use "home" for the homepage.',
    components: {
      Field: '@/fields/slug/SlugField#SlugField',
    },
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (value) return value

        return data?.[field]
          ? slugify(data[field], {
              lower: true,
              remove: /[*+~\/\\.()'"!?#\.,:@]/g,
            })
          : ''
      },
    ],
  },
})

export default slugField
