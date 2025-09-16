import type { QuizQuestion } from "@/types";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export const initialQuestions: QuizQuestion[] = [
    {
        questionId: 1,
        title: 'বাংলাদেশের জাতীয় ফুল কী?',
        data: [
            {
                choiceId: 1,
                choiceLabel: 'শাপলা'
            },
            {
                choiceId: 2,
                choiceLabel: 'গোলাপ'
            },
            {
                choiceId: 3,
                choiceLabel: 'শাপলা'
            },
            {
                choiceId: 4,
                choiceLabel: 'গোলাপ'
            }
        ]
    },
    {
        questionId: 2,
        title: 'বাংলাদেশের জাতীয় ফুল কী?',
        data: [
            {
                choiceId: 5,
                choiceLabel: 'শাপলা'
            },
            {
                choiceId: 6,
                choiceLabel: 'গোলাপ'
            },
            {
                choiceId: 3,
                choiceLabel: 'শাপলা'
            },
            {
                choiceId: 4,
                choiceLabel: 'গোলাপ'
            }
        ]
    },
    {
        questionId: 3,
        title: 'বাংলাদেশের জাতীয় ফুল কী?',
        data: [
            {
                choiceId: 5,
                choiceLabel: 'শাপলা'
            },
            {
                choiceId: 6,
                choiceLabel: 'গোলাপ'
            },
            {
                choiceId: 3,
                choiceLabel: 'শাপলা'
            },
            {
                choiceId: 4,
                choiceLabel: 'গোলাপ'
            }
        ]
    }
]

const QuestionCard = ({ question }: { question: QuizQuestion }) => {
    return (
        <View className="bg-white rounded-xl shadow-lg p-6 m-3 w-80 border border-gray-100">
            <Text className="text-lg font-bold mb-6 text-gray-800 leading-6">{question.title}</Text>
            <View className="space-y-3">
                {question.data.map((choice) => (
                    <TouchableOpacity
                        key={choice.choiceId}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 active:bg-gray-100"
                        onPress={() => console.log(`নির্বাচিত: ${choice.choiceLabel}`)}
                    >
                        <Text className="text-base text-gray-700 font-medium">{choice.choiceLabel}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const Questions = ({ questions }: { questions: QuizQuestion[] }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            className="flex-1"
        >
            {questions.map((question) => (
                <QuestionCard key={question.questionId} question={question} />
            ))}
        </ScrollView>
    );
}

export default Questions;