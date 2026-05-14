/**
 * Progressive Lead Qualification Funnel
 *
 * Step 1 (welcome.js): Subject type — Aziende / Persone
 * Step 2: Intent — dynamic based on subject type
 * Step 3: Geographic area — free text
 * Step 4: Role / function — dynamic based on subject type
 * Step 5: Demo contact form (with qualification summary)
 */
export const funnelScreens = [
  // Step 2a: Intent for Companies
  {
    id: 'funnel_intent_company',
    showSidebar: true,
    message: 'Per quali motivi stai cercando informazioni su aziende?',
    prompt: 'Motivazione della ricerca:',
    choices: [
      { label: 'Due Diligence', target: 'funnel_geo' },
      { label: 'Selezione partner affari', target: 'funnel_geo' },
      { label: 'Analisi AML', target: 'funnel_geo' },
      { label: 'Analisi del rischio', target: 'funnel_geo' },
      { label: 'Verifica fornitori', target: 'funnel_geo' },
      { label: 'Litigation intelligence', target: 'funnel_geo' },
      { label: 'Rischio reputazionale', target: 'funnel_geo' },
      { label: 'Altro', target: 'funnel_geo' },
    ],
  },
  // Step 2b: Intent for People
  {
    id: 'funnel_intent_person',
    showSidebar: true,
    message: 'Per quali motivi stai cercando informazioni su persone?',
    prompt: 'Motivazione della ricerca:',
    choices: [
      { label: 'Assunzione dipendente', target: 'funnel_geo' },
      { label: 'Analisi AML', target: 'funnel_geo' },
      { label: 'Analisi del rischio', target: 'funnel_geo' },
      { label: 'Litigation intelligence', target: 'funnel_geo' },
      { label: 'Rischio reputazionale', target: 'funnel_geo' },
      { label: 'Altro', target: 'funnel_geo' },
    ],
  },
  // Step 3: Geographic area (free text input)
  {
    id: 'funnel_geo',
    showSidebar: true,
    component: 'freetext',
    message: 'In quale area geografica si concentra il tuo interesse?',
    submitLabel: 'Continua',
    placeholder: 'Inserisci la nazione',
  },
  // Step 4a: Role / function for Companies
  {
    id: 'funnel_role_company',
    showSidebar: true,
    message: 'Per indirizzare correttamente la richiesta:',
    prompt: 'Quale funzione ti rappresenta?',
    choices: [
      { label: 'Security / Risk', target: 'funnel_form' },
      { label: 'Legale / Contenzioso', target: 'funnel_form' },
      { label: 'Compliance / AML', target: 'funnel_form' },
      { label: 'HR', target: 'funnel_form' },
      { label: 'Direzione / Board', target: 'funnel_form' },
      { label: 'Investitore / Fondo', target: 'funnel_form' },
      { label: 'Altro', target: 'funnel_form' },
    ],
  },
  // Step 4b: Role / function for People
  // "Investitore / Fondo" excluded — not semantically coherent for person-centric flows
  // HR prioritized first — most common for person-related investigations
  {
    id: 'funnel_role_person',
    showSidebar: true,
    message: 'Per indirizzare correttamente la richiesta:',
    prompt: 'Quale funzione ti rappresenta?',
    choices: [
      { label: 'HR', target: 'funnel_form' },
      { label: 'Security / Risk', target: 'funnel_form' },
      { label: 'Legale / Contenzioso', target: 'funnel_form' },
      { label: 'Compliance / AML', target: 'funnel_form' },
      { label: 'Direzione / Board', target: 'funnel_form' },
      { label: 'Altro', target: 'funnel_form' },
    ],
  },
  // Step 5: Demo contact form
  {
    id: 'funnel_form',
    showSidebar: true,
    component: 'form',
    formType: 'demo',
  },
  // Confirmation
  {
    id: 'funnel_thanks',
    showSidebar: true,
    component: 'thanks',
    message: "Grazie.\nLa richiesta è stata acquisita.\nUn referente DeepSearch ti contatterà entro 24 ore.",
  },
];
