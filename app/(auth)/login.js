import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit() {
    setError('');

    const success = await signIn(email, password);

    if (!success) {
      setError('Invalid credentials');
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <AuthForm
        title="Welcome Back"
        error={error}
        submitLabel="Login"
        onSubmit={handleSubmit}
        footerText="Don't have an account? Sign Up"
        footerAction={() => router.replace('/(auth)/register')}
        fields={[
          { name: 'email', value: email, onChange: setEmail, placeholder: 'Email' },
          { name: 'password', value: password, onChange: setPassword, placeholder: 'Password', secure: true }
        ]}
      />
      <TouchableOpacity onPress={() => router.push('/(auth)/reset-password')}>
        <Text style={styles.forgotText}>Forgot password?</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  forgotText: {
    color: '#3b82f6',
    textAlign: 'center',
    marginTop: 12
  }
});
