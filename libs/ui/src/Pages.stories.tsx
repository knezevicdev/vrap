import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { Colors } from './sections/SEM/Colors';
import { Hero } from './sections/SEM/Hero';
import { Overview } from './sections/SEM/Overview';
import { theme as VroomTheme } from './themes/New/Vroom';

export default { title: 'Pages' };

/*
  TODO:
  Mobile layout broken because sections are not all responsive.
  Debug by removing sections to see what needs work.
 */

const Page = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  width: 100%;
  max-width: 864px;
  align-self: center;
  margin-bottom: 136px;
`;

const Space = styled.div`
  min-height: 64px;
  max-height: 64px;
`;

export const SEM: React.FC = () => {
  return (
    <ThemeProvider theme={VroomTheme}>
      <Page>
        <Container>
          <Hero />
          <Space />
          <Overview />
          <Space />
          <Colors />
        </Container>
      </Page>
    </ThemeProvider>
  );
};
