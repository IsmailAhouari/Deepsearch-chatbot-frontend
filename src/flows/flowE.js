export const flowEScreens = [
  {

    id: 'flowE',
    showSidebar: true,
    messageKey: 'flowE.message',
    promptKey: 'flowE.prompt',
    choices: [
      { labelKey: 'flowE.choices.commercial', target: 'flowF' },
      { labelKey: 'flowE.choices.information', target: 'flowF' },
      { personalizable: true, action: { type: 'startDemo' } },
    ],
  },
];
