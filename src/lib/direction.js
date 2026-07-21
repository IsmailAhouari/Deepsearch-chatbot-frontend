export const RTL_LOCALES = new Set(['ar']);

export function dirFor(lng) {
  return RTL_LOCALES.has(lng?.split('-')[0]) ? 'rtl' : 'ltr';
}
