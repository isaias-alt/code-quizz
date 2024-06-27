import { Container, Stack, Typography, useTheme, useMediaQuery } from "@mui/material";
import { useQuestionsStore } from "../store/questions";
import { CodeQuizzIcon } from "./icons/CodeQuizzIcon";
import { StartButton } from "./StartButton";
import { Game } from "./Game";


export const StartScreen = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container maxWidth="sm" sx={{ marginTop: "16px" }}>
      <Stack
        direction="row"
        gap={2}
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: "16px" }}
      >
        <CodeQuizzIcon />
        <Typography
          variant={isSmallScreen ? "h4" : "h2"}
          component="h1"
          sx={{
            fontSize: isSmallScreen ? "2.5rem" : "4rem",
          }}
        >
          Code Quizz
        </Typography>
      </Stack>
      {questions.length === 0 ? <StartButton /> : <Game />}
    </Container>
  );
};
