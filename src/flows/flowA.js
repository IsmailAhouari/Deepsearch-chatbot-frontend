export const flowAScreens = [

  // ── STEP 0 — Entry screen ─────────────────────────────────────────────────
  {
    id: 'flowA',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    message: "DeepSearch è una piattaforma di intelligence progettata per individuare relazioni nascoste tra persone, aziende, controparti e segnali di rischio.\n\nConsente di superare verifiche frammentate e trasformare i dati in intelligence strutturata.",
    topChoices: {
      prompt: 'Stai analizzando principalmente:',
      captureKey: 'subjectType',
      options: [
        { label: 'Aziende', value: 'Aziende', icon: '◈' },
        { label: 'Persone', value: 'Persone', icon: '❖' },
      ],
    },
    prompt: 'Vuoi una spiegazione focalizzata su:',
    choices: [
      { label: 'Analisi del rischio',    target: 'flowA_geo', capture: { key: 'intent', value: 'Analisi del rischio' },   sublabel: 'Esposizione, reti relazionali, connessioni indirette' },
      { label: 'Due Diligence',          target: 'flowA_geo', capture: { key: 'intent', value: 'Due Diligence' },          sublabel: 'Strutture societarie, UBO, screening controparti' },
      { label: 'Analisi controparti',    target: 'flowA_geo', capture: { key: 'intent', value: 'Rischio controparti' },    sublabel: 'Legami, conflitti di interesse, esposizioni' },
      { label: 'Rischio reputazionale',  target: 'flowA_geo', capture: { key: 'intent', value: 'Rischio reputazionale' }, sublabel: 'Segnali mediatici, sentiment, associazioni negative' },
      { label: 'Supporto investigativo', target: 'flowA_geo', capture: { key: 'intent', value: 'Indagini aziendali' },    sublabel: 'Reti opache, asset tracing, flussi di controllo' },
    ],
  },

  // ── STEP 1 — Area geografica (free text) ─────────────────────────────────
  {
    id: 'flowA_geo',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    component: 'freetext',
    message: "Qual è il contesto geografico principale del tuo interesse?",
    prompt: 'In quale area geografica operi principalmente?',
    placeholder: 'Es. Svizzera, Europa, GCC, Globale…',
    freeTextCaptureKey: 'geoArea',
    freeTextTarget: 'flowA_role',
  },

  // ── STEP 2 — Funzione / Ruolo → directly to demo form ────────────────────
  {
    id: 'flowA_role',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    message: "Ogni funzione applica DeepSearch con obiettivi operativi e flussi di lavoro specifici.",
    prompt: 'Quale funzione ti rappresenta maggiormente?',
    choices: [
      { label: 'Compliance / AML',     capture: { key: 'role', value: 'Compliance / AML' },     action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'Legale / Contenzioso', capture: { key: 'role', value: 'Legale / Contenzioso' }, action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'Security / Risk',      capture: { key: 'role', value: 'Security / Risk' },      action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'Risk Management',      capture: { key: 'role', value: 'Risk Management' },      action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'Investigazioni',       capture: { key: 'role', value: 'Investigazioni' },       action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'HR',                   capture: { key: 'role', value: 'HR' },                   action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'Direzione / Board',    capture: { key: 'role', value: 'Direzione / Board' },    action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
      { label: 'Altro',                capture: { key: 'role', value: 'Altro' },                action: { type: 'startDemo', sourceFlow: 'flowA', sourceScreen: 'flowA_role' } },
    ],
  },

];
