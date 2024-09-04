import { createJSONStorage, persist } from 'zustand/middleware'

import { create } from 'zustand'

export const scale = 1

export const themeOptions = ['dark', 'light', 'auto']
export const primaryColor: Color = {
  name: 'default',
  color: 'white',
}
export const colors: Color[] = [
  {
    name: 'blue',
    color: 'blue',
  },
  {
    name: 'lime',
    color: 'lime',
  },
  {
    name: 'grape',
    color: 'grape',
  },
  {
    name: 'orange',
    color: 'orange',
  },
  {
    name: 'adaptive',
    color: 'white',
  },
]

export type Color = {
  name: string
  color: string
}

interface ThemeState {
  primaryColor: Color
  scale: number
  setPrimaryColor: (color: Color) => void
  setScale: (scaling: number) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      primaryColor,
      scale,
      setPrimaryColor: (color: Color) => set({ primaryColor: color }),
      setScale: (scaling: number) => set({ scale: scaling }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
