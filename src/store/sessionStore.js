import { create } from 'zustand';

export const useSession = create((set) => ({
  open: false,
  screen: 'welcome',
  history: [],
  qualification: {},
  lead: {},
  mobileSidebarOpen: false,

  open_modal: () => set({ open: true, screen: 'welcome', history: [], qualification: {}, lead: {} }),
  close_modal: () => set({ open: false, mobileSidebarOpen: false }),
  setOpen: (isOpen = true) => set({ open: isOpen }),

  toggleMobileSidebar: () => set((s) => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
  closeMobileSidebar: () => set({ mobileSidebarOpen: false }),

  navigate: (to) => set((s) => {
    // Auto-close sidebar on mobile navigation
    return {
      history: [...s.history, s.screen],
      screen: to,
      mobileSidebarOpen: false,
    };
  }),

  back: () => set((s) => {
    const h = [...s.history];
    const prev = h.pop() ?? 'welcome';
    return { screen: prev, history: h, mobileSidebarOpen: false };
  }),

  setQual: (data) => set((s) => ({
    qualification: { ...s.qualification, ...data },
  })),

  setLead: (data) => set((s) => ({
    lead: { ...s.lead, ...data },
  })),

  startDemoFlow: ({ interest, role, selectedPersona, selectedPersonaLabel, sourceFlow, sourceScreen } = {}) => set((s) => {
    let nextScreen = 'flowD_interest';
    const newQual = { ...s.qualification, sourceFlow, sourceScreen };

    if (interest) {
      newQual.interest = interest;
      newQual.selectedUseCase = interest;
      nextScreen = 'flowD_role';
    }

    if (role) {
      newQual.role = role;
      newQual.selectedPersona = selectedPersona;
      newQual.selectedPersonaLabel = selectedPersonaLabel;
      nextScreen = 'flowD_org';
    }

    return {
      qualification: newQual,
      history: [...s.history, s.screen],
      screen: nextScreen,
      mobileSidebarOpen: false
    };
  }),
}));
