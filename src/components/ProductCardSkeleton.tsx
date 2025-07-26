import React from 'react';
import { View } from 'react-native';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#ffffff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#f1f5f9',
      marginBottom: 16,
      overflow: 'hidden',
    }}>
      <View style={{
        width: '100%',
        height: 160,
        backgroundColor: '#f1f5f9',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        position: 'relative',
      }}>
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
          background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
        }} />
      </View>

      <View style={{ padding: 16 }}>
        <View style={{
          height: 12,
          backgroundColor: '#e2e8f0',
          borderRadius: 6,
          width: '40%',
          marginBottom: 8,
        }} />
        
        <View style={{ marginBottom: 8 }}>
          <View style={{
            height: 16,
            backgroundColor: '#e2e8f0',
            borderRadius: 8,
            width: '100%',
            marginBottom: 4,
          }} />
          <View style={{
            height: 16,
            backgroundColor: '#e2e8f0',
            borderRadius: 8,
            width: '75%',
          }} />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <View style={{
            height: 12,
            width: 80,
            backgroundColor: '#e2e8f0',
            borderRadius: 6,
            marginRight: 8,
          }} />
          <View style={{
            height: 12,
            width: 40,
            backgroundColor: '#e2e8f0',
            borderRadius: 6,
          }} />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
        }}>
          <View style={{
            height: 20,
            width: 80,
            backgroundColor: '#e2e8f0',
            borderRadius: 10,
            marginRight: 8,
          }} />
          <View style={{
            height: 16,
            width: 60,
            backgroundColor: '#e2e8f0',
            borderRadius: 8,
          }} />
        </View>

        <View style={{
          height: 44,
          backgroundColor: '#e2e8f0',
          borderRadius: 12,
          width: '100%',
        }} />
      </View>
    </View>
  );
};

export const ProductCardMiniSkeleton: React.FC = () => {
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      paddingHorizontal: 20,
      paddingVertical: 12,
      marginHorizontal: 16,
      marginVertical: 4,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: '#e2e8f0',
    }}>
      <View style={{
        width: 40,
        height: 40,
        backgroundColor: '#e2e8f0',
        borderRadius: 8,
        marginRight: 12,
      }} />
      
      <View style={{ flex: 1 }}>
        <View style={{
          height: 12,
          backgroundColor: '#e2e8f0',
          borderRadius: 6,
          width: '70%',
          marginBottom: 4,
        }} />
        <View style={{
          height: 10,
          backgroundColor: '#e2e8f0',
          borderRadius: 5,
          width: '40%',
        }} />
      </View>
      
      <View style={{
        height: 14,
        width: 50,
        backgroundColor: '#e2e8f0',
        borderRadius: 7,
      }} />
    </View>
  );
}; 