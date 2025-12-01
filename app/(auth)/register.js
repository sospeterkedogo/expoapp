import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const router = useRouter();
  const { register } = useAuth();

  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');

    if (!displayName || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const success = await register(email, password, displayName);

    if (success) {
      router.replace('/(auth)/login');
    } else {
      setError('Registration failed.');
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AuthForm
        title="Create Account"
        error={error}
        submitLabel="Sign Up"
        onSubmit={handleSubmit}
        footerText="Already have an account? Sign In"
        footerAction={() => router.replace('/(auth)/login')}
        fields={[
          { name: 'displayName', value: displayName, onChange: setDisplayName, placeholder: 'Username' },
          { name: 'email', value: email, onChange: setEmail, placeholder: 'Email' },
          { name: 'password', value: password, onChange: setPassword, placeholder: 'Password', secure: true }
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
});
