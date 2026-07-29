<template>
  <template v-for="(node, i) in richTextContent">
    <!-- 1. Text Node with Bitwise Formats -->
    <template v-if="isTextNode(node)">
      <component :is="renderFormattedText(node)" :key="`text_${i}`" />
    </template>

    <!-- 2. Linebreak Node -->
    <br v-else-if="isLinebreakNode(node)" :key="`br_${i}`" />

    <!-- 3. Links (Custom & Internal) -->
    <template v-else-if="isLinkNode(node)">
      <NuxtLink
        v-if="node.fields.linkType === 'custom'"
        :key="`custom_${i}`"
        :class="props.linkClass"
        :to="node.fields.url"
        :target="node.fields.newTab ? '_blank' : undefined"
        :rel="node.fields.newTab ? 'noopener noreferrer' : undefined"
      >
        <PayloadRichText
          :nested-content="node.children"
          :link-class="props.linkClass"
        />
      </NuxtLink>
      <NuxtLink
        v-else-if="node.fields.linkType === 'internal'"
        :key="`internal_${i}`"
        :class="props.linkClass"
        :to="getInternalUrl(node.fields.doc) ?? ''"
      >
        <PayloadRichText
          :nested-content="node.children"
          :link-class="props.linkClass"
        />
      </NuxtLink>
    </template>

    <!-- 4. Upload / Image Node -->
    <template v-else-if="isUploadNode(node)">
      <figure v-if="node.type === 'upload'" :key="`upload_${i}`">
        <PayloadImage :image="node.value" :sizes="props.imageSizes" />
        <figcaption v-if="node.fields?.caption">
          <p v-text="node.fields.caption" />
        </figcaption>
      </figure>
    </template>

    <!-- 5. Element Nodes (Paragraphs, Headings, Lists, Quotes, Code Blocks) -->
    <template v-else-if="isElementNode(node)">
      <Component
        :is="getElementTag(node)"
        v-if="node.type"
        :key="`element_${i}`"
        v-bind="getElementAttrs(node)"
      >
        <PayloadRichText
          :nested-content="node.children"
          :link-class="props.linkClass"
        />
      </Component>
    </template>
  </template>
</template>

<script setup lang="ts">
import type {
  SerializedRootNode,
  SerializedLexicalNode,
  SerializedElementNode,
  SerializedTextNode,
} from '#lexical'
import type { Image, Page } from '#payload-types'
import type { SrcsetSizes } from '~/components/payload/image/types'

// Lexical Bitwise Format Flags
const IS_BOLD = 1
const IS_ITALIC = 1 << 1 // 2
const IS_STRIKETHROUGH = 1 << 2 // 4
const IS_UNDERLINE = 1 << 3 // 8
const IS_CODE = 1 << 4 // 16
const IS_SUBSCRIPT = 1 << 5 // 32
const IS_SUPERSCRIPT = 1 << 6 // 64

interface LexicalRichTextField {
  root: SerializedRootNode
}

interface LexicalTextNode extends SerializedTextNode {
  type: 'text'
}

interface LexicalLinebreakNode {
  type: 'linebreak'
}

interface LexicalParagraphNode extends SerializedElementNode<SerializedLexicalNode> {
  type: 'paragraph'
  format: 'left' | 'center' | 'right' | 'justify' | ''
}

interface LexicalHeadingNode extends SerializedElementNode<SerializedLexicalNode> {
  tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  type: 'heading'
  format: 'left' | 'center' | 'right' | 'justify' | ''
}

interface LexicalListItemNode extends SerializedElementNode<SerializedLexicalNode> {
  type: 'listitem'
}

interface LexicalListNode extends SerializedElementNode<LexicalListItemNode> {
  tag: 'ol' | 'ul'
  type: 'list'
  listType?: 'number' | 'bullet'
  format: 'left' | 'center' | 'right' | 'justify' | ''
}

interface LexicalBlockquoteNode extends SerializedElementNode<SerializedLexicalNode> {
  type: 'quote'
  format: 'left' | 'center' | 'right' | 'justify' | ''
}

interface LexicalCodeBlockNode extends SerializedElementNode<SerializedLexicalNode> {
  type: 'code'
  language?: string
}

type LexicalElementNode =
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListItemNode
  | LexicalListNode
  | LexicalBlockquoteNode
  | LexicalCodeBlockNode

interface LexicalCustomLinkNode extends SerializedElementNode {
  type: 'autolink' | 'link'
  fields: {
    url: string
    newTab?: boolean
    linkType: 'custom'
  }
}

