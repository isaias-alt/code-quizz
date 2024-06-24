import { Container, MenuItem, Select, Stack, Typography } from '@mui/material'
import './App.css'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'
import { SetStateAction, useState } from 'react'

function App() {
  const questions = useQuestionsStore(state => state.questions)
  const [language, setLanguage] = useState('javascript')


  const handleProgrammingLanguageChange = (event: { target: { value: SetStateAction<string> } }) => {
    setLanguage(event.target.value)
  }
  
  return (
    <main>
      <Container maxWidth='sm'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <Select
            value={language}
            onChange={handleProgrammingLanguageChange}
            displayEmpty
            inputProps={{ 'aria-label': 'programming language' }}
          >
            <MenuItem value='javascript'>JavaScript</MenuItem>
          </Select>
          <Stack direction='row' gap={2} alignItems='center'>
            <Typography variant='h2' component='h1'>
              Code Quizz
            </Typography>
          </Stack>
        </Stack>
        {questions.length === 0 ? <Start /> : <Game />}
      </Container>
    </main>
  )
}

export default App
