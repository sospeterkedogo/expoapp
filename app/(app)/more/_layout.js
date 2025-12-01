import { Stack } from 'expo-router';

export default function MoreLayout() {
  return (
    <Stack>
      {/* This is the main list screen in the "More" tab */}
      <Stack.Screen name="index" options={{ title:"Home", headerShown: false }} />
      
      <Stack.Screen name="calc" options={{ title: "Calculator" }} />
    </Stack>
  );
}
