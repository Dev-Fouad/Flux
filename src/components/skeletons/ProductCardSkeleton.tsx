import React from "react";
import { View, Animated } from "react-native";
import { ShimmerView } from "./ShimmerView";

export const ProductCardSkeleton = () => {
  return (
    <View className="bg-white w-full mb-comfortable overflow-hidden shadow-neural rounded-flux border border-void-black-100">
      <View className="relative">
        {/* Product image skeleton */}
        <ShimmerView className="w-full h-40 bg-void-black-100 rounded-t-neural" />

        {/* Category badges - FLUX style */}
        <View className="absolute top-cozy left-cozy flex-row">
          <ShimmerView className="bg-void-black-100 px-cozy py-tight rounded-neural w-10 h-5 mr-tight" />
          <ShimmerView className="bg-void-black-100 px-cozy py-tight rounded-neural w-8 h-5" />
        </View>

        {/* Favorite button - */}
        <ShimmerView className="bg-void-black-100 absolute top-cozy right-cozy w-8 h-8 rounded-full" />
      </View>

      <View className="p-spacious">
        {/* Brand category text */}
        <ShimmerView className="bg-void-black-100 h-3 w-20 rounded-md mb-cozy" />

        {/* Product title lines*/}
        <ShimmerView className="bg-void-black-100 h-4 w-11/12 rounded-lg mb-tight" />
        <ShimmerView className="bg-void-black-100 h-4 w-3/5 rounded-lg mb-comfortable" />

        {/* Rating section */}
        <View className="flex-row items-center mb-comfortable">
          <View className="flex-row mr-cozy">
            {[...Array(5)].map((_, i) => (
              <ShimmerView 
                key={i} 
                className="bg-void-black-100 w-3 h-3 rounded-full mr-hairline"
              />
            ))}
          </View>
          <ShimmerView className="bg-void-black-100 h-3 w-15 rounded-md" />
        </View>

        {/* Price section*/}
        <View className="flex-row items-center justify-between mb-comfortable">
          <View>
            {/* Current price skeleton */}
            <ShimmerView className="bg-void-black-100 h-5 w-25 rounded-lg mb-tight" />
            {/* Original price skeleton */}
            <ShimmerView className="bg-void-black-100 h-3.5 w-20 rounded-md" />
          </View>
        </View>

        {/* Add to cart button */}
        <ShimmerView className="bg-void-black-100 flex-row items-center justify-center py-comfortable px-spacious rounded-neural h-11">
          {/* Cart icon skeleton */}
          <ShimmerView className="bg-void-black-500 w-4 h-4 rounded-lg mr-cozy" />
          {/* Button text skeleton */}
          <ShimmerView className="bg-void-black-500 w-20 h-3.5 rounded-md" />
        </ShimmerView>
      </View>
    </View>
  );
};
