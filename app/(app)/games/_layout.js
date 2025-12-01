import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    <Stack>
      {/* The main 'index' screen of the games tab won't show a header */}
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      
      {/* The individual game screens will get a title automatically */}
      <Stack.Screen name="quiz" options={{ title: "Quiz Game" }} />
      <Stack.Screen name="rps" options={{ title: "Rock Paper Scissors" }} />
      <Stack.Screen name="dice" options={{ title: "Dice Roller" }} />
    </Stack>
  );
}
