import React from 'react';

import { ThemeProvider } from 'styled-components';
import { useDarkMode } from './themes/useDarkMode';
import { lightTheme, darkTheme } from './themes/theme';
import { GlobalStyles } from './global';

import Header from './components/Header'

import Routes from './Routes';

function App() {
  const [theme, toggleTheme, componentMounted] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  if (!componentMounted) {
    return <div />;
  }

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Header theme={theme} toggleTheme={toggleTheme}/>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
