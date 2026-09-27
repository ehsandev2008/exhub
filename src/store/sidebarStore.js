import { create } from "zustand";

export const useSidebarStore = create((set) => ({
  isOpenMobile: false,
  isCollapsedDesktop: false,
  activeItem: "dashboard",
  openSubmenus: {
    openBanking: false,
    exchange: false,
    inquiry: false,
  },

  // Mobile actions
  toggleMobile: () => set((state) => ({ isOpenMobile: !state.isOpenMobile })),
  openMobile: () => set({ isOpenMobile: true }),
  closeMobile: () => set({ isOpenMobile: false }),

  // Desktop actions
  toggleDesktopCollapse: () =>
    set((state) => ({ isCollapsedDesktop: !state.isCollapsedDesktop })),

  // Active item
  setActiveItem: (id) => set({ activeItem: id }),

  // Submenu toggle
  toggleSubmenu: (id) =>
    set((state) => ({
      openSubmenus: {
        ...state.openSubmenus,
        [id]: !state.openSubmenus[id],
      },
    })),
}));
