// Shared "use case" choices for the flowB entry screen, reused across the
// Aziende/Persone branches and the no-subjectType-yet fallback list.
const ddChoice       = { labelKey: 'flowB.choices.dd',       target: 'flowB_dd' };
const otherChoice    = { labelKey: 'flowB.choices.other',    target: 'flowB_other' };
const amlChoice      = { labelKey: 'flowB.choices.aml',       target: 'flowB_aml' };
const supplierChoice = { labelKey: 'flowB.choices.supplier', target: 'flowB_supplier' };
const litChoice      = { labelKey: 'flowB.choices.lit',       target: 'flowB_lit' };
const repChoice      = { labelKey: 'flowB.choices.rep',       target: 'flowB_rep' };
const altroChoice    = { labelKey: 'flowB.choices.altro',     target: 'flowG_intro' };

const aziendeChoices = [ddChoice, otherChoice, amlChoice, supplierChoice, litChoice, repChoice, altroChoice];
const personeChoices = [litChoice, repChoice, amlChoice, altroChoice];

export const flowBScreens = [
  {
    id: 'flowB',
    clearOnBack: { subjectType: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB' },
    topChoices: {
      promptKey: 'flowA.topChoices.prompt',
      captureKey: 'subjectType',
      options: [
        { labelKey: 'qualification:subjectType.aziende', value: 'Aziende', icon: '◈' },
        { labelKey: 'qualification:subjectType.persone', value: 'Persone', icon: '❖' },
      ],
    },
    promptKey: 'flowB.prompt',
    choicesBySubjectType: {
      Aziende: aziendeChoices,
      Persone: personeChoices,
    },
    // Fallback when no subject type selected yet — show full Aziende list
    choices: aziendeChoices,
  },
  {
    id: 'flowB_dd',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'due_diligence' },
    messageKey: 'flowB_dd.message',
    promptKey: 'flowB_dd.prompt',
    choices: [
      { labelKey: 'flowB_dd.choices.supplier', target: 'flowB_dd_sub', capture: { key: 'intent', value: 'due_diligence' } },
      { labelKey: 'flowB_dd.choices.client',   target: 'flowB_dd_sub', capture: { key: 'intent', value: 'due_diligence' } },
      { labelKey: 'flowB_dd.choices.partner',  target: 'flowB_dd_sub', capture: { key: 'intent', value: 'due_diligence' } },
      { labelKey: 'flowB_dd.choices.target',   target: 'flowB_dd_sub', capture: { key: 'intent', value: 'due_diligence' } },
      { labelKey: 'flowB_dd.choices.other',    target: 'flowB_dd_sub', capture: { key: 'intent', value: 'due_diligence' } },
    ],
  },
  {
    id: 'flowB_dd_sub',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'due_diligence' },
    messageKey: 'flowB_dd_sub.message',
    ctas: [
      { labelKey: 'ui:cta.requestDemo', personalizable: true, action: { type: 'startDemo', interest: 'due_diligence', sourceFlow: 'flowB', sourceScreen: 'flowB_dd_sub' } },
      { labelKey: 'cta.contactTeam', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_lit',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'litigation', role: 'legal' },
    messageKey: 'flowB_lit.message',
    promptKey: 'flowB_lit.prompt',
    choices: [
      { labelKey: 'flowB_lit.choices.civil',         target: 'flowB_lit_sub', capture: { key: 'intent', value: 'litigation' } },
      { labelKey: 'flowB_lit.choices.commercial',    target: 'flowB_lit_sub', capture: { key: 'intent', value: 'litigation' } },
      { labelKey: 'flowB_lit.choices.assetTracing',  target: 'flowB_lit_sub', capture: { key: 'intent', value: 'litigation' } },
      { labelKey: 'flowB_lit.choices.preLitigation', target: 'flowB_lit_sub', capture: { key: 'intent', value: 'litigation' } },
    ],
  },
  {
    id: 'flowB_lit_sub',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'litigation', role: 'legal' },
    messageKey: 'flowB_lit_sub.message',
    ctas: [
      { labelKey: 'ui:cta.requestDemo', personalizable: true, action: { type: 'startDemo', interest: 'litigation', sourceFlow: 'flowB', sourceScreen: 'flowB_lit_sub' } },
      { labelKey: 'cta.confidentialContact', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_rep',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'reputational_risk' },
    messageKey: 'flowB_rep.message',
    ctas: [
      { labelKey: 'ui:cta.requestDemo', personalizable: true, action: { type: 'startDemo', interest: 'reputational_risk', sourceFlow: 'flowB', sourceScreen: 'flowB_rep' } },
      { labelKey: 'cta.contactTeam', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_aml',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'aml', role: 'compliance_aml' },
    messageKey: 'flowB_aml.message',
    ctas: [
      { labelKey: 'ui:cta.requestDemo', personalizable: true, action: { type: 'startDemo', interest: 'aml', sourceFlow: 'flowB', sourceScreen: 'flowB_aml' } },
      { labelKey: 'cta.contactTeam', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_supplier',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'supplier_check' },
    messageKey: 'flowB_supplier.message',
    ctas: [
      { labelKey: 'ui:cta.requestDemo', personalizable: true, action: { type: 'startDemo', interest: 'counterparty_risk', sourceFlow: 'flowB', sourceScreen: 'flowB_supplier' } },
      { labelKey: 'cta.contactTeam', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_other',
    clearOnBack: { intent: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'corporate_investigations' },
    messageKey: 'flowB_other.message',
    ctas: [
      { labelKey: 'ui:cta.requestDemo', personalizable: true, action: { type: 'startDemo', interest: 'corporate_investigations', sourceFlow: 'flowB', sourceScreen: 'flowB_other' } },
      { labelKey: 'cta.contactTeam', target: 'flowF' },
    ],
  },
];
