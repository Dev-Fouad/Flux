import { create } from 'zustand';
import { Product, ProductCategory, SortOption, FilterState, ProductListState } from '../types';
import { mockProducts } from '../data/mockProducts';

interface ProductStore extends ProductListState {
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  setSortBy: (sortBy: SortOption) => void;
  setSearchQuery: (query: string) => void;
  addCategoryFilter: (category: ProductCategory) => void;
  removeCategoryFilter: (category: ProductCategory) => void;
  setPriceRange: (min: number, max: number) => void;
  clearFilters: () => void;
  loadMoreProducts: () => void;
  refreshProducts: () => void;
  
  applyFiltersAndSort: () => void;
  getFilteredProducts: () => Product[];
  sortProducts: (products: Product[]) => Product[];
}

const initialState: ProductListState = {
  products: mockProducts,
  filteredProducts: mockProducts.slice(0, 12), // Initial 12 products
  filters: {
    categories: [],
    priceRange: { min: 0, max: 500000 },
    searchQuery: '',
  },
  sortBy: 'newest-first',
  pagination: {
    page: 1,
    limit: 12,
    total: mockProducts.length,
    hasMore: mockProducts.length > 12,
  },
  isLoading: false,
  isLoadingMore: false,
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

  setSearchQuery: (searchQuery) => {
    set((state) => ({
      filters: { ...state.filters, searchQuery },
    }));
    get().applyFiltersAndSort();
  },

  addCategoryFilter: (category) => {
    const state = get();
    if (!state.filters.categories.includes(category)) {
      set((state) => ({
        filters: {
          ...state.filters,
          categories: [...state.filters.categories, category],
        },
      }));
      get().applyFiltersAndSort();
    }
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
        searchQuery: '',
      },
    }));
    get().applyFiltersAndSort();
  },

  loadMoreProducts: () => {
    const state = get();
    if (!state.pagination.hasMore || state.isLoadingMore) return;

    set({ isLoadingMore: true });

    // Smart loading delay - faster for first few pages, slower for later ones
    const currentProducts = state.filteredProducts.length;
    const loadDelay = currentProducts < 48 ? 300 : 600; // Faster loading for first 48 products

    setTimeout(() => {
      const state = get();
      const nextPage = state.pagination.page + 1;
      const startIndex = (nextPage - 1) * state.pagination.limit;
      const endIndex = startIndex + state.pagination.limit;
      
      let filtered = get().getFilteredProducts();
      const newProducts = filtered.slice(startIndex, endIndex);
      
      set((state) => ({
        filteredProducts: [...state.filteredProducts, ...newProducts],
        pagination: {
          ...state.pagination,
          page: nextPage,
          hasMore: endIndex < filtered.length,
        },
        isLoadingMore: false,
      }));
    }, loadDelay);
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
    const state = get();
    let filtered = get().getFilteredProducts();
    
    // Apply sorting
    filtered = get().sortProducts(filtered);
    
    // Reset pagination and show first page
    const firstPageProducts = filtered.slice(0, state.pagination.limit);
    
    set({
      filteredProducts: firstPageProducts,
      pagination: {
        ...state.pagination,
        page: 1,
        total: filtered.length,
        hasMore: filtered.length > state.pagination.limit,
      },
    });
  },

  // Helper functions (not exposed in the store interface)
  getFilteredProducts: (): Product[] => {
    const state = get();
    let filtered = [...state.products];

    // Filter by search query
    if (state.filters.searchQuery) {
      const query = state.filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by categories
    if (state.filters.categories.length > 0) {
      filtered = filtered.filter((product) =>
        state.filters.categories.includes(product.category)
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) =>
        product.price >= state.filters.priceRange.min &&
        product.price <= state.filters.priceRange.max
    );

    return filtered;
  },

  sortProducts: (products: Product[]): Product[] => {
    const sortBy = get().sortBy;
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
        return sorted.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return sorted;
    }
  },
})); 