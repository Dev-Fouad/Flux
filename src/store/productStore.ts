import { create } from 'zustand';
import { Product, ProductCategory, SortOption, FilterState } from '../types';
import { mockProducts } from '../data/mockProducts';

interface ProductStore {
  // Data
  products: Product[];
  filteredProducts: Product[];
  
  // Filters & Search
  filters: FilterState;
  sortBy: SortOption;
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSearchQuery: (query: string) => void;
  addCategoryFilter: (category: ProductCategory) => void;
  removeCategoryFilter: (category: ProductCategory) => void;
  setPriceRange: (min: number, max: number) => void;
  clearFilters: () => void;
  refreshProducts: () => void;
  
  // Internal methods
  applyFiltersAndSort: () => void;
  getFilteredProducts: () => Product[];
  sortProducts: (products: Product[]) => Product[];
}

const initialState = {
  products: mockProducts,
  filteredProducts: mockProducts,
  filters: {
    categories: [],
    priceRange: { min: 0, max: 500000 },
    searchQuery: '',
  },
  sortBy: 'newest-first' as SortOption,
  isLoading: false,
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  setProducts: (products) => set({ products }),

  setFilters: (filters) => {
    set((state) => ({
      filters: { ...state.filters, ...filters },
    }));
    get().applyFiltersAndSort();
  },

  setSortBy: (sortBy) => {
    set({ sortBy });
    get().applyFiltersAndSort();
  },

  setSearchQuery: (query) => {
    set((state) => ({
      filters: { ...state.filters, searchQuery: query },
    }));
    get().applyFiltersAndSort();
  },

  addCategoryFilter: (category) => {
    set((state) => ({
      filters: {
        ...state.filters,
        categories: [...state.filters.categories, category],
      },
    }));
    get().applyFiltersAndSort();
  },

  removeCategoryFilter: (category) => {
    set((state) => ({
      filters: {
        ...state.filters,
        categories: state.filters.categories.filter((c) => c !== category),
      },
    }));
    get().applyFiltersAndSort();
  },

  setPriceRange: (min, max) => {
    set((state) => ({
      filters: {
        ...state.filters,
        priceRange: { min, max },
      },
    }));
    get().applyFiltersAndSort();
  },

  clearFilters: () => {
    set((state) => ({
      filters: {
        categories: [],
        priceRange: { min: 0, max: 500000 },
        searchQuery: state.filters.searchQuery, // Keep 
      },
    }));
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
    let filtered = get().getFilteredProducts();
    
    // Apply sorting
    filtered = get().sortProducts(filtered);
    
    // Set all filtered products
    set({
      filteredProducts: filtered,
    });
  },

  getFilteredProducts: () => {
    const { products, filters } = get();
    let filtered = [...products];

    // Apply search filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply category filters
    if (filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Apply price range filter
    filtered = filtered.filter(
      (product) =>
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max
    );

    return filtered;
  },

  sortProducts: (products) => {
    const { sortBy } = get();
    const sorted = [...products];

    switch (sortBy) {
      case 'price-low-high':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high-low':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-a-z':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-z-a':
        return sorted.sort((a, b) => b.name.localeCompare(a.name));
      case 'rating-high-low':
        return sorted.sort((a, b) => {
          if (b.rating === a.rating) {
            return b.reviewCount - a.reviewCount;
          }
          return b.rating - a.rating;
        });
      case 'newest-first':
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return sorted;
    }
  },
})); 