import { useQuestionsStore } from "./store/questions"

export const useQuestionsData = () => {
  const questions = useQuestionsStore(state => state.questions)

  let correct = 0
  let incorrect = 0
  let unanswered = 0

  questions.forEach(question => {
    const { userSelectedAnswer, correctAnswer } = question
    if (userSelectedAnswer == null) unanswered++
    else if (userSelectedAnswer === correctAnswer) correct++
    else incorrect++
  })

  return { correct, incorrect, unanswered }
}

export const Results = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${correct} corrects - ❌ ${incorrect} incorrects - ❔ ${unanswered} unanswered`}
      </strong>
    </footer>
  )
}