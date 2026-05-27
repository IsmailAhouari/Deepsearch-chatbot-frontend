export const flowBScreens = [
  {
    id: 'flowB',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB' },
    topChoices: {
      prompt: 'Stai analizzando principalmente:',
      captureKey: 'subjectType',
      options: [
        { label: 'Aziende',         value: 'Aziende',  icon: '◈' },
        { label: 'Persone fisiche', value: 'Persone',  icon: '❖' },
      ],
    },
    prompt: "Quale caso d'uso è più vicino al tuo interesse?",
    choices: [
      { label: 'Due diligence controparti',    target: 'flowB_dd' },
      { label: 'Indagini aziendali',           target: 'flowB_other' },
      { label: 'Litigation intelligence',      target: 'flowB_lit' },
      { label: 'Analisi reputazionale',        target: 'flowB_rep' },
      { label: 'AML / KYC',                   target: 'flowB_aml' },
      { label: 'Rischio fornitori / terze parti', target: 'flowB_supplier' },
      { label: 'Altro',                        target: 'flowG_intro' },
    ],
  },
  {
    id: 'flowB_dd',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Due Diligence' },
    message: "DeepSearch consente di comprendere con chi si sta realmente operando, individuando relazioni indirette, strutture complesse ed esposizioni non evidenti.",
    prompt: 'Il tuo caso riguarda:',
    choices: [
      { label: 'Fornitore',            target: 'flowB_dd_sub', capture: { key: 'intent', value: 'Due Diligence' } },
      { label: 'Cliente',              target: 'flowB_dd_sub', capture: { key: 'intent', value: 'Due Diligence' } },
      { label: 'Partner',              target: 'flowB_dd_sub', capture: { key: 'intent', value: 'Due Diligence' } },
      { label: 'Target di investimento',target: 'flowB_dd_sub', capture: { key: 'intent', value: 'Due Diligence' } },
      { label: 'Altro',                target: 'flowB_dd_sub', capture: { key: 'intent', value: 'Due Diligence' } },
    ],
  },
  {
    id: 'flowB_dd_sub',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Due Diligence' },
    message: "DeepSearch fornisce un framework strutturato per l'analisi della controparte: struttura societaria, UBO, esposizione mediatica e precedenti rilevanti — in un unico report di intelligence.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Due diligence', sourceFlow: 'flowB', sourceScreen: 'flowB_dd_sub' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_lit',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Litigation intelligence' },
    message: "DeepSearch supporta studi legali e consulenti nella ricostruzione delle relazioni tra soggetti, nell'individuazione di controparti rilevanti e nel rafforzamento della strategia informativa.",
    prompt: 'Il contesto è:',
    choices: [
      { label: 'Contenzioso civile',  target: 'flowB_lit_sub', capture: { key: 'intent', value: 'Litigation intelligence' } },
      { label: 'Disputa commerciale', target: 'flowB_lit_sub', capture: { key: 'intent', value: 'Litigation intelligence' } },
      { label: 'Asset tracing',       target: 'flowB_lit_sub', capture: { key: 'intent', value: 'Litigation intelligence' } },
      { label: 'Pre-contenzioso',     target: 'flowB_lit_sub', capture: { key: 'intent', value: 'Litigation intelligence' } },
    ],
  },
  {
    id: 'flowB_lit_sub',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Litigation intelligence' },
    message: "DeepSearch ricostruisce reti relazionali e flussi di controllo utili a supportare la strategia legale: identificazione di asset, soggetti collegati e segnali di rischio documentati da fonti aperte.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Litigation intelligence', sourceFlow: 'flowB', sourceScreen: 'flowB_lit_sub' } },
      { label: 'Contatto riservato', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_rep',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Rischio reputazionale' },
    message: "DeepSearch monitora e analizza l'esposizione reputazionale di soggetti e organizzazioni: segnali mediatici, associazioni negative e dinamiche di sentiment in contesti ad alto rischio.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Rischio reputazionale', sourceFlow: 'flowB', sourceScreen: 'flowB_rep' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_aml',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Analisi AML' },
    message: "DeepSearch supporta i processi AML e KYC attraverso l'analisi relazionale avanzata: identificazione di PEP, soggetti sanzionati, strutture societarie opache e reti di controllo non dichiarate.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'AML / KYC', sourceFlow: 'flowB', sourceScreen: 'flowB_aml' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_supplier',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Verifica fornitori' },
    message: "DeepSearch analizza la catena di fornitura e le terze parti identificando rischi nascosti: esposizioni reputazionali, connessioni societarie a soggetti critici e segnali di instabilità operativa.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Rischio controparti', sourceFlow: 'flowB', sourceScreen: 'flowB_supplier' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_other',
    showSidebar: true,
    autoCapture: { sourceFlow: 'flowB', intent: 'Indagini aziendali' },
    message: "DeepSearch supporta indagini aziendali attraverso la ricostruzione di strutture societarie, flussi di controllo e connessioni tra soggetti in contesti complessi.",
    ctas: [
      { label: 'Richiedi demo', action: { type: 'startDemo', interest: 'Indagini aziendali', sourceFlow: 'flowB', sourceScreen: 'flowB_other' } },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
];
