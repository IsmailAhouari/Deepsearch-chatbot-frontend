export const flowAScreens = [

  // ── STEP 0 — Entry screen ─────────────────────────────────────────────────
  {
    id: 'flowA',
    clearOnBack: { subjectType: null, intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    messageKey: 'flowA.message',
    topChoices: {
      promptKey: 'flowA.topChoices.prompt',
      captureKey: 'subjectType',
      options: [
        { labelKey: 'qualification:subjectType.aziende', value: 'Aziende', icon: '◈' },
        { labelKey: 'qualification:subjectType.persone', value: 'Persone', icon: '❖' },
      ],
    },
    promptKey: 'flowA.prompt',
    choices: [
      { labelKey: 'qualification:intent.risk_analysis',           target: 'flowA_geo', capture: { key: 'intent', value: 'risk_analysis' },           sublabelKey: 'flowA.choices.risk_analysis.sublabel' },
      { labelKey: 'qualification:intent.due_diligence',           target: 'flowA_geo', capture: { key: 'intent', value: 'due_diligence' },           sublabelKey: 'flowA.choices.due_diligence.sublabel' },
      { labelKey: 'qualification:intent.counterparty_risk',       target: 'flowA_geo', capture: { key: 'intent', value: 'counterparty_risk' },       sublabelKey: 'flowA.choices.counterparty_risk.sublabel' },
      { labelKey: 'qualification:intent.reputational_risk',       target: 'flowA_geo', capture: { key: 'intent', value: 'reputational_risk' },       sublabelKey: 'flowA.choices.reputational_risk.sublabel' },
      { labelKey: 'qualification:intent.corporate_investigations', target: 'flowA_geo', capture: { key: 'intent', value: 'corporate_investigations' }, sublabelKey: 'flowA.choices.corporate_investigations.sublabel' },
    ],
  },

  // ── STEP 1 — Area geografica (free text) ─────────────────────────────────
  {
    id: 'flowA_geo',
    clearOnBack: { geoArea: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    component: 'freetext',
    messageKey: 'flowA_geo.message',
    placeholderKey: 'flowA_geo.placeholder',
    freeTextCaptureKey: 'geoArea',
    freeTextTarget: 'flowA_role',
  },

  // ── STEP 2 — Funzione / Ruolo → directly to demo form ────────────────────
  {
    id: 'flowA_role',
    clearOnBack: { role: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    messageKey: 'flowA_role.message',
    promptKey: 'flowA_role.prompt',
    choices: [
      { labelKey: 'qualification:role.compliance_aml',  capture: { key: 'role', value: 'compliance_aml' },  action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.legal',           capture: { key: 'role', value: 'legal' },           action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.security_risk',   capture: { key: 'role', value: 'security_risk' },   action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.risk_management', capture: { key: 'role', value: 'risk_management' }, action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.investigations',  capture: { key: 'role', value: 'investigations' },  action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.HR',              capture: { key: 'role', value: 'HR' },              action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.management',      capture: { key: 'role', value: 'management' },      action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { labelKey: 'qualification:role.other',           capture: { key: 'role', value: 'other' },           action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
    ],
  },

];
