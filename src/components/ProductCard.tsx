import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { Star, ShoppingCart, Heart } from 'lucide-react-native';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onPress?: () => void;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

const ProductCardComponent: React.FC<ProductCardProps> = ({
  product,
  onPress,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}) => {

  const formatPrice = (price: number) => `₦${price.toLocaleString()}`;
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} className="text-neural-gold-500" fill="#fbbf24" />
      );
    }
    if (hasHalfStar) {
      stars.push(
        <Star key={fullStars} size={12} className="text-neural-gold-500" fill="#fbbf24" opacity={0.5} />
      );
    }
    return stars;
  };
  return (
    <Pressable
      onPress={onPress}
      className="flux-card w-full mb-comfortable"
    >
      {/* Image Container */}
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="w-full h-40 rounded-neural bg-slate-200"
          resizeMode="cover"
        />
        {/* Badges */}
        <View className="absolute top-cozy left-cozy flex-row gap-tight">
          {product.isNew && (
            <View className="bg-cyber-lime-500 px-cozy py-tight rounded-md">
              <Text className="text-caption-smart font-medium text-white">NEW</Text>
            </View>
          )}
          {product.discount && (
            <View className="bg-plasma-coral-500 px-cozy py-tight rounded-md">
              <Text className="text-caption-smart font-medium text-white">
                -{product.discount}%
              </Text>
            </View>
          )}
        </View>
        {/* Favorite Button */}
        <TouchableOpacity
          onPress={onToggleFavorite}
          className="absolute top-cozy right-cozy w-8 h-8 bg-white rounded-full items-center justify-center"
          activeOpacity={0.7}
        >
          <Heart
            size={16}
            className={isFavorite ? "text-plasma-coral-500" : "text-slate-400"}
            fill={isFavorite ? "#ff4b6b" : "none"}
          />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <View className="p-spacious">
        {/* Brand */}
        <Text className="text-caption-smart font-medium text-void-black-500 uppercase tracking-wide mb-tight">
          {product.brand}
        </Text>
        {/* Product Name */}
        <Text
          className="text-body-primary font-medium text-void-black-900 mb-cozy"
          numberOfLines={2}
        >
          {product.name}
        </Text>
        {/* Rating */}
        <View className="flex-row items-center mb-comfortable">
          <View className="flex-row items-center gap-tight">
            {renderStars(product.rating)}
          </View>
          <Text className="text-caption-smart text-void-black-500 ml-cozy">
            {product.rating} ({product.reviewCount})
          </Text>
        </View>
        {/* Price Section */}
        <View className="flex-row items-center justify-between mb-comfortable">
          <View className="flex-row items-center gap-cozy">
            <Text className="text-price-standard font-bold text-neural-purple-500">
              {formatPrice(product.price)}
            </Text>
            {product.originalPrice && (
              <Text className="text-body-secondary text-void-black-400 line-through">
                {formatPrice(product.originalPrice)}
              </Text>
            )}
          </View>
        </View>
        {/* Add to Cart Button */}
        <TouchableOpacity
          onPress={onAddToCart}
          className="bg-neural-flow rounded-neural py-comfortable px-spacious flex-row items-center justify-center gap-cozy"
          activeOpacity={0.9}
        >
          <ShoppingCart size={16} className="text-white" />
          <Text className="text-body-secondary font-semibold text-white">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

export const ProductCard = React.memo(ProductCardComponent, (prevProps, nextProps) => {
 
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.onAddToCart === nextProps.onAddToCart &&
    prevProps.onToggleFavorite === nextProps.onToggleFavorite
  );
}); 