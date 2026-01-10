import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="teacher-home" />
      <Stack.Screen name="lesson-plan" />
      <Stack.Screen name="gen-quiz" />
      <Stack.Screen name="ques-paper" />
      <Stack.Screen name="summarize" />
    </Stack>
  );
}