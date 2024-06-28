import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "../types.d";
import confetti from 'canvas-confetti'
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[]
  currentQuestion: number
  selectedLanguage: string
  correctAnswersCount: number
  fetchQuestions: (limit?: number, language?: string) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  setSelectedLanguage: (language: string) => void
  reset: () => void
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    selectedLanguage: 'javascript',
    currentQuestion: 0,
    correctAnswersCount: 0,
    fetchQuestions: async (limit = 10, language = get().selectedLanguage) => {
      const questions = await getAllQuestions(limit, language);
      set({ questions });
    },
    selectAnswer: (questionId, answerIndex) => {
      const { questions, currentQuestion, correctAnswersCount } = get();
      const newQuestions = structuredClone(questions);
      const questionIndex = newQuestions.findIndex(question => question.id === questionId);
      const questionInfo =  newQuestions[questionIndex];
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

      if (isCorrectUserAnswer) {
        confetti();
        set({ correctAnswersCount: correctAnswersCount + 1 });

        if (correctAnswersCount + 1 === 10) {
          let duration = 15 * 1000;
          let animationEnd = Date.now() + duration;
          let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

          function randomInRange(min: number, max: number) {
            return Math.random() * (max - min) + min;
          }

          let interval = setInterval(function() {
            let timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              return clearInterval(interval);
            }

            let particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
          }, 250);
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
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get();
      const nextQuestion = currentQuestion + 1;

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion });
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get();
      const previousQuestion = currentQuestion - 1;
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion });
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [], correctAnswersCount: 0 });
    },
    setSelectedLanguage: (language: string) => {
      set({ selectedLanguage: language });
    }    
  };
}, {
  name: 'questions',
}));
