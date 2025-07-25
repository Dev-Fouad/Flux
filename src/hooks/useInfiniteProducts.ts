import { useInfiniteQuery } from '@tanstack/react-query';
import { Product, FilterState, SortOption } from '../types';
import { mockProducts } from '../data/mockProducts';

interface ProductsResponse {
  products: Product[];
  nextPage?: number;
  hasMore: boolean;
  total: number;
}

interface UseInfiniteProductsOptions {
  filters?: FilterState;
  sortBy?: SortOption;
  limit?: number;
}

// Simulate API call - replace with real API later
const fetchProducts = async (
  pageParam: number,
  filters: FilterState,
  sortBy: SortOption,
  limit: number
): Promise<ProductsResponse> => {
  await new Promise(resolve => setTimeout(resolve, 500));

  let filteredProducts = [...mockProducts];

  // Apply filters (same logic as store)
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product =>
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
    );
  }

  if (filters.categories.length > 0) {
    filteredProducts = filteredProducts.filter(product =>
      filters.categories.includes(product.category)
    );
  }

  filteredProducts = filteredProducts.filter(
    product =>
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max
  );

  // Apply sorting
  switch (sortBy) {
    case 'price-low-high':
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 'price-high-low':
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 'name-a-z':
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'name-z-a':
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'rating-high-low':
      filteredProducts.sort((a, b) => {
        if (b.rating === a.rating) {
          return b.reviewCount - a.reviewCount;
        }
        return b.rating - a.rating;
      });
      break;
    case 'newest-first':
      filteredProducts.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      break;
  }

  // Paginate
  const startIndex = (pageParam - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    nextPage: endIndex < filteredProducts.length ? pageParam + 1 : undefined,
    hasMore: endIndex < filteredProducts.length,
    total: filteredProducts.length,
  };
};

export const useInfiniteProducts = (options: UseInfiniteProductsOptions = {}) => {
  const {
    filters = { categories: [], priceRange: { min: 0, max: 500000 }, searchQuery: '' },
    sortBy = 'newest-first',
    limit = 12,
  } = options;

  const query = useInfiniteQuery({
    queryKey: ['products', { filters, sortBy, limit }],
    queryFn: ({ pageParam = 1 }) => fetchProducts(pageParam, filters, sortBy, limit),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
  });

  // Flatten pages into single array
  const products = query.data?.pages.flatMap(page => page.products) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return {
    products,
    total,
    isLoading: query.isLoading,
    isLoadingMore: query.isFetchingNextPage,
    hasMore: query.hasNextPage,
    loadMore: query.fetchNextPage,
    refetch: query.refetch,
    error: query.error,
    isError: query.isError,
  };
}; 