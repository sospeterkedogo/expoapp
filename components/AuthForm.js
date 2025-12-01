import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AuthForm({
    title,
    fields,
    submitLabel,
    onSubmit,
    error,
    footerText,
    footerAction
}) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>

            {error ? <Text style={styles.error}>{error}</Text> : null}

            {fields.map((field) => (
                <TextInput
                    key={field.name}
                    value={field.value}
                    onChangeText={field.onChange}
                    placeholder={field.placeholder}
                    secureTextEntry={field.secure}
                    autoCapitalize="none"
                    style={styles.input}
                />
            ))}

            <TouchableOpacity style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>{submitLabel}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={footerAction}>
                <Text style={styles.footer}>{footerText}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        maxWidth: 320
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 18,
        textAlign: 'center'
    },
    input: {
        height: 48,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,
        paddingHorizontal: 12,
        marginBottom: 14,
        backgroundColor: '#fafafa'
    },
    button: {
        backgroundColor: '#3b82f6',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 4
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
    },
    error: {
        color: '#dc2626',
        marginBottom: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 16,
        color: '#3b82f6',
        textAlign: 'center'
    }
});
