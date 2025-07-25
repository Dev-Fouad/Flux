import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { Search, Filter, ChevronDown, X } from 'lucide-react-native';
import { ProductCard } from '../components/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useSearch } from '../hooks/useSearch';
import { useProductStore } from '../store/productStore';
import { Product, ProductCategory } from '../types';

export const ProductListScreen: React.FC = () => {
  const { products, total, isLoading, isLoadingMore, hasMore, loadMore, refresh } = useProducts();
  const { searchTerm, setSearchTerm, clearSearch } = useSearch();
  
  // Only filters logic from store (will be moved to useFilters hook later)
  const {
    filters,
    sortBy,
    addCategoryFilter,
    removeCategoryFilter,
    clearFilters,
    setSortBy,
  } = useProductStore();

  const categories: ProductCategory[] = ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports'];
  
  const sortOptions = [
    { label: 'Newest First', value: 'newest-first' as const },
    { label: 'Price: Low to High', value: 'price-low-high' as const },
    { label: 'Price: High to Low', value: 'price-high-low' as const },
    { label: 'Name: A-Z', value: 'name-a-z' as const },
    { label: 'Name: Z-A', value: 'name-z-a' as const },
    { label: 'Highest Rated', value: 'rating-high-low' as const },
  ];

  const handleProductPress = (product: Product) => {
    console.log('Product pressed:', product.name);
    // TODO: Navigate to product detail
  };

  const handleAddToCart = (product: Product) => {
    console.log('Add to cart:', product.name);
    // TODO: Add to cart functionality
  };

  const handleToggleFavorite = (product: Product) => {
    console.log('Toggle favorite:', product.name);
    // TODO: Toggle favorite functionality
  };

  const handleCategoryPress = (category: ProductCategory) => {
    if (filters.categories.includes(category)) {
      removeCategoryFilter(category);
    } else {
      addCategoryFilter(category);
    }
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <View className="w-1/2 px-tight">
      <ProductCard
        product={item}
        onPress={() => handleProductPress(item)}
        onAddToCart={() => handleAddToCart(item)}
        onToggleFavorite={() => handleToggleFavorite(item)}
        isFavorite={false} // TODO: Get from favorites hook
      />
    </View>
  );

  const renderHeader = () => (
    <View className="px-spacious py-generous">
      <View className="mb-generous">
        <Text className="text-display-major font-bold text-void-black-900 mb-tight">
          FLUX
        </Text>
        <Text className="text-body-secondary text-void-black-500">
          Where Shopping Flows
        </Text>
      </View>

      <View className="relative mb-comfortable">
        <View className="flex-row items-center flux-input flux-input-focus">
          <Search size={20} className="text-void-black-500 mr-cozy" />
          <TextInput
            placeholder="Search products..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="flex-1 text-body-primary text-void-black-900"
            placeholderTextColor="#6c757d"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={clearSearch}>
              <X size={20} className="text-void-black-400" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View className="mb-comfortable">
        <Text className="text-body-secondary font-medium text-void-black-700 mb-cozy">
          Categories
        </Text>
        <View className="flex-row flex-wrap gap-cozy">
          {categories.map((category) => {
            const isActive = filters.categories.includes(category);
            return (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryPress(category)}
                className={isActive ? "flux-chip-active" : "flux-chip"}
              >
                <Text
                  className={`text-body-secondary font-medium ${
                    isActive ? "text-white" : "text-void-black-700"
                  }`}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View className="flex-row items-center justify-between mb-comfortable">
        <View className="flex-1">
          {(filters.categories.length > 0 || searchTerm) && (
            <TouchableOpacity
              onPress={() => {
                clearFilters();
                clearSearch();
              }}
              className="flex-row items-center bg-plasma-coral-100 px-comfortable py-cozy rounded-pill"
            >
              <X size={14} className="text-plasma-coral-500 mr-tight" />
              <Text className="text-body-secondary font-medium text-plasma-coral-500">
                Clear Filters
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity className="flex-row items-center bg-slate-100 px-comfortable py-cozy rounded-pill ml-cozy">
          <Text className="text-body-secondary font-medium text-void-black-700 mr-tight">
            {sortOptions.find(option => option.value === sortBy)?.label}
          </Text>
          <ChevronDown size={16} className="text-void-black-700" />
        </TouchableOpacity>
      </View>

      <Text className="text-body-secondary text-void-black-500 mb-comfortable">
        Showing {products.length} of {total} products
      </Text>
    </View>
  );

  const renderLoadMoreButton = () => {
    if (!hasMore) return null;

    return (
      <View className="p-spacious">
        <TouchableOpacity
          onPress={loadMore}
          disabled={isLoadingMore}
          className="bg-neural-flow rounded-neural py-comfortable px-spacious flex-row items-center justify-center"
        >
          {isLoadingMore ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text className="text-button-text font-semibold text-white">
              Load More Products
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const renderEmptyState = () => (
    <View className="flex-1 items-center justify-center p-spacious">
      <View className="w-32 h-32 bg-slate-200 rounded-full items-center justify-center mb-generous">
        <Search size={48} className="text-slate-400" />
      </View>
      <Text className="text-title-standard font-semibold text-void-black-700 mb-cozy text-center">
        No products found
      </Text>
      <Text className="text-body-secondary text-void-black-500 text-center mb-generous">
        Try adjusting your filters or search terms to find what you're looking for.
      </Text>
      <TouchableOpacity
        onPress={() => {
          clearFilters();
          clearSearch();
        }}
        className="bg-neural-flow rounded-neural py-comfortable px-spacious"
      >
        <Text className="text-button-text font-semibold text-white">
          Clear Filters
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-slate-50">
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#6366f1" />
          <Text className="text-body-primary text-void-black-500 mt-comfortable">
            Loading products...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderLoadMoreButton}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refresh}
            colors={['#6366f1']}
            tintColor="#6366f1"
          />
        }
        onEndReached={() => {
          if (!isLoadingMore && hasMore) {
            loadMore();
          }
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
        columnWrapperStyle={{
          paddingHorizontal: 12,
        }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={11}
        getItemLayout={(_, index) => ({
          length: 320, // estimated card height
          offset: 320 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}; 