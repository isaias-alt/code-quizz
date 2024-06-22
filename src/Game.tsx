import { Card, Stack, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import ArrowBackIos from '@mui/icons-material/ArrowBackIosNew';
import { useQuestionsStore } from "./store/questions"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "./types.d"
import { ArrowForwardIos } from "@mui/icons-material";
import { Results } from "./Results";

const getBackGroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info

  if (userSelectedAnswer == null) return 'transparent'

  if(index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'

  if (index === correctAnswer) return '#258525'

  if (index === userSelectedAnswer) return '#8a1919'

  return 'transparent'
}

const Question = ({ info }: {info: QuestionType}) => {
  const selectAnswer = useQuestionsStore(state => state.selectAnswer)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }
  
  return (
    <Card variant="outlined" sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 2 }}>
      <Typography variant="h5" marginBottom={2}>
        {info.question}
      </Typography>
      {info.code.length !== 0 &&
        <SyntaxHighlighter language="JavaScript" style={atomOneDark}>
          {info.code}
        </SyntaxHighlighter>}
      <List sx={{bgcolor: '#333'}} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton 
              onClick={handleClick(index)}
              disabled={info.userSelectedAnswer != null}
              sx={{
                backgroundColor: getBackGroundColor(info, index)
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(state => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

currentQuestion
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