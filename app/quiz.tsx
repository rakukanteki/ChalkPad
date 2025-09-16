import type { QuizQuestion } from '@/types';
import { useCallback, useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native';
import Questions from './screens/Quiz';

const initialQuestions: QuizQuestion[] = [
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
];

const Prompt = ({ onPromptSubmit, text, onChangeText, disabled }: { disabled: boolean, onPromptSubmit: (prompt: string) => void, text: string, onChangeText: (txt: string) => void }) => {
    return <View className="space-y-4">
        <Text className="text-lg font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Kalpurush' }}>কুইজের বিষয় লিখুন:</Text>
        <TextInput
            className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-base"
            onChangeText={onChangeText}
            value={text}
            editable={!disabled}
            placeholder="উদাহরণ: ভূগোল, ইতিহাস, বিজ্ঞান..."
        />
        <View className="rounded-lg overflow-hidden">
            <Button title="কুইজ তৈরি করুন"
                onPress={(e) => onPromptSubmit(text)} disabled={disabled} />
        </View>
    </View>
};

export default function Quiz() {
    const [text, onChangeText] = useState('অর্থহীন টেক্সট');
    const [quizes, setQuizes] = useState<QuizQuestion[]>(initialQuestions);
    const [state, setState] = useState<'pending' | 'fetched' | 'initial'>('initial');

    const submitPrompt = useCallback(() => {
        setState('pending');

        function fn() {
            setState('fetched');
            onChangeText('');
        }
        setTimeout(fn, 1000);
    }, []);

    return (
        <>
            <View className="flex-1 bg-gray-50">
                <View className="p-6 pt-12">
                    <Prompt onChangeText={onChangeText}
                        onPromptSubmit={submitPrompt}
                        text={text}
                        disabled={state === 'pending'}
                    />
                </View>

                {state === 'pending' && (
                    <View className="flex-1 justify-center items-center">
                        <ActivityIndicator size="large" />
                        <Text className="mt-4 text-gray-600" style={{ fontFamily: 'Kalpurush' }}>কুইজ তৈরি হচ্ছে...</Text>
                    </View>
                )}

                {state === 'fetched' && (
                    <View className="flex-1">
                        <View className="px-6 pb-4">
                            <Text className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Kalpurush' }}>কুইজ প্রশ্নসমূহ</Text>
                        </View>
                        <Questions questions={quizes} />
                        <View className="h-4" />
                        <View className="px-6 py-4 bg-white border-t border-gray-200">
                            <View className="flex-row justify-around">
                                <View className="rounded-lg overflow-hidden flex-1 mx-2">
                                    <Button title="গুগল ফর্ম" onPress={() => console.log('গুগল ফর্ম চাপা হয়েছে')} />
                                </View>
                                <View className="rounded-lg overflow-hidden flex-1 mx-2">
                                    <Button title="রিসেট" onPress={() => {
                                        setQuizes(initialQuestions);
                                        setState('initial');
                                        onChangeText('অর্থহীন টেক্সট');
                                    }} />
                                </View>
                            </View>
                        </View>
                    </View>
                )}
            </View>
        </>
    );
}