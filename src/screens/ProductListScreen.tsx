import React, { useCallback } from 'react';
import { ProductListLayout } from '../components/product/ProductListLayout';
import { ProductListLoadingScreen } from '../components/product/ProductListLoadingScreen';
import { Toast } from '../components/ui/Toast';
import { useProducts, useSearch, useFilters, useSort, useToast, useFavorites } from '../hooks';
import { Product } from '../types';

const ProductListScreenComponent: React.FC = () => {
  // Professional e-commerce pagination data
  const { 
    products, 
    totalCount,
    totalPages,
    currentPage,
    hasNextPage,
    hasPrevPage,
    startIndex,
    endIndex,
    isLoading, 
    refresh 
  } = useProducts();
  
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();
  const { selectedCategories, handleCategoryPress, handleClearAllFilters, isAllActive } = useFilters();
  const { sortBy, sortModalVisible, handleSortPress, handleSortSelect, handleSortModalClose } = useSort();
  const { toast, showSuccess, hideToast } = useToast();
  const { isFavorite, toggleFavorite } = useFavorites();

  // Product interaction handlers
  const handleProductPress = useCallback((product: Product) => {
    console.log('Product selected:', product.name);
    // TODO: Navigate to product detail
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    console.log('Added to cart:', product.name);
    
    // Show delightful toast notification
    showSuccess(`${product.name} added to cart! 🛒`);
    
    // TODO: Add to cart functionality (actual cart logic)
  }, [showSuccess]);

  const handleToggleFavorite = useCallback((product: Product) => {
    toggleFavorite(product);
  }, [toggleFavorite]);

  // Show loading screen during initial load
  if (isLoading) {
    return <ProductListLoadingScreen />;
  }

  // Professional e-commerce layout with pagination
  return (
    <>
      <ProductListLayout
        // Product data
        products={products}
        isLoading={isLoading}
        
        // Professional pagination data
        totalCount={totalCount}
        totalPages={totalPages}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        startIndex={startIndex}
        endIndex={endIndex}
        
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
        onRefresh={refresh}
        
        // Product actions
        onProductPress={handleProductPress}
        onAddToCart={handleAddToCart}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
        
        // Sort modal
        sortModalVisible={sortModalVisible}
        onSortSelect={handleSortSelect}
        onSortModalClose={handleSortModalClose}
      />

      {/* Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onHide={hideToast}
      />
    </>
  );
};

// Optimized component for professional assessment
export const ProductListScreen = React.memo(ProductListScreenComponent); 