import React from 'react';
import { View } from 'react-native';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View className="flux-card w-full mb-comfortable">
      <View className="w-full h-40 bg-slate-200 rounded-neural animate-shimmer relative overflow-hidden">
        <View className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer" />
      </View>

      <View className="p-spacious space-y-cozy">
        <View className="h-3 bg-slate-200 rounded-md w-16 animate-shimmer" />
        
        <View className="space-y-tight">
          <View className="h-4 bg-slate-200 rounded-md w-full animate-shimmer" />
          <View className="h-4 bg-slate-200 rounded-md w-3/4 animate-shimmer" />
        </View>

        <View className="flex-row items-center space-x-tight">
          <View className="h-3 w-16 bg-slate-200 rounded-md animate-shimmer" />
          <View className="h-3 w-12 bg-slate-200 rounded-md animate-shimmer" />
        </View>

        <View className="flex-row items-center space-x-cozy">
          <View className="h-5 w-20 bg-slate-200 rounded-md animate-shimmer" />
          <View className="h-4 w-16 bg-slate-200 rounded-md animate-shimmer" />
        </View>

        <View className="h-12 bg-slate-200 rounded-neural animate-shimmer" />
      </View>
    </View>
  );
}; 