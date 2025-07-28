import { useCallback } from 'react';
import { useFavoritesStore } from '../store/favoritesStore';
import { Product } from '../types';

export const useFavorites = () => {
  const { favoriteIds, toggleFavorite, isFavorite } = useFavoritesStore();

  const handleToggleFavorite = useCallback((product: Product) => {
    toggleFavorite(product.id);
  }, [toggleFavorite]);

  return {
    favoriteIds,
    isFavorite,
    toggleFavorite: handleToggleFavorite,
  };
}; 