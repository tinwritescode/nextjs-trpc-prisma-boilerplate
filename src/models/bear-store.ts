import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface Bear {
  name: string
}

interface BearState {
  bears: Bear[]
  addBear: (bear: Bear) => void
  clearBear: () => void
}

export const useBearStore = create<BearState>()(
  devtools(
    persist((set) => ({
      bears: [],
      addBear: (bear: Bear) => {
        set((state) => ({
          bears: [...state.bears, bear],
        }))
      },
      clearBear: () => {
        set((state) => ({
          bears: [],
        }))
      },
    })),
    {
      name: 'BearStore',
    }
  )
)
