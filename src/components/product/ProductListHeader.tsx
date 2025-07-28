import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { ProductCategory } from '../../types';
import { PRODUCT_CATEGORIES } from '../../constants/mockProducts';

interface ProductListHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchClear: () => void;
  selectedCategories: ProductCategory[];
  onCategoryPress: (category: ProductCategory | 'All') => void;
  isAllActive: boolean;
}

export const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  searchTerm,
  onSearchChange,
  onSearchClear,
  selectedCategories,
  onCategoryPress,
  isAllActive,
}) => {
  return (
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
            onChangeText={onSearchChange}
            style={{
              flex: 1,
              fontSize: 16,
              color: '#0f0f23',
              fontWeight: '400',
            }}
            placeholderTextColor="#64748b"
          />
          {searchTerm.length > 0 && (
            <TouchableOpacity onPress={onSearchClear} style={{ marginLeft: 12 }}>
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
          {PRODUCT_CATEGORIES.map((category) => {
            const isActive = category === 'All' ? isAllActive : selectedCategories.includes(category as ProductCategory);
            return (
              <TouchableOpacity
                key={category}
                onPress={() => onCategoryPress(category)}
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
    </View>
  );
}; 