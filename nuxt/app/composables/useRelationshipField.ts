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
