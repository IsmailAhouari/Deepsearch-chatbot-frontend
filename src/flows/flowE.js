export const flowEScreens = [
  {
    id: 'flowE',
    showSidebar: true,
    message: "Le condizioni commerciali dipendono da ambito di utilizzo, numero utenti e configurazione richiesta. Il team DeepSearch fornirà una proposta personalizzata.",
    prompt: 'Preferisci:',
    choices: [
      { label: 'Contatto commerciale', target: 'flowF' },
      { label: 'Richiedi informazioni', target: 'flowF' },
      { label: 'Prenota demo', target: 'flowD_interest' },
    ],
  },
];
