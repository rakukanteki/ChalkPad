import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const goButton = require('@/assets/icons/go.png');
const backButton = require('@/assets/icons/previous-button.png');
const userAvatar = require('@/assets/icons/user.png');

const StudentDashboard: React.FC = () => {
  const router = useRouter();
  
  const handleNavigation = (route: string): void => {
    console.log(`Navigating to: ${route}`);
    router.push(route);
  };
  
  const handleProfilePress = (): void => {
    // Navigate to profile screen
    router.push('/profile'); // Adjust the route as needed
  };

  const dashboardButtons = [
    {
      id: 1,
      title: 'প্রশ্নোত্তর',
      subtitle: 'প্রশ্ন করুন ও জানুন',
      route: '/(student)/qna',
      colors: ['#9e1d5a', '#be3f7f'],
      icon: '💬',
    },
    {
      id: 2,
      title: 'পরীক্ষা',
      subtitle: 'পরীক্ষার প্রস্তুতি',
      route: '/(student)/exam',
      colors: ['#0a7d58', '#07b67c'],
      icon: '✍️',
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
      <View className="flex-1 px-8 py-6">

        {/* Header */}
        <View className="mb-8 mt-8">
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
              শিক্ষার্থী ড্যাশবোর্ড
            </Text>

            {/* Profile Icon */}
            <TouchableOpacity
              onPress={handleProfilePress}
              className="w-10 h-10 rounded-full overflow-hidden border-2"
              activeOpacity={0.7}
              style={styles.profileShadow}
            >
              <Image
                source={userAvatar}
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>

          </View>

          {/* Underline */}
          <View className="w-16 h-1 bg-red-500 rounded-full self-center" />
        </View>

        {/* Dashboard Buttons */}
        <View className="flex-1 justify-center">
          <View className="gap-5">
            {dashboardButtons.map((button) => (
              <TouchableOpacity
                key={button.id}
                onPress={() => handleNavigation(button.route)}
                activeOpacity={0.85}
                style={styles.buttonShadow}
              >
                <LinearGradient
                  colors={button.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradient}
                >
                  <View className="flex-row items-center">
                    <View className="bg-white/20 rounded-full w-14 h-14 items-center justify-center mr-4">
                      <Text className="text-3xl">{button.icon}</Text>
                    </View>

                    <View className="flex-1">
                      <Text
                        className="text-white text-xl font-bold mb-1"
                        style={{ fontFamily: 'Kalpurush' }}
                      >
                        {button.title}
                      </Text>
                      <Text
                        className="text-white/80 text-sm"
                        style={{ fontFamily: 'Kalpurush' }}
                      >
                        {button.subtitle}
                      </Text>
                    </View>

                    <View className="bg-white/20 rounded-full w-8 h-8 items-center justify-center">
                      <Image
                        source={goButton}
                        className="w-6 h-6"
                        resizeMode="contain"
                      />
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default StudentDashboard;

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    padding: 20,
    minHeight: 90,
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
