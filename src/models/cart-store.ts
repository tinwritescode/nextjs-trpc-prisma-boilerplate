import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { produce } from 'immer'

interface Item {
  name: string
  id: string
}

interface CartState {
  items: Item[]
  addItem: (item: Item) => void
  clearItem: () => void
}

export const useCartStore = create<CartState>()(
  devtools(
    persist((set) => ({
      items: [],
      // addItem immer
      addItem: (item: Item) =>
        set(
          produce((draft) => {
            draft.items.push(item)
          })
        ),
      clearItem: () =>
        set(
          produce((draft) => {
            draft.items = []
          })
        ),
    })),
    {
      name: 'CartStore',
    }
  )
)
