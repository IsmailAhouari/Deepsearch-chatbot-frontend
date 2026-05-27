export const flowAScreens = [
  {
    id: 'flowA',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA' },
    message: "DeepSearch è una piattaforma di intelligence progettata per individuare relazioni nascoste tra persone, aziende, controparti e segnali di rischio.\n\nConsente di superare verifiche frammentate e trasformare i dati in intelligence strutturata.",
    prompt: 'Vuoi una spiegazione focalizzata su:',
    choices: [
      { label: 'Analisi del rischio', target: 'flowA_risk' },
      { label: 'Due Diligence', target: 'flowA_dd' },
      { label: 'Analisi controparti', target: 'flowA_contra' },
      { label: 'Rischio reputazionale', target: 'flowA_rep' },
      { label: 'Supporto investigativo', target: 'flowA_inv' },
    ],
  },
  {
    id: 'flowA_risk',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA', intent: 'Analisi del rischio' },
    message: "DeepSearch consente di mappare l'esposizione al rischio attraverso l'analisi delle reti relazionali di persone fisiche e giuridiche, identificando connessioni non evidenti tra soggetti, strutture e settori.",
    ctas: [
      { label: "Esplora casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Demo generale', sourceFlow: 'flowA', sourceScreen: 'flowA_risk' } },
    ],
  },
  {
    id: 'flowA_dd',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA', intent: 'Due Diligence' },
    message: "DeepSearch supporta attività di due diligence avanzata attraverso l'analisi delle relazioni, l'identificazione delle entità e l'integrazione di fonti multiple.\n\nQuesto consente di individuare strutture complesse, collegamenti indiretti ed esposizioni che spesso non emergono da verifiche tradizionali.",
    ctas: [
      { label: "Esplora casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Due diligence', sourceFlow: 'flowA', sourceScreen: 'flowA_dd' } },
    ],
  },
  {
    id: 'flowA_contra',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA', intent: 'Rischio controparti' },
    message: "DeepSearch consente di analizzare controparti commerciali e finanziarie identificando legami societari, esposizioni e conflitti di interesse non dichiarati, prima che diventino rischi operativi.",
    ctas: [
      { label: "Esplora casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Rischio controparti', sourceFlow: 'flowA', sourceScreen: 'flowA_contra' } },
    ],
  },
  {
    id: 'flowA_rep',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA', intent: 'Rischio reputazionale' },
    message: "DeepSearch consente di organizzare informazioni rilevanti in un framework di intelligence, supportando l'identificazione preventiva di esposizioni reputazionali e collegamenti sensibili.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Rischio reputazionale', sourceFlow: 'flowA', sourceScreen: 'flowA_rep' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowA_inv',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowA', intent: 'Indagini aziendali' },
    message: "DeepSearch supporta attività investigative attraverso la ricostruzione di reti relazionali complesse: strutture societarie opache, flussi di controllo e connessioni tra soggetti in contesti di indagine.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Indagini aziendali', sourceFlow: 'flowA', sourceScreen: 'flowA_inv' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
];
