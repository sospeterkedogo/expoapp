import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "../../context/AuthContext";


// Stub file for your profile tab
export default function Profile() {
  const { signOut } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <TouchableOpacity onPress={signOut} style={styles.button}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    marginBottom: 20
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  } 
});
