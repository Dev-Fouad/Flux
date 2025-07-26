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
import { SortModal, SortOption } from '../components/SortModal';

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

  const categories: (ProductCategory | 'All')[] = ['All', 'Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports'];
  
  const [sortModalVisible, setSortModalVisible] = React.useState(false);

  const sortOptions: SortOption[] = [
    { label: 'Newest First', value: 'newest-first' },
    { label: 'Price: Low to High', value: 'price-low-high' },
    { label: 'Price: High to Low', value: 'price-high-low' },
    { label: 'Name: A-Z', value: 'name-a-z' },
    { label: 'Name: Z-A', value: 'name-z-a' },
    { label: 'Highest Rated', value: 'rating-high-low' },
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

  const handleCategoryPress = (category: ProductCategory | 'All') => {
    if (category === 'All') {
      clearFilters();
    } else {
      // Clear all categories first, then add the selected one (single selection)
      clearFilters();
      addCategoryFilter(category as ProductCategory);
    }
  };

  // Check if "All" should be active (no filters applied)
  const isAllActive = filters.categories.length === 0 && !searchTerm;

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
        <View 
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
            borderWidth: 1,
            borderColor: searchTerm ? '#6366f1' : '#e2e8f0',
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 8,
            shadowColor: searchTerm ? '#6366f1' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: searchTerm ? 0.1 : 0.05,
            shadowRadius: searchTerm ? 8 : 4,
            elevation: searchTerm ? 3 : 1,
          }}
        >
          <Search size={18} color="#64748b" style={{ marginRight: 12 }} />
          <TextInput
            placeholder="Search products..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={{
              flex: 1,
              fontSize: 16,
              color: '#0f0f23',
              fontWeight: '400',
            }}
            placeholderTextColor="#64748b"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={{ marginLeft: 12 }}>
              <View 
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: '#64748b',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={12} color="#ffffff" />
              </View>
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
            const isActive = category === 'All' ? isAllActive : filters.categories.includes(category as ProductCategory);
            return (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryPress(category)}
                style={{
                  backgroundColor: isActive ? '#6366f1' : '#f1f5f9',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 24,
                }}
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

        <TouchableOpacity
          className="flex-row items-center bg-slate-100 px-comfortable py-cozy rounded-pill ml-cozy"
          onPress={() => setSortModalVisible(true)}
        >
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

  const renderInfiniteLoader = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={{
        paddingVertical: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* FLUX Neural Loading Animation */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f8fafc',
          paddingHorizontal: 24,
          paddingVertical: 16,
          borderRadius: 24,
          shadowColor: '#6366f1',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}>
          <ActivityIndicator size="small" color="#6366f1" style={{ marginRight: 12 }} />
          <Text style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#64748b',
            letterSpacing: 0.5,
          }}>
            Curating your next discoveries...
          </Text>
        </View>
      </View>
    );
  };

  const renderEndOfCatalog = () => {
    if (hasMore) return null;

    return (
      <View style={{
        paddingVertical: 48,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* FLUX End State */}
        <View style={{
          alignItems: 'center',
          backgroundColor: '#f8fafc',
          paddingHorizontal: 32,
          paddingVertical: 24,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: '#e2e8f0',
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: '600',
            color: '#0f0f23',
            marginBottom: 8,
            textAlign: 'center',
          }}>
            You've explored everything! ✨
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#64748b',
            textAlign: 'center',
            lineHeight: 20,
          }}>
            That's all {total} products in our catalog.{'\n'}New arrivals flow in daily!
          </Text>
        </View>
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
        ListFooterComponent={() => (
          <>
            {renderInfiniteLoader()}
            {renderEndOfCatalog()}
          </>
        )}
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
        onEndReachedThreshold={0.8}
        contentContainerStyle={{
          paddingBottom: 32,
        }}
        columnWrapperStyle={{
          paddingHorizontal: 12,
        }}
        initialNumToRender={6}
        maxToRenderPerBatch={4}
        windowSize={10}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        getItemLayout={(_, index) => ({
          length: 300, // estimated card height
          offset: 300 * Math.floor(index / 2), // Account for 2 columns
          index,
        })}
      />
      <SortModal
        visible={sortModalVisible}
        options={sortOptions}
        selected={sortBy}
        onSelect={(value) => setSortBy(value as any)}
        onClose={() => setSortModalVisible(false)}
      />
    </SafeAreaView>
  );
}; 