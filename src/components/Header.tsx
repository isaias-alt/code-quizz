import { Button, MenuItem, Select, Stack, Box } from "@mui/material";
import { SetStateAction, useState } from "react";
import { GitHubIcon } from "./icons/GitHubIcon";
import { useQuestionsStore } from "../store/questions";

export const Header = () => {
  const [language, setLanguage] = useState("javascript");
  const setSelectedLanguage = useQuestionsStore(state => state.setSelectedLanguage);

  const handleProgrammingLanguageChange = (event: { target: { value: SetStateAction<string> } }) => {
    const selectedLanguage = event.target.value as string
    setLanguage(selectedLanguage)
    setSelectedLanguage(selectedLanguage)
  };

  return (
    <Box width="100%">
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Select
          value={language}
          onChange={handleProgrammingLanguageChange}
          displayEmpty
          size="small"
          inputProps={{ "aria-label": "programming language" }}
        >
          <MenuItem value="javascript">JavaScript</MenuItem>
          <MenuItem value="dart">Dart</MenuItem>
          <MenuItem value="python">Python</MenuItem>
          <MenuItem value="typescript">TypeScript</MenuItem>
          <MenuItem value="c">C</MenuItem>
        </Select>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href="https://github.com/isaias-alt/code-quizz"
          target="_blank"
        >
          Star on GitHub
        </Button>
      </Stack>
    </Box>
  );
};
