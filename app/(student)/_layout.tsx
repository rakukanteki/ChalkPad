import { Stack } from 'expo-router';

export default function StudentLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="student-home" />
      <Stack.Screen name="qna" />
      <Stack.Screen name="exam" />
    </Stack>
  );
}