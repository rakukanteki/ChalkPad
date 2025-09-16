import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Summary() {
    const [prompt, setPrompt] = useState('');
    const [summary, setSummary] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateSummary = () => {
        if (!prompt.trim()) return;

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setSummary(`"${prompt}" এর সারাংশ:\n\nএই পাঠে আপনি প্রধান বিষয়গুলো শিখেছেন। এতে অন্তর্ভুক্ত রয়েছে:\n\n• প্রধান ধারণা এবং সংজ্ঞা\n• গুরুত্বপূর্ণ তথ্য এবং উদাহরণ\n• মূল পয়েন্ট এবং শিক্ষণীয় বিষয়\n\nএই সারাংশ আপনাকে পাঠের সারাংশ বুঝতে সাহায্য করবে।`);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <View className="flex-1 bg-gray-50 p-6">
            <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Kalpurush' }}>
                    পাঠ সারাংশ
                </Text>
                <Text className="text-base text-gray-600" style={{ fontFamily: 'Kalpurush' }}>
                    আপনার পাঠ, অধ্যায় বা যেকোনো শিক্ষামূলক বিষয়ের সারাংশ তৈরি করুন
                </Text>
            </View>

            <View className="mb-6">
                <Text className="text-lg font-semibold text-gray-800 mb-3" style={{ fontFamily: 'Kalpurush' }}>
                    পাঠের বিষয়বস্তু লিখুন:
                </Text>
                <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-base"
                    onChangeText={setPrompt}
                    value={prompt}
                    placeholder="উদাহরণ: বাংলাদেশের ইতিহাসের প্রথম অধ্যায়..."
                    multiline
                    numberOfLines={4}
                    style={{ fontFamily: 'Kalpurush' }}
                />
            </View>

            <TouchableOpacity
                className="bg-blue-600 rounded-lg py-4 px-6 mb-6 flex-row items-center justify-center"
                onPress={generateSummary}
                disabled={isLoading || !prompt.trim()}
            >
                {isLoading ? (
                    <ActivityIndicator color="white" size="small" />
                ) : (
                    <Ionicons name="document-text" size={24} color="white" />
                )}
                <Text className="text-white font-bold text-lg ml-2" style={{ fontFamily: 'Kalpurush' }}>
                    {isLoading ? 'তৈরি হচ্ছে...' : 'পাঠ সারাংশ তৈরি করুন'}
                </Text>
            </TouchableOpacity>

            {summary ? (
                <View className="bg-white rounded-xl shadow-lg p-6">
                    <Text className="text-lg font-bold text-gray-800 mb-4" style={{ fontFamily: 'Kalpurush' }}>
                        তৈরি করা পাঠ সারাংশ:
                    </Text>
                    <Text className="text-base text-gray-700 leading-6" style={{ fontFamily: 'Kalpurush' }}>
                        {summary}
                    </Text>
                </View>
            ) : null}
        </View>
    );
}