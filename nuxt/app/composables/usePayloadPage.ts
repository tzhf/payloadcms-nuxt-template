import { GetPageDocument } from '#graphql-exports'

import type { PaginatedDocs } from '#payload'
import type { Page } from '#payload-types'

interface PageQueryResult {
  Pages: PaginatedDocs<Page>
}

export const usePayloadPage = async (slug: Ref<string>) => {
  const { data, error } = await useAsyncQuery<PageQueryResult>(
    GetPageDocument,
    { slug },
  )

  if (error.value) {
    throw createError({
      statusCode: 503,
      message: error.value.message || 'Failed to fetch page',
      cause: error.value,
    })
  }

  const doc = data.value?.Pages.docs[0] || null

  if (!doc) {
    throw createError({
      statusCode: 404,
      message: `Page not found for slug: ${slug.value}`,
    })
  }

  return doc
}
