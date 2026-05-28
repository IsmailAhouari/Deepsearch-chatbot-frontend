/**
 * Progressive Lead Qualification Funnel
 *
 * Step 1 (funnel_subject): Subject type — Aziende / Persone
 * Step 2: Intent — dynamic based on subject type
 * Step 3: Geographic area — free text
 * Step 4: Role / function — dynamic based on subject type
 * Step 5: Demo contact form (with qualification summary)
 */
export const funnelScreens = [
  // Step 1: Subject type selection (entry point for demo funnel)
  {
    id: 'funnel_subject',
    showSidebar: true,
    message: 'Per mostrarti DeepSearch nel modo più rilevante,\nho bisogno di capire qual è il tuo scenario principale.',
    prompt: 'Stai analizzando principalmente:',
    choices: [
      {
        label: 'Aziende',
        sublabel: 'Verifica societaria, due diligence, controparti',
        target: 'funnel_intent_company',
        capture: { key: 'subjectType', value: 'Aziende' },
        icon: '◈',
      },
      {
        label: 'Persone',
        sublabel: 'Background check, verifica profili, screening',
        target: 'funnel_intent_person',
        capture: { key: 'subjectType', value: 'Persone' },
        icon: '❖',
      },
    ],
  },

  // Step 2a: Intent for Companies
  {
    id: 'funnel_intent_company',
    showSidebar: true,
    message: 'Per capire meglio il tuo scenario,\nqual è l\'ambito più vicino alla tua esigenza?',
    prompt: 'Obiettivo principale:',
    choices: [
      { label: 'Due Diligence',          target: 'funnel_geo', capture: { key: 'intent', value: 'Due Diligence' } },
      { label: 'Selezione partner affari',target: 'funnel_geo', capture: { key: 'intent', value: 'Selezione partner affari' } },
      { label: 'Analisi AML',            target: 'funnel_geo', capture: { key: 'intent', value: 'Analisi AML' } },
      { label: 'Analisi del rischio',    target: 'funnel_geo', capture: { key: 'intent', value: 'Analisi del rischio' } },
      { label: 'Verifica fornitori',     target: 'funnel_geo', capture: { key: 'intent', value: 'Verifica fornitori' } },
      { label: 'Litigation intelligence',target: 'funnel_geo', capture: { key: 'intent', value: 'Litigation intelligence' } },
      { label: 'Rischio reputazionale',  target: 'funnel_geo', capture: { key: 'intent', value: 'Rischio reputazionale' } },
      { label: 'Altro',                  target: 'funnel_geo', capture: { key: 'intent', value: 'Altro' } },
    ],
  },

  // Step 2b: Intent for People
  {
    id: 'funnel_intent_person',
    showSidebar: true,
    message: 'Per persone fisiche, DeepSearch supporta background check, analisi reputazionale, screening AML e verifica delle reti relazionali.\n\nIndica l\'ambito più vicino alla tua esigenza.',
    prompt: 'Obiettivo principale:',
    choices: [
      { label: 'Assunzione dipendente',  target: 'funnel_geo', capture: { key: 'intent', value: 'Assunzione dipendente' } },
      { label: 'Analisi AML',            target: 'funnel_geo', capture: { key: 'intent', value: 'Analisi AML' } },
      { label: 'Analisi del rischio',    target: 'funnel_geo', capture: { key: 'intent', value: 'Analisi del rischio' } },
      { label: 'Litigation intelligence',target: 'funnel_geo', capture: { key: 'intent', value: 'Litigation intelligence' } },
      { label: 'Rischio reputazionale',  target: 'funnel_geo', capture: { key: 'intent', value: 'Rischio reputazionale' } },
      { label: 'Altro',                  target: 'funnel_geo', capture: { key: 'intent', value: 'Altro' } },
    ],
  },

  // Step 3: Geographic area (free text input)
  {
    id: 'funnel_geo',
    showSidebar: true,
    component: 'freetext',
    message: 'Qual è il contesto geografico principale del tuo interesse?',
    submitLabel: 'Continua',
    placeholder: 'Inserisci la nazione',
    freeTextCaptureKey: 'geoArea',
    freeTextTargetFn: 'bySubjectType', // Panel routes to funnel_role_company or funnel_role_person
  },

  // Step 4a: Role / function for Companies
  {
    id: 'funnel_role_company',
    showSidebar: true,
    message: 'Ogni funzione organizzativa utilizza DeepSearch con obiettivi e flussi operativi distinti.\nQuesto mi permette di strutturare la demo nel modo più pertinente.',
    prompt: 'Quale funzione ti rappresenta?',
    choices: [
      { label: 'Security / Risk',        target: 'funnel_form', capture: { key: 'role', value: 'Security / Risk' } },
      { label: 'Legale / Contenzioso',   target: 'funnel_form', capture: { key: 'role', value: 'Legale / Contenzioso' } },
      { label: 'Compliance / AML',       target: 'funnel_form', capture: { key: 'role', value: 'Compliance / AML' } },
      { label: 'HR',                     target: 'funnel_form', capture: { key: 'role', value: 'HR' } },
      { label: 'Direzione / Board',      target: 'funnel_form', capture: { key: 'role', value: 'Direzione / Board' } },
      { label: 'Investitore / Fondo',    target: 'funnel_form', capture: { key: 'role', value: 'Investitore / Fondo' } },
      { label: 'Altro',                  target: 'funnel_form', capture: { key: 'role', value: 'Altro' } },
    ],
  },

  // Step 4b: Role / function for People
  // HR prioritized first — most common for person-related investigations
  {
    id: 'funnel_role_person',
    showSidebar: true,
    message: 'Ogni funzione organizzativa utilizza DeepSearch con obiettivi e flussi operativi distinti.\nQuesto mi permette di strutturare la demo nel modo più pertinente.',
    prompt: 'Quale funzione ti rappresenta?',
    choices: [
      { label: 'HR',                     target: 'funnel_form', capture: { key: 'role', value: 'HR' } },
      { label: 'Security / Risk',        target: 'funnel_form', capture: { key: 'role', value: 'Security / Risk' } },
      { label: 'Legale / Contenzioso',   target: 'funnel_form', capture: { key: 'role', value: 'Legale / Contenzioso' } },
      { label: 'Compliance / AML',       target: 'funnel_form', capture: { key: 'role', value: 'Compliance / AML' } },
      { label: 'Direzione / Board',      target: 'funnel_form', capture: { key: 'role', value: 'Direzione / Board' } },
      { label: 'Altro',                  target: 'funnel_form', capture: { key: 'role', value: 'Altro' } },
    ],
  },

  // Step 5: Demo contact form
  {
    id: 'funnel_form',
    showSidebar: true,
    component: 'form',
    formType: 'demo',
    formSuccessTarget: 'funnel_thanks',
  },

  // Confirmation + Calendly booking
  {
    id: 'funnel_thanks',
    showSidebar: true,
    component: 'thanks',
    message: "Grazie.\nLa richiesta è stata acquisita.\nUn referente DeepSearch ti contatterà entro 24 ore.",
    showCalendly: true,
  },
];

/**
 * Returns the funnel step number (1–6) for a given screen ID.
 * Returns 0 for non-funnel screens.
 */
export function getFunnelStep(screenId) {
  if (screenId === 'funnel_subject') return 1;
  if (screenId === 'funnel_intent_company' || screenId === 'funnel_intent_person') return 2;
  if (screenId === 'funnel_geo') return 3;
  if (screenId === 'funnel_role_company' || screenId === 'funnel_role_person') return 4;
  if (screenId === 'funnel_form') return 5;
  if (screenId === 'funnel_thanks') return 6;
  return 0;
}
