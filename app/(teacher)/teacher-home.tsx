import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const goButton = require('@/assets/icons/go.png');
const mcq = require('@/assets/icons/mcq.png');
const backButton = require('@/assets/icons/previous-button.png');
const userAvatar = require('@/assets/icons/user.png');

const TeacherDashboard: React.FC = () => {
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
      title: 'পাঠ পরিকল্পনা', 
      subtitle: 'পাঠ্যক্রম পরিকল্পনা করুন',
      route: '/(teacher)/lesson-plan', 
      colors: ['#c91f04', '#cc6c60ff'],
      icon: '📖'
    },
    { 
      id: 2, 
      title: 'পাঠ সারাংশ', 
      subtitle: 'পাঠ সারাংশ করুন',
      route: '/(teacher)/summarize', 
      colors: ['#4a1ba8', '#7c59cfff'],
      icon: '📝'
    },
    { 
      id: 3, 
      title: 'প্রশ্নপত্র তৈরি', 
      subtitle: 'পরীক্ষার প্রশ্ন তৈরি করুন',
      route: '/(teacher)/ques-paper', 
      colors: ['#9e1d5a', '#be3f7fff'],
      icon: '📋'
    },
    { 
      id: 4, 
      title: 'MCQ তৈরি', 
      subtitle: 'বহুনির্বাচনী প্রশ্ন তৈরি করুন',
      route: '/(teacher)/gen-quiz', 
      colors: ['#0a7d58', '#07b67cff'],
      icon: mcq
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
      <View className="flex-1 px-8 py-6">
        
        {/* Header Section */}
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
                className="w-15 h-8"
                resizeMode="contain"
              />
            </TouchableOpacity>

            {/* Title */}
            <Text 
              numberOfLines={1}
              className="text-black text-2xl font-bold text-center flex-1 mx-2"
              style={{ fontFamily: 'Kalpurush' }}
            >
              শিক্ষক ড্যাশবোর্ড
            </Text>

            {/* Profile Icon */}
            <TouchableOpacity 
              onPress={handleProfilePress}
              className="w-10 h-10 rounded-full overflow-hidden border-2"
              activeOpacity={0.7}
              style={styles.profileShadow}
            >
              <Image 
                source={ userAvatar }
                className="w-full h-full"
                resizeMode="cover"
              />
            </TouchableOpacity>
          </View>

          <View className="w-16 h-1 bg-green-500 rounded-full self-center" />
          <Text 
            className="text-gray-400 text-base text-center mt-3"
            style={{ fontFamily: 'Kalpurush' }}
          >
          </Text>
        </View>

        {/* Dashboard Buttons Grid */}
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
                      {typeof button.icon === 'string' ? (
                        <Text className="text-3xl">{button.icon}</Text>
                      ) : (
                        <Image
                          source={button.icon}
                          className="w-8 h-8"
                          resizeMode="contain"
                        />
                      )}
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
                        <Image source={goButton} className="w-9 h-9" resizeMode="contain" />
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

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 16,
    padding: 20,
    minHeight: 90,
    justifyContent: 'center',
  },
  buttonShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  profileShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default TeacherDashboard;