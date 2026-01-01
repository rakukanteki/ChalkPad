import InputSection from '@/components/InputSection';
import { DEMO_QUIZ_TOPIC, generateQuiz } from '@/utils/gemini';
import { LinearGradient } from "expo-linear-gradient";
import * as Print from 'expo-print';
import { router } from 'expo-router';
import * as Sharing from 'expo-sharing';
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

const backButton = require('../assets/icons/previous-button.png');

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
};

export default function Quiz() {
  const [quizes, setQuizes] = useState<QuizQuestion[]>([]);
  const [state, setState] = useState<'pending' | 'fetched' | 'initial'>('initial');
  const [exporting, setExporting] = useState(false);

  const submitPrompt = useCallback(async (promptText: string) => {
    setState('pending');
    try {
      const generatedQuestions = await generateQuiz(promptText);
      setQuizes(generatedQuestions);
      setState('fetched');
    } catch (error) {
      console.error('Error generating quiz:', error);
      Alert.alert('ত্রুটি', 'MCQ তৈরি করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
      setState('initial');
    }
  }, []);

  const generatePDF = async () => {
    if (quizes.length === 0) return;

    setExporting(true);
    try {
      // Create HTML content for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            @font-face {
              font-family: 'Kalpurush';
              src: url('../assets/fonts/kalpurush.ttf');
            }
            body {
              font-family: 'Kalpurush', Arial, sans-serif;
              padding: 40px;
              line-height: 1.6;
            }
            h1 {
              text-align: center;
              color: #10b981;
              border-bottom: 3px solid #10b981;
              padding-bottom: 10px;
              margin-bottom: 30px;
            }
            .question-block {
              margin-bottom: 30px;
              page-break-inside: avoid;
            }
            .question {
              font-weight: bold;
              font-size: 16px;
              margin-bottom: 10px;
              color: #1f2937;
            }
            .options {
              margin-left: 20px;
            }
            .option {
              margin: 8px 0;
              padding: 8px;
              background-color: #f9fafb;
              border-radius: 6px;
            }
            .correct {
              background-color: #d1fae5;
              border: 2px solid #10b981;
              font-weight: bold;
            }
            .footer {
              margin-top: 50px;
              text-align: center;
              color: #6b7280;
              font-size: 12px;
              border-top: 1px solid #e5e7eb;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <h1>MCQ প্রশ্নপত্র</h1>
          <p style="text-align: center; color: #6b7280; margin-bottom: 30px;">
            মোট প্রশ্ন: ${quizes.length}টি
          </p>
          
          ${quizes.map((quiz, index) => `
            <div class="question-block">
              <div class="question">
                প্রশ্ন ${index + 1}: ${quiz.question}
              </div>
              <div class="options">
                ${quiz.options.map((option, optIndex) => `
                  <div class="option ${option === quiz.correctAnswer ? 'correct' : ''}">
                    ${String.fromCharCode(65 + optIndex)}. ${option}
                    ${option === quiz.correctAnswer ? ' ✓ (সঠিক উত্তর)' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
          
          <div class="footer">
            <p>ChalkPad দ্বারা তৈরি - শিক্ষায় নতুন মাত্রা</p>
            <p>রিফ্লেক্টিভ টিনস ট্রাস্ট এর একটি পণ্য</p>
          </div>
        </body>
        </html>
      `;

      // Generate PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });

      // Share the PDF
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'MCQ প্রশ্নপত্র শেয়ার করুন',
          UTI: 'com.adobe.pdf'
        });
      } else {
        Alert.alert('সফল', 'PDF তৈরি হয়েছে: ' + uri);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      Alert.alert('ত্রুটি', 'PDF তৈরি করতে সমস্যা হয়েছে।');
    } finally {
      setExporting(false);
    }
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
            {state === 'initial' && (
              <View className="flex-1 justify-center px-6">
                <View className="items-center mb-8">
                  <Text
                    numberOfLines={3}
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
              </View>
            )}

            {/* Loading */}
            {state === 'pending' && (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="#10b981" />
                <Text
                  className="mt-4 text-gray-600 text-base"
                  style={{ fontFamily: "Kalpurush" }}
                >
                  MCQ প্রশ্নপত্র তৈরি হচ্ছে...
                </Text>
              </View>
            )}

            {/* Result */}
            {state === 'fetched' && quizes.length > 0 && (
              <ScrollView className="flex-1 px-6 py-4">
                {/* Title Card */}
                <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                  <Text
                    className="text-2xl font-bold text-black mb-2 text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    ✅ MCQ প্রশ্নপত্র
                  </Text>
                  <Text
                    className="text-gray-600 text-sm text-center"
                    style={{ fontFamily: "Kalpurush" }}
                  >
                    মোট প্রশ্ন: {quizes.length}টি
                  </Text>
                </View>

                {/* Questions */}
                {quizes.map((quiz, index) => (
                  <View key={index} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
                    <Text 
                      className="text-black text-base font-bold mb-3" 
                      style={{ fontFamily: "Kalpurush" }}
                    >
                      <Text className="text-green-600">প্রশ্ন {index + 1}: </Text>
                      {quiz.question}
                    </Text>
                    
                    {quiz.options.map((option, optIndex) => (
                      <View 
                        key={optIndex} 
                        className={`p-3 mb-2 rounded-lg ${
                          option === quiz.correctAnswer 
                            ? 'bg-green-50 border-2 border-green-400' 
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <Text 
                          className={`text-base ${
                            option === quiz.correctAnswer ? 'text-green-700 font-bold' : 'text-gray-700'
                          }`}
                          style={{ fontFamily: "Kalpurush" }}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                          {option === quiz.correctAnswer && ' ✓'}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}

                {/* Action Buttons */}
                <View className="flex-row gap-4 mb-8 mt-4">
                  <TouchableOpacity
                    onPress={generatePDF}
                    activeOpacity={0.85}
                    disabled={exporting}
                    className="flex-1"
                  >
                    <LinearGradient
                      colors={exporting ? ['#9ca3af', '#6b7280'] : ['#10b981', '#059669']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.button}
                    >
                      {exporting ? (
                        <ActivityIndicator color="white" size="small" />
                      ) : (
                        <Text className="text-white text-lg font-bold" style={{ fontFamily: "Kalpurush" }}>
                          📄 PDF Export
                        </Text>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setQuizes([]);
                      setState('initial');
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
    minHeight: 56,
  },
});