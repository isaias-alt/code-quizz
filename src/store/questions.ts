import { create } from "zustand";
import { persist } from "zustand/middleware";
import { State } from "../types.d";
import { getAllQuestions } from "../services/questions";
import { handleSelectAnswer } from '../utils/selectAnswerUtils';


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
      handleSelectAnswer(questionId, answerIndex, get, set);
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
