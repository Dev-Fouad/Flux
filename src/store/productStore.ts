import { create } from 'zustand';
import { Product, ProductCategory, SortOption } from '../types';
import { mockProducts } from '../constants/mockProducts';

// Performance optimization: pre-calculate searchable text
const productsWithSearchableText = mockProducts.map(product => ({
  ...product,
  searchableText: `${product.name} ${product.brand} ${product.category}`.toLowerCase(),
}));

interface ProductStore {
  filteredProducts: Product[];
  categories: ProductCategory[];
  searchQuery: string;
  sortBy: SortOption;
  isLoading: boolean;
  setSortBy: (sortBy: SortOption) => void;
  setSearchQuery: (query: string) => void;
  addCategoryFilter: (category: ProductCategory) => void;
  clearFilters: () => void;
  refreshProducts: () => void;
  applyFiltersAndSort: () => void;
}

const initialState = {
  filteredProducts: productsWithSearchableText,
  categories: [],
  searchQuery: '',
  sortBy: 'newest-first' as SortOption,
  isLoading: false,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  setSortBy: (sortBy) => {
    const currentState = get();
    if (currentState.sortBy !== sortBy) {
      set({ sortBy });
      requestAnimationFrame(() => {
        get().applyFiltersAndSort();
      });
    }
  },

  setSearchQuery: (query) => {
    const currentState = get();
    const trimmedQuery = query.trim();
    if (currentState.searchQuery !== trimmedQuery) {
      set({ searchQuery: trimmedQuery });
      requestAnimationFrame(() => {
        get().applyFiltersAndSort();
      });
    }
  },

  addCategoryFilter: (category) => {
    const currentState = get();
    if (!currentState.categories.includes(category)) {
      set((state) => ({
        categories: [...state.categories, category],
      }));
      requestAnimationFrame(() => {
        get().applyFiltersAndSort();
      });
    }
  },

  clearFilters: () => {
    const currentState = get();
    if (currentState.categories.length > 0 || currentState.searchQuery !== '') {
      set({ categories: [], searchQuery: '' });
      requestAnimationFrame(() => {
        get().applyFiltersAndSort();
      });
    }
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
    const { searchQuery, categories, sortBy, filteredProducts } = get();
    let filtered = [...productsWithSearchableText];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => product.searchableText.includes(query));
    }

    // Apply category filters
    if (categories.length > 0) {
      filtered = filtered.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Apply sorting
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
    
    // Only update if results actually changed (performance optimization)
    const currentFilteredIds = filteredProducts.map(p => p.id).join(',');
    const newFilteredIds = filtered.map(p => p.id).join(',');
    
    if (currentFilteredIds !== newFilteredIds) {
      set({ filteredProducts: filtered });
    }
  },
}));