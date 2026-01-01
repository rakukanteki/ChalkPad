import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { ActivityIndicator, Pressable, SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface InputSectionProps {
    handleInput: (text: string) => void;
    processing: boolean;
    error?: string;
    demotext: string;
    onSubmit?: () => void;
}

const InputSection = ({ handleInput, processing, error, demotext, onSubmit }: InputSectionProps) => {
    const [internalValue, setInternalValue] = useState('');

    return (
        <SafeAreaView className="bg-[#F5F5F5]">
            <View className="bg-[#F5F5F5] p-2">
                <TextInput
                    className="border border-gray-300 rounded-lg px-2 py-2 bg-white text-base mb-2 text-black"
                    onChangeText={setInternalValue}
                    value={internalValue}
                    placeholder="আপনার অনুসন্ধান লিখুন"
                    placeholderTextColor="#6B7280"
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    style={{ fontFamily: 'Kalpurush', height: 120 }}
                />
                {error && (
                    <View style={{ height: 40 }}>
                        <Text className="text-xs text-red-500 mt-1">
                            {error}
                        </Text>
                    </View>
                )}
                {!error && (
                    <View style={{ height: 40 }}>
                        <Text className="text-[12px] text-gray-500 mt-1 text-center">
                            কৃত্রিম বুদ্ধিমত্তার মাধ্যমে তৈরি সারাংশ ভুলও থাকতে পারে। দয়া করে যাচাই করুন।
                        </Text>
                    </View>
                )}
                <View className='flex flex-row justify-between mb-1'>
                    <View className='flex flex-row gap-4 mt-1'>
                        <Pressable 
                            onPress={() => setInternalValue('ফিলিস্তিনের ইতিহাস')} 
                            disabled={processing || true}
                            className="bg-gray-300 rounded-full p-2 items-center justify-center"
                            style={{ width: 40, height: 40 }}
                        >
                            <FontAwesome name="file-pdf-o" size={20} color="black" />
                        </Pressable>
                        <Pressable 
                            onPress={() => setInternalValue('বাংলাদেশের স্বাধীনতা যুদ্ধের ইতিহাস')} 
                            disabled={processing || true}
                            className="bg-gray-300 rounded-full p-2 items-center justify-center"
                            style={{ width: 40, height: 40 }}
                        >
                            <FontAwesome name="image" size={20} color="black" />
                        </Pressable>
                        <Pressable 
                            onPress={() => setInternalValue('বাংলাদেশের স্বাধীনতা যুদ্ধের ইতিহাস')} 
                            disabled={processing || true}
                            className="bg-gray-300 rounded-full p-2 items-center justify-center"
                            style={{ width: 40, height: 40 }}
                        >
                            <FontAwesome name="microphone" size={20} color="black" />
                        </Pressable>
                    </View>
                    <View>
                        <TouchableOpacity
                            className="bg-blue-600 rounded-lg flex-row items-center justify-center p-2"
                            onPress={() => {
                                handleInput(internalValue);
                                onSubmit?.();
                            }}
                            disabled={processing || !internalValue.trim()}
                        >
                            {processing ? (
                                <ActivityIndicator color="white" size="small" />
                            ) : (
                                <Ionicons name="document-text" size={18} color="white" />
                            )}
                            <Text className="text-white font-bold px-1.5" style={{ fontFamily: 'Kalpurush', fontSize: 16 }}>
                                {processing ? 'তৈরি হচ্ছে...' : 'জমা'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default InputSection;