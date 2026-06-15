/**
 * Progressive Lead Qualification Funnel
 *
 * Step 1 (funnel_subject): Subject type — Aziende / Persone
 * Step 2: Intent — dynamic based on subject type
 * Step 3: Geographic area — free text
 * Step 4: Role / function — dynamic based on subject type
 * Step 5: Demo contact form (with qualification summary)
 */
export const funnelScreens = [
  // Step 1: Subject type selection (entry point for demo funnel)
  {
    id: 'funnel_subject',
    clearOnBack: { subjectType: null },
    showSidebar: true,
    messageKey: 'funnel.subject.message',
    promptKey: 'funnel.subject.prompt',
    choices: [
      {
        labelKey: 'qualification:subjectType.aziende',
        sublabelKey: 'funnel.subject.choices.aziende.sublabel',
        target: 'funnel_intent_company',
        capture: { key: 'subjectType', value: 'aziende' },
        icon: '◈',
      },
      {
        labelKey: 'qualification:subjectType.persone',
        sublabelKey: 'funnel.subject.choices.persone.sublabel',
        target: 'funnel_intent_person',
        capture: { key: 'subjectType', value: 'persone' },
        icon: '❖',
      },
    ],
  },

  // Step 2a: Intent for Companies
  {
    id: 'funnel_intent_company',
    clearOnBack: { intent: null },
    showSidebar: true,
    messageKey: 'funnel.intentCompany.message',
    promptKey: 'funnel.intentCompany.prompt',
    choices: [
      { labelKey: 'qualification:intent.due_diligence',     target: 'funnel_geo', capture: { key: 'intent', value: 'due_diligence' } },
      { labelKey: 'qualification:intent.partner_selection', target: 'funnel_geo', capture: { key: 'intent', value: 'partner_selection' } },
      { labelKey: 'qualification:intent.aml',               target: 'funnel_geo', capture: { key: 'intent', value: 'aml' } },
      { labelKey: 'qualification:intent.risk_analysis',     target: 'funnel_geo', capture: { key: 'intent', value: 'risk_analysis' } },
      { labelKey: 'qualification:intent.supplier_check',    target: 'funnel_geo', capture: { key: 'intent', value: 'supplier_check' } },
      { labelKey: 'qualification:intent.litigation',        target: 'funnel_geo', capture: { key: 'intent', value: 'litigation' } },
      { labelKey: 'qualification:intent.reputational_risk', target: 'funnel_geo', capture: { key: 'intent', value: 'reputational_risk' } },
      { labelKey: 'qualification:intent.other',             target: 'funnel_geo', capture: { key: 'intent', value: 'other' } },
    ],
  },

  // Step 2b: Intent for People
  {
    id: 'funnel_intent_person',
    clearOnBack: { intent: null },
    showSidebar: true,
    messageKey: 'funnel.intentPerson.message',
    promptKey: 'funnel.intentPerson.prompt',
    choices: [
      { labelKey: 'qualification:intent.hiring',            target: 'funnel_geo', capture: { key: 'intent', value: 'hiring' } },
      { labelKey: 'qualification:intent.aml',               target: 'funnel_geo', capture: { key: 'intent', value: 'aml' } },
      { labelKey: 'qualification:intent.risk_analysis',     target: 'funnel_geo', capture: { key: 'intent', value: 'risk_analysis' } },
      { labelKey: 'qualification:intent.litigation',        target: 'funnel_geo', capture: { key: 'intent', value: 'litigation' } },
      { labelKey: 'qualification:intent.reputational_risk', target: 'funnel_geo', capture: { key: 'intent', value: 'reputational_risk' } },
      { labelKey: 'qualification:intent.other',             target: 'funnel_geo', capture: { key: 'intent', value: 'other' } },
    ],
  },

  // Step 3: Geographic area (free text input)
  {
    id: 'funnel_geo',
    clearOnBack: { geoArea: null },
    showSidebar: true,
    component: 'freetext',
    messageKey: 'funnel.geo.message',
    submitLabelKey: 'funnel.geo.submitLabel',
    placeholderKey: 'funnel.geo.placeholder',
    freeTextCaptureKey: 'geoArea',
    freeTextTargetFn: 'bySubjectType', // Panel routes to funnel_role_company or funnel_role_person
  },

  // Step 4a: Role / function for Companies
  {
    id: 'funnel_role_company',
    clearOnBack: { role: null },
    showSidebar: true,
    messageKey: 'funnel.roleCompany.message',
    promptKey: 'funnel.roleCompany.prompt',
    choices: [
      { labelKey: 'qualification:role.security_risk',  target: 'funnel_form', capture: { key: 'role', value: 'security_risk' } },
      { labelKey: 'qualification:role.legal',          target: 'funnel_form', capture: { key: 'role', value: 'legal' } },
      { labelKey: 'qualification:role.compliance_aml', target: 'funnel_form', capture: { key: 'role', value: 'compliance_aml' } },
      { labelKey: 'qualification:role.HR',             target: 'funnel_form', capture: { key: 'role', value: 'HR' } },
      { labelKey: 'qualification:role.management',     target: 'funnel_form', capture: { key: 'role', value: 'management' } },
      { labelKey: 'qualification:role.investor',       target: 'funnel_form', capture: { key: 'role', value: 'investor' } },
      { labelKey: 'qualification:role.other',          target: 'funnel_form', capture: { key: 'role', value: 'other' } },
    ],
  },

  // Step 4b: Role / function for People
  // HR prioritized first — most common for person-related investigations
  {
    id: 'funnel_role_person',
    clearOnBack: { role: null },
    showSidebar: true,
    messageKey: 'funnel.rolePerson.message',
    promptKey: 'funnel.rolePerson.prompt',
    choices: [
      { labelKey: 'qualification:role.HR',             target: 'funnel_form', capture: { key: 'role', value: 'HR' } },
      { labelKey: 'qualification:role.security_risk',  target: 'funnel_form', capture: { key: 'role', value: 'security_risk' } },
      { labelKey: 'qualification:role.legal',          target: 'funnel_form', capture: { key: 'role', value: 'legal' } },
      { labelKey: 'qualification:role.compliance_aml', target: 'funnel_form', capture: { key: 'role', value: 'compliance_aml' } },
      { labelKey: 'qualification:role.management',     target: 'funnel_form', capture: { key: 'role', value: 'management' } },
      { labelKey: 'qualification:role.other',          target: 'funnel_form', capture: { key: 'role', value: 'other' } },
    ],
  },

  // Step 5: Demo contact form
  {
    id: 'funnel_form',
    showSidebar: true,
    component: 'form',
    formType: 'demo',
    formSuccessTarget: 'funnel_thanks',
  },

  {
    id: 'funnel_thanks',
    showSidebar: true,
    component: 'thanks',
    messageKey: 'funnel.thanks.message',
  },
];

/**
 * Returns the funnel step number (1–6) for a given screen ID.
 * Returns 0 for non-funnel screens.
 */
export function getFunnelStep(screenId) {
  if (screenId === 'funnel_subject') return 1;
  if (screenId === 'funnel_intent_company' || screenId === 'funnel_intent_person') return 2;
  if (screenId === 'funnel_geo') return 3;
  if (screenId === 'funnel_role_company' || screenId === 'funnel_role_person') return 4;
  if (screenId === 'funnel_form') return 5;
  if (screenId === 'funnel_thanks') return 6;
  return 0;
}
