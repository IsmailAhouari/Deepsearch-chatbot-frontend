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
      subjectType: null, intent: null, interest: null, geoArea: null, role: null,
      funcRole: null, needType: null,
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

    const EMPTY_QUAL = {
      subjectType: null, intent: null, interest: null, geoArea: null, role: null,
      funcRole: null, needType: null,
      sourceFlow: null, entryScreen: null,
    };

    // Going home (welcome) always resets — anything else preserves qualification
    // so that cross-flow CTAs (e.g. flowB → "Contatta il team") carry context forward.
    // Explicit sidebar / menu switches use navigateReset() instead.
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
        qualification: EMPTY_QUAL,
        submissionStatus: 'idle',
        errorMessage: null,
      } : {}),
    };
  }),

  // Explicit flow switch (sidebar / main-menu): resets all qualification first,
  // then navigates — prevents stale data from a previous branch bleeding through.
  navigateReset: (to) => set((s) => {
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

    const EMPTY_QUAL = {
      subjectType: null, intent: null, interest: null, geoArea: null, role: null,
      funcRole: null, needType: null,
      sourceFlow: null, entryScreen: null,
    };

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
      qualification: EMPTY_QUAL,
      submissionStatus: 'idle',
      errorMessage: null,
    };
  }),

  back: () => set((s) => {
    // ── Helper: extract the flow family from a screen ID ──────────────────
    const getFamily = (id) => {
      if (!id) return null;
      const m = id.match(/^(flowA|flowB|flowC|flowD|flowF|flowG|funnel)/);
      return m ? m[1] : null;
    };

    // Entry screens for each exploration flow — back goes no further than these
    const FLOW_ROOTS = {
      flowA: 'flowA', flowB: 'flowB', flowC: 'flowC',
      flowD: 'flowD', flowF: 'flowF', flowG: 'flowG_intro',
    };

    const EMPTY_QUAL = {
      subjectType: null, intent: null, interest: null, geoArea: null, role: null,
      funcRole: null, needType: null,
      sourceFlow: null, entryScreen: null,
    };

    // Clears what each screen captured when the user backs out of it.
    const SCREEN_QUAL_CLEAR = {
      // ── Funnel ──────────────────────────────────────────────────────────
      'funnel_subject':        { subjectType: null },
      'funnel_intent_company': { intent: null },
      'funnel_intent_person':  { intent: null },
      'funnel_geo':            { geoArea: null },
      'funnel_role_company':   { role: null },
      'funnel_role_person':    { role: null },
      // ── flowA ────────────────────────────────────────────────────────────
      'flowA':                 { subjectType: null, intent: null },
      'flowA_geo':             { geoArea: null },
      'flowA_role':            { role: null },
      // ── flowB ────────────────────────────────────────────────────────────
      'flowB':                 { subjectType: null },
      'flowB_dd':              { intent: null },
      'flowB_dd_sub':          { intent: null },
      'flowB_lit':             { intent: null },
      'flowB_lit_sub':         { intent: null },
      'flowB_rep':             { intent: null },
      'flowB_aml':             { intent: null },
      'flowB_supplier':        { intent: null },
      'flowB_other':           { intent: null },
      // ── flowC ────────────────────────────────────────────────────────────
      'flowC':                 { subjectType: null },
      'flowC_risk':            { role: null },
      'flowC_legal':           { role: null },
      'flowC_compliance':      { role: null },
      'flowC_hr':              { role: null },
      'flowC_board':           { role: null },
      'flowC_fund':            { role: null },
      // ── flowF ────────────────────────────────────────────────────────────
      'flowF':                 { interest: null },
      'flowF_geo':             { geoArea: null },
      // ── flowG ────────────────────────────────────────────────────────────
      'flowG_intro':           { customRequestText: null },
      'flowG_function':        { funcRole: null },
      'flowG_geo':             { geoArea: null },
      'flowG_need':            { needType: null },
    };

    const currentFamily = getFamily(s.screen);
    const h = [...s.history];
    let prev;

    if (currentFamily && FLOW_ROOTS[currentFamily]) {
      // ── Exploration flow: stay within the same flow ──────────────────────
      // Find the most recent history entry that belongs to the same flow family.
      let targetIdx = -1;
      for (let i = h.length - 1; i >= 0; i--) {
        if (getFamily(h[i]) === currentFamily) { targetIdx = i; break; }
      }
      if (targetIdx >= 0) {
        prev = h[targetIdx];
        h.length = targetIdx; // discard everything after the target
      } else {
        // Nothing in history for this flow — go to Menu principale
        prev = 'welcome';
        h.length = 0;
      }
    } else {
      // ── Funnel or other: standard pop ────────────────────────────────────
      prev = h.pop() ?? 'welcome';
    }

    // Going back to welcome always wipes everything
    const goingHome = prev === 'welcome';
    const qualUpdate = goingHome ? EMPTY_QUAL : SCREEN_QUAL_CLEAR[s.screen];

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
      subjectType: null, intent: null, interest: null, geoArea: null, role: null,
      funcRole: null, needType: null,
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
