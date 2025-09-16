import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Splash from "./screens/Splash";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hideSplash = async () => {
      // Fonts are now loaded globally, so we just wait for the splash duration
      setTimeout(() => setShowSplash(false), 3000); // Show splash for 3 seconds
    };
    hideSplash();
  }, []);

  if (showSplash) {
    return (
      <SafeAreaProvider>
        <Splash />
      </SafeAreaProvider>
    );
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-900">
        <View className="flex-1 justify-center px-8">
          <View className="items-center mb-12">
            <Text className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'Kalpurush' }}>
              স্বাগতম
            </Text>
            <Text className="text-xl text-gray-300 text-center leading-7" style={{ fontFamily: 'Kalpurush' }}>
              ChalkPad-এ আপনাকে স্বাগতম! কুইজ তৈরি করুন এবং পাঠের সারাংশ পান।
            </Text>
          </View>

          <View className="flex-row justify-around">
            <TouchableOpacity
              className="rounded-lg flex-1 mx-3 bg-blue-600 py-4 px-6 flex-row items-center justify-center"
              onPress={() => router.push('/quiz')}
            >
              <Ionicons name="school" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">কুইজ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="rounded-lg flex-1 mx-3 bg-green-600 py-4 px-6 flex-row items-center justify-center"
              onPress={() => router.push('/summary')}
            >
              <Ionicons name="bar-chart" size={24} color="white" />
              <Text className="text-white font-bold text-lg ml-2">পাঠ সারাংশ</Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row justify-center mt-8">
            <View className="mx-4">
              <Ionicons name="school" size={32} color="#60a5fa" />
            </View>
            <View className="mx-4">
              <Ionicons name="book" size={32} color="#34d399" />
            </View>
            <View className="mx-4">
              <Ionicons name="trophy" size={32} color="#fbbf24" />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
