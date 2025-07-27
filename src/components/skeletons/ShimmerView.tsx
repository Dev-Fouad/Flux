import React, { useEffect } from 'react';
import { Animated } from 'react-native';

export const ShimmerView = ({ className, ...props }: any) => {
  const shimmerOpacity = React.useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const shimmerAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerOpacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    shimmerAnimation.start();
    return () => {
      shimmerAnimation.stop();
    };
  }, [shimmerOpacity]);

  return (
    <Animated.View
      className={className}
      style={{ opacity: shimmerOpacity }}
      {...props}
    />
  );
};