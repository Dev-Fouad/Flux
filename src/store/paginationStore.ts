import { create } from 'zustand';

interface PaginationStore {
  currentPage: number;
  itemsPerPage: number;
  isLoadingPage: boolean;
  
  // Actions
  setCurrentPage: (page: number) => void;
  setItemsPerPage: (count: number) => void;
  setLoadingPage: (loading: boolean) => void;
  goToPage: (page: number, totalPages: number) => void;
  nextPage: (totalPages: number) => void;
  prevPage: () => void;
  reset: () => void;
}

export const usePaginationStore = create<PaginationStore>((set, get) => ({
  currentPage: 1,
  itemsPerPage: 6,
  isLoadingPage: false,

  setCurrentPage: (page) => set({ currentPage: page }),
  setItemsPerPage: (count) => set({ itemsPerPage: count, currentPage: 1 }),
  setLoadingPage: (loading) => set({ isLoadingPage: loading }),

  goToPage: async (page, totalPages) => {
    if (page >= 1 && page <= totalPages && page !== get().currentPage) {
      set({ isLoadingPage: true });
      
      await new Promise(resolve => setTimeout(resolve, 400));
      
      set({ currentPage: page, isLoadingPage: false });
    }
  },

  nextPage: (totalPages) => {
    const { currentPage, goToPage } = get();
    if (currentPage < totalPages) {
      goToPage(currentPage + 1, totalPages);
    }
  },

  prevPage: () => {
    const { currentPage, goToPage } = get();
    if (currentPage > 1) {
      goToPage(currentPage - 1, 999); 
    }
  },

  reset: () => set({ currentPage: 1, isLoadingPage: false }),
})); 