// import { syllabusData } from '@/utils/data/syllabusData';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const backButton = require('@/assets/icons/previous-button.png');

// const ChapterListScreen: React.FC = () => {
//   const router = useRouter();
//   const { classNumber, subjectId } = useLocalSearchParams<{ 
//     classNumber: string; 
//     subjectId: string 
//   }>();
  
//   const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

//   const classData = syllabusData.find(c => c.class === Number(classNumber));
//   const subject = classData?.subjects.find(s => s.id === subjectId);

//   if (!classData || !subject) {
//     return (
//       <SafeAreaView className="flex-1 bg-[#F5F5F5]">
//         <View className="flex-1 items-center justify-center">
//           <Text style={{ fontFamily: 'Kalpurush' }}>ডেটা পাওয়া যায়নি</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   const toggleChapter = (chapterId: number) => {
//     setExpandedChapters(prev => {
//       const newSet = new Set(prev);
//       if (newSet.has(chapterId)) {
//         newSet.delete(chapterId);
//       } else {
//         newSet.add(chapterId);
//       }
//       return newSet;
//     });
//   };

//   return (
//     <SafeAreaView className="flex-1 bg-[#F5F5F5]" edges={['top', 'bottom']}>
//       <View className="flex-1">
//         {/* Header */}
//         <View className="px-8 py-6">
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
//               {subject.name}
//             </Text>

//             <View className="w-10 h-10" />
//           </View>

//           <View className="w-16 h-1 bg-blue-500 rounded-full self-center" />
//           <Text 
//             className="text-gray-500 text-base text-center mt-3"
//             style={{ fontFamily: 'Kalpurush' }}
//           >
//             {classData.className} • {subject.chapters.length} টি অধ্যায়
//           </Text>
//         </View>

//         {/* Chapter List */}
//         <ScrollView 
//           className="flex-1 px-8"
//           showsVerticalScrollIndicator={false}
//         >
//           <View className="pb-6">
//             {subject.chapters.length === 0 ? (
//               <View className="bg-white rounded-2xl p-8 items-center">
//                 <Text 
//                   className="text-gray-500 text-lg text-center"
//                   style={{ fontFamily: 'Kalpurush' }}
//                 >
//                   শীঘ্রই আসছে
//                 </Text>
//               </View>
//             ) : (
//               subject.chapters.map((chapter) => (
//                 <View key={chapter.id} style={styles.chapterCard}>
//                   {/* Chapter Header */}
//                   <TouchableOpacity
//                     onPress={() => toggleChapter(chapter.id)}
//                     activeOpacity={0.7}
//                     className="flex-row items-center justify-between"
//                   >
//                     <View className="flex-1 flex-row items-center">
//                       <View className="bg-blue-100 rounded-full w-10 h-10 items-center justify-center mr-3">
//                         <Text className="text-blue-600 text-base font-bold">
//                           {chapter.id}
//                         </Text>
//                       </View>
//                       <View className="flex-1">
//                         <Text
//                           className="text-gray-800 text-lg font-bold"
//                           style={{ fontFamily: 'Kalpurush' }}
//                         >
//                           অধ্যায় {chapter.id}
//                         </Text>
//                         <Text
//                           className="text-gray-600 text-base mt-1"
//                           style={{ fontFamily: 'Kalpurush' }}
//                         >
//                           {chapter.title}
//                         </Text>
//                         <Text className="text-gray-400 text-xs mt-1">
//                           {chapter.titleEnglish}
//                         </Text>
//                       </View>
//                     </View>
//                     <Text 
//                       className="text-gray-400 text-2xl ml-2"
//                       style={{
//                         transform: [{ 
//                           rotate: expandedChapters.has(chapter.id) ? '90deg' : '0deg' 
//                         }]
//                       }}
//                     >
//                       ›
//                     </Text>
//                   </TouchableOpacity>

//                   {/* Expanded Sections */}
//                   {expandedChapters.has(chapter.id) && (
//                     <View className="mt-4 ml-2">
//                       {chapter.sections.map((section) => (
//                         <View key={section.id} className="mb-3">
//                           {/* Section */}
//                           <View className="flex-row items-start">
//                             <View className="w-0.5 h-full bg-gray-300 mr-4 ml-1" />
//                             <View className="flex-1">
//                               <View className="flex-row items-center mb-2">
//                                 <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
//                                 <Text
//                                   className="text-gray-700 text-base flex-1"
//                                   style={{ fontFamily: 'Kalpurush' }}
//                                 >
//                                   {section.title}
//                                 </Text>
//                               </View>

//                               {/* Subsections */}
//                               {section.subsections && section.subsections.length > 0 && (
//                                 <View className="ml-8">
//                                   {section.subsections.map((subsection) => (
//                                     <View 
//                                       key={subsection.id} 
//                                       className="flex-row items-center mb-2"
//                                     >
//                                       <View className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3" />
//                                       <Text
//                                         className="text-gray-600 text-sm flex-1"
//                                         style={{ fontFamily: 'Kalpurush' }}
//                                       >
//                                         {subsection.title}
//                                       </Text>
//                                     </View>
//                                   ))}
//                                 </View>
//                               )}
//                             </View>
//                           </View>
//                         </View>
//                       ))}
//                     </View>
//                   )}
//                 </View>
//               ))
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   chapterCard: {
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

// export default ChapterListScreen;