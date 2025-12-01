import { Redirect } from 'expo-router';

// This is the root index file.
// It does nothing but redirect to the (app) group.
// The AuthContext will then handle redirecting to (auth) if needed.
export default function AppRoot() {
  return <Redirect href="/(app)" />;
}
