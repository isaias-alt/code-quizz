import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { Start } from "./components/Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./components/Game";
import { Header } from "./components/Header";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  return (
    <main>
      <Header />
      <Container maxWidth="sm" sx={{ marginTop: '16px' }}>
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <img
            style={{ width: "68px", height: "68px" }}
            src="/icon.svg"
            alt="app icon"
          />
          <Typography variant="h2" component="h1" sx={{ marginBottom: '16px' }}>
            Code Quizz
          </Typography>
        </Stack>
        {questions.length === 0 ? <Start /> : <Game />}
      </Container>
    </main>
  );
}

export default App;
