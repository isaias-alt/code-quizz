import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from "../store/questions"
import { type Question as QuestionType } from "../types"
import { Card, List, ListItem, ListItemButton, ListItemText, Typography } from "@mui/material"
import { getBackgroundColor } from '../utils/colorUtils'

export const Question = ({ info }: {info: QuestionType}) => {
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
                backgroundColor: getBackgroundColor(info, index)
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