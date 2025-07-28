import { create } from 'zustand';

interface FavoritesStore {
  favoriteIds: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],

  toggleFavorite: (productId: string) => {
    const { favoriteIds } = get();
    if (favoriteIds.includes(productId)) {
      // Remove from favorites
      set({ favoriteIds: favoriteIds.filter(id => id !== productId) });
    } else {
      // Add to favorites
      set({ favoriteIds: [...favoriteIds, productId] });
    }
  },

  isFavorite: (productId: string) => {
    const { favoriteIds } = get();
    return favoriteIds.includes(productId);
  },
})); 