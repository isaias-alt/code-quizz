import { Button } from "@mui/material"
import { useQuestionsStore } from "../store/questions"
import { useTranslation } from "react-i18next"

const LIMIT_QUESTIONS = 10

export const Start = () => {
  const { t } = useTranslation()
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS)
  }
  
  return (
    <Button onClick={handleClick} variant="contained" aria-label="start button">
       {t('start')}
    </Button>
  )
}