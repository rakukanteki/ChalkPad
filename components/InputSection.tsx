import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
interface InputSectionProps {
    handleInput: (text: string) => void;
    processing: boolean;
    error?: string;
    demotext: string;
    onSubmit?: () => void;
}

const InputSection = ({ handleInput, processing, error, demotext, onSubmit }: InputSectionProps) => {
    const [internalValue, setInternalValue] = useState('');
    const [demoUsed, setDemoUsed] = useState(false);

    return (
        <View className="bg-gray-900 p-2">
            {!demoUsed && <View className="flex-row items-center mb-2">
                <TouchableOpacity
                    className="bg-blue-500 rounded-full p-1.5 px-3 flex-row items-center mr-2"
                    onPress={() => {
                        setInternalValue(demotext);
                        setDemoUsed(true);
                    }}
                >
                    <Ionicons name="bulb" size={14} color="white" />
                    <Text className="text-white font-bold ml-1" style={{ fontFamily: 'Kalpurush', fontSize: 16 }}>
                        ডেমো
                    </Text>
                </TouchableOpacity>
            </View>}
            <TextInput
                className="border border-gray-300 rounded-lg px-2 py-2 bg-gray-900 text-base mb-2 text-white"
                onChangeText={setInternalValue}
                value={internalValue}
                placeholder="উদাহরণ: ফিলিস্তিনের ইতিহাস"
                multiline
                numberOfLines={6}
                style={{ fontFamily: 'Kalpurush', minHeight: 120 }}
            />
            {error && (
                <Text className="text-xs text-red-500 mt-1 mb-2">
                    {error}
                </Text>
            )}
            {!error && (
                <Text className="text-[12px] text-gray-500 mt-1 mb-5">
                    কৃত্রিম বুদ্ধিমত্তার মাধ্যমে তৈরি সারাংশ ভুলও থাকতে পারে। দয়া করে যাচাই করুন।
                </Text>
            )}
            <View className='flex flex-row justify-between mb-1'>
                <View className='flex flex-row justify-between w-1/3 mt-1'>
                    <Pressable onPress={() => setInternalValue('ফিলিস্তিনের ইতিহাস')} disabled={processing || true}>
                       <FontAwesome name="file-pdf-o" size={24} color="white" />
                    </Pressable>
                    <Pressable onPress={() => setInternalValue('বাংলাদেশের স্বাধীনতা যুদ্ধের ইতিহাস')} disabled={processing || true}>
                        <FontAwesome name="image" size={24} color="white" />
                    </Pressable>
                    <Pressable onPress={() => setInternalValue('বাংলাদেশের স্বাধীনতা যুদ্ধের ইতিহাস')} disabled={processing || true}>
                        <FontAwesome name="microphone" size={24} color="white" />
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
    );
};

export default InputSection;