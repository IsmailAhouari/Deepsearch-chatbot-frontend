import { create } from 'zustand';

export const useSession = create((set, get) => ({
  open: false,
  screen: 'welcome',
  history: [],
  qualification: {},
  lead: {},

  open_modal: () => set({ open: true, screen: 'welcome', history: [], qualification: {}, lead: {} }),
  close_modal: () => set({ open: false }),

  navigate: (to) => set((s) => ({
    history: [...s.history, s.screen],
    screen: to,
  })),

  back: () => set((s) => {
    const h = [...s.history];
    const prev = h.pop() ?? 'welcome';
    return { screen: prev, history: h };
  }),

  setQual: (data) => set((s) => ({
    qualification: { ...s.qualification, ...data },
  })),

  setLead: (data) => set((s) => ({
    lead: { ...s.lead, ...data },
  })),
}));
