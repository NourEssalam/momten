import { create } from 'zustand'

type CategoryStore = {
  category: string
  setCategory: (newCategory: string) => void // Accepts a new category
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  category: 'All',
  setCategory: (newCategory: string) => set(() => ({ category: newCategory })), // Sets new category
}))
