import { create } from 'zustand';
import { Product, ProductCategory, SortOption } from '../types';
import { mockProducts } from '../data/mockProducts';

interface ProductStore {
  filteredProducts: Product[];
  
  categories: ProductCategory[];
  searchQuery: string;
  sortBy: SortOption;
  
  // Loading states
  isLoading: boolean;
  
  setSortBy: (sortBy: SortOption) => void;
  setSearchQuery: (query: string) => void;
  addCategoryFilter: (category: ProductCategory) => void;
  clearFilters: () => void;
  refreshProducts: () => void;
  
  applyFiltersAndSort: () => void;
}

const initialState = {
  filteredProducts: mockProducts,
  categories: [],
  searchQuery: '',
  sortBy: 'newest-first' as SortOption,
  isLoading: false,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFiltersAndSort();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().applyFiltersAndSort();
  },

  addCategoryFilter: (category) => {
    set((state) => ({
      categories: [...state.categories, category],
    }));
    get().applyFiltersAndSort();
  },

  clearFilters: () => {
    set({ categories: [] });
    get().applyFiltersAndSort();
  },

  refreshProducts: () => {
    set({ isLoading: true });
    
    setTimeout(() => {
      set({
        ...initialState,
        isLoading: false,
      });
      get().applyFiltersAndSort();
    }, 800);
  },

  applyFiltersAndSort: () => {
    let filtered = [...mockProducts];

    // Apply search filter
    if (get().searchQuery) {
      const query = get().searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (get().categories.length > 0) {
      filtered = filtered.filter((product) =>
        get().categories.includes(product.category)
      );
    }

    // Apply sorting
    const { sortBy } = get();
    switch (sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-high-low':
        filtered.sort((a, b) => {
          if (b.rating === a.rating) {
            return b.reviewCount - a.reviewCount;
          }
          return b.rating - a.rating;
        });
        break;
      case 'newest-first':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }
    
    set({ filteredProducts: filtered });
  },
}));