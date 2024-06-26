import { type Question as QuestionType } from "../types"

export const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  if (userSelectedAnswer == null) return 'transparent'
  if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
  if (index === correctAnswer) return '#258525'
  if (index === userSelectedAnswer) return '#8a1919'
  return 'transparent'
}