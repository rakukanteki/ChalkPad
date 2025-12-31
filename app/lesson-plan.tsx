import { DEMO_LESSON_PROMPT, generateLessonPlan } from "@/utils/gemini";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputSection from "../components/InputSection";

const robot = require('../assets/images/robot.png');
const backButton = require('../assets/icons/previous-button.png');

type LessonPlanType = {
  lessonTitle: string;
  gradeLevel: string;
  duration: string;
  objectives: string[];
  materials: string[];
  activities: { step: number; description: string }[];
  assessment: string[];
  homework: string;
};

export default function LessonPlan() {
  const [lessonPlan, setLessonPlan] = useState<LessonPlanType | null>(null);
  const [state, setState] = useState<"initial" | "pending" | "fetched">("initial");

  const submitPrompt = useCallback(async (promptText: string) => {
    setState("pending");
    try {
      const generated = await generateLessonPlan(promptText);
      setLessonPlan(generated);
      setState("fetched");
    } catch (error) {
      console.error("Error generating lesson plan:", error);
      setState("initial");
    }
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['bottom']}>
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
            পাঠ পরিকল্পনা
          </Text>

          {/* Spacer for alignment */}
          <View className="w-10 h-10" />
        </View>

        <View className="w-16 h-1 bg-green-500 rounded-full self-center" />
      </View>

      <View className="flex-1">
        {state === "initial" && (
          <View className="flex-1 justify-center px-6">
            <View className="items-center mb-8">
              <Image source={robot} style={{ width: 150, height: 150 }} />
              <Text
                className="text-xl font-bold text-black mt-6 text-center"
                style={{ fontFamily: "Kalpurush" }}
              >
                পাঠ পরিকল্পনা তৈরিতে আপনাকে স্বাগতম
              </Text>
              <Text
                className="text-base text-gray-600 mt-3 text-center"
                style={{ fontFamily: "Kalpurush" }}
              >
                যেকোনো বিষয়ে একটি নির্দেশনা লিখুন,{"\n"}আমরা সেটি থেকে পাঠ পরিকল্পনা তৈরি করব
              </Text>
            </View>

            <InputSection
              handleInput={submitPrompt}
              processing={false}
              demotext={DEMO_LESSON_PROMPT}
            />
          </View>
        )}

        {state === "pending" && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#10b981" />
            <Text
              className="mt-4 text-gray-600 text-base"
              style={{ fontFamily: "Kalpurush" }}
            >
              পাঠ পরিকল্পনা তৈরি হচ্ছে...
            </Text>
          </View>
        )}

        {state === "fetched" && lessonPlan && (
          <ScrollView className="flex-1 px-6 py-4">
            {/* Title Card */}
            <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <Text
                className="text-2xl font-bold text-black mb-4 text-center"
                style={{ fontFamily: "Kalpurush" }}
              >
                📖 পাঠ পরিকল্পনা
              </Text>
              
              <View className="space-y-3">
                <View className="flex-row">
                  <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                    শিরোনাম:
                  </Text>
                  <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                    {lessonPlan.lessonTitle || "—"}
                  </Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                    শ্রেণি:
                  </Text>
                  <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                    {lessonPlan.gradeLevel || "—"}
                  </Text>
                </View>
                
                <View className="flex-row">
                  <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                    সময়কাল:
                  </Text>
                  <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                    {lessonPlan.duration || "—"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Objectives Section */}
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                🎯 উদ্দেশ্যসমূহ
              </Text>
              {lessonPlan.objectives?.length ? (
                lessonPlan.objectives.map((o, i) => (
                  <Text key={i} className="text-gray-700 text-base mb-2 ml-2" style={{ fontFamily: "Kalpurush" }}>
                    • {o}
                  </Text>
                ))
              ) : (
                <Text className="text-gray-500" style={{ fontFamily: "Kalpurush" }}>কোনো উদ্দেশ্য নেই</Text>
              )}
            </View>

            {/* Materials Section */}
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                📚 প্রয়োজনীয় উপকরণ
              </Text>
              {lessonPlan.materials?.length ? (
                lessonPlan.materials.map((m, i) => (
                  <Text key={i} className="text-gray-700 text-base mb-2 ml-2" style={{ fontFamily: "Kalpurush" }}>
                    • {m}
                  </Text>
                ))
              ) : (
                <Text className="text-gray-500" style={{ fontFamily: "Kalpurush" }}>কোনো উপকরণ নেই</Text>
              )}
            </View>

            {/* Activities Section */}
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                🧩 কার্যক্রম
              </Text>
              {lessonPlan.activities?.length ? (
                lessonPlan.activities.map((a, i) => (
                  <View key={i} className="mb-3">
                    <Text className="text-gray-700 text-base" style={{ fontFamily: "Kalpurush" }}>
                      <Text className="font-bold text-green-600">{i + 1}. </Text>
                      {a.description}
                    </Text>
                  </View>
                ))
              ) : (
                <Text className="text-gray-500" style={{ fontFamily: "Kalpurush" }}>কোনো কার্যক্রম নেই</Text>
              )}
            </View>

            {/* Assessment Section */}
            <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
              <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                📝 মূল্যায়ন
              </Text>
              {lessonPlan.assessment?.length ? (
                lessonPlan.assessment.map((a, i) => (
                  <Text key={i} className="text-gray-700 text-base mb-2 ml-2" style={{ fontFamily: "Kalpurush" }}>
                    • {a}
                  </Text>
                ))
              ) : (
                <Text className="text-gray-500" style={{ fontFamily: "Kalpurush" }}>কোনো মূল্যায়ন নেই</Text>
              )}
            </View>

            {/* Homework Section */}
            {lessonPlan.homework && (
              <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
                <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                  🏠 বাড়ির কাজ
                </Text>
                <Text className="text-gray-700 text-base" style={{ fontFamily: "Kalpurush" }}>
                  {lessonPlan.homework}
                </Text>
              </View>
            )}

            {/* Reset Button */}
            <TouchableOpacity
              onPress={() => {
                setLessonPlan(null);
                setState("initial");
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