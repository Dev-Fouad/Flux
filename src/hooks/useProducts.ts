import { useInfiniteProducts } from './useInfiniteProducts';
import { useProductStore } from '../store/productStore';

// This hook abstracts the complexity of data fetching
export const useProducts = () => {
  const { filters, sortBy } = useProductStore();
  
  const store = useProductStore();
  
  return {
    // Clean, simple interface for components
    products: store.filteredProducts,
    total: store.pagination.total,
    isLoading: store.isLoading,
    isLoadingMore: store.isLoadingMore,
    hasMore: store.pagination.hasMore,
    loadMore: store.loadMoreProducts,
    refresh: store.refreshProducts,
  };
}; 