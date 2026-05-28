export const flowGScreens = [
  {
    id: 'flowG_intro',
    showSidebar: true,
    component: 'freetext',
    message: "Descrivi brevemente la tua esigenza.",
    submitLabel: "Continua",
    freeTextCaptureKey: 'customRequestText',
    successMessage: "Grazie.\n\nLa richiesta richiede un approfondimento diretto.\n\nPuoi lasciare i tuoi riferimenti per essere ricontattato.",
    successButtons: [
      { label: 'Invia richiesta', target: 'flowG_function' },
      { label: 'Richiedi demo', action: { type: 'startDemo', sourceFlow: 'flowG', sourceScreen: 'flowG_intro' } },
    ],
  },
  {
    id: 'flowG_function',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowG' },
    message: "Per indirizzare correttamente la richiesta:",
    prompt: "Funzione",
    choices: [
      { label: 'Risk / Security', target: 'flowG_geo', capture: { key: 'funcRole', value: 'Risk / Security' } },
      { label: 'Legale',          target: 'flowG_geo', capture: { key: 'funcRole', value: 'Legale' } },
      { label: 'Compliance',      target: 'flowG_geo', capture: { key: 'funcRole', value: 'Compliance' } },
      { label: 'HR',              target: 'flowG_geo', capture: { key: 'funcRole', value: 'HR' } },
      { label: 'Direzione',       target: 'flowG_geo', capture: { key: 'funcRole', value: 'Direzione' } },
    ],
  },
  {
    id: 'flowG_geo',
    showSidebar: true,
    prompt: "Area geografica",
    choices: [
      { label: 'Svizzera',      target: 'flowG_need', capture: { key: 'geoArea', value: 'Svizzera' } },
      { label: 'Italia',        target: 'flowG_need', capture: { key: 'geoArea', value: 'Italia' } },
      { label: 'Europa',        target: 'flowG_need', capture: { key: 'geoArea', value: 'Europa' } },
      { label: 'Medio Oriente', target: 'flowG_need', capture: { key: 'geoArea', value: 'Medio Oriente' } },
      { label: 'Globale',       target: 'flowG_need', capture: { key: 'geoArea', value: 'Globale' } },
    ],
  },
  {
    id: 'flowG_need',
    showSidebar: true,
    prompt: "Esigenza",
    choices: [
      { label: 'Progetto immediato',       target: 'flowG_form', capture: { key: 'needType', value: 'Progetto immediato' } },
      { label: 'Valutazione piattaforma',  target: 'flowG_form', capture: { key: 'needType', value: 'Valutazione piattaforma' } },
      { label: 'Analisi interna',          target: 'flowG_form', capture: { key: 'needType', value: 'Analisi interna' } },
      { label: 'Informazioni commerciali', target: 'flowG_form', capture: { key: 'needType', value: 'Informazioni commerciali' } },
    ],
  },
  {
    id: 'flowG_form',
    showSidebar: true,
    component: 'form',
    formType: 'genericRequest',
    formSuccessTarget: 'flowD_thanks',
  },
];
