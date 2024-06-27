import { Question } from "../types.d";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5173/'

export const getAllQuestions = async (limit: number, language: string): Promise<Question[]> => {
  const res = await fetch(`${API_URL}/${language}.json`);
  const data: Question[] = await res.json();
  return data.sort(() => Math.random() - 0.5).slice(0, limit);
};
