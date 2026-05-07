export const welcomeScreen = {
  id: 'welcome',
  showSidebar: false,
  message: 'La maggior parte degli strumenti cerca dati.\nDeepSearch individua relazioni nascoste tra soggetti, controparti e strutture societarie.',
  prompt: 'Scegli cosa desideri esplorare:',
  choices: [
    { label: 'Panoramica piattaforma', sublabel: 'Comprendi come DeepSearch trasforma i dati in intelligence', target: 'flowA', icon: '◈' },
    { label: "Casi d'uso", sublabel: 'Esplora applicazioni reali', target: 'flowB', icon: '⌥' },
    { label: 'A chi si rivolge', sublabel: 'Identifica il tuo profilo', target: 'flowC', icon: '❖' },
    { label: 'Richiedi demo', sublabel: 'Prenota una sessione guidata', action: { type: 'startDemo' }, icon: '✧' },
    { label: 'Informazioni commerciali', sublabel: 'Licenze, piani e condizioni', target: 'flowE', icon: '▤' },
    { label: 'Contatta il team', sublabel: 'Richieste dirette al team DeepSearch', target: 'flowF', icon: '✉' },
    { label: 'Altro', sublabel: 'Richieste personalizzate e approfondimenti', target: 'flowG_intro', icon: '⋯' },
  ],
};
