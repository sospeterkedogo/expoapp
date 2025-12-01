import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

/**
 * This is the actual App layout.
 * It's rendered *inside* the AuthProvider.
 * It's responsible for two things:
 * 1. Rendering the <Stack> navigator.
 * 2. Handling the auth-based redirects.
 */
const AppLayout = () => {
  const { session, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // We MUST wait for the auth state to load
    if (isLoading) {
      return; // Do nothing, splash screen is still active.
    }

    const inApp = segments[0] === '(app)';

    if (!session && inApp) {
      // If not logged in and in the app, redirect to login
      router.replace('/(auth)/login');
    } else if (session && !inApp) {
      // If logged in and not in the app, redirect to home
      // This handles coming from the (auth) group
      router.replace('/(app)');
    }

    // Only hide the splash screen *after* all auth logic
    // and potential redirects are done.
    SplashScreen.hideAsync();

  }, [session, isLoading, segments, router]); // Effect runs when auth state changes


  // This is the Root Navigator.
  // It will render the <Stack> and the correct child route
  // (either (app) or (auth)) will be slotted in.
  // The useEffect hook above will then handle redirects.
  return <Stack screenOptions={{ headerShown: false }} />;
};

/**
 * This is the default export. It wraps the entire
 * app in the AuthProvider, so <AppLayout>
 * and all children can access the `useAuth` hook.
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  );
}

