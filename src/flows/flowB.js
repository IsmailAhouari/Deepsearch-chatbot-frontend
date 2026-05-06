export const flowBScreens = [
  {
    id: 'flowB',
    showSidebar: true,
    prompt: "Quale caso d'uso è più vicino al tuo interesse?",
    choices: [
      { label: 'Due diligence controparti', target: 'flowB_dd' },
      { label: 'Indagini aziendali', target: 'flowB_other' },
      { label: 'Litigation intelligence', target: 'flowB_lit' },
      { label: 'Analisi reputazionale', target: 'flowB_rep' },
      { label: 'AML / KYC', target: 'flowB_aml' },
      { label: 'Rischio fornitori / terze parti', target: 'flowB_supplier' },
      { label: 'Altro', target: 'flowG' },
    ],
  },
  {
    id: 'flowB_dd',
    showSidebar: true,
    message: "DeepSearch consente di comprendere con chi si sta realmente operando, individuando relazioni societarie, esposizioni e segnali di rischio prima della formalizzazione di un accordo.",
    prompt: 'Il tuo caso riguarda:',
    choices: [
      { label: 'Fornitore', target: 'flowB_dd_sub' },
      { label: 'Cliente', target: 'flowB_dd_sub' },
      { label: 'Partner', target: 'flowB_dd_sub' },
      { label: 'Target di investimento', target: 'flowB_dd_sub' },
      { label: 'Altro', target: 'flowB_dd_sub' },
    ],
  },
  {
    id: 'flowB_dd_sub',
    showSidebar: true,
    message: "DeepSearch fornisce un framework strutturato per l'analisi della controparte: struttura societaria, UBO, esposizione mediatica e precedenti rilevanti — in un unico report di intelligence.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_lit',
    showSidebar: true,
    message: "DeepSearch supporta studi legali e consulenti nella ricostruzione delle relazioni tra soggetti coinvolti in contenziosi, identificando asset, connessioni e precedenti utili alla strategia legale.",
    prompt: 'Il contesto è:',
    choices: [
      { label: 'Contenzioso civile', target: 'flowB_lit_sub' },
      { label: 'Disputa commerciale', target: 'flowB_lit_sub' },
      { label: 'Asset tracing', target: 'flowB_lit_sub' },
      { label: 'Pre-contenzioso', target: 'flowB_lit_sub' },
    ],
  },
  {
    id: 'flowB_lit_sub',
    showSidebar: true,
    message: "DeepSearch ricostruisce reti relazionali e flussi di controllo utili a supportare la strategia legale: identificazione di asset, soggetti collegati e segnali di rischio documentati da fonti aperte.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatto riservato', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_rep',
    showSidebar: true,
    message: "DeepSearch monitora e analizza l'esposizione reputazionale di soggetti e organizzazioni: segnali mediatici, associazioni negative e dinamiche di sentiment in contesti ad alto rischio.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_aml',
    showSidebar: true,
    message: "DeepSearch supporta i processi AML e KYC attraverso l'analisi relazionale avanzata: identificazione di PEP, soggetti sanzionati, strutture societarie opache e reti di controllo non dichiarate.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_supplier',
    showSidebar: true,
    message: "DeepSearch analizza la catena di fornitura e le terze parti identificando rischi nascosti: esposizioni reputazionali, connessioni societarie a soggetti critici e segnali di instabilità operativa.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
  {
    id: 'flowB_other',
    showSidebar: true,
    message: "DeepSearch supporta indagini aziendali attraverso la ricostruzione di strutture societarie, flussi di controllo e connessioni tra soggetti in contesti complessi.",
    ctas: [
      { label: 'Richiedi demo', target: 'flowD_interest' },
      { label: 'Contatta il team', target: 'flowF' },
    ],
  },
];
