import { Question } from "../types.d";

export const getAllQuestions = async (limit: number, language: string): Promise<Question[]> => {
  const res = await fetch(`http://localhost:5173/${language}.json`);
  const data: Question[] = await res.json();
  return data.sort(() => Math.random() - 0.5).slice(0, limit);
};
