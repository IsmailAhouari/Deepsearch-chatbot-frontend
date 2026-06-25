import { create } from 'zustand';
import { initSession } from '../services/api.js';
import { SCREENS } from '../flows/index.js';
import i18n from '../i18n.js';

export const useSession = create((set) => ({
  // --- UI STATE ---
  open: false,
  screen: 'welcome',
  history: [],
  mobileSidebarOpen: false,
  sidebarMode: 'exploration', // 'exploration' | 'qualification'

  // --- QUALIFICATION PROFILE ---
  qualification: {
    subjectType: null,   // 'aziende' | 'persone'
    intent: null,        // normalized qualification.intent.* ID
    geoArea: null,       // Free-text (e.g. "Svizzera e Nord Italia")
    role: null,          // normalized qualification.role.* ID
    contactReason: null, // normalized qualification.contactReason.* ID (flowF)
    needType: null,      // normalized qualification.needType.* ID (flowG)
    subContext: null,    // secondary sub-selection within a use-case screen (flowB DD/Lit)
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

  // --- BACKEND SESSION ---
  backendSessionId: null, // UUID returned by POST /api/v1/sessions

  // --- QUALIFICATION HISTORY ---
  // Ordered record of every setQual call: [{screen, fields, step}]
  qualificationHistory: [],

  // --- ACTIONS ---
  open_modal: () => {
    // Reset local state immediately so the UI opens without delay.
    set({
      open: true,
      screen: 'welcome',
      history: [],
      qualification: {
        subjectType: null, intent: null, geoArea: null, role: null,
        contactReason: null, needType: null, subContext: null,
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
      backendSessionId: null,
      qualificationHistory: [],
    });
    // Fire-and-forget: create backend session; store the ID when it resolves.
    initSession({ locale: i18n.language || 'it' }).then((data) => {
      if (data?.session_id) {
        set({ backendSessionId: data.session_id });
      }
    });
  },

  close_modal: () => {
    set({ open: false, mobileSidebarOpen: false });
    window.parent.postMessage({ type: 'deepsearch:close' }, '*');
  },
  setOpen: (isOpen = true) => set({ open: isOpen }),

  toggleMobileSidebar: () => set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),

  navigate: (to) => {
    const needsNewSession = to === 'welcome' && useSession.getState().submissionStatus === 'submitted';

    set((s) => {
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
        subjectType: null, intent: null, geoArea: null, role: null,
        contactReason: null, needType: null, subContext: null,
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
          ...(needsNewSession ? { backendSessionId: null, qualificationHistory: [] } : {}),
        } : {}),
      };
    });

    if (needsNewSession) {
      initSession({ locale: i18n.language || 'it' }).then((data) => {
        if (data?.session_id) {
          set({ backendSessionId: data.session_id });
        }
      });
    }
  },

  // Explicit flow switch (sidebar / main-menu): resets all qualification AND
  // clears the navigation history — the previous flow trail is no longer relevant.
  // back() will then behave as a pure stack pop, so pressing Indietro from the
  // new flow's entry goes straight to welcome (not back into the old flow).
  navigateReset: (to) => {
    const needsNewSession = useSession.getState().submissionStatus === 'submitted';

    set((s) => {
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
        subjectType: null, intent: null, geoArea: null, role: null,
        contactReason: null, needType: null, subContext: null,
        sourceFlow: null, entryScreen: null,
      };

      return {
        history: [],          // ← clears the old flow trail; back() uses pure-pop
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
        ...(needsNewSession ? { backendSessionId: null, qualificationHistory: [] } : {}),
      };
    });

    if (needsNewSession) {
      initSession({ locale: i18n.language || 'it' }).then((data) => {
        if (data?.session_id) {
          set({ backendSessionId: data.session_id });
        }
      });
    }
  },

  back: () => set((s) => {
    // ── Pure history-stack pop ────────────────────────────────────────────
    // navigateReset() (sidebar / menu) clears history on every explicit flow
    // switch, so the stack only ever contains screens from the current
    // conversational path.  A CTA that crosses flows (e.g. flowB_aml →
    // "Contatta il team" → flowF) uses navigate(), which appends to history,
    // so pressing back correctly returns to the originating screen.
    const EMPTY_QUAL = {
      subjectType: null, intent: null, geoArea: null, role: null,
      contactReason: null, needType: null, subContext: null,
      sourceFlow: null, entryScreen: null,
    };

    const h = [...s.history];
    const prev = h.pop() ?? 'welcome';

    // Going back to welcome always wipes all qualification.
    // Otherwise read clearOnBack from the screen definition the user is leaving.
    const goingHome = prev === 'welcome';
    const qualUpdate = goingHome ? EMPTY_QUAL : (SCREENS[s.screen]?.clearOnBack ?? null);

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
    qualificationHistory: [
      ...s.qualificationHistory,
      { screen: s.screen, fields: data, step: s.qualificationHistory.length },
    ],
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
      contactReason: null, needType: null, subContext: null,
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
    backendSessionId: null,
    qualificationHistory: [],
  }),
}));
