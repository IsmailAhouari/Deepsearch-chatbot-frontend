export const flowAScreens = [
  {
    id: 'flowA',
    showSidebar: true,
    message: "DeepSearch è una piattaforma di intelligence progettata per individuare relazioni tra soggetti, controparti e strutture societarie in contesti ad alto rischio.",
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
    message: "DeepSearch consente di mappare l'esposizione al rischio attraverso l'analisi delle reti relazionali di persone fisiche e giuridiche, identificando connessioni non evidenti tra soggetti, strutture e settori.",
    ctas: [
      { label: "Esplora casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', target: 'flowD_interest' },
    ],
  },
  {
    id: 'flowA_dd',
    showSidebar: true,
    message: "DeepSearch supporta attività di due diligence avanzata attraverso l'analisi di fonti aperte strutturate: relazioni societarie, esposizioni mediatiche, precedenti giudiziari e reti di controllo.",
    ctas: [
      { label: "Esplora casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', target: 'flowD_interest' },
    ],
  },
  {
    id: 'flowA_contra',
    showSidebar: true,
    message: "DeepSearch consente di analizzare controparti commerciali e finanziarie identificando legami societari, esposizioni e conflitti di interesse non dichiarati, prima che diventino rischi operativi.",
    ctas: [
      { label: "Esplora casi d'uso", target: 'flowB' },
      { label: 'Richiedi demo', target: 'flowD_interest' },
    ],
  },
  {
    id: 'flowA_rep',
    showSidebar: true,
    message: "DeepSearch consente di organizzare informazioni rilevanti in un framework di intelligence reputazionale: esposizione mediatica, associazioni negative, sentiment e segnali di rischio emergenti.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowA_inv',
    showSidebar: true,
    message: "DeepSearch supporta attività investigative attraverso la ricostruzione di reti relazionali complesse: strutture societarie opache, flussi di controllo e connessioni tra soggetti in contesti di indagine.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
];
