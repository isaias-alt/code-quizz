import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from "./types.d"

const Question = ({ info }: {info: QuestionType}) => {
  return (
    <Card variant="outlined" sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}>
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
            <ListItemButton>
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

  const questionInfo = questions[currentQuestion]

currentQuestion
  return (
    <>
      <Question info={questionInfo}/>
    </>
  )
}