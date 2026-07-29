import type { Field } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const richTextField: Field = {
  name: 'content',
  type: 'richText',
  editor: lexicalEditor({}),
}
