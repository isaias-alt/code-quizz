export interface Question {
  id: number
  question: string
  code: string
  answers: string[]
  correctAnswer: number
  userSelectedAnswer?: number
  isCorrectUserAnswer?: boolean
}

export interface State {
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

export interface Language {
  value: string;
  label: string;
}
