import { Asset } from 'expo-asset';
import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import './globals.css';

const chalkpadLogo = require('@/assets/images/icon.png');
const govtBdLogo = require('@/assets/images/govt-bd.png');
const rtLogo = require('@/assets/images/rtlogo.png');

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  
  // Globally load all fonts when app starts
  const [fontsLoaded, fontError] = useFonts({
    'Kalpurush': require('@/assets/fonts/kalpurush.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Preload images
        await Promise.all([
          Asset.fromModule(chalkpadLogo).downloadAsync(),
          Asset.fromModule(govtBdLogo).downloadAsync(),
          Asset.fromModule(rtLogo).downloadAsync(),
        ]);
        
        // Wait for fonts to load
        if (fontsLoaded || fontError) {
          // Ensure splash screen shows for at least 3 seconds
          await new Promise(resolve => setTimeout(resolve, 3000));
          setAppReady(true);
        }
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (appReady) {
      // Hide splash screen once everything is ready
      SplashScreen.hideAsync();
    }
  }, [appReady]);

  // Show loading screen while fonts are loading or waiting for 3 seconds
  if (!appReady && !fontError) {
    return (
      <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
        <View className="flex-1 items-center justify-between py-8 px-8">
          {/* Main Content - Centered */}
          <View className="flex-1 items-center justify-center">
            <Image 
              source={chalkpadLogo} 
              style={{ width: 200, height: 200, marginBottom: 4 }} 
              resizeMode="contain"
            />
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              adjustsFontSizeToFit
              className="text-black text-5xl font-bold text-center" 
              style={{ fontFamily: 'Kalpurush', lineHeight:32}}
            >
              ChalkPad
            </Text>
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              adjustsFontSizeToFit
              className="text-black text-xl font-bold text-center" 
              style={{ fontFamily: 'Kalpurush', lineHeight:24, marginTop: 2 }}
            >
              শিক্ষায় নতুন মাত্রা
            </Text>
          </View>

          {/* Bottom Section - Logos and Text */}
          <View className="items-center w-full">
            {/* Logo Container with Divider */}
            <View className="flex-row items-center justify-center mb-4 w-full">
              <Image 
                source={govtBdLogo} 
                style={{ width: 80, height: 80 }} 
                resizeMode="contain"
              />
              
              {/* Divider */}
              <View className="h-12 w-px bg-gray-600 mx-6" />
              
              <Image 
                source={rtLogo} 
                style={{ width: 80, height: 80 }} 
                resizeMode="contain"
              />
            </View>

            {/* Bottom Text */}
            <Text 
              numberOfLines={1}
              ellipsizeMode='clip'
              adjustsFontSizeToFit
              className="text-black-400 text-sm text-center" 
              style={{ fontFamily: 'Kalpurush' }}
            >
              রিফ্লেক্টিভ টিনস ট্রাস্ট এর একটি পণ্য
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // Show error screen if font loading failed
  if (fontError) {
    return (
      <SafeAreaView className="flex-1 bg-red-900" edges={['top', 'bottom']}>
        <View className="flex-1 items-center justify-center">
          <Text className="text-white text-lg">Error loading fonts</Text>
          <Text className="text-red-300 text-sm mt-2">{fontError.message}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="index" /> */}
      <Stack.Screen name="user-selection" />
      <Stack.Screen name="student" />
      <Stack.Screen name="teacher" />
      <Stack.Screen name="lesson-plan" />
    </Stack>
  );
}