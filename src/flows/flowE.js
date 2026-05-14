export const flowEScreens = [
  {
  
    id: 'flowE',
    showSidebar: true,
    message: "Le condizioni commerciali dipendono da:\n\u00A0\u00A0\u00A0\u00A0• ambito di utilizzo\n\u00A0\u00A0\u00A0\u00A0• numero utenti\n\u00A0\u00A0\u00A0\u00A0• contesto operativo",
    prompt: 'Preferisci:',
    choices: [
      { label: 'Contatto commerciale', target: 'flowF' },
      { label: 'Richiedi informazioni', target: 'flowF' },
      { label: 'Prenota demo', action: { type: 'startDemo' } },
    ],
  },
];
