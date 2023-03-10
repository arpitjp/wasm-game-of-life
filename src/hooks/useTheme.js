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
      deadOnToggle: 'white',
      dead: "rgba(0,0,0,0)",
      lines: '#E8E8E8'
    }
  },
  dark: {
    backgroundColor: '#121212',
    font: {
      main: 'white',
      light: 'rgba(255, 255, 255, 0.7)'
    },
    outline: {
      color: 'white',
    },
    grid: {
      alive: "#E3E3E3",
      deadOnToggle: '#121212',
      dead: 'rgba(0,0,0,0)',//"#121212",
      lines: '#1E1E1E'
    }
  }
}

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(window.localStorage.getItem('theme') === 'light' ? false : true);
  const setTheme = (isDarkMode) => {
    setIsDarkMode(isDarkMode);
    window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    window.navigator.vibrate(1);
  }
  const theme = isDarkMode ? obj.dark : obj.light;
  window.theme = theme;
  return { isDarkMode, setTheme, theme };
}