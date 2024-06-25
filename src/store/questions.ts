import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Question } from "../types.d";
import confetti from 'canvas-confetti'
import { getAllQuestions } from "../services/questions";

interface State {
  questions: Question[]
  currentQuestion: number
  selectedLanguage: string
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
    fetchQuestions: async (limit = 10, language = get().selectedLanguage) => {
      const questions = await getAllQuestions(limit, language);
      set({ questions });
    },
    selectAnswer: (questionId, answerIndex) => {
      const { questions } = get()
      const newQuestions = structuredClone(questions)
      const questionIndex = newQuestions.findIndex(question => question.id === questionId)
      const questionInfo =  newQuestions[questionIndex]
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
      if (isCorrectUserAnswer) confetti()
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex
      }
      set({ questions: newQuestions })
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },
    goPreviousQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1
      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },
    reset: () => {
      set({ currentQuestion: 0, questions: [] })
    },
    setSelectedLanguage: (language: string) => {
      set({ selectedLanguage: language });
    }    
  };
}, {
  name: 'questions',
}));
