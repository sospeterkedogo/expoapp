import { Stack } from 'expo-router';

// This layout file defines the navigation stack for
// the (auth) group.
export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerTitleAlign: 'center', headerShown: false }}>
      <Stack.Screen name="login" options={{ title: 'Sign In' }} />
      <Stack.Screen name="register" options={{ title: 'Sign Up' }} />
    </Stack>
  );
}
