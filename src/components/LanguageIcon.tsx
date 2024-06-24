import { JavaScriptIcon } from './icons/JavaScriptIcon'
// Import other language Icons here

const languageIcons = {
  javascript: <JavaScriptIcon />,
  // Add more languages and their icons here
}

export const LanguageIcon = ({ language }) => {
  return languageIcons[language] || null
}
