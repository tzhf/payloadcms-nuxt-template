// type Single<T> = MaybeRef<string | T | null | undefined>
// type Many<T> = MaybeRef<(string | T)[] | null | undefined>

// type ExcludeString<T> = Exclude<T, string>

// export function useRelationshipField<T extends PayloadCollection>(
//   field: Single<T>,
// ): Ref<ExcludeString<T> | null>

// export function useRelationshipField<T extends PayloadCollection>(
//   field: Many<T>,
// ): Ref<ExcludeString<T>[]>

// export function useRelationshipField<T extends PayloadCollection>(
//   field: Single<T> | Many<T>,
// ): Ref<ExcludeString<T> | null> | Ref<ExcludeString<T>[]> {
//   const initialValue = unref(field)
//   const isArrayField = Array.isArray(initialValue)

//   if (isArrayField) {
//     const docs = ref<ExcludeString<T>[]>([]) as Ref<ExcludeString<T>[]>

//     watchEffect(() => {
//       const fieldUnref = unref(field) as (string | T)[] | null | undefined

//       if (fieldUnref) {
//         docs.value = fieldUnref.filter(
//           (item): item is ExcludeString<T> => typeof item !== 'string',
//         )
//       } else {
//         docs.value = []
//       }
//     })

//     return docs
//   } else {
//     const doc = ref<ExcludeString<T> | null>(
//       null,
//     ) as Ref<ExcludeString<T> | null>

//     watchEffect(() => {
//       const fieldUnref = unref(field) as string | T | null | undefined

//       if (fieldUnref && typeof fieldUnref !== 'string') {
//         doc.value = fieldUnref as ExcludeString<T>
//       } else {
//         doc.value = null
//       }
//     })

//     return doc
//   }
// }

// import type { MaybeRef } from 'vue'
// import { computed, unref } from 'vue'

type Single<T> = MaybeRef<string | T | null | undefined>
type Many<T> = MaybeRef<(string | T)[] | null | undefined>
type NonString<T> = Exclude<T, string>

// Function Overloads (for TypeScript autocomplete)
export function useRelationshipField<T>(
  field: Single<T>,
): ComputedRef<NonString<T> | null>
export function useRelationshipField<T>(
  field: Many<T>,
): ComputedRef<NonString<T>[]>

// Single Implementation
export function useRelationshipField<T>(field: Single<T> | Many<T>) {
  return computed(() => {
    const raw = unref(field)

    if (!raw) {
      return Array.isArray(raw) ? [] : null
    }

    if (Array.isArray(raw)) {
      return raw.filter(
        (item): item is NonString<T> =>
          typeof item === 'object' && item !== null,
      )
    }

    return typeof raw === 'object' ? (raw as NonString<T>) : null
  })
}
