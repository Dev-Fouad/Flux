import { useCallback } from 'react';
import { useProductStore } from '../store/productStore';
import { useSearch } from './useSearch';
import { ProductCategory } from '../types';

export const useFilters = () => {
  const {
    filters,
    addCategoryFilter,
    removeCategoryFilter,
    clearFilters,
  } = useProductStore();
  
  const { clearSearch } = useSearch();

  const handleCategoryPress = useCallback((category: ProductCategory | 'All') => {
    if (category === 'All') {
      clearFilters();
    } else {
      // Clear all categories first, then add the selected one (single selection)
      clearFilters();
      addCategoryFilter(category as ProductCategory);
    }
  }, [clearFilters, addCategoryFilter]);

  const handleClearAllFilters = useCallback(() => {
    clearFilters();
    clearSearch();
  }, [clearFilters, clearSearch]);

  const isAllActive = filters.categories.length === 0;

  return {
    selectedCategories: filters.categories,
    handleCategoryPress,
    handleClearAllFilters,
    isAllActive,
  };
}; 