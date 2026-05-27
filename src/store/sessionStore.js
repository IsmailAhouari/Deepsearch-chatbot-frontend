import { create } from 'zustand';

export const useSession = create((set, get) => ({
  // --- UI STATE ---
  open: false,
  screen: 'welcome',
  history: [],
  mobileSidebarOpen: false,
  sidebarMode: 'exploration', // 'exploration' | 'qualification'

  // --- QUALIFICATION PROFILE ---
  qualification: {
    subjectType: null,   // 'Aziende' | 'Persone'
    intent: null,        // 'Due Diligence' | 'Analisi AML' | ...
    geoArea: null,       // Free-text (e.g. "Svizzera e Nord Italia")
    role: null,          // 'Security / Risk' | 'Legale / Contenzioso' | ...
    sourceFlow: null,    // Which exploratory flow they came from
    entryScreen: null,   // Exact screen they entered from
  },

  // --- ENGAGEMENT TRACKING ---
  engagementScore: 0,
  visitedScreens: [],
  intentSignals: {
    aml: 0,
    dueDiligence: 0,
    riskManagement: 0,
    suppliers: 0,
  },

  // --- LEAD INFORMATION ---
  lead: {
    nome: '',
    azienda: '',
    email: '',
    telefono: '',
    ruolo: '',
    paese: '',
    note: '',
  },

  // --- CONVERSION & SUBMISSION ---
  submissionStatus: 'idle', // 'idle' | 'submitting' | 'submitted' | 'error'
  errorMessage: null,
  sessionStart: Date.now(),

  // --- ACTIONS ---
  open_modal: () => set({
    open: true,
    screen: 'welcome',
    history: [],
    qualification: {
      subjectType: null, intent: null, geoArea: null, role: null,
      sourceFlow: null, entryScreen: null,
    },
    lead: { nome: '', azienda: '', email: '', telefono: '', ruolo: '', paese: '', note: '' },
    engagementScore: 0,
    visitedScreens: [],
    intentSignals: { aml: 0, dueDiligence: 0, riskManagement: 0, suppliers: 0 },
    submissionStatus: 'idle',
    errorMessage: null,
    sidebarMode: 'exploration',
    sessionStart: Date.now(),
  }),

  close_modal: () => set({ open: false, mobileSidebarOpen: false }),
  setOpen: (isOpen = true) => set({ open: isOpen }),

  toggleMobileSidebar: () => set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),

  navigate: (to) => set((s) => {
    // Intent signal tracking based on screen ID keywords
    const SIGNAL_MAP = {
      aml:            ['aml', 'kyc'],
      dueDiligence:   ['_dd', 'due'],
      riskManagement: ['risk', 'flowC_compliance'],
      suppliers:      ['supplier'],
    };
    const signals = { ...s.intentSignals };
    for (const [key, terms] of Object.entries(SIGNAL_MAP)) {
      if (terms.some(t => to.toLowerCase().includes(t))) signals[key] += 1;
    }

    // Navigating to the main menu resets all explicit qualification choices
    // so the next demo request always starts from a clean state.
    const goingHome = to === 'welcome';

    return {
      history: [...s.history, s.screen],
      screen: to,
      mobileSidebarOpen: false,
      engagementScore: s.engagementScore + 1,
      visitedScreens: s.visitedScreens.includes(to)
        ? s.visitedScreens
        : [...s.visitedScreens, to],
      intentSignals: signals,
      sidebarMode: to.startsWith('funnel_') ? 'qualification' : 'exploration',
      ...(goingHome ? {
        qualification: {
          subjectType: null, intent: null, geoArea: null, role: null,
          sourceFlow: null, entryScreen: null,
        },
        submissionStatus: 'idle',
        errorMessage: null,
      } : {}),
    };
  }),

  back: () => set((s) => {
    const h = [...s.history];
    const prev = h.pop() ?? 'welcome';

    // When stepping back through the qualification funnel, clear the choice
    // that was captured at the departing screen so the user re-enters it fresh.
    const FUNNEL_QUAL_CLEAR = {
      'funnel_subject':        { subjectType: null },
      'funnel_intent_company': { intent: null },
      'funnel_intent_person':  { intent: null },
      'funnel_geo':            { geoArea: null },
      'funnel_role_company':   { role: null },
      'funnel_role_person':    { role: null },
    };

    const qualUpdate = FUNNEL_QUAL_CLEAR[s.screen];

    return {
      screen: prev,
      history: h,
      mobileSidebarOpen: false,
      sidebarMode: prev.startsWith('funnel_') ? 'qualification' : 'exploration',
      ...(qualUpdate ? { qualification: { ...s.qualification, ...qualUpdate } } : {}),
    };
  }),

  setQual: (data) => set((s) => ({
    qualification: { ...s.qualification, ...data },
  })),

  setLead: (data) => set((s) => ({
    lead: { ...s.lead, ...data },
  })),

  setSubmissionStatus: (status, msg = null) => set({
    submissionStatus: status,
    errorMessage: msg,
  }),

  /**
   * Start the qualification funnel with contextual bypass.
   * Skips steps already answered through exploratory navigation.
   */
  startDemoFlow: (actionData = {}) => set((s) => {
    // Merge any context passed from the CTA's action object
    const updates = {};
    if (actionData.sourceFlow) updates.sourceFlow = actionData.sourceFlow;
    if (actionData.interest)   updates.intent = actionData.interest;
    if (actionData.role)       updates.role = actionData.role;

    const q = { ...s.qualification, ...updates };

    // Contextual bypass: skip steps already answered
    let target;
    if (!q.subjectType)       target = 'funnel_subject';
    else if (!q.intent)       target = q.subjectType === 'Persone' ? 'funnel_intent_person' : 'funnel_intent_company';
    else if (!q.geoArea)      target = 'funnel_geo';
    else if (!q.role)         target = q.subjectType === 'Persone' ? 'funnel_role_person' : 'funnel_role_company';
    else                      target = 'funnel_form';

    return {
      open: true,
      qualification: { ...s.qualification, ...updates },
      history: s.screen !== 'welcome' ? [...s.history, s.screen] : s.history,
      screen: target,
      sidebarMode: 'qualification',
      mobileSidebarOpen: false,
    };
  }),

  resetSession: () => set({
    screen: 'welcome',
    history: [],
    qualification: {
      subjectType: null, intent: null, geoArea: null, role: null,
      sourceFlow: null, entryScreen: null,
    },
    lead: { nome: '', azienda: '', email: '', telefono: '', ruolo: '', paese: '', note: '' },
    engagementScore: 0,
    visitedScreens: [],
    intentSignals: { aml: 0, dueDiligence: 0, riskManagement: 0, suppliers: 0 },
    submissionStatus: 'idle',
    errorMessage: null,
    sidebarMode: 'exploration',
    sessionStart: Date.now(),
  }),
}));
