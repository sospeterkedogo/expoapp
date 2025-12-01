import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const questions = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Mars',
  },
  {
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    answer: '4',
  },
];

export default function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswer = (selectedOption) => {
    if (quizFinished) return;

    if (selectedOption === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Quiz Finished!</Text>
        <Text style={styles.scoreText}>Your score: {score} out of {questions.length}</Text>
        <TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
          <Text style={styles.restartButtonText}>Restart Quiz</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1} of {questions.length}</Text>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => handleAnswer(option)}
          >
            <Text style={styles.optionButtonText}>{option}</Text>
          </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  questionNumber: {
    fontSize: 18,
    marginBottom: 10,
    color: '#666',
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#444',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  optionButtonText: {
    fontSize: 18,
    color: '#555',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  restartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
