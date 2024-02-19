import { create } from 'zustand'

type SearchOpenStore = {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSearchOpen = create<SearchOpenStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
