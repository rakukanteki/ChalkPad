import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Small delay to ensure smooth transition after splash
    const timer = setTimeout(() => {
      router.replace('/user-selection');
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Show a simple loading indicator during transition
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}