import { create } from 'zustand'

type clickedSeachElement = {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useClickedSearchElement = create<clickedSeachElement>((set) => ({
  open: false,
  setOpen: (open) => set(() => ({ open })),
}))
