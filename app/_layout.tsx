import { useFonts } from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import './globals.css';

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // Globally load all fonts when app starts
  const [fontsLoaded, fontError] = useFonts({
    'Kalpurush': require('../assets/fonts/Kalpurush.ttf'),
    'Kalpurush-Bold': require('../assets/fonts/Kalpurush-Bold.ttf'),
    'SpaceMono-Regular': require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide splash screen once fonts are loaded (or failed to load)
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Show loading screen while fonts are loading
  if (!fontsLoaded && !fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-900">
        <Text className="text-white text-lg">Loading fonts...</Text>
      </View>
    );
  }

  // Show error screen if font loading failed
  if (fontError) {
    return (
      <View className="flex-1 items-center justify-center bg-red-900">
        <Text className="text-white text-lg">Error loading fonts</Text>
        <Text className="text-red-300 text-sm mt-2">{fontError.message}</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="quiz" />
      <Stack.Screen name="summary" />
    </Stack>
  );
}