interface LexicalInternalLinkNode extends SerializedElementNode {
  type: 'autolink' | 'link'
  fields: {
    url: string
    doc: {
      relationTo: 'pages'
      value: Page
    }
    newTab?: boolean
    linkType: 'internal'
  }
}

type LexicalLinkNode = LexicalCustomLinkNode | LexicalInternalLinkNode

interface LexicalUploadNode extends SerializedLexicalNode {
  fields?: {
    [key: string]: any
  }
  relationTo: 'images'
  type: 'upload'
  value: Image
}

interface Props {
  content?: LexicalRichTextField
  linkClass?: string
  nestedContent?: SerializedLexicalNode[]
  imageSizes?: SrcsetSizes
}

const props = defineProps<Props>()

/**
 * Typeguards
 */
const isTextNode = (node: any): node is LexicalTextNode =>
  typeof node === 'object' && node !== null && node.type === 'text'

const isLinebreakNode = (node: any): node is LexicalLinebreakNode =>
  typeof node === 'object' && node !== null && node.type === 'linebreak'

const isElementNode = (node: any): node is LexicalElementNode =>
  typeof node === 'object' && node !== null && Array.isArray(node.children)

const isLinkNode = (node: any): node is LexicalLinkNode =>
  typeof node === 'object' &&
  node !== null &&
  Array.isArray(node.children) &&
  ['autolink', 'link'].includes(node.type) &&
  'fields' in node &&
  typeof node.fields === 'object' &&
  ['custom', 'internal'].includes(node.fields.linkType)

const isUploadNode = (node: any): node is LexicalUploadNode =>
  typeof node === 'object' &&
  node !== null &&
  node.type === 'upload' &&
  'relationTo' in node &&
  'value' in node

/**
 * Renders nested formatting tags based on Lexical bitwise mask
 */
const renderFormattedText = (node: LexicalTextNode): VNode => {
  const format = node.format ?? 0
  let children: VNode | string = node.text

  if (format & IS_CODE) children = h('code', children)
  if (format & IS_BOLD) children = h('strong', children)
  if (format & IS_ITALIC) children = h('em', children)
  if (format & IS_STRIKETHROUGH) children = h('s', children)
  if (format & IS_UNDERLINE) children = h('u', children)
  if (format & IS_SUBSCRIPT) children = h('sub', children)
  if (format & IS_SUPERSCRIPT) children = h('sup', children)

  return typeof children === 'string' ? h('span', children) : children
}

/**
 * Helper to slugify heading text for anchor link IDs
 */
const slugify = (text: string) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

/**
 * Extract plain text recursively from children
 */
const extractPlainText = (children?: SerializedLexicalNode[]): string => {
  if (!children) return ''
  return children
    .map((child: any) => {
      if (child.type === 'text') return child.text ?? ''
      if (child.children) return extractPlainText(child.children)
      return ''
    })
    .join('')
}

/**
 * Maps Lexical format values to Tailwind text alignment classes
 */
const getAlignmentClass = (format?: string) => {
  switch (format) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    case 'justify':
      return 'text-justify'
    case 'left':
      return 'text-left'
    default:
      return ''
  }
}

/**
 * Resolves HTML tag for element nodes
 */
const getElementTag = (node: LexicalElementNode) => {
  switch (node.type) {
    case 'paragraph':
      return 'p'
    case 'quote':
      return 'blockquote'
    case 'listitem':
      return 'li'
    case 'list':
      return node.tag
    case 'code':
      return 'pre'
    default:
      return node.tag || 'div'
  }
}

/**
 * Sets attributes (like Tailwind text-alignment, heading ID, or code block language)
 */
const getElementAttrs = (node: LexicalElementNode) => {
  const attrs: Record<string, any> = {}

  // 1. Text Alignment (via format property)
  if ('format' in node && node.format) {
    const alignClass = getAlignmentClass(node.format)
    if (alignClass) {
      attrs.class = alignClass
    }
  }

  // 2. Heading Anchor ID
  if (node.type === 'heading') {
    const text = extractPlainText(node.children)
    if (text) attrs.id = slugify(text)
  }

  // 3. Code Block Language
  if (node.type === 'code' && node.language) {
    attrs['data-language'] = node.language
  }

  return attrs
}

const richTextContent = computed(() => {
  if (props.nestedContent) {
    return props.nestedContent
  }

  if (props.content) {
    return props.content.root.children
  }

  return []
})

const getInternalUrl = (doc: LexicalInternalLinkNode['fields']['doc']) => {
  switch (doc.relationTo) {
    case 'pages':
      return doc.value.slug === 'home' ? '/' : `/${doc.value.slug}`
    default:
      return '/'
  }
}
</script>
