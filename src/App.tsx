import { Container, MenuItem, Select, Stack, Typography } from '@mui/material'
import './App.css'
import { Start } from './components/Start'
import { useQuestionsStore } from './store/questions'
import { Game } from './components/Game'
import { useTranslation } from 'react-i18next'
import { SetStateAction, useState } from 'react'
import './i18n'

function App() {
  const { i18n } = useTranslation()
  const questions = useQuestionsStore(state => state.questions)
  const [language, setLanguage] = useState('javascript')

  const handleLanguageChange = (event: { target: { value: string | undefined } }) => {
    i18n.changeLanguage(event.target.value)
  }

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
            <MenuItem value={'javascript'}>JavaScript</MenuItem>
          </Select>
          <Stack direction='row' gap={2} alignItems='center'>
            <Typography variant='h2' component='h1'>
              Code Quizz
            </Typography>
          </Stack>
          <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            displayEmpty
            inputProps={{ 'aria-label': 'language' }}
          >
            <MenuItem value={'en'}>🇺🇸</MenuItem>
            <MenuItem value={'es'}>🇪🇸</MenuItem>
          </Select>
        </Stack>
        {questions.length === 0 ? <Start /> : <Game />}
      </Container>
    </main>
  )
}

export default App
