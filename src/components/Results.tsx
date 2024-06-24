import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/questions"

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
  const reset = useQuestionsStore(state => state.reset)
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <section style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${correct} corrects' - ❌ ${incorrect} incorrects - ❔ ${unanswered} unanswered`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button variant="outlined" onClick={() => reset()}>reset</Button>
      </div>
    </section>
  )
}