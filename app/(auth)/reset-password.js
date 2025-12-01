import { useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import AuthForm from '../../components/AuthForm';
import { useAuth } from '../../context/AuthContext';

export default function ResetPassword() {
    const router = useRouter();
    const { resetPassword } = useAuth();

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    async function handleSubmit() {
        setError('');
        setSuccess('');

        if (!email) {
            setError('Enter your email first.');
            return;
        }

        const ok = await resetPassword(email);

        if (ok) {
            setSuccess('Check your email for reset instructions.');
        } else {
            setError('Failed to send reset email.');
        }
    }

    return (
        <SafeAreaView style={styles.screen}>
            <AuthForm
                title="Reset Password"
                error={error || success}
                submitLabel="Send Reset Email"
                onSubmit={handleSubmit}
                footerText="Go back to Sign In"
                footerAction={() => router.replace('/(auth)/login')}
                fields={[
                    { name: 'email', value: email, onChange: setEmail, placeholder: 'Email' }
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
