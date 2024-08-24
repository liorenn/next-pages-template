import { primaryColor, scale } from '@/config'

import { create } from 'zustand'

interface ThemeState {
  primaryColor: string
  scale: number
  setPrimaryColor: (color: string) => void
  setScale: (scaling: number) => void
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  primaryColor,
  scale,
  setPrimaryColor: (color: string) => {
    localStorage.setItem('primaryColor', color)
    set({ primaryColor: color })
  },
  setScale: (scaling: number) => {
    localStorage.setItem('scaling', String(scaling))
    set({ scale: scaling })
  },
}))
