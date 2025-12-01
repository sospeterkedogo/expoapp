import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const diceImages = {
  1: require('../../../assets/images/dice1.png'),
  2: require('../../../assets/images/dice2.png'),
  3: require('../../../assets/images/dice3.png'),
  4: require('../../../assets/images/dice4.png'),
  5: require('../../../assets/images/dice5.png'),
  6: require('../../../assets/images/dice6.png'),
};

export default function DiceGame() {
  const [diceValue, setDiceValue] = useState(1);

  const rollDice = () => {
    const newValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dice Roller</Text>
      <Image source={diceImages[diceValue]} style={styles.diceImage} />
      <TouchableOpacity style={styles.rollButton} onPress={rollDice}>
        <Text style={styles.rollButtonText}>Roll Dice</Text>
      </TouchableOpacity>
      <Text style={styles.resultText}>You rolled a {diceValue}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  diceImage: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  rollButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  rollButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  resultText: {
    fontSize: 24,
    color: '#555',
  },
});
