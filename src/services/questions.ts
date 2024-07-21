import { Question } from "../types.d"

const IS_PROD = import.meta.env.PROD

const BASE_URL = IS_PROD ? 'https://code-quizz.vercel.app' : 'http://localhost:5173'

export const getAllQuestions = async (limit: number, language: string) => {
  const res = await fetch(`${BASE_URL}/${language}.json`)
  const data: Question[] = await res.json()
  return data.sort(() => Math.random() - 0.5).slice(0, limit)
}
