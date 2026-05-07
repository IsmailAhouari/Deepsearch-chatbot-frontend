export const FAQ = {
  "Cos'è DeepSearch?": "Una piattaforma di intelligence che individua relazioni tra soggetti, controparti e strutture societarie.",
  "È un chatbot?": "No. Il chatbot guida l'utente. DeepSearch è una piattaforma di analisi.",
  "Posso richiedere una demo?": "Sì, è possibile richiedere una demo personalizzata.",
  "A chi è rivolto?": "Funzioni risk, legale, compliance, HR e direzione.",
};

export const faqScreens = [
  {
    id: 'faq',
    showSidebar: true,
    component: 'faq',
  },
  {
    id: 'fallback',
    showSidebar: true,
    message: 'Per evitare risposte generiche, seleziona una delle seguenti opzioni:',
    choices: [
      { label: 'Panoramica piattaforma', target: 'flowA' },
      { label: "Casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', action: { type: 'startDemo' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
];
