import React, { useState } from "react";
import { Box, Heading, Text, VStack, Grid, Button, useColorModeValue } from "@chakra-ui/react";

const generateQuestion = () => {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  const correctAnswer = a * b;
  let wrongAnswers = Array.from({ length: 3 }, () => {
    let wrongAnswer;
    do {
      const offset = Math.floor(Math.random() * 5) - 2;
      wrongAnswer = correctAnswer + offset;
    } while (wrongAnswer === correctAnswer);
    return wrongAnswer;
  });

  wrongAnswers = [...new Set(wrongAnswers)];
  while (wrongAnswers.length < 3) {
    let wrongAnswer;
    do {
      const offset = Math.floor(Math.random() * 5) - 2;
      wrongAnswer = correctAnswer + offset;
    } while (wrongAnswers.includes(wrongAnswer) || wrongAnswer === correctAnswer);
    wrongAnswers.push(wrongAnswer);
  }

  const answers = [...wrongAnswers, correctAnswer].sort(() => Math.random() - 0.5);
  return { question: `${a} x ${b}`, answers, correctAnswer };
};

const Index = () => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameState, setGameState] = useState(generateQuestion());

  const handleAnswer = (answer) => {
    if (answer === gameState.correctAnswer) {
      setScore({ ...score, correct: score.correct + 1 });
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1 });
    }
    setGameState(generateQuestion());
  };

  return (
    <Box textAlign="center" fontSize="xl" minH="100vh" p={4}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Multiplication Practice
        </Heading>
        <Text fontSize="4xl">{gameState.question} = ?</Text>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {gameState.answers.map((answer, index) => (
            <Button key={index} onClick={() => handleAnswer(answer)} size="lg" colorScheme="blue">
              {answer}
            </Button>
          ))}
        </Grid>
        <Text fontSize="2xl">
          Score: {score.correct} correct, {score.incorrect} incorrect
        </Text>
      </VStack>
    </Box>
  );
};

export default Index;
