import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { useTranslation } from "react-i18next"

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
  const { t } = useTranslation()
  const reset = useQuestionsStore(state => state.reset)
  const { correct, incorrect, unanswered } = useQuestionsData()

  return (
    <section style={{ marginTop: '16px' }}>
      <strong>
        {`✅ ${correct} ${t('corrects')} - ❌ ${incorrect} ${t('incorrects')} - ❔ ${unanswered} ${t('unanswered')}`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button variant="outlined" onClick={() => reset()}>{t('reset')}</Button>
      </div>
    </section>
  )
}