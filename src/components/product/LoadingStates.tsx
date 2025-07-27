import React from 'react';
import { View, Text } from 'react-native';
import { ProductCardSkeleton } from '../skeletons/ProductCardSkeleton';

interface InfiniteLoaderProps {
  isLoading: boolean;
}

interface EndOfCatalogProps {
  hasMore: boolean;
  totalProducts: number;
}

export const InfiniteLoader: React.FC<InfiniteLoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <View style={{ paddingVertical: 16 }}>
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
      }}>
        {[1, 2, 3, 4].map((_, index) => (
          <View key={index} style={{ width: '50%', paddingHorizontal: 4 }}>
            <ProductCardSkeleton />
          </View>
        ))}
      </View>
    </View>
  );
};

export const EndOfCatalog: React.FC<EndOfCatalogProps> = ({ hasMore, totalProducts }) => {
  if (hasMore) return null;

  return (
    <View style={{
      paddingVertical: 48,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
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
          That's all {totalProducts} products in our catalog.{'\n'}New arrivals flow in daily!
        </Text>
      </View>
    </View>
  );
}; 