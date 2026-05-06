import { create } from 'zustand';

/**
 * Chat application state management
 * Handles messages, flows, forms, and session state
 */
export const useChatStore = create((set, get) => ({
  // Session state
  sessionStart: null,
  sessionActive: false,
  sidebarVisible: false,
  
  // Navigation state
  currentFlow: 'welcome',
  currentStep: 0,
  
  // Messages
  messages: [],
  isTyping: false,
  
  // User data
  userData: {},
  consent: {
    level1: false,
    level2: false,
    level3: false,
  },
  
  // Form state
  formData: {},
  formErrors: {},
  
  // Actions
  startSession: () => set({
    sessionStart: new Date(),
    sessionActive: true,
    sidebarVisible: false,
    messages: [],
    userData: {},
    currentFlow: 'welcome',
    currentStep: 0,
  }),
  
  endSession: () => set({
    sessionActive: false,
    sidebarVisible: false,
    sessionStart: null,
    messages: [],
    userData: {},
    currentFlow: 'welcome',
    currentStep: 0,
    consent: { level1: false, level2: false, level3: false },
  }),
  
  navigateToFlow: (flowId) => set({
    currentFlow: flowId,
    currentStep: 0,
    sidebarVisible: flowId !== 'welcome',
  }),
  
  showSidebar: () => set({ sidebarVisible: true }),
  hideSidebar: () => set({ sidebarVisible: false }),
  
  nextStep: () => set((state) => ({
    currentStep: state.currentStep + 1,
  })),
  
  addMessage: (content, type = 'bot', metadata = {}) => set((state) => ({
    messages: [...state.messages, {
      id: `msg-${Date.now()}`,
      content,
      type,
      timestamp: new Date(),
      ...metadata,
    }],
  })),
  
  clearMessages: () => set({ messages: [] }),
  
  setTyping: (isTyping) => set({ isTyping }),
  
  updateUserData: (data) => set((state) => ({
    userData: { ...state.userData, ...data },
  })),
  
  setConsent: (level, value) => set((state) => ({
    consent: { ...state.consent, [level]: value },
  })),
  
  updateFormData: (data) => set((state) => ({
    formData: { ...state.formData, ...data },
  })),
  
  setFormErrors: (errors) => set({ formErrors: errors }),
  
  clearFormData: () => set({
    formData: {},
    formErrors: {},
  }),
  
  // Selectors
  getSessionDuration: () => {
    const state = get();
    if (!state.sessionStart) return null;
    return new Date() - state.sessionStart;
  },
  
  getLastMessage: () => {
    const state = get();
    return state.messages[state.messages.length - 1] || null;
  },
}));

export default useChatStore;
