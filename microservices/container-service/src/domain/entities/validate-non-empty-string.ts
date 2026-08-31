export const validateNonEmptyString = (s: string): boolean => {
  if (!s) return false
  if (typeof s !== 'string') return false
  return true
}
