export const flowCScreens = [
  {
    id: 'flowC',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC' },
    message: "DeepSearch è progettato per contesti decisionali complessi e ad alto rischio.",
    prompt: 'Quale profilo ti rappresenta?',
    choices: [
      { label: 'Security / Risk',     target: 'flowC_risk' },
      { label: 'Legale / Contenzioso',target: 'flowC_legal' },
      { label: 'Compliance / AML',    target: 'flowC_compliance' },
      { label: 'HR',                  target: 'flowC_hr' },
      { label: 'Direzione / Board',   target: 'flowC_board' },
      { label: 'Investitore / Fondo', target: 'flowC_fund' },
      { label: 'Altro',               target: 'flowC_other' },
    ],
  },
  {
    id: 'flowC_risk',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC', role: 'Security / Risk' },
    message: "DeepSearch supporta le funzioni Security e Risk nella mappatura proattiva delle esposizioni: analisi delle controparti, monitoraggio delle reti relazionali e identificazione di segnali di rischio emergenti.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', role: 'Security / Risk', selectedPersona: 'Security / Risk', selectedPersonaLabel: 'Security / Risk', sourceFlow: 'flowC', sourceScreen: 'flowC_risk' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowC_legal',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC', role: 'Legale / Contenzioso' },
    message: "DeepSearch supporta le funzioni legali nella fase pre-contenziosa e durante i procedimenti: ricostruzione di reti relazionali, identificazione di asset e analisi delle connessioni tra soggetti.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', role: 'Legale', selectedPersona: 'Legale / Contenzioso', selectedPersonaLabel: 'Professionisti legali', sourceFlow: 'flowC', sourceScreen: 'flowC_legal' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowC_compliance',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC', role: 'Compliance / AML' },
    message: "DeepSearch supporta i processi di compliance attraverso analisi relazionali avanzate, migliorando la visibilità su strutture complesse, controparti ed esposizioni indirette.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', role: 'Compliance', selectedPersona: 'Compliance / AML', selectedPersonaLabel: 'Compliance / AML', sourceFlow: 'flowC', sourceScreen: 'flowC_compliance' } },
      { label: 'Contatto commerciale', target: 'flowF' },
    ],
  },
  {
    id: 'flowC_hr',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC', role: 'HR' },
    message: "DeepSearch supporta le funzioni HR nella verifica dei profili attraverso l'analisi di fonti aperte: esposizione mediatica, connessioni societarie e segnali reputazionali rilevanti.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', role: 'HR', selectedPersona: 'HR', selectedPersonaLabel: 'HR', sourceFlow: 'flowC', sourceScreen: 'flowC_hr' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowC_board',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC', role: 'Direzione / Board' },
    message: "DeepSearch è progettato per supportare decisioni strategiche, fornendo intelligence strutturata su controparti, relazioni e rischi.",
    ctas: [
      { label: 'Demo executive', action: { type: 'startDemo', role: 'Direzione', selectedPersona: 'Direzione / Board', selectedPersonaLabel: 'Direzione / Board', sourceFlow: 'flowC', sourceScreen: 'flowC_board' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowC_fund',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC', role: 'Investitore / Fondo' },
    message: "DeepSearch supporta investitori e fondi nella fase di screening e due diligence: analisi dei target, mappatura delle reti di controllo, identificazione di esposizioni e segnali di rischio pre-investimento.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', role: 'Altro', selectedPersona: 'Investitore / Fondo', selectedPersonaLabel: 'Investitore / Fondo', sourceFlow: 'flowC', sourceScreen: 'flowC_fund' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowC_other',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowC' },
    message: "Descrivici il tuo contesto: individuiamo insieme il profilo di utilizzo più adatto.",
    component: 'freetext',
    freeTextCaptureKey: 'customRequest',
    freeTextTarget: 'flowG_form',
  },
];
