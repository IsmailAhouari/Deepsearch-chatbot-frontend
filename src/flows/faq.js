export const FAQ = [
  {
    question: "Cos'è DeepSearch?",
    answer: "Una piattaforma di intelligence che individua relazioni tra soggetti, controparti e segnali di rischio.",
    target: "flowA",
    relevance: [],
  },
  {
    question: "È un chatbot?",
    answer: "No. Il chatbot guida l'utente. DeepSearch è una piattaforma di analisi.",
    relevance: [],
  },
  {
    question: "Posso richiedere una demo?",
    answer: "Sì, è possibile richiedere una demo personalizzata.",
    action: { type: 'startDemo' },
    relevance: [],
  },
  {
    question: "A chi è rivolto?",
    answer: "Funzioni risk, legale, compliance, HR e direzione.",
    target: "flowC",
    relevance: ['HR', 'Compliance / AML', 'Security / Risk', 'Legale / Contenzioso'],
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
