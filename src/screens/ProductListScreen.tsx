import React, { useCallback } from 'react';
import { ProductListLayout } from '../components/product/ProductListLayout';
import { ProductListLoadingScreen } from '../components/product/ProductListLoadingScreen';
import { useProducts, useSearch, useFilters, useSort } from '../hooks';
import { Product } from '../types';

const ProductListScreenComponent: React.FC = () => {
  // hooks
  const { products, total, isLoading, isLoadingMore, hasMore, loadMore, refresh } = useProducts();
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();
  const { selectedCategories, handleCategoryPress, handleClearAllFilters, isAllActive } = useFilters();
  const { sortBy, sortModalVisible, handleSortPress, handleSortSelect, handleSortModalClose } = useSort();

  const handleProductPress = useCallback((product: Product) => {
    console.log('Product pressed:', product.name);
    // TODO: Navigate to product detail
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    console.log('Add to cart:', product.name);
    // TODO: Add to cart functionality
  }, []);

  const handleToggleFavorite = useCallback((product: Product) => {
    console.log('Toggle favorite:', product.name);
    // TODO: Toggle favorite functionality
  }, []);

  const handleLoadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      loadMore();
    }
  }, [isLoadingMore, hasMore, loadMore]);

  // Show loading screen during initial load
  if (isLoading) {
    return <ProductListLoadingScreen />;
  }

  // Main layout with all functionality
  return (
    <ProductListLayout
      // Data
      products={products}
      total={total}
      isLoading={isLoading}
      isLoadingMore={isLoadingMore}
      hasMore={hasMore}
      
      // Search & Filters
      searchTerm={searchTerm}
      selectedCategories={selectedCategories}
      sortBy={sortBy}
      isAllActive={isAllActive}
      
      // Actions
      onSearchChange={setSearchTerm}
      onSearchClear={clearSearch}
      onCategoryPress={handleCategoryPress}
      onClearFilters={handleClearAllFilters}
      onSortPress={handleSortPress}
      onLoadMore={handleLoadMore}
            onRefresh={refresh}
      
      // Product actions
      onProductPress={handleProductPress}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
      
      // Sort modal
      sortModalVisible={sortModalVisible}
      onSortSelect={handleSortSelect}
      onSortModalClose={handleSortModalClose}
    />
  );
};

// Memoize the entire screen to prevent unnecessary re-renders
export const ProductListScreen = React.memo(ProductListScreenComponent); 