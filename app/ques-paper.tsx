import InputSection from "@/components/InputSection";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { DEMO_QUESTION_PROMPT, generateQuestionPaper } from "@/utils/gemini";

const backButton = require('../assets/icons/previous-button.png');

type QuestionPaperType = {
  title: string;
  gradeLevel: string;
  totalMarks: number;
  duration: string;
  sections: {
    name: string;
    questions: { question: string; marks: number }[];
  }[];
};

export default function QuestionPaper() {
  const [paper, setPaper] = useState<QuestionPaperType | null>(null);
  const [state, setState] = useState<"initial" | "pending" | "fetched">("initial");

  const submitPrompt = useCallback(async (promptText: string) => {
    setState("pending");
    try {
      const generated = await generateQuestionPaper(promptText);
      setPaper(generated);
      setState("fetched");
    } catch (error) {
      console.error("Error generating question paper:", error);
      setState("initial");
    }
  }, []);

  // 🧾 Export PDF Handler (non-functional demo)
  const handleExportPDF = async () => {
    alert("PDF export is disabled in this demo.");
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
            প্রশ্নপত্র তৈরি
          </Text>

          {/* Spacer for alignment */}
          <View className="w-10 h-10" />
        </View>

        <View className="w-16 h-1 bg-green-500 rounded-full self-center" />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            {/* Initial Screen */}
            {state === "initial" && (
              <View className="flex-1 justify-center px-6">
                <View className="items-center mb-8">
                  <Text
                    numberOfLines={2}
                    className="text-base text-black-600 mt-40 text-center w-full"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    যেকোনো বিষয় লিখুন,{"\n"}আমরা সেটি থেকে একটি প্রশ্নপত্র তৈরি করব
                  </Text>
                </View>

                <InputSection
                  handleInput={submitPrompt}
                  processing={false}
                  demotext={DEMO_QUESTION_PROMPT}
                />
              </View>
            )}

            {/* Loading */}
            {state === "pending" && (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#10b981" />
                <Text
                  className="mt-4 text-gray-600 text-base"
                  style={{ fontFamily: "Kalpurush" }}
                >
                  প্রশ্নপত্র তৈরি হচ্ছে...
                </Text>
              </View>
            )}

            {/* Result */}
            {state === "fetched" && paper && (
              <ScrollView className="flex-1 px-6 py-4">
                {/* Title Card */}
                <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                  <Text
                    className="text-2xl font-bold text-black mb-4 text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    📋 প্রশ্নপত্র
                  </Text>
                  
                  <View className="space-y-3">
                    <View className="flex-row">
                      <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                        শিরোনাম:
                      </Text>
                      <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                        {paper.title || "—"}
                      </Text>
                    </View>
                    
                    <View className="flex-row">
                      <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                        শ্রেণি:
                      </Text>
                      <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                        {paper.gradeLevel || "—"}
                      </Text>
                    </View>
                    
                    <View className="flex-row">
                      <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                        সময়কাল:
                      </Text>
                      <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                        {paper.duration || "—"}
                      </Text>
                    </View>
                    
                    <View className="flex-row">
                      <Text className="text-gray-600 text-base w-24" style={{ fontFamily: "Kalpurush" }}>
                        মোট নম্বর:
                      </Text>
                      <Text className="text-black text-base flex-1" style={{ fontFamily: "Kalpurush" }}>
                        {paper.totalMarks || "—"}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* Sections */}
                {paper.sections.map((s, i) => (
                  <View key={i} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
                    <Text className="text-black text-lg font-bold mb-3" style={{ fontFamily: "Kalpurush" }}>
                      📝 {s.name}
                    </Text>
                    {s.questions.map((q, j) => (
                      <View key={j} className="mb-3">
                        <Text className="text-gray-700 text-base" style={{ fontFamily: "Kalpurush" }}>
                          <Text className="font-bold text-green-600">{j + 1}. </Text>
                          {q.question}
                          <Text className="text-gray-500"> ({q.marks} নম্বর)</Text>
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}

                {/* Action Buttons */}
                <View className="flex-row gap-4 mb-8">
                  <TouchableOpacity
                    onPress={handleExportPDF}
                    activeOpacity={0.85}
                    className="flex-1"
                  >
                    <LinearGradient
                      colors={['#10b981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.button}
                    >
                      <Text className="text-white text-lg font-bold" style={{ fontFamily: "Kalpurush" }}>
                        📄 PDF Export
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setPaper(null);
                      setState("initial");
                    }}
                    activeOpacity={0.85}
                    className="flex-1"
                  >
                    <LinearGradient
                      colors={['#ef4444', '#dc2626']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.button}
                    >
                      <Text className="text-white text-lg font-bold" style={{ fontFamily: "Kalpurush" }}>
                        🔄 রিসেট
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});