import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { X, ChevronDown } from 'lucide-react-native';
import { ProductCategory } from '../../types';
import { SORT_OPTIONS } from '../../constants/mockProducts';

interface FilterControlsProps {
  selectedCategories: ProductCategory[];
  searchTerm: string;
  sortBy: string;
  onClearFilters: () => void;
  onClearSearch: () => void;
  onSortPress: () => void;
  totalProducts: number;
  displayedProducts: number;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  selectedCategories,
  searchTerm,
  sortBy,
  onClearFilters,
  onClearSearch,
  onSortPress,
  totalProducts,
  displayedProducts,
}) => {
  const hasActiveFilters = selectedCategories.length > 0 || searchTerm;
  const currentSortLabel = SORT_OPTIONS.find(option => option.value === sortBy)?.label;

  return (
    <View className="px-spacious">
      <View className="flex-row items-center justify-between mb-comfortable">
        <View className="flex-1">
          {hasActiveFilters && (
            <TouchableOpacity
              onPress={() => {
                onClearFilters();
                onClearSearch();
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
          onPress={onSortPress}
        >
          <Text className="text-body-secondary font-medium text-void-black-700 mr-tight">
            {currentSortLabel}
          </Text>
          <ChevronDown size={16} className="text-void-black-700" />
        </TouchableOpacity>
      </View>

      <Text className="text-body-secondary text-void-black-500 mb-comfortable">
        Showing {displayedProducts} of {totalProducts} products
      </Text>
    </View>
  );
}; 