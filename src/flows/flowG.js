export const flowGScreens = [
  {
    id: 'flowG_intro',
    showSidebar: true,
    component: 'freetext',
    message: "Descrivi brevemente la tua esigenza.",
    submitLabel: "Continua",
    successMessage: "Grazie.\n\nLa richiesta richiede un approfondimento diretto.\n\nPuoi lasciare i tuoi riferimenti per essere ricontattato.",
    successButtons: [
      { label: 'Invia richiesta', target: 'flowG_function' },
      { label: 'Richiedi demo', action: { type: 'startDemo', sourceFlow: 'flowG', sourceScreen: 'flowG_intro' } },
    ],
  },
  {
    id: 'flowG_function',
    showSidebar: true,
    message: "Per indirizzare correttamente la richiesta:",
    prompt: "Funzione",
    choices: [
      { label: 'Risk / Security', target: 'flowG_geo' },
      { label: 'Legale', target: 'flowG_geo' },
      { label: 'Compliance', target: 'flowG_geo' },
      { label: 'HR', target: 'flowG_geo' },
      { label: 'Direzione', target: 'flowG_geo' },
    ],
  },
  {
    id: 'flowG_geo',
    showSidebar: true,
    prompt: "Area geografica",
    choices: [
      { label: 'Svizzera', target: 'flowG_need' },
      { label: 'Italia', target: 'flowG_need' },
      { label: 'Europa', target: 'flowG_need' },
      { label: 'Medio Oriente', target: 'flowG_need' },
      { label: 'Globale', target: 'flowG_need' },
    ],
  },
  {
    id: 'flowG_need',
    showSidebar: true,
    prompt: "Esigenza",
    choices: [
      { label: 'Progetto immediato', target: 'flowG_form' },
      { label: 'Valutazione piattaforma', target: 'flowG_form' },
      { label: 'Analisi interna', target: 'flowG_form' },
      { label: 'Informazioni commerciali', target: 'flowG_form' },
    ],
  },
  {
    id: 'flowG_form',
    showSidebar: true,
    component: 'form',
    formType: 'genericRequest',
  },
];
