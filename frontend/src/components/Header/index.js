import React from 'react';
import { func, string } from 'prop-types';

import { Container, ToggleContainer } from './styles';

import { ReactComponent as MoonIcon } from '../../assets/moon.svg';
import { ReactComponent as SunIcon } from '../../assets/sun.svg';

export default function Header({ theme, toggleTheme }) {
  const isLight = theme === 'light';

  return (
    <Container>
      <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
        <SunIcon />
        <MoonIcon />
      </ToggleContainer>
    </Container>
  );

  Header.propTypes = {
    toggleTheme: func.isRequired,
    theme: string.isRequired,
  };
}
