import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import { ProductCategory } from '../../types';
import { PRODUCT_CATEGORIES } from '../../constants/mockProducts';
import { useDebounce } from '../../hooks/useDebounce';

interface ProductListHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchClear: () => void;
  selectedCategories: ProductCategory[];
  onCategoryPress: (category: ProductCategory | 'All') => void;
  isAllActive: boolean;
}

const ProductListHeader: React.FC<ProductListHeaderProps> = ({
  searchTerm: initialSearchTerm,
  onSearchChange,
  onSearchClear,
  selectedCategories,
  onCategoryPress,
  isAllActive,
}) => {
  const [localSearchTerm, setLocalSearchTerm] = useState(initialSearchTerm);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm !== initialSearchTerm) {
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);

  useEffect(() => {
    if (initialSearchTerm === '' && localSearchTerm !== '') {
      setLocalSearchTerm('');
    }
  }, [initialSearchTerm]);

  useEffect(() => {
    setLocalSearchTerm(initialSearchTerm);
  }, []); 

  const handleTextChange = useCallback((text: string) => {
    setLocalSearchTerm(text);
  }, []);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    if (localSearchTerm !== initialSearchTerm) {
      onSearchChange(localSearchTerm);
    }
  }, [localSearchTerm, initialSearchTerm, onSearchChange]);

  const handleClear = useCallback(() => {
    setLocalSearchTerm('');
    setIsFocused(false);
    onSearchClear();
  }, [onSearchClear]);
  
  const hasFocus = isFocused || !!localSearchTerm;

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
            borderColor: hasFocus ? '#6366f1' : '#e2e8f0',
            borderRadius: 24,
            paddingHorizontal: 16,
            paddingVertical: 12,
            shadowColor: hasFocus ? '#6366f1' : '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: hasFocus ? 0.1 : 0.05,
            shadowRadius: hasFocus ? 8 : 4,
            elevation: hasFocus ? 3 : 1,
          }}
        >
          <Search size={18} color="#64748b" style={{ marginRight: 12 }} />
          <TextInput
            ref={inputRef}
            key="flux-search-input"
            placeholder="Search products..."
            value={localSearchTerm}
            onChangeText={handleTextChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              flex: 1,
              fontSize: 16,
              color: '#0f0f23',
              fontWeight: '400',
              paddingVertical: 0,
            }}
            placeholderTextColor="#64748b"
            blurOnSubmit={false}
            autoCorrect={false}
            autoCapitalize="none"
            clearButtonMode="never"
            keyboardType="default"
            returnKeyType="search"
            enablesReturnKeyAutomatically={false}
            caretHidden={false}
          />
          {localSearchTerm.length > 0 && (
            <TouchableOpacity onPress={handleClear} style={{ marginLeft: 12 }}>
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

export default React.memo(ProductListHeader, (prevProps, nextProps) => {
  const categoriesChanged = JSON.stringify(prevProps.selectedCategories) !== JSON.stringify(nextProps.selectedCategories);
  const searchChanged = prevProps.searchTerm !== nextProps.searchTerm;
  const isAllActiveChanged = prevProps.isAllActive !== nextProps.isAllActive;
  
  return !categoriesChanged && !searchChanged && !isAllActiveChanged;
});