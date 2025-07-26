import React from 'react';
import { View } from 'react-native';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View className="flux-card w-full mb-comfortable">
      <View className="w-full h-40 bg-slate-200 rounded-neural relative overflow-hidden">
       
        <View className="absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200" />
      </View>

      <View className="p-spacious space-y-cozy">
        <View className="h-3 bg-slate-200 rounded-md w-16" />
        
        <View className="space-y-tight">
          <View className="h-4 bg-slate-200 rounded-md w-full" />
          <View className="h-4 bg-slate-200 rounded-md w-3/4" />
        </View>

        <View className="flex-row items-center space-x-tight">
          <View className="h-3 w-16 bg-slate-200 rounded-md" />
          <View className="h-3 w-12 bg-slate-200 rounded-md" />
        </View>

        <View className="flex-row items-center space-x-cozy">
          <View className="h-5 w-20 bg-slate-200 rounded-md" />
          <View className="h-4 w-16 bg-slate-200 rounded-md" />
        </View>

        <View className="h-12 bg-slate-200 rounded-neural" />
      </View>
    </View>
  );
}; 