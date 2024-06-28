import { State } from '../types.d';
import confetti from "canvas-confetti"
import { triggerSpecialConfetti } from './confettiUtils';

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
