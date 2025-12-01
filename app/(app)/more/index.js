import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const moreItems = [
  { id: 'calc', name: 'calc', icon: 'calculator', type: 'more' },
  { id: 'notes', name: 'notes', icon: 'sticky-note', type: 'more' },
];

export default function MoreScreen() {
  const router = useRouter();

  const handleItemPress = (item) => {
    if (item.type === 'game') {
      router.push(`/(app)/games/${item.id}`);
    } else {
      router.push(`/(app)/more/${item.id}`);
    }
  };

  return (
    <View style={styles.container}>
      {moreItems.map((item) => (
        <Pressable
          key={item.id}
          style={styles.itemButton}
          onPress={() => handleItemPress(item)}>
          <FontAwesome name={item.icon} size={20} color="#007AFF" />
          <Text style={styles.itemButtonText}>{item.name}</Text>
          <FontAwesome name="chevron-right" size={16} color="#C7C7CC" />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    paddingTop: 20,
  },
  itemButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  itemButtonText: {
    color: 'black',
    fontSize: 17,
    marginLeft: 15,
    flex: 1, // Pushes the chevron to the right
  },
});
