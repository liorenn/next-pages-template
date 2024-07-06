import { User } from 'lucia'
import { create } from 'zustand'

interface AuthStore {
  isAuthed: boolean
  setIsAuthed: (isAuthed: boolean) => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthed: false,
  setIsAuthed: (isAuthed) => set({ isAuthed }),
}))
