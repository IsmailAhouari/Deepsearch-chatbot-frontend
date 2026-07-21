/**
 * Free-text `geoArea` tokens (both scripts) that indicate the GCC region.
 * `geoArea` is never normalized to an ID like the funnel's fixed-choice
 * fields, so this rule matches substrings rather than exact equality —
 * covers both the GCC/Global fixed choices (flowG_geo) and anything a
 * Visitor might type into a free-text geography field (flowA_geo, flowF_geo).
 */
const GCC_GEO_TOKENS = [
  'gcc', 'gulf', 'uae', 'emirates', 'dubai', 'abu dhabi',
  'saudi', 'ksa', 'riyadh', 'qatar', 'doha', 'kuwait', 'bahrain', 'oman',
  'الخليج', 'الإمارات', 'دبي', 'أبوظبي', 'السعودية', 'الرياض',
  'قطر', 'الدوحة', 'الكويت', 'البحرين', 'عمان',
];

/**
 * Resolves the display label for a startDemo CTA, personalizing it based on
 * the Visitor's qualification state.
 *
 * Choices opt in via `personalizable: true`. Matching is by exact equality on
 * the normalized `qualification.intent`/`role` IDs (Issue-027 guarantees these
 * are always normalized regardless of entry point). `geoArea` remains free
 * text, so the GCC rule uses substring matching against a bilingual token list.
 */
export function resolveCTALabel(choice, qualification, t) {
  if (choice.action?.type !== 'startDemo' || !choice.personalizable) {
    return choice.label;
  }

  const { intent, role, geoArea } = qualification;
  const geo = geoArea?.toLowerCase() || '';

  if (intent === 'aml')           return t('ui:cta.aml');
  if (intent === 'due_diligence') return t('ui:cta.due_diligence');
  if (intent === 'litigation')    return t('ui:cta.litigation');
  if (GCC_GEO_TOKENS.some(token => geo.includes(token))) return t('ui:cta.gcc');
  if (role === 'HR')              return t('ui:cta.background_check');
  if (role === 'management')      return t('ui:cta.executive');
  // Role-based fallbacks: used when intent has not yet been selected (flowC path).
  // Intent checks above take priority when both are set.
  if (role === 'legal')           return t('ui:cta.litigation');
  if (role === 'compliance_aml')  return t('ui:cta.aml');
  if (role === 'investor')        return t('ui:cta.due_diligence');

  return t('ui:cta.requestDemo');
}
