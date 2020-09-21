import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Footer } from './core/Footer';
import { Colors } from './sections/SEM/Colors';
import { Features } from './sections/SEM/Features';
import { Header } from './sections/SEM/Header';
import { Hero } from './sections/SEM/Hero';
import { Overview } from './sections/SEM/Overview';
import { theme as VroomTheme } from './themes/New/Vroom';

export default { title: 'Pages' };

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: 864px;
  margin-bottom: 136px;
  margin-left: auto;
  margin-right: auto;
`;

const Space = styled.div`
  min-height: 64px;
  max-height: 64px;
`;

const Divider = styled.div`
  display: flex;
  min-height: 1px;
  max-height: 1px;
  background-color: #d6d7da;

  @media (min-width: 840px) {
    margin: 32px auto;
  }

  @media (min-width: 600px) and (max-width: 839px) {
    margin: 32px 64px;
  }

  @media (max-width: 599px) {
    margin: 32px 24px;
  }
`;

export const SEM: React.FC = () => {
  return (
    <ThemeProvider theme={VroomTheme}>
      <Page>
        <Header />
        <Container>
          <Hero />
          <Divider />
          <Overview />
          <Space />
          <Colors />
          <Space />
          <Features />
        </Container>
        <Footer />
      </Page>
    </ThemeProvider>
  );
};
