export const welcomeScreen = {
  id: 'welcome',
  showSidebar: false,
  message: 'La maggior parte degli strumenti cerca dati.\nDeepSearch individua relazioni nascoste tra soggetti, controparti e strutture societarie.',
  prompt: 'Scegli cosa desideri esplorare:',
  choices: [
    { label: 'Panoramica piattaforma', sublabel: 'Comprendi come DeepSearch trasforma i dati in intelligence', target: 'flowA' },
    { label: "Casi d'uso", sublabel: 'Esplora applicazioni reali', target: 'flowB' },
    { label: 'A chi si rivolge', sublabel: 'Identifica il tuo profilo', target: 'flowC' },
    { label: 'Richiedi demo', sublabel: 'Prenota una sessione guidata', target: 'flowD_interest' },
    { label: 'Informazioni commerciali', sublabel: 'Licenze, piani e condizioni', target: 'flowE' },
    { label: 'Contatta il team', sublabel: 'Richieste dirette al team DeepSearch', target: 'flowF' },
  ],
};
