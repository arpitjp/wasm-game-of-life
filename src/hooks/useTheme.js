import { useState } from "react";

export const obj = {
  light: {
    backgroundColor: 'white',
    font: {
      main: 'black',
      light: 'rgba(0, 0, 0, 0.3)'
    },
    outline: {
      color: 'black',
    },
    grid: {
      alive: "#323232",
      dead: "white",
      lines: '#E8E8E8'
    }
  },
  dark: {
    backgroundColor: '#1F2028',
    font: {
      main: 'white',
      light: 'rgba(255, 255, 255, 0.7)'
    },
    outline: {
      color: 'white',
    },
    grid: {
      alive: "#A9AEC0",
      dead: "#1F2028",
      lines: '#090A11'
    }
  }
}

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(window.localStorage.getItem('theme') === 'dark');
  const setTheme = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
  return { isDarkMode, setTheme, theme: isDarkMode ? obj.dark : obj.light };
}