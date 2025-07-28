import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { usePaginationStore } from '../../store/paginationStore';

interface FluxPaginationProps {
  totalPages: number;
  totalCount: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const FluxPagination: React.FC<FluxPaginationProps> = ({
  totalPages,
  totalCount,
  startIndex,
  endIndex,
  hasNextPage,
  hasPrevPage,
}) => {
  const { 
    currentPage, 
    isLoadingPage, 
    goToPage, 
    nextPage, 
    prevPage 
  } = usePaginationStore();

  if (!totalPages || totalPages <= 1) return null;

  const handleNextPress = () => {
    console.log('▶️ Next button pressed, totalPages:', totalPages);
    nextPage(totalPages);
  };

  const handlePrevPress = () => {
    console.log('◀️ Previous button pressed');
    prevPage();
  };

  return (
    <View style={{
      backgroundColor: '#FFFFFF',
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 4,
    }}>

      {/* FLUX Pagination Controls */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
      }}>

        {/* Professional Previous Button */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: hasPrevPage ? '#E2E8F0' : '#F1F5F9',
            backgroundColor: hasPrevPage ? '#FFFFFF' : '#F8FAFC',
            opacity: hasPrevPage ? 1 : 0.6,
          }}
          onPress={handlePrevPress}
          disabled={!hasPrevPage || isLoadingPage}
        >
          <ChevronLeft
            size={16}
            color={hasPrevPage ? '#374151' : '#9CA3AF'}
          />
          <Text style={{
            marginLeft: 4,
            fontSize: 14,
            fontWeight: '500',
            color: hasPrevPage ? '#374151' : '#9CA3AF',
          }}>
            Previous
          </Text>
        </TouchableOpacity>

        {/* Simple Page Indicator */}
        <View style={{
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
          <Text style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#374151',
          }}>
            Page {currentPage} of {totalPages}
          </Text>
        </View>

        {/* Professional Next Button */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 12,
            paddingVertical: 10,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: hasNextPage ? '#E2E8F0' : '#F1F5F9',
            backgroundColor: hasNextPage ? '#FFFFFF' : '#F8FAFC',
            opacity: hasNextPage ? 1 : 0.6,
          }}
          onPress={handleNextPress}
          disabled={!hasNextPage || isLoadingPage}
        >
          <Text style={{
            marginRight: 4,
            fontSize: 14,
            fontWeight: '500',
            color: hasNextPage ? '#374151' : '#9CA3AF',
          }}>
            Next
          </Text>
          <ChevronRight
            size={16}
            color={hasNextPage ? '#374151' : '#9CA3AF'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}; 