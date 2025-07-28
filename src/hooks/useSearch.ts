import { useCallback } from 'react';
import { useProductStore } from '../store/productStore';

export const useSearch = () => {
  const {
    searchQuery,
    setSearchQuery,
  } = useProductStore();

  const setSearchTerm = useCallback((term: string) => {
    setSearchQuery(term);
  }, [setSearchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, [setSearchQuery]);

  return {
    searchTerm: searchQuery,
    setSearchTerm,
    clearSearch,
  };
}; 