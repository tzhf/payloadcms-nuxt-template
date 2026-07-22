'use client'

import { TextField, useField, useFormFields } from '@payloadcms/ui'
import slugify from 'slugify'
import { useEffect, useRef } from 'react'

export function SlugField({ path, field }: any) {
  const { value, setValue } = useField<string>({ path })

  const lastAutoSlug = useRef<string | null>(null)
  const isDirty = useRef(false)

  const title = useFormFields(([fields]) => fields.title?.value as string)

  useEffect(() => {
    // if user manually changed slug → stop auto updates
    if (isDirty.current) return
    if (!title) return

    const next = slugify(title, {
      lower: true,
      remove: /[*+~\/\\.()'"!?#\.,:@]/g,
    })

    const isEmpty = !value
    const isStillAuto = value === lastAutoSlug.current

    if (isEmpty || isStillAuto) {
      lastAutoSlug.current = next
      setValue(next)
    }
  }, [title, value, setValue])

  return (
    <div
      onInputCapture={(e) => {
        // detect ANY user interaction with field
        if ((e.target as HTMLElement)?.id?.includes('slug')) {
          isDirty.current = true
        }
      }}
    >
      <TextField path={path} field={field} />
    </div>
  )
}
