import { create } from 'zustand'

type NavigationStore = {
  activeSection: string
  setActiveSection: (section: string) => void
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeSection: 'hero',
  setActiveSection: (section) => set({ activeSection: section }),
}))
