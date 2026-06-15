export const flowFScreens = [
  {
    id: 'flowF',
    clearOnBack: { contactReason: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowF' },
    promptKey: 'flowF.prompt',
    choices: [
      { labelKey: 'qualification:contactReason.commercial',        target: 'flowF_geo', capture: { key: 'contactReason', value: 'commercial' } },
      { labelKey: 'qualification:contactReason.partnership',       target: 'flowF_geo', capture: { key: 'contactReason', value: 'partnership' } },
      { labelKey: 'qualification:contactReason.platform_demo',     target: 'flowF_geo', capture: { key: 'contactReason', value: 'platform_demo' } },
      { labelKey: 'qualification:contactReason.technical_request', target: 'flowF_geo', capture: { key: 'contactReason', value: 'technical_request' } },
    ],
  },

  {
    id: 'flowF_geo',
    clearOnBack: { geoArea: null },
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowF' },
    component: 'freetext',
    messageKey: 'flowF_geo.message',
    placeholderKey: 'flowF_geo.placeholder',
    freeTextCaptureKey: 'geoArea',
    freeTextTarget: 'flowF_form',
  },

  {
    id: 'flowF_form',
    showSidebar: true,
    component: 'form',
    formType: 'contact',
    formSuccessTarget: 'flowD_thanks',
  },
];
