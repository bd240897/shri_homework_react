import { persist } from 'zustand/middleware';
import { create } from 'zustand';

export const useStore = create(
  persist(
    (set) => ({
      history: [],
      updateHistory: (newElement) =>
        set((state) => ({ history: [...state.history, newElement] })),
      clearHistory: () => set((state) => ({ history: [] })),
      deleteHistoryItem: (id) =>
        set((state) => ({
          history: state.history.filter((el) => el.id !== id),
        })),
    }),
    { name: 'history-storage' }
  )
);
