import React from 'react';
import { View } from 'react-native';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <View style={{
      backgroundColor: '#ffffff',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#f1f5f9',
      width: '100%',
      marginBottom: 16,
      overflow: 'hidden',
    }}>
      <View style={{ position: 'relative' }}>
        <View style={{
          width: '100%',
          height: 160,
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: '#e2e8f0',
        }} />
        
        <View style={{
          position: 'absolute',
          top: 8,
          left: 8,
          flexDirection: 'row',
        }}>
          <View style={{
            width: 32,
            height: 20,
            backgroundColor: '#cbd5e1',
            borderRadius: 4,
          }} />
        </View>
        
        <View style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 32,
          height: 32,
          backgroundColor: '#cbd5e1',
          borderRadius: 16,
        }} />
      </View>

      <View style={{ padding: 16 }}>
        <View style={{
          height: 12,
          backgroundColor: '#e2e8f0',
          borderRadius: 6,
          width: '40%',
          marginBottom: 4,
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
            flexDirection: 'row',
            marginRight: 8,
          }}>
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: '#e2e8f0',
              borderRadius: 6,
              marginRight: 2,
            }} />
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: '#e2e8f0',
              borderRadius: 6,
              marginRight: 2,
            }} />
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: '#e2e8f0',
              borderRadius: 6,
              marginRight: 2,
            }} />
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: '#e2e8f0',
              borderRadius: 6,
              marginRight: 2,
            }} />
            <View style={{
              width: 12,
              height: 12,
              backgroundColor: '#e2e8f0',
              borderRadius: 6,
            }} />
          </View>
          <View style={{
            height: 12,
            width: 60,
            backgroundColor: '#e2e8f0',
            borderRadius: 6,
          }} />
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
              height: 18,
              width: 80,
              backgroundColor: '#e2e8f0',
              borderRadius: 9,
              marginRight: 8,
            }} />
            <View style={{
              height: 14,
              width: 60,
              backgroundColor: '#e2e8f0',
              borderRadius: 7,
            }} />
          </View>
        </View>

        <View style={{
          height: 44,
          backgroundColor: '#e2e8f0',
          borderRadius: 12,
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View style={{
            width: 16,
            height: 16,
            backgroundColor: '#cbd5e1',
            borderRadius: 8,
            marginRight: 8,
          }} />
          <View style={{
            width: 80,
            height: 14,
            backgroundColor: '#cbd5e1',
            borderRadius: 7,
          }} />
        </View>
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