// app/gen-quiz.tsx
import InputSection from '@/components/InputSection';
import MCQDisplay from '@/components/MCQDisplay';
import { DEMO_QUIZ_TOPIC, generateQuiz } from '@/utils/gemini';
import { exportToGoogleForms } from '@/utils/googleFormGenerator';
import { generateAndSharePDF } from '@/utils/pdfGenerator';
import { LinearGradient } from "expo-linear-gradient";
import { router } from 'expo-router';
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const backButton = require('@/assets/icons/previous-button.png');
const userAvatar = require('@/assets/icons/user.png');

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

export default function Quiz() {
  const [quizes, setQuizes] = useState<QuizQuestion[]>([]);
  const [state, setState] = useState<'pending' | 'fetched' | 'initial'>('initial');
  const [exporting, setExporting] = useState(false);
  const [showAnswers, setShowAnswers] = useState(true);
  const [showExplanations, setShowExplanations] = useState(true);

  const handleProfilePress = (): void => {
    // Navigate to profile screen
    router.push('/profile'); // Adjust the route as needed
  };

  const submitPrompt = useCallback(async (promptText: string) => {
    setState('pending');
    Keyboard.dismiss();
    
    try {
      const generatedQuestions = await generateQuiz(promptText);
      
      if (generatedQuestions.length === 0) {
        Alert.alert('ত্রুটি', 'কোন প্রশ্ন তৈরি হয়নি। আবার চেষ্টা করুন।');
        setState('initial');
        return;
      }
      
      setQuizes(generatedQuestions);
      setState('fetched');
    } catch (error) {
      console.error('Error generating quiz:', error);
      Alert.alert(
        'ত্রুটি',
        'MCQ তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
        [
          { text: 'আবার চেষ্টা করুন', onPress: () => setState('initial') }
        ]
      );
      setState('initial');
    }
  }, []);

  const handleExportPDF = async () => {
    if (quizes.length === 0) {
      Alert.alert('সতর্কতা', 'PDF তৈরির জন্য প্রথমে MCQ তৈরি করুন।');
      return;
    }

    setExporting(true);
    try {
      await generateAndSharePDF(quizes, {
        title: 'MCQ প্রশ্নপত্র',
        subtitle: 'ChalkPad দ্বারা তৈরি',
        showAnswers: showAnswers,
        showExplanations: showExplanations,
        footer: 'ChalkPad - শিক্ষায় নতুন মাত্রা'
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('ত্রুটি', 'PDF তৈরি করতে সমস্যা হয়েছে।');
    } finally {
      setExporting(false);
    }
  };

  const handleGoogleForms = async () => {
    if (quizes.length === 0) {
      Alert.alert('সতর্কতা', 'Google Form তৈরির জন্য প্রথমে MCQ তৈরি করুন।');
      return;
    }

    try {
      await exportToGoogleForms(quizes, 'MCQ Quiz - ChalkPad');
    } catch (error) {
      console.error('Error with Google Forms:', error);
      Alert.alert('ত্রুটি', 'Google Form তৈরি করতে সমস্যা হয়েছে।');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'রিসেট করুন',
      'আপনি কি নিশ্চিত যে সব প্রশ্ন মুছে ফেলতে চান?',
      [
        { text: 'বাতিল', style: 'cancel' },
        {
          text: 'হ্যাঁ, রিসেট করুন',
          style: 'destructive',
          onPress: () => {
            setQuizes([]);
            setState('initial');
            setShowAnswers(true);
            setShowExplanations(true);
          }
        }
      ]
    );
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
  };

  const toggleExplanations = () => {
    setShowExplanations(!showExplanations);
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
            MCQ তৈরি
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
            {state === 'initial' && (
              <View className="flex-1 justify-center px-6">
                <View className="items-center mb-8">                  
                  <Text
                    numberOfLines={4}
                    className="text-base text-black-600 mt-40 text-center w-full"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    যেকোনো বিষয় লিখুন,{'\n'}
                    আমরা সেটি থেকে MCQ প্রশ্নপত্র তৈরি করব।{'\n'}
                  </Text>
                </View>

                <InputSection
                  handleInput={submitPrompt}
                  processing={false}
                  demotext={DEMO_QUIZ_TOPIC}
                />

                {/* Info Card */}
                <View className="mt-6 bg-blue-50 rounded-2xl p-4 mx-4 border border-blue-200">
                  <Text 
                    className="text-sm text-blue-800"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    💡 <Text className="font-bold">টিপস:</Text> স্পষ্টভাবে বিষয় এবং প্রশ্ন সংখ্যা উল্লেখ করুন
                  </Text>
                </View>
              </View>
            )}

            {/* Loading */}
            {state === 'pending' && (
              <View className="flex-1 justify-center items-center px-6">
                <View className="bg-white rounded-3xl p-8 shadow-lg items-center">
                  <ActivityIndicator size="large" color="#10b981" />
                  <Text
                    className="mt-6 text-gray-700 text-lg font-semibold text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    MCQ প্রশ্নপত্র তৈরি হচ্ছে...
                  </Text>
                  <Text
                    className="mt-2 text-gray-500 text-sm text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    অনুগ্রহ করে অপেক্ষা করুন
                  </Text>
                </View>
              </View>
            )}

            {/* Result */}
            {state === 'fetched' && quizes.length > 0 && (
              <ScrollView 
                className="flex-1 px-6 py-4"
                showsVerticalScrollIndicator={false}
              >
                {/* Title Card */}
                <View className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-6 mb-4 shadow-lg">
                  <Text
                    className="text-2xl font-bold text-white mb-2 text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    ✅ MCQ প্রশ্নপত্র তৈরি সম্পন্ন
                  </Text>
                  <Text
                    className="text-white text-base text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    মোট প্রশ্ন: {quizes.length}টি
                  </Text>
                </View>

                {/* Toggle Options */}
                <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
                  <Text
                    className="text-base font-bold text-gray-700 mb-3"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    ⚙️ প্রদর্শন সেটিংস:
                  </Text>
                  
                  <View className="flex-row justify-between items-center mb-2">
                    <Text
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Kalpurush" }}
                    >
                      সঠিক উত্তর দেখান
                    </Text>
                    <TouchableOpacity
                      onPress={toggleAnswers}
                      className={`w-14 h-8 rounded-full justify-center ${
                        showAnswers ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      activeOpacity={0.8}
                    >
                      <View
                        className={`w-6 h-6 rounded-full bg-white shadow-md ${
                          showAnswers ? 'self-end mr-1' : 'self-start ml-1'
                        }`}
                      />
                    </TouchableOpacity>
                  </View>

                  <View className="flex-row justify-between items-center">
                    <Text
                      className="text-sm text-gray-600"
                      style={{ fontFamily: "Kalpurush" }}
                    >
                      ব্যাখ্যা দেখান
                    </Text>
                    <TouchableOpacity
                      onPress={toggleExplanations}
                      className={`w-14 h-8 rounded-full justify-center ${
                        showExplanations ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                      activeOpacity={0.8}
                    >
                      <View
                        className={`w-6 h-6 rounded-full bg-white shadow-md ${
                          showExplanations ? 'self-end mr-1' : 'self-start ml-1'
                        }`}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Questions Display */}
                <MCQDisplay 
                  questions={quizes}
                  showAnswers={showAnswers}
                  showExplanations={showExplanations}
                />

                {/* Action Buttons */}
                <View className="gap-3 mb-8 mt-4">
                  {/* PDF Export Button */}
                  <TouchableOpacity
                    onPress={handleExportPDF}
                    activeOpacity={0.85}
                    disabled={exporting}
                  >
                    <LinearGradient
                      colors={exporting ? ['#9ca3af', '#6b7280'] : ['#10b981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.button}
                    >
                      {exporting ? (
                        <View className="flex-row items-center">
                          <ActivityIndicator color="white" size="small" />
                          <Text 
                            className="text-white text-lg font-bold ml-2" 
                            style={{ fontFamily: "Kalpurush" }}
                          >
                            PDF তৈরি হচ্ছে...
                          </Text>
                        </View>
                      ) : (
                        <View className="flex-row items-center">
                          <Text className="text-white text-2xl mr-2">📄</Text>
                          <Text 
                            className="text-white text-lg font-bold" 
                            style={{ fontFamily: "Kalpurush" }}
                          >
                            PDF Export করুন
                          </Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Google Form Button */}
                  <TouchableOpacity
                    onPress={handleGoogleForms}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={['#4285f4', '#3367d6']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.button}
                    >
                      <View className="flex-row items-center">
                        <Text className="text-white text-2xl mr-2">📝</Text>
                        <Text 
                          className="text-white text-lg font-bold" 
                          style={{ fontFamily: "Kalpurush" }}
                        >
                          Google Form তৈরি
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  {/* Reset Button */}
                  <TouchableOpacity
                    onPress={handleReset}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={['#ef4444', '#dc2626']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.button}
                    >
                      <View className="flex-row items-center">
                        <Text className="text-white text-2xl mr-2">🔄</Text>
                        <Text 
                          className="text-white text-lg font-bold" 
                          style={{ fontFamily: "Kalpurush" }}
                        >
                          নতুন প্রশ্ন তৈরি করুন
                        </Text>
                      </View>
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
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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