import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const games = [
  { id: 'quiz', name: 'Quiz Game', icon: 'question-circle' },
  { id: 'rps', name: 'Rock Paper Scissors', icon: 'hand-rock-o' },
  { id: 'dice', name: 'Dice Roller', icon: 'dice' },
];

export default function GamesHub() {
  const router = useRouter();

  const handleGamePress = (gameId) => {
    // We just 'push' the route. The Stack layout handles the rest.
    router.push(`/(app)/games/${gameId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game Hub</Text>
      <View style={styles.listContainer}>
        {games.map((game) => (
          <Pressable
            key={game.id}
            style={styles.gameButton}
            onPress={() => handleGamePress(game.id)}>
            <FontAwesome name={game.icon} size={24} color="#fff" />
            <Text style={styles.gameButtonText}>{game.name}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  listContainer: {
    width: '100%',
    maxWidth: 400,
  },
  gameButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gameButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
});
