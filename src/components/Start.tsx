import { Button } from "@mui/material";
import { useQuestionsStore } from "../store/questions";

const LIMIT_QUESTIONS = 10;

export const Start = () => {
  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions);
  const selectedLanguage = useQuestionsStore(state => state.selectedLanguage);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTIONS, selectedLanguage);
  };

  return (
    <Button onClick={handleClick} variant="contained" aria-label="start button">
      Start
    </Button>
  );
};
