import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Search } from 'lucide-react-native';

interface EmptyStateProps {
  onClearFilters: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ onClearFilters }) => {
  return (
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
        onPress={onClearFilters}
        className="bg-neural-flow rounded-neural py-comfortable px-spacious"
      >
        <Text className="text-button-text font-semibold text-white">
          Clear Filters
        </Text>
      </TouchableOpacity>
    </View>
  );
}; 