import { ScrollView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import Card from "../../components/Card";

const DATA = [
  { 
    id: '1', 
    title: "Three", 
    description: "dice 3 face", 
    image: require('../../assets/images/dice3.png') 
  },
  { 
    id: '2', 
    title: "One", 
    description: "dice 1 face", 
    image: require('../../assets/images/dice1.png') 
  },
  { 
    id: '3', 
    title: "Hamlet - Act 3, Scene 1", 
    description: "To be, or not to be: that is the question: whether 'tis nobler in the mind to suffer the slings and arrows of outrageous fortune.",
    image: null // Handle cases where images might be missing
  },
];

export default function Index() {
  const { width } = useWindowDimensions();
  
  // Simple responsive logic: If screen is wide > 768px, act like desktop
  const isDesktop = width > 768;

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
    >
      {/* 2. The Centered Wrapper 
        This limits the width so your app doesn't look like a stretched billboard 
        on a 4k monitor.
      */}
      <View style={[styles.contentWrapper, isDesktop && styles.desktopWrapper]}>
        
        <Text style={styles.title}>Welcome to the Home Page</Text>
        
        <View style={styles.grid}>
          {DATA.map((item) => (
            <View 
              key={item.id} 
              style={[styles.cardContainer, isDesktop && styles.cardContainerDesktop]}
            >
              <Card 
                title={item.title} 
                description={item.description} 
                image={item.image} 
              />
            </View>
          ))}
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa', // Give it a background so cards pop
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 40,
    alignItems: 'center', // Centers the contentWrapper horizontally
  },
  contentWrapper: {
    width: '100%',
    paddingHorizontal: 20,
  },
  desktopWrapper: {
    maxWidth: 1200, // STOP the layout from stretching infinitely
  },
  title: {
    fontSize: 32, // Bigger font for desktop contexts
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap', // This creates the grid effect
    gap: 20, // Modern RN supports 'gap' for spacing
    justifyContent: 'center',
  },
  cardContainer: {
    width: '100%', // Mobile: Full width
    marginBottom: 20,
  },
  cardContainerDesktop: {
    width: '30%', // Desktop: roughly 3 columns (accounting for gaps)
    minWidth: 300, // Prevent cards from getting too squished
  }
});