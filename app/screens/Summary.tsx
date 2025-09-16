import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Summary() {
    return (
        <ScrollView className="flex-1 bg-slate-900">
            {/* Header */}
            <View className="px-6 pt-12 pb-6">
                <View className="flex-row items-center mb-4">
                    <TouchableOpacity className="mr-4">
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-2xl font-bold" style={{ fontFamily: 'Kalpurush' }}>
                        সারাংশ এবং বিশ্লেষণ
                    </Text>
                </View>
                <Text className="text-gray-400 text-sm">
                    Summary and Analysis
                </Text>
            </View>

            {/* Chapter Info */}
            <View className="mx-6 mb-6 bg-slate-800 rounded-lg p-4">
                <Text className="text-blue-400 text-lg font-bold mb-2" style={{ fontFamily: 'Kalpurush-Bold' }}>
                    অধ্যায়: বাংলাদেশের ইতিহাস
                </Text>
                <Text className="text-gray-300 text-sm mb-2">
                    Chapter: History of Bangladesh
                </Text>
                <View className="flex-row items-center">
                    <Ionicons name="book" size={16} color="#60a5fa" />
                    <Text className="text-blue-400 ml-2">ক্লাস ৮, বিষয়: ইতিহাস</Text>
                </View>
            </View>

            {/* Progress Overview */}
            <View className="mx-6 mb-6">
                <Text className="text-white text-lg font-bold mb-4" style={{ fontFamily: 'Kalpurush-Bold' }}>
                    অগ্রগতির সারাংশ
                </Text>
                <View className="bg-slate-800 rounded-lg p-4">
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-300">মোট প্রশ্ন</Text>
                        <Text className="text-white font-bold">১৫</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-300">সঠিক উত্তর</Text>
                        <Text className="text-green-400 font-bold">১২</Text>
                    </View>
                    <View className="flex-row justify-between items-center mb-3">
                        <Text className="text-gray-300">ভুল উত্তর</Text>
                        <Text className="text-red-400 font-bold">৩</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-gray-300">স্কোর</Text>
                        <Text className="text-yellow-400 font-bold">৮০%</Text>
                    </View>
                </View>
            </View>

            {/* Key Learning Points */}
            <View className="mx-6 mb-6">
                <Text className="text-white text-lg font-bold mb-4" style={{ fontFamily: 'Kalpurush-Bold' }}>
                    গুরুত্বপূর্ণ শিক্ষা বিষয়
                </Text>
                <View className="space-y-3">
                    <View className="bg-slate-800 rounded-lg p-4">
                        <View className="flex-row items-start">
                            <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mt-1 mr-3" />
                            <View className="flex-1">
                                <Text className="text-white font-medium mb-1" style={{ fontFamily: 'Kalpurush-Bold' }}>
                                    স্বাধীনতা যুদ্ধের সূচনা
                                </Text>
                                <Text className="text-gray-300 text-sm leading-5">
                                    ১৯৭১ সালের ২৫ মার্চ রাতে পাকিস্তানি সেনাবাহিনীর অপারেশন সার্চলাইট এর মাধ্যমে বাংলাদেশের স্বাধীনতা যুদ্ধের সূচনা হয়।
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="bg-slate-800 rounded-lg p-4">
                        <View className="flex-row items-start">
                            <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mt-1 mr-3" />
                            <View className="flex-1">
                                <Text className="text-white font-medium mb-1" style={{ fontFamily: 'Kalpurush-Bold' }}>
                                    মুক্তিযুদ্ধের সময়কাল
                                </Text>
                                <Text className="text-gray-300 text-sm leading-5">
                                    বাংলাদেশের স্বাধীনতা যুদ্ধ ১৯৭১ সালের ২৬ মার্চ থেকে ১৬ ডিসেম্বর পর্যন্ত ৯ মাস ধরে চলেছিল।
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className="bg-slate-800 rounded-lg p-4">
                        <View className="flex-row items-start">
                            <Ionicons name="checkmark-circle" size={20} color="#10b981" className="mt-1 mr-3" />
                            <View className="flex-1">
                                <Text className="text-white font-medium mb-1" style={{ fontFamily: 'Kalpurush-Bold' }}>
                                    বিজয়ের দিন
                                </Text>
                                <Text className="text-gray-300 text-sm leading-5">
                                    ১৯৭১ সালের ১৬ ডিসেম্বর পাকিস্তানি সেনাবাহিনী আত্মসমর্পণ করে এবং বাংলাদেশ স্বাধীন হয়।
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Detailed Summary */}
            <View className="mx-6 mb-6">
                <Text className="text-white text-lg font-bold mb-4" style={{ fontFamily: 'Kalpurush-Bold' }}>
                    বিস্তারিত সারাংশ
                </Text>
                <View className="bg-slate-800 rounded-lg p-4">
                    <Text className="text-gray-300 text-sm leading-6 mb-4">
                        বাংলাদেশের স্বাধীনতা যুদ্ধ ছিল দক্ষিণ এশিয়ার ইতিহাসে একটি গুরুত্বপূর্ণ অধ্যায়। এই যুদ্ধের মাধ্যমে বাংলাদেশ নামক একটি নতুন রাষ্ট্রের জন্ম হয়। যুদ্ধটি শুরু হয়েছিল ১৯৭১ সালের ২৫ মার্চ রাতে পাকিস্তানি সেনাবাহিনীর অপারেশন সার্চলাইটের মাধ্যমে।
                    </Text>
                    <Text className="text-gray-300 text-sm leading-6 mb-4">
                        এই যুদ্ধে বাংলাদেশের মুক্তিবাহিনী, ভারতীয় সেনাবাহিনী এবং জনগণের সম্মিলিত প্রচেষ্টায় পাকিস্তানি সেনাবাহিনী পরাজিত হয়। যুদ্ধের সময় প্রায় ৩০ লক্ষ লোকের প্রাণহানি ঘটে এবং লক্ষ লক্ষ মানুষ শরণার্থী হয়।
                    </Text>
                    <Text className="text-gray-300 text-sm leading-6">
                        এই যুদ্ধের মাধ্যমে বাংলাদেশ প্রমাণ করে যে জনগণের ঐক্যবদ্ধ প্রচেষ্টা দিয়ে যেকোনো অন্যায়ের বিরুদ্ধে লড়াই করা সম্ভব।
                    </Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View className="mx-6 mb-8 flex-row space-x-4">
                <TouchableOpacity className="flex-1 bg-blue-600 rounded-lg py-3 items-center">
                    <Text className="text-white font-bold" style={{ fontFamily: 'Kalpurush-Bold' }}>
                        আবার চেষ্টা করুন
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-green-600 rounded-lg py-3 items-center">
                    <Text className="text-white font-bold" style={{ fontFamily: 'Kalpurush-Bold' }}>
                        পরবর্তী অধ্যায়
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}
