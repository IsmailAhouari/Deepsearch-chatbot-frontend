export const flowFScreens = [
  {
    id: 'flowF',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowF' },
    prompt: 'Indica la natura della richiesta:',
    choices: [
      { label: 'Commerciale',              target: 'flowF_form', capture: { key: 'interest', value: 'Commerciale' } },
      { label: 'Partnership',              target: 'flowF_form', capture: { key: 'interest', value: 'Partnership' } },
      { label: 'Presentazione piattaforma',target: 'flowF_form', capture: { key: 'interest', value: 'Presentazione piattaforma' } },
      { label: 'Richiesta tecnica',        target: 'flowF_form', capture: { key: 'interest', value: 'Richiesta tecnica' } },
      { label: 'Altro',                    target: 'flowF_form', capture: { key: 'interest', value: 'Altro' } },
    ],
  },
  {
    id: 'flowF_form',
    showSidebar: true,
    component: 'form',
    formType: 'contact',
    formSuccessTarget: 'flowD_thanks',
  },
];
