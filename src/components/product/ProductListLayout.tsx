import React, { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { ProductCard } from './ProductCard';
import { ProductCardSkeleton } from '../skeletons/ProductCardSkeleton';
import { ProductListHeader } from './ProductListHeader';
import { FilterControls } from './FilterControls';
import { FluxPagination } from '../pagination/FluxPagination';
import { EmptyState } from './EmptyState';
import { SortModal } from '../SortModal';
import { Product } from '../../types';
import { SORT_OPTIONS } from '../../data/mockProducts';
import { usePaginationStore } from '../../store/paginationStore';

interface ProductListLayoutProps {
  // Product data
  products: Product[];
  isLoading: boolean;
  
  // Pagination data
  totalCount: number;
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  startIndex: number;
  endIndex: number;
  
  // Search & Filters
  searchTerm: string;
  selectedCategories: any[];
  sortBy: string;
  isAllActive: boolean;
  
  // Actions
  onSearchChange: (term: string) => void;
  onSearchClear: () => void;
  onCategoryPress: (category: any) => void;
  onClearFilters: () => void;
  onSortPress: () => void;
  onRefresh: () => void;
  
  // Product actions
  onProductPress: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onToggleFavorite: (product: Product) => void;
  
  // Sort modal
  sortModalVisible: boolean;
  onSortSelect: (value: string) => void;
  onSortModalClose: () => void;
}

export const ProductListLayout: React.FC<ProductListLayoutProps> = ({
  products,
  isLoading,
  totalCount,
  totalPages,
  currentPage,
  hasNextPage,
  hasPrevPage,
  startIndex,
  endIndex,
  searchTerm,
  selectedCategories,
  sortBy,
  isAllActive,
  onSearchChange,
  onSearchClear,
  onCategoryPress,
  onClearFilters,
  onSortPress,
  onRefresh,
  onProductPress,
  onAddToCart,
  onToggleFavorite,
  sortModalVisible,
  onSortSelect,
  onSortModalClose,
}) => {
  // Get pagination loading state
  const { isLoadingPage } = usePaginationStore();

  // Memoized styles for optimal performance
  const cardWrapperStyle = useMemo(() => ({
    width: '50%' as const,
    paddingHorizontal: 4
  }), []);

  const contentContainerStyle = useMemo(() => ({
    flexGrow: 1,
  }), []);

  const columnWrapperStyle = useMemo(() => ({
    paddingHorizontal: 12,
    paddingVertical: 6,
  }), []);

  // Generate skeleton data for consistent layout during pagination loading
  const skeletonData = useMemo(() => {
    return Array.from({ length: 6 }, (_, index) => ({ id: `skeleton-${index}` }));
  }, []);

  // Optimized render functions
  const renderProductCard = useCallback(({ item }: { item: Product | { id: string } }) => {
    // Show skeleton during pagination loading
    if (isLoadingPage || 'id' in item && item.id.startsWith('skeleton-')) {
      return (
        <View style={cardWrapperStyle}>
          <ProductCardSkeleton />
        </View>
      );
    }

    const product = item as Product;
    return (
      <View style={cardWrapperStyle}>
        <ProductCard
          product={product}
          onPress={() => onProductPress(product)}
          onAddToCart={() => onAddToCart(product)}
          onToggleFavorite={() => onToggleFavorite(product)}
          isFavorite={false} // TODO: Get from favorites hook
        />
      </View>
    );
  }, [cardWrapperStyle, isLoadingPage, onProductPress, onAddToCart, onToggleFavorite]);

  const keyExtractor = useCallback((item: Product | { id: string }) => {
    return 'id' in item ? item.id : (item as Product).id;
  }, []);

  // Memoized header component
  const renderHeader = useCallback(() => (
    <>
      <ProductListHeader
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onSearchClear={onSearchClear}
        selectedCategories={selectedCategories}
        onCategoryPress={onCategoryPress}
        isAllActive={isAllActive}
      />
      <FilterControls
        selectedCategories={selectedCategories}
        searchTerm={searchTerm}
        sortBy={sortBy}
        onClearFilters={onClearFilters}
        onClearSearch={onSearchClear}
        onSortPress={onSortPress}
        totalProducts={totalCount}
        displayedProducts={products.length}
      />
    </>
  ), [
    searchTerm,
    onSearchChange,
    onSearchClear,
    selectedCategories,
    onCategoryPress,
    isAllActive,
    sortBy,
    onClearFilters,
    onSortPress,
    totalCount,
    products.length,
  ]);

  const renderEmpty = useCallback(() => (
    <EmptyState onClearFilters={onClearFilters} />
  ), [onClearFilters]);

  // Scrollable pagination footer
  const renderFooter = useCallback(() => {
    if (products.length === 0) return null;
    
    return (
      <FluxPagination
        totalPages={totalPages}
        totalCount={totalCount}
        startIndex={startIndex}
        endIndex={endIndex}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    );
  }, [products.length, totalPages, totalCount, startIndex, endIndex, hasNextPage, hasPrevPage]);

  // Determine what data to show
  const displayData = isLoadingPage ? skeletonData : products;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FlatList
        data={displayData}
        renderItem={renderProductCard}
        keyExtractor={keyExtractor}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={['#6366f1']}
            tintColor="#6366f1"
          />
        }
        contentContainerStyle={contentContainerStyle}
        columnWrapperStyle={columnWrapperStyle}
        // Optimized for pagination (smaller lists)
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={2}
        removeClippedSubviews={false} // Better for paginated small lists
        scrollEventThrottle={16}
      />
      
      <SortModal
        visible={sortModalVisible}
        options={SORT_OPTIONS as any}
        selected={sortBy}
        onSelect={onSortSelect}
        onClose={onSortModalClose}
      />
    </SafeAreaView>
  );
}; 