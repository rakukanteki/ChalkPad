// components/MCQDisplay.tsx
import React from 'react';
import { Text, View } from 'react-native';

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
};

interface MCQDisplayProps {
  questions: QuizQuestion[];
  showAnswers?: boolean;
  showExplanations?: boolean;
}

export default function MCQDisplay({ 
  questions, 
  showAnswers = true, 
  showExplanations = true 
}: MCQDisplayProps) {
  return (
    <View>
      {questions.map((quiz, index) => (
        <View key={index} className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
          {/* Question */}
          <Text 
            className="text-black text-base font-bold mb-3" 
            style={{ fontFamily: "Kalpurush" }}
          >
            <Text className="text-green-600">প্রশ্ন {index + 1}: </Text>
            {quiz.question}
          </Text>
          
          {/* Options */}
          {quiz.options.map((option, optIndex) => {
            const isCorrect = option === quiz.correctAnswer;
            
            return (
              <View 
                key={optIndex} 
                className={`p-3 mb-2 rounded-lg ${
                  showAnswers && isCorrect
                    ? 'bg-green-50 border-2 border-green-400' 
                    : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <Text 
                  className={`text-base ${
                    showAnswers && isCorrect 
                      ? 'text-green-700 font-bold' 
                      : 'text-gray-700'
                  }`}
                  style={{ fontFamily: "Kalpurush" }}
                >
                  {String.fromCharCode(65 + optIndex)}. {option}
                  {showAnswers && isCorrect && ' ✓'}
                </Text>
              </View>
            );
          })}

          {/* Explanation */}
          {showExplanations && quiz.explanation && (
            <View className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <Text 
                className="text-sm text-blue-800 font-semibold mb-1"
                style={{ fontFamily: "Kalpurush" }}
              >
                💡 ব্যাখ্যা:
              </Text>
              <Text 
                className="text-sm text-blue-700"
                style={{ fontFamily: "Kalpurush" }}
              >
                {quiz.explanation}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}