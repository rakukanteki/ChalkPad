import { Text, View } from 'react-native';

export default function Chooser() {
    return (
        <View className="flex-1 items-center justify-center bg-slate-900">
            <Text className="text-white text-xl" style={{ fontFamily: 'Kalpurush' }}>
                ক্লাস এবং বিষয় নির্বাচন করুন
            </Text>
            <Text className="text-gray-400 text-sm mt-2">
                Choose Class and Subject
            </Text>
        </View>
    );
}
