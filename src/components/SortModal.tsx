import React from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
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
    >
      <Pressable className="flex-1 bg-black/40" onPress={onClose}>
        <View className="absolute bottom-0 left-0 right-0 bg-white rounded-t-flux p-generous shadow-lg">
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
                className="flex-row items-center py-comfortable px-spacious mb-cozy rounded-neural"
                activeOpacity={0.8}
              >
                {isActive ? (
                  <CheckCircle size={22} className="text-neural-purple-500 mr-generous" fill="#6366f1" />
                ) : (
                  <Circle size={22} className="text-void-black-300 mr-generous" />
                )}
                <Text className={`text-body-primary font-medium ${isActive ? 'text-neural-purple-500' : 'text-void-black-700'}`}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
}; 