import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const choices = ['Rock', 'Paper', 'Scissors'];

export default function RpsGame() {
  const [playerChoice, setPlayerChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState('');
  const [score, setScore] = useState({ player: 0, computer: 0 });

  const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (player, computer) => {
    if (player === computer) {
      return "It's a tie!";
    }
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      setScore((prevScore) => ({ ...prevScore, player: prevScore.player + 1 }));
      return 'You win!';
    } else {
      setScore((prevScore) => ({ ...prevScore, computer: prevScore.computer + 1 }));
      return 'Computer wins!';
    }
  };

  const playGame = (choice) => {
    setPlayerChoice(choice);
    const compChoice = getComputerChoice();
    setComputerChoice(compChoice);
    setResult(determineWinner(choice, compChoice));
  };

  const resetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult('');
    setScore({ player: 0, computer: 0 });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rock Paper Scissors</Text>

      <View style={styles.choicesContainer}>
        {choices.map((choice) => (
          <TouchableOpacity
            key={choice}
            style={styles.choiceButton}
            onPress={() => playGame(choice)}
          >
            <Text style={styles.choiceButtonText}>{choice}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {playerChoice && (
        <View style={styles.resultContainer}>
          <Text style={styles.playerChoiceText}>You chose: {playerChoice}</Text>
          <Text style={styles.computerChoiceText}>Computer chose: {computerChoice}</Text>
          <Text style={styles.resultText}>{result}</Text>
          <Text style={styles.scoreText}>Score: You {score.player} - {score.computer} Computer</Text>
        </View>
      )}

      <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity>
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
  choicesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  choiceButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  choiceButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  playerChoiceText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 5,
  },
  computerChoiceText: {
    fontSize: 20,
    color: '#555',
    marginBottom: 15,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#d9534f',
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  resetButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
