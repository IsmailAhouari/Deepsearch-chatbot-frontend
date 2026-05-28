export const flowFScreens = [
  {
    id: 'flowF',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowF' },
    prompt: 'Indica la natura della richiesta:',
    choices: [
      { label: 'Commerciale',              target: 'flowF_geo', capture: { key: 'interest', value: 'Commerciale' } },
      { label: 'Partnership',              target: 'flowF_geo', capture: { key: 'interest', value: 'Partnership' } },
      { label: 'Presentazione piattaforma',target: 'flowF_geo', capture: { key: 'interest', value: 'Presentazione piattaforma' } },
      { label: 'Richiesta tecnica',        target: 'flowF_geo', capture: { key: 'interest', value: 'Richiesta tecnica' } },
      { label: 'Altro',                    target: 'flowF_geo', capture: { key: 'interest', value: 'Altro' } },
    ],
  },

  {
    id: 'flowF_geo',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowF' },
    component: 'freetext',
    message: 'Questo ci aiuta a indirizzarti al referente commerciale più adatto.',
    prompt: 'In quale paese ti trovi?',
    placeholder: 'Es. Italia, Svizzera, Francia…',
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
