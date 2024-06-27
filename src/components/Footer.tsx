import { Box, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <Typography variant="body2">
        Made with ❤️ by{" "}
        <a
          href="https://lucasco.dev"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "dotted underline" }}
        >
          lucasco.dev
        </a>{" "}
        based on{" "}
        <a
          href="https://www.youtube.com/watch?v=p2wF2wRjcN0"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "inherit", textDecoration: "dotted underline" }}
        >
          midudev
        </a>{" "}
        project
      </Typography>
    </Box>
  );
};
