import { useState, useEffect, useCallback } from 'react';
import { useProductStore } from '../store/productStore';

interface UseSearchOptions {
  debounceMs?: number;
  minLength?: number;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const { debounceMs = 300, minLength = 2 } = options;
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const { setSearchQuery, filters } = useProductStore();

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Update store when debounced term changes
  useEffect(() => {
    if (debouncedSearchTerm.length >= minLength || debouncedSearchTerm.length === 0) {
      setSearchQuery(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, minLength, setSearchQuery]);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
    setSearchQuery('');
  }, [setSearchQuery]);

  const isSearching = searchTerm !== debouncedSearchTerm;
  const hasValidSearch = debouncedSearchTerm.length >= minLength;

  return {
    searchTerm,
    setSearchTerm,
    debouncedSearchTerm,
    clearSearch,
    isSearching,
    hasValidSearch,
    currentQuery: filters.searchQuery,
  };
}; 