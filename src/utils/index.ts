import { State } from '../types.d';
import { type Question as QuestionType } from "../types"
import confetti from 'canvas-confetti';

export const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  if (userSelectedAnswer == null) return 'transparent'
  if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  if (index === correctAnswer) return '#258525'
  if (index === userSelectedAnswer) return '#8a1919'
  return 'transparent'
}

export const triggerSpecialConfetti = () => {
  let duration = 15 * 1000;
  let animationEnd = Date.now() + duration;
  let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
  }

  const fireworksConfetti = () => {
    let timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    let particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }

  let interval = setInterval(fireworksConfetti, 250);
};

export const handleSelectAnswer = (
  questionId: number, 
  answerIndex: number, 
  get: () => State, 
  set: (partial: Partial<State>) => void
) => {
  const { questions, currentQuestion, correctAnswersCount } = get();
  const newQuestions = structuredClone(questions);
  const questionIndex = newQuestions.findIndex(question => question.id === questionId);
  const questionInfo =  newQuestions[questionIndex];
  const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

  if (isCorrectUserAnswer) {
    confetti();
    set({ correctAnswersCount: correctAnswersCount + 1 });

    if (correctAnswersCount + 1 === 10) {
      triggerSpecialConfetti();
    }

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion });
      }
    }, 800);
  }

  newQuestions[questionIndex] = {
    ...questionInfo,
    isCorrectUserAnswer,
    userSelectedAnswer: answerIndex
  };
  set({ questions: newQuestions });
};
