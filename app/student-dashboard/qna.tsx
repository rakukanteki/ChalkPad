import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backButton = require('@/assets/icons/previous-button.png');

const Assignments = () => {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
      {/* Header Section */}
      <View className="px-8 py-6 mt-8">
        <View className="flex-row items-center justify-between mb-2">
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
            activeOpacity={0.7}
          >
            <Image
              source={backButton}
              className="w-8 h-8"
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Title */}
          <Text
            numberOfLines={1}
            className="text-black text-2xl font-bold text-center flex-1"
            style={{ fontFamily: 'Kalpurush' }}
          >
            প্রশ্নোত্তর
          </Text>

          {/* Spacer for alignment */}
          <View className="w-10 h-10" />
        </View>

        {/* Underline */}
        <View className="w-16 h-1 bg-red-500 rounded-full self-center" />
      </View>
    </SafeAreaView>
  );
};

export default Assignments;
