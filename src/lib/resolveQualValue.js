/**
 * Resolves a qualification field's raw value to its display string via the
 * `qualification.*` catalog. Tries an exact-case match first (catalog keys
 * like `role.HR` are not lowercase), then a lowercased match (covers
 * inconsistently-cased values like 'Aziende' vs 'aziende'). Falls back to the
 * raw value for free-text fields (e.g. geoArea) or unmapped IDs.
 */
export function resolveQualValue(t, i18n, group, value) {
  if (!value) return value;

  const exactKey = `qualification:${group}.${value}`;
  if (i18n.exists(exactKey)) return t(exactKey);

  const lowerKey = `qualification:${group}.${value.toLowerCase()}`;
  if (i18n.exists(lowerKey)) return t(lowerKey);

  return value;
}
