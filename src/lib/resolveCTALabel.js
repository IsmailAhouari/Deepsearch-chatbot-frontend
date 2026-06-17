/**
 * Resolves the display label for a startDemo CTA, personalizing it based on
 * the Visitor's qualification state.
 *
 * Choices opt in via `personalizable: true`. Matching is by exact equality on
 * the normalized `qualification.intent`/`role` IDs (Issue-027 guarantees these
 * are always normalized regardless of entry point). `geoArea` remains free
 * text, so the Switzerland rule uses substring matching.
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
  if (geo.includes('svizzera') || geo.includes('swiss')) return t('ui:cta.switzerland');
  if (role === 'HR')              return t('ui:cta.background_check');
  if (role === 'management')      return t('ui:cta.executive');
  // Role-based fallbacks: used when intent has not yet been selected (flowC path).
  // Intent checks above take priority when both are set.
  if (role === 'legal')           return t('ui:cta.litigation');
  if (role === 'compliance_aml')  return t('ui:cta.aml');
  if (role === 'investor')        return t('ui:cta.due_diligence');

  return t('ui:cta.requestDemo');
}
