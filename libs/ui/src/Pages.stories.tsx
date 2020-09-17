import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Colors } from './sections/SEM/Colors';
import { Features } from './sections/SEM/Features';
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
  min-height: 1px;
  max-height: 1px;
  width: 100%;
  background-color: #d6d7da;
  margin: 32px 0;
`;

export const SEM: React.FC = () => {
  return (
    <ThemeProvider theme={VroomTheme}>
      <Page>
        <Container>
          <Hero />
          <Divider />
          <Overview />
          <Space />
          <Colors />
          <Space />
          <Features />
        </Container>
      </Page>
    </ThemeProvider>
  );
};
