/**
 * `value` in the form `parseCss` reads it: trimmed and lowercased.
 */
export function normalizeCss(value: string): string {
  return value.trim().toLowerCase();
}
