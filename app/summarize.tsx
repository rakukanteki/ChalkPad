import InputSection from '@/components/InputSection';
import { SUMMARY_DEMO_TEXT } from '@/utils/gemini';
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backButton = require('../assets/icons/previous-button.png');

export default function Summary() {
  const [summary, setSummary] = useState('');
  const [state, setState] = useState<'initial' | 'pending' | 'fetched'>('initial');

  const submitPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    setState('pending');

    // Simulate API call
    setTimeout(() => {
      setSummary(
        `"${promptText}" এর সারাংশ:\n\nএই পাঠে আপনি প্রধান বিষয়গুলো শিখেছেন। এতে অন্তর্ভুক্ত রয়েছে:\n\n• প্রধান ধারণা এবং সংজ্ঞা\n• গুরুত্বপূর্ণ তথ্য এবং উদাহরণ\n• মূল পয়েন্ট এবং শিক্ষণীয় বিষয়\n\nএই সারাংশ আপনাকে পাঠের সারাংশ বুঝতে সাহায্য করবে।`
      );
      setState('fetched');
    }, 2000);
  };

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
              className="w-15 h-8" 
              resizeMode="contain"
            />
          </TouchableOpacity>

          {/* Title */}
          <Text 
            numberOfLines={1}
            className="text-black text-2xl font-bold text-center flex-1"
            style={{ fontFamily: 'Kalpurush' }}
          >
            পাঠ সারাংশ
          </Text>

          {/* Spacer for alignment */}
          <View className="w-10 h-10" />
        </View>

        <View className="w-16 h-1 bg-green-500 rounded-full self-center" />
      </View>

      <View className="flex-1">
        {state === 'initial' && (
          <View className="flex-1 justify-center px-6">
            <View className="items-center mb-8">
              <Text
                numberOfLines={2}
                className="text-base text-black-600 mt-40 text-center w-full"
                style={{ fontFamily: "Kalpurush" }}
              >
                যেকোনো বিষয়ে একটি নির্দেশনা লিখুন,{"\n"}আমরা সেটি থেকে পাঠ সারাংশ তৈরি করব
              </Text>
            </View>

            <InputSection
              handleInput={submitPrompt}
              processing={false}
              demotext={SUMMARY_DEMO_TEXT}
            />
          </View>
        )}

        {state === 'pending' && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#10b981" />
            <Text
              className="mt-4 text-gray-600 text-base"
              style={{ fontFamily: "Kalpurush" }}
            >
              পাঠ সারাংশ তৈরি হচ্ছে...
            </Text>
          </View>
        )}

        {state === 'fetched' && summary && (
          <ScrollView className="flex-1 px-6 py-4">
            {/* Summary Content */}
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                📝 তৈরি করা সারাংশ
              </Text>
              <Text
                className="text-gray-700 text-base leading-6"
                style={{ fontFamily: "Kalpurush" }}
              >
                {summary}
              </Text>
            </View>

            {/* Reset Button */}
            <TouchableOpacity
              onPress={() => {
                setSummary('');
                setState('initial');
              }}
              activeOpacity={0.85}
              className="mb-8"
            >
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.resetButton}
              >
                <Text className="text-white text-lg font-bold" style={{ fontFamily: "Kalpurush" }}>
                  🔄 রিসেট করুন
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  resetButton: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});