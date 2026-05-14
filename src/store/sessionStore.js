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

  /**
   * Start the qualification funnel from the beginning.
   * Used by the trigger widget's "Richiedi Demo" shortcut.
   */
  startDemoFlow: () => set((s) => ({
    open: true,
    history: s.screen !== 'welcome' ? [...s.history, s.screen] : s.history,
    screen: 'welcome',
    mobileSidebarOpen: false,
  })),
}));
