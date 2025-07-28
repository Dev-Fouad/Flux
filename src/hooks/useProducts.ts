import React from 'react';
import { useProductStore } from '../store/productStore';
import { usePaginationStore } from '../store/paginationStore';

export const useProducts = () => {
  const store = useProductStore();
  const { currentPage, itemsPerPage, reset } = usePaginationStore();

  // Apply pagination to filtered products
  const paginatedData = React.useMemo(() => {
    const allFilteredProducts = store.filteredProducts;
    const totalCount = allFilteredProducts.length;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    
    // Calculate current page products
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = allFilteredProducts.slice(startIndex, endIndex);

    return {
      products: paginatedProducts,
      totalCount,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
      startIndex: startIndex + 1,
      endIndex: Math.min(endIndex, totalCount),
    };
  }, [store.filteredProducts, currentPage, itemsPerPage]);

  // Reset pagination when filters change
  React.useEffect(() => {
    reset();
  }, [store.categories, store.searchQuery, reset]);

  return {
    // Paginated data
    products: paginatedData.products,
    totalCount: paginatedData.totalCount,
    totalPages: paginatedData.totalPages,
    currentPage: paginatedData.currentPage,
    hasNextPage: paginatedData.hasNextPage,
    hasPrevPage: paginatedData.hasPrevPage,
    startIndex: paginatedData.startIndex,
    endIndex: paginatedData.endIndex,
    
    isLoading: store.isLoading,
    
    refresh: store.refreshProducts,
  };
}; 