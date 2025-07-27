import { useState, useCallback } from 'react';
import { useProductStore } from '../store/productStore';

export const useSort = () => {
  const { sortBy, setSortBy } = useProductStore();
  const [sortModalVisible, setSortModalVisible] = useState(false);

  const handleSortPress = useCallback(() => {
    setSortModalVisible(true);
  }, []);

  const handleSortSelect = useCallback((value: string) => {
    setSortBy(value as any);
    setSortModalVisible(false);
  }, [setSortBy]);

  const handleSortModalClose = useCallback(() => {
    setSortModalVisible(false);
  }, []);

  return {
    sortBy,
    sortModalVisible,
    handleSortPress,
    handleSortSelect,
    handleSortModalClose,
  };
}; 