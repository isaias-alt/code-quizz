import { Stack, IconButton } from "@mui/material"
import ArrowBackIos from '@mui/icons-material/ArrowBackIosNew';
import { useQuestionsStore } from "../store/questions"
import { ArrowForwardIos } from "@mui/icons-material";
import { Results } from "./Results";
import { Question } from "./Question";

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="row" gap={2} alignItems="center" justifyContent="center" >
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIos />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo}/>
      <Results />
    </>
  )
}