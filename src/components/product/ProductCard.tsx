import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import { Star, ShoppingCart, Heart } from 'lucide-react-native';
import { Product } from '../../types';

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
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={12} color="#fbbf24" fill="#fbbf24" />
      );
    }
    
    // Add empty stars for remaining
    for (let i = fullStars; i < 5; i++) {
      stars.push(
        <Star key={i} size={12} color="#e2e8f0" fill="none" />
      );
    }
    
    return stars;
  };

  return (
    <Pressable
      onPress={onPress}
      className="w-full bg-white rounded-flux shadow-neural mb-comfortable overflow-hidden"
    >
      <View className="relative">
        <Image
          source={{ uri: product.image }}
          className="w-full h-40 rounded-t-flux bg-void-black-100"
          resizeMode="cover"
        />
        
        <View className="absolute top-cozy left-cozy flex-row gap-tight">
          {product.isNew && (
            <View className="bg-cyber-lime-500 px-cozy py-tight rounded-md">
              <Text className="text-caption-smart font-medium text-white">
                NEW
              </Text>
            </View>
          )}
          {product.discount && (
            <View className="bg-plasma-coral-500 px-cozy py-tight rounded-md ml-tight">
              <Text className="text-caption-smart font-medium text-white">
                -{product.discount}%
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          onPress={onToggleFavorite}
          className="absolute top-cozy right-cozy w-8 h-8 bg-white rounded-full items-center justify-center"
          activeOpacity={0.7}
        >
          <Heart
            size={16}
            color={isFavorite ? "#ff4b6b" : "#94a3b8"}
            fill={isFavorite ? "#ff4b6b" : "none"}
          />
        </TouchableOpacity>
      </View>
      
      <View className="p-spacious">
        <Text className="text-caption-smart font-medium text-neural-purple-500 mb-tight uppercase tracking-wider">
          {product.brand}
        </Text>
        
        <View className="h-12 mb-cozy justify-start">
          <Text 
            className="text-body-primary font-semibold text-void-black-900 leading-6"
            numberOfLines={2}
          >
            {product.name}
          </Text>
        </View>
        
        <View className="flex-row items-center mb-comfortable">
          <View className="flex-row mr-tight">
            {renderStars(product.rating)}
          </View>
          <Text className="text-caption-smart text-void-black-500 ml-tight">
            ({product.reviewCount})
          </Text>
        </View>
        
        <View className="flex-row items-center justify-between mb-comfortable">
          <View className="min-h-[48px] justify-center">
            <Text className="text-price-standard font-bold text-void-black-900">
              {formatPrice(product.price)}
            </Text>
            <View className="h-5 justify-center">
              {product.originalPrice ? (
                <Text className="text-body-secondary text-void-black-500 line-through">
                  {formatPrice(product.originalPrice)}
                </Text>
              ) : (
                <View />
              )}
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={onAddToCart}
          className="bg-neural-purple-500 py-comfortable px-spacious rounded-neural flex-row items-center justify-center"
          activeOpacity={0.8}
        >
          <ShoppingCart size={16} color="#ffffff" />
          <Text className="text-button-text font-semibold text-white ml-cozy">
            Add to Cart
          </Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};

// Enhanced memoization for fast scrolling performance
export const ProductCard = React.memo(ProductCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.isFavorite === nextProps.isFavorite &&
    prevProps.product.price === nextProps.product.price &&
    prevProps.product.name === nextProps.product.name &&
    prevProps.product.image === nextProps.product.image &&
    prevProps.product.rating === nextProps.product.rating &&
    prevProps.product.reviewCount === nextProps.product.reviewCount &&
    prevProps.onPress === nextProps.onPress &&
    prevProps.onAddToCart === nextProps.onAddToCart &&
    prevProps.onToggleFavorite === nextProps.onToggleFavorite
  );
}); 