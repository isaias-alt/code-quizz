import { Card, IconButton, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "./types.d"

const Question = ({ info }: {info: QuestionType}) => {
  return (
    <Card variant="outlined" sx={{ textAlign: 'left', bgcolor: '#222', p: 2 }}>
      <Typography variant="h5">
        {info.question}
      </Typography>
      <SyntaxHighlighter language="JavaScript" style={atomOneDark}>
        {info.code}
      </SyntaxHighlighter>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

currentQuestion
  return (
    <>
      <Question info={questionInfo}/>
    </>
  )
}