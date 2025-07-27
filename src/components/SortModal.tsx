import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { CheckCircle, Circle } from 'lucide-react-native';

export interface SortOption {
  label: string;
  value: string;
}

interface SortModalProps {
  visible: boolean;
  options: SortOption[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const SortModal: React.FC<SortModalProps> = ({
  visible,
  options,
  selected,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent 
    >
      <Pressable 
        style={styles.overlay}
        onPress={onClose}
      >
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-flux p-generous shadow-lg">
          <View className="w-12 h-1 bg-void-black-200 rounded-full self-center mb-comfortable" />
          
          <Text className="text-title-premium font-bold text-void-black-900 mb-generous text-center">
            Sort Products
          </Text>
          
          {options.map((option) => {
            const isActive = option.value === selected;
            return (
              <TouchableOpacity
                key={option.value}
                onPress={() => {
                  onSelect(option.value);
                  onClose();
                }}
                className={`flex-row items-center py-comfortable px-spacious mb-cozy rounded-neural ${
                  isActive ? 'bg-neural-purple-50' : ''
                }`}
                activeOpacity={0.8}
              >
                <View style={{ width: 20, height: 20, marginRight: 24, alignItems: 'center', justifyContent: 'center' }}>
                  {isActive ? (
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#6366f1',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <View style={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        backgroundColor: '#6366f1'
                      }} />
                    </View>
                  ) : (
                    <View style={{
                      width: 20,
                      height: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: '#94a3b8'
                    }} />
                  )}
                </View>
                <Text 
                  className={`text-body-primary font-medium ${
                    isActive ? 'text-neural-purple-500' : 'text-void-black-700'
                  }`}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
          
          <View className="h-8" />
        </View>
      </Pressable>
    </Modal>
  );
};

// StyleSheet for the overlay to ensure full coverage
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
});