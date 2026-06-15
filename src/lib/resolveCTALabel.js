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

  return t('ui:cta.requestDemo');
}
