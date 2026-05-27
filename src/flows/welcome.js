export const welcomeScreen = {
  id: 'welcome',
  showSidebar: false,
  columns: 2,
  message: 'La maggior parte degli strumenti cerca dati.\nDeepSearch individua relazioni nascoste.\n\nPosso guidarti tra funzionalità, casi d\'uso o aiutarti a richiedere una demo.',
  prompt: 'Scegli cosa desideri esplorare:',
  choices: [
    {
      label: 'Panoramica piattaforma',
      sublabel: 'Comprendi come DeepSearch trasforma i dati in intelligence',
      target: 'flowA',
      icon: '◈',
    },
    {
      label: "Casi d'uso",
      sublabel: 'Esplora applicazioni reali',
      target: 'flowB',
      icon: '◇',
    },
    {
      label: 'A chi si rivolge',
      sublabel: 'Identifica il tuo profilo',
      target: 'flowC',
      icon: '❖',
    },
    {
      label: 'Richiedi demo',
      sublabel: 'Prenota una sessione guidata',
      action: { type: 'startDemo' },
      icon: '◆',
    },
    {
      label: 'Informazioni commerciali',
      sublabel: 'Licenze, piani e condizioni',
      target: 'flowE',
      icon: '€',
    },
    {
      label: 'Contatta il team',
      sublabel: 'Richieste dirette al team DeepSearch',
      target: 'flowF',
      icon: '✉',
    },
    {
      label: 'Altro',
      sublabel: 'Richieste personalizzate e approfondimenti',
      target: 'flowG_intro',
      icon: '···',
    },
    {
      label: 'FAQ',
      sublabel: 'Risposte alle domande più frequenti',
      target: 'faq',
      icon: '?',
    },
  ],
};
