import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';
import { Search } from 'lucide-react-native';
import { ProductCardSkeleton } from '../skeletons/ProductCardSkeleton';

export const ProductListLoadingScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* Header Skeleton */}
      <View style={{ paddingHorizontal: 24, paddingVertical: 32 }}>
        {/* Branding */}
        <View style={{ marginBottom: 32 }}>
          <Text style={{ 
            fontSize: 32, 
            fontWeight: '700', 
            color: '#0f0f23', 
            marginBottom: 8 
          }}>
            FLUX
          </Text>
          <Text style={{ 
            fontSize: 14, 
            color: '#64748b' 
          }}>
            Where Shopping Flows
          </Text>
        </View>

        {/* Search bar skeleton */}
        <View style={{ marginBottom: 24 }}>
          <View 
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#f8fafc',
              borderWidth: 1,
              borderColor: '#e2e8f0',
              borderRadius: 24,
              paddingHorizontal: 16,
              paddingVertical: 12,
              opacity: 0.7,
            }}
          >
            <Search size={18} color="#cbd5e1" style={{ marginRight: 12 }} />
            <View style={{
              height: 16,
              flex: 1,
              backgroundColor: '#e2e8f0',
              borderRadius: 8,
            }} />
          </View>
        </View>

        {/* Category filter skeletons */}
        <View style={{ marginBottom: 24 }}>
          <View style={{
            height: 14,
            width: 80,
            backgroundColor: '#e2e8f0',
            borderRadius: 7,
            marginBottom: 12,
          }} />
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            gap: 12 
          }}>
            {[60, 80, 70, 90, 50].map((width, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: '#e2e8f0',
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 24,
                  width: width,
                  height: 32,
                }}
              />
            ))}
          </View>
        </View>

        {/* Filter controls skeleton */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 24,
        }}>
          <View style={{ flex: 1 }} />
          <View style={{
            backgroundColor: '#e2e8f0',
            borderRadius: 24,
            width: 120,
            height: 32,
          }} />
        </View>

        {/* Products counter skeleton */}
        <View style={{
          height: 14,
          width: 150,
          backgroundColor: '#e2e8f0',
          borderRadius: 7,
          marginBottom: 16,
        }} />
      </View>

      {/* Product grid skeleton */}
      <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 12,
      }}>
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <View key={index} style={{ width: '50%', paddingHorizontal: 4 }}>
            <ProductCardSkeleton />
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}; 