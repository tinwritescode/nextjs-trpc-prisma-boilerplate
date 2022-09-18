import create from 'zustand'
import { devtools } from 'zustand/middleware'

type OrderStoreState = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  isFloatingOpen: boolean
  setIsFloatingOpen: (isOpen: boolean) => void
  toggleIsFloatingOpen: () => void
}

export const OrderStore = create<OrderStoreState>()(
  devtools((set, get) => ({
    selectedDate: new Date(),
    setSelectedDate: (date: Date) => set({ selectedDate: date }),
    isFloatingOpen: false,
    setIsFloatingOpen: (isOpen: boolean) => set({ isFloatingOpen: isOpen }),
    toggleIsFloatingOpen: () => set({ isFloatingOpen: !get().isFloatingOpen }),
  }))
)
