import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const govtBdLogo = require('@/assets/images/govt-bd.png');
const rtLogo = require('@/assets/images/rtlogo.png');

const UserSelection: React.FC = () => {
  const router = useRouter();

  const handleUserTypeSelection = (userType: 'student' | 'teacher'): void => {
    console.log(`Selected user type: ${userType}`);
    router.push(userType === 'student' ? '/student' : '/teacher');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
      {/* Same layout logic as splash screen */}
      <View className="flex-1 justify-between px-8 py-8">

        {/* Center section (buttons) */}
        <View className="flex-1 justify-center">
            <Text className='text-black font-bold text-center text-xl py-5'>আপনার ভূমিকা বাছাই করুন</Text>
          <View className="w-40 max-w-sm self-center">
            {/* Student Button */}
            <TouchableOpacity
                onPress={() => handleUserTypeSelection('student')}
                style={{ 
                    backgroundColor: '#f45050ff',
                    borderRadius: 12,
                    paddingVertical: 20,
                    paddingHorizontal: 26,
                }}
                activeOpacity={0.8}
>
                <Text
                    numberOfLines={1}
                    style={{
                        color: '#fff',
                        fontSize: 18,
                        fontFamily: 'Kalpurush',
                        textAlign: 'center',
                        fontWeight: 'bold',
                    }}
  >
                    শিক্ষার্থী
                </Text>
            </TouchableOpacity>

                {/* Teacher Button */}
                <TouchableOpacity
                  onPress={() => handleUserTypeSelection('teacher')}
                  style={{ 
                    backgroundColor: '#16a34a', // green
                    borderRadius: 12,
                    paddingVertical:  20,
                    paddingHorizontal: 26,
                    marginTop: 16,
                  }}
                    activeOpacity={0.8}
                  >
                <Text
                  numberOfLines={1}
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontFamily: 'Kalpurush',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  শিক্ষক
                </Text>
              </TouchableOpacity>
          </View>
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
            ellipsizeMode="clip"
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
};

export default UserSelection;
