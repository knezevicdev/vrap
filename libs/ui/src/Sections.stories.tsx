import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Colors } from './sections/SEM/Colors';
import { Hero } from './sections/SEM/Hero';
import { Overview } from './sections/SEM/Overview';
import { ProsAndCons } from './sections/SEM/ProsAndCons';
import { theme as VroomTheme } from './themes/New/Vroom';

export default { title: 'Sections' };

const Container = styled.div`
  display: flex;
`;

export const SEM_Hero: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={VroomTheme}>
        <Hero info={{ image: '', title: '2019 wrangler', logo: '' }} />
      </ThemeProvider>
    </Container>
  );
};

export const SEM_Overview: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={VroomTheme}>
        <Overview />
      </ThemeProvider>
    </Container>
  );
};

export const SEM_Colors: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={VroomTheme}>
        <Colors />
      </ThemeProvider>
    </Container>
  );
};

export const SEM_Features: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={VroomTheme}></ThemeProvider>
    </Container>
  );
};

export const SEM_Pros_And_Cons: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={VroomTheme}>
        <ProsAndCons />
      </ThemeProvider>
    </Container>
  );
};

export const SEM_Awards: React.FC = () => {
  return (
    <Container>
      <ThemeProvider theme={VroomTheme}></ThemeProvider>
    </Container>
  );
};
