export const getRelationshipId = <T extends { id: string }>(
  field: string | T,
) => {
  return typeof field === 'string' ? field : field.id
}
