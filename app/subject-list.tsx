import { syllabusData } from '@/utils/data/syllabusData';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backButton = require('@/assets/icons/previous-button.png');

const SubjectListScreen: React.FC = () => {
  const router = useRouter();
  const { classNumber } = useLocalSearchParams<{ classNumber: string }>();
  
  const classData = syllabusData.find(c => c.class === Number(classNumber));

  if (!classData) {
    return (
      <SafeAreaView className="flex-1 bg-[#F5F5F5]">
        <View className="flex-1 items-center justify-center">
          <Text style={{ fontFamily: 'Kalpurush' }}>ডেটা পাওয়া যায়নি</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSubjectSelect = (subjectId: string) => {
    router.push({
      pathname: '/chapter-list',
      params: { classNumber, subjectId }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-8 py-6">
          <View className="flex-row items-center justify-between mb-2">
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

            <Text 
              numberOfLines={1}
              className="text-black text-2xl font-bold text-center flex-1"
              style={{ fontFamily: 'Kalpurush' }}
            >
              {classData.className}
            </Text>

            <View className="w-10 h-10" />
          </View>

          <View className="w-16 h-1 bg-blue-500 rounded-full self-center" />
          <Text 
            className="text-gray-500 text-base text-center mt-3"
            style={{ fontFamily: 'Kalpurush' }}
          >
            বিষয় নির্বাচন করুন
          </Text>
        </View>

        {/* Subject Grid */}
        <ScrollView 
          className="flex-1 px-8"
          showsVerticalScrollIndicator={false}
        >
          <View className="pb-6">
            {classData.subjects.length === 0 ? (
              <View className="bg-white rounded-2xl p-8 items-center">
                <Text 
                  className="text-gray-500 text-lg text-center"
                  style={{ fontFamily: 'Kalpurush' }}
                >
                  শীঘ্রই আসছে
                </Text>
              </View>
            ) : (
              classData.subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  onPress={() => handleSubjectSelect(subject.id)}
                  activeOpacity={0.85}
                  style={styles.subjectShadow}
                >
                  <LinearGradient
                    colors={subject.color}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gradient}
                  >
                    <View className="flex-row items-center">
                      <View className="bg-white/20 rounded-full w-14 h-14 items-center justify-center mr-4">
                        <Text className="text-3xl">{subject.icon}</Text>
                      </View>
                      <View className="flex-1">
                        <Text
                          className="text-white text-xl font-bold mb-1"
                          style={{ fontFamily: 'Kalpurush' }}
                        >
                          {subject.name}
                        </Text>
                        <Text
                          className="text-white/80 text-sm"
                          style={{ fontFamily: 'Kalpurush' }}
                        >
                          {subject.chapters.length} টি অধ্যায়
                        </Text>
                      </View>
                      <Text className="text-white text-2xl">›</Text>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
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
  subjectShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    marginBottom: 16,
  },
});

export default SubjectListScreen;