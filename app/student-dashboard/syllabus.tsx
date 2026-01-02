// import { syllabusData } from '@/utils/data/syllabusData';
// import { useRouter } from 'expo-router';
// import React from 'react';
// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const backButton = require('@/assets/icons/previous-button.png');

// const SyllabusScreen: React.FC = () => {
//   const router = useRouter();

//   const handleClassSelect = (classNumber: number) => {
//     router.push({
//       pathname: '/student-dashboard/subject-list',
//       params: { classNumber }
//     });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
//       <View className="flex-1">
//         {/* Header */}
//         <View className="px-8 py-6 mt-8">
//           <View className="flex-row items-center justify-between mb-2">
//             <TouchableOpacity 
//               onPress={() => router.back()}
//               className="w-10 h-10 items-center justify-center"
//               activeOpacity={0.7}
//             >
//               <Image 
//                 source={backButton} 
//                 className="w-15 h-8" 
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>

//             <Text 
//               numberOfLines={1}
//               className="text-black text-2xl font-bold text-center flex-1"
//               style={{ fontFamily: 'Kalpurush' }}
//             >
//               সিলেবাস
//             </Text>

//             <View className="w-10 h-10" />
//           </View>

//           <View className="w-16 h-1 bg-red-500 rounded-full self-center" />
//           <Text 
//             className="text-gray-500 text-base text-center mt-3"
//             style={{ fontFamily: 'Kalpurush' }}
//           >
//             আপনার শ্রেণি নির্বাচন করুন
//           </Text>
//         </View>

//         {/* Class Selection Grid */}
//         <ScrollView 
//           className="flex-1 px-8"
//           showsVerticalScrollIndicator={false}
//         >
//           <View className="pb-6">
//             {syllabusData.map((classData) => (
//               <TouchableOpacity
//                 key={classData.class}
//                 onPress={() => handleClassSelect(classData.class)}
//                 activeOpacity={0.7}
//                 style={styles.classCard}
//               >
//                 <View className="flex-row items-center">
//                   <View className="bg-blue-500 rounded-full w-16 h-16 items-center justify-center mr-4">
//                     <Text className="text-white text-2xl font-bold">
//                       {classData.class}
//                     </Text>
//                   </View>
//                   <View className="flex-1">
//                     <Text
//                       className="text-gray-800 text-xl font-bold"
//                       style={{ fontFamily: 'Kalpurush' }}
//                     >
//                       {classData.className}
//                     </Text>
//                     <Text
//                       className="text-gray-500 text-sm mt-1"
//                       style={{ fontFamily: 'Kalpurush' }}
//                     >
//                       {classData.subjects.length} টি বিষয়
//                     </Text>
//                   </View>
//                   <Text className="text-gray-400 text-2xl">›</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   classCard: {
//     backgroundColor: 'white',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   }
// });

// export default SyllabusScreen;