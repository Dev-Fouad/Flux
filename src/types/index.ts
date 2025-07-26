export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  images: string[];
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  description: string;
  brand: string;
  inStock: boolean;
  featured: boolean;
  isNew: boolean;
  tags: string[];
  createdAt: string;
}

export type ProductCategory = 
  | 'Electronics'
  | 'Clothing'
  | 'Home & Garden'
  | 'Books'
  | 'Sports';

export type CategoryOption = ProductCategory | 'All';

export interface FilterState {
  categories: ProductCategory[];
  priceRange: {
    min: number;
    max: number;
  };
  searchQuery: string;
}

export type SortOption = 
  | 'price-low-high'
  | 'price-high-low'
  | 'name-a-z'
  | 'name-z-a'
  | 'rating-high-low'
  | 'newest-first';

export interface PaginationState {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface ProductListState {
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  sortBy: SortOption;
  pagination: PaginationState;
  isLoading: boolean;
  isLoadingMore: boolean;
}

export interface StoreState {
  productList: ProductListState;
} 