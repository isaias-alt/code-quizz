import { Button, MenuItem, Select, Stack, Box } from "@mui/material";
import { SetStateAction, useState } from "react";
import { GitHubIcon } from "./icons/GitHubIcon";

export const Header = () => {
  const [language, setLanguage] = useState("javascript");

  const handleProgrammingLanguageChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setLanguage(event.target.value);
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
