import React, { useCallback, useMemo } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { ProductCard } from './ProductCard';
import { ProductListHeader } from './ProductListHeader';
import { FilterControls } from './FilterControls';
import { InfiniteLoader, EndOfCatalog } from './LoadingStates';
import { EmptyState } from './EmptyState';
import { SortModal } from '../SortModal';
import { Product } from '../../types';
import { SORT_OPTIONS } from '../../data/mockProducts';

interface ProductListLayoutProps {
  // Data
  products: Product[];
  total: number;
  isLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  
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
  onLoadMore: () => void;
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
  total,
  isLoading,
  isLoadingMore,
  hasMore,
  searchTerm,
  selectedCategories,
  sortBy,
  isAllActive,
  onSearchChange,
  onSearchClear,
  onCategoryPress,
  onClearFilters,
  onSortPress,
  onLoadMore,
  onRefresh,
  onProductPress,
  onAddToCart,
  onToggleFavorite,
  sortModalVisible,
  onSortSelect,
  onSortModalClose,
}) => {
  // Memoized styles and handlers for optimal performance
  const cardWrapperStyle = useMemo(() => ({
    width: '50%' as const,
    paddingHorizontal: 4
  }), []);

  const contentContainerStyle = useMemo(() => ({
    paddingBottom: 32,
  }), []);

  const columnWrapperStyle = useMemo(() => ({
    paddingHorizontal: 12,
  }), []);

  // Optimized render functions
  const renderProductCard = useCallback(({ item }: { item: Product }) => (
    <View style={cardWrapperStyle}>
      <ProductCard
        product={item}
        onPress={() => onProductPress(item)}
        onAddToCart={() => onAddToCart(item)}
        onToggleFavorite={() => onToggleFavorite(item)}
        isFavorite={false} // TODO: Get from favorites hook
      />
    </View>
  ), [cardWrapperStyle, onProductPress, onAddToCart, onToggleFavorite]);

  const keyExtractor = useCallback((item: Product) => item.id, []);

  const getItemLayout = useCallback((data: any, index: number) => ({
    length: 280,
    offset: 280 * Math.floor(index / 2),
    index,
  }), []);

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
        totalProducts={total}
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
    total,
    products.length,
  ]);

  const renderFooter = useCallback(() => (
    <>
      <InfiniteLoader isLoading={isLoadingMore} />
      <EndOfCatalog hasMore={hasMore} totalProducts={total} />
    </>
  ), [isLoadingMore, hasMore, total]);

  const renderEmpty = useCallback(() => (
    <EmptyState onClearFilters={onClearFilters} />
  ), [onClearFilters]);

  const handleEndReached = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      onLoadMore();
    }
  }, [isLoadingMore, hasMore, onLoadMore]);

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FlatList
        data={products}
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
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        contentContainerStyle={contentContainerStyle}
        columnWrapperStyle={columnWrapperStyle}
        // Performance optimizations
        initialNumToRender={4}
        maxToRenderPerBatch={2}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={100}
        getItemLayout={getItemLayout}
        disableVirtualization={false}
        scrollEventThrottle={32}
      />
      
      <SortModal
        visible={sortModalVisible}
        options={SORT_OPTIONS}
        selected={sortBy}
        onSelect={onSortSelect}
        onClose={onSortModalClose}
      />
    </SafeAreaView>
  );
}; 