export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: ProductCategory;
  rating: number;
  reviewCount: number;
  brand: string;
  isNew: boolean;
  createdAt: string;
}

export type ProductCategory = 'Electronics' | 'Clothing' | 'Home & Garden' | 'Books' | 'Sports';

export type SortOption = 
  | 'newest-first'
  | 'price-low-high' 
  | 'price-high-low'
  | 'name-a-z'
  | 'name-z-a'
  | 'rating-high-low'; 