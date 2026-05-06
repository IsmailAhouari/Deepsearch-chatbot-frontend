export const flowFScreens = [
  {
    id: 'flowF',
    showSidebar: true,
    prompt: 'Indica la natura della richiesta:',
    choices: [
      { label: 'Commerciale', target: 'flowF_form' },
      { label: 'Partnership', target: 'flowF_form' },
      { label: 'Presentazione piattaforma', target: 'flowF_form' },
      { label: 'Richiesta tecnica', target: 'flowF_form' },
      { label: 'Altro', target: 'flowF_form' },
    ],
  },
  {
    id: 'flowF_form',
    showSidebar: true,
    component: 'form',
    formType: 'contact',
  },
];
