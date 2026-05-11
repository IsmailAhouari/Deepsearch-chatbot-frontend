export const FAQ = [
  {
    question: "Cos'è DeepSearch?",
    answer: "Una piattaforma di intelligence che individua relazioni tra soggetti, controparti e segnali di rischio.",
    target: "flowA",
  },
  {
    question: "È un chatbot?",
    answer: "No. Il chatbot guida l'utente. DeepSearch è una piattaforma di analisi.",
  },
  {
    question: "Posso richiedere una demo?",
    answer: "Sì, è possibile richiedere una demo personalizzata.",
    action: { type: 'startDemo' },
  },
  {
    question: "A chi è rivolto?",
    answer: "Funzioni risk, legale, compliance, HR e direzione.",
    target: "flowC",
  },
];

export const faqScreens = [
  {
    id: 'faq',
    showSidebar: true,
    component: 'faq',
    title: 'FAQ',
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
