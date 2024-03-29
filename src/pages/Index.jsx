import React, { useState, useEffect } from "react";
import { Box, Heading, Text, VStack, Grid, Button, Progress } from "@chakra-ui/react";

const generateQuestion = () => {
  const a = Math.floor(Math.random() * 10) + 2;
  const b = Math.floor(Math.random() * 10) + 2;
  const correctAnswer = a * b;
  let wrongAnswers = Array.from({ length: 3 }, () => {
    let wrongAnswer;
    do {
      const factor = Math.random() < 0.5 ? a : b;
      const multiplier = Math.floor(Math.random() * 10) + 1;
      wrongAnswer = factor * multiplier;
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

const ProgressBar = ({ remainingTime }) => {
  const progress = (remainingTime / 20) * 100;
  return <Progress value={progress} size="sm" colorScheme="blue" />;
};

const Index = () => {
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [gameState, setGameState] = useState(generateQuestion());
  const [remainingTime, setRemainingTime] = useState(20);

  const handleAnswer = (answer) => {
    if (remainingTime > 0) {
      if (answer === gameState.correctAnswer) {
        setScore({ ...score, correct: score.correct + 1 });
        setRemainingTime(remainingTime + 3);
      } else {
        setScore({ ...score, incorrect: score.incorrect + 1 });
      }
      setGameState(generateQuestion());
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box textAlign="center" fontSize="xl" minH="100vh" p={4}>
      <VStack spacing={8}>
        <Heading as="h1" size="2xl">
          Simple Math or ✖️
        </Heading>
        <Box width="100%" mb={8}>
          <ProgressBar remainingTime={remainingTime} />
        </Box>
        {remainingTime > 0 ? (
          <>
            <Text fontSize="4xl">{gameState.question} = ?</Text>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              {gameState.answers.map((answer, index) => (
                <Button key={index} onClick={() => handleAnswer(answer)} size="lg" colorScheme="blue">
                  {answer}
                </Button>
              ))}
            </Grid>
          </>
        ) : (
          <Text fontSize="4xl">Time's up!</Text>
        )}
        <Text fontSize="2xl">
          Score: {score.correct} correct, {score.incorrect} incorrect
        </Text>
      </VStack>
    </Box>
  );
};

export default Index;
